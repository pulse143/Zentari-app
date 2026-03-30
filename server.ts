import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";
import * as admin from "firebase-admin";

// Initialize Firebase Admin
let db: admin.firestore.Firestore;

try {
  if (process.env.FIREBASE_CONFIG) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    db = admin.firestore();
    console.log("Firebase Admin initialized successfully.");
  } else {
    // Fallback to default credentials (e.g. in Cloud Run)
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    db = admin.firestore();
    console.log("Firebase Admin initialized with default credentials.");
  }
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
  process.exit(1);
}

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

if (!genAI) {
  console.warn("GEMINI_API_KEY is missing. AI features will be disabled.");
}

// --- MIDDLEWARE ---

const verifyToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// --- SERVICES ---

const GeminiService = {
  async verifyEvidence(imageData: string, projectType: string = "General", description: string = "") {
    const model = "gemini-3-flash-preview";
    const prompt = `You are a forensic impact verification agent for Zentari, a global Proof-of-Impact platform. 
    Analyze this evidence for a project of type: ${projectType}.
    User Description: ${description}

    1. Authenticity: Check for AI generation, digital manipulation, or inconsistent visual artifacts. (Score 0-1)
    2. Context: Identify if the image matches a real-world impact event for the specified project type. (Score 0-1)
    3. Risk: Flag any potential fraud, stock imagery, or low-quality evidence. (low/medium/high)
    
    Return a structured JSON object with forensic precision.`;

    // REAL MODE: Use Gemini API
    if (!genAI) {
      throw new Error("Gemini AI is not configured.");
    }

    try {
      const response = await genAI.models.generateContent({
        model,
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { data: imageData.split(',')[1], mimeType: "image/jpeg" } }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              authenticity_score: { type: Type.NUMBER },
              context_match_score: { type: Type.NUMBER },
              detected_objects: { type: Type.ARRAY, items: { type: Type.STRING } },
              risk_assessment: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING, enum: ["low", "medium", "high"] },
                  flags: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["level", "flags"]
              },
              reasoning: { type: Type.STRING }
            },
            required: ["authenticity_score", "context_match_score", "detected_objects", "risk_assessment", "reasoning"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini verification failed:", error);
      throw error;
    }
  }
};

const PoIService = {
  generateScore(verification: any, userTrust: number) {
    // PoI = (authenticity × 0.4) + (context × 0.3) + (trust × 0.2) + (random_delta × 0.1)
    const pas = verification.context_match_score;
    const engagement = userTrust / 100;
    const policy = 0.9; // Protocol baseline

    const score = (verification.authenticity_score * 0.4) + (pas * 0.3) + (engagement * 0.2) + (policy * 0.1);
    return parseFloat(score.toFixed(4));
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' })); // Increased limit for image data

  const upload = multer({ dest: 'uploads/' });

  // --- API ROUTES ---

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 1. Evidence Submission & Verification
  app.post("/api/verify", verifyToken, async (req: any, res) => {
    try {
      const { evidence_id, image_data, project_type, description } = req.body;
      const uid = req.user.uid;

      if (!image_data) {
        return res.status(400).json({ error: "No image data provided" });
      }

      console.log(`[AI] Verifying evidence ${evidence_id} for user ${uid} (Type: ${project_type})`);
      const verification = await GeminiService.verifyEvidence(image_data, project_type, description);

      res.json({
        success: true,
        evidence_id,
        verification
      });
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ error: "AI verification failed", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // 2. PoI Generation & Persistence
  app.post("/api/poi/generate", verifyToken, async (req: any, res) => {
    try {
      const { evidence_id, verification, metadata, storage_url } = req.body;
      const uid = req.user.uid;

      // Fetch user trust score from Firestore
      const userDoc = await db.collection('users').doc(uid).get();
      const userTrust = userDoc.exists ? (userDoc.data()?.trust_score || 50) : 50;

      const poi_score = PoIService.generateScore(verification, userTrust);
      const poi_id = `poi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const block_number = Math.floor(Math.random() * 1000000) + 2000000;

      const poiRecord = {
        id: poi_id,
        evidence_id,
        user_id: uid,
        poi_score,
        verification_data: verification,
        block_number,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        metadata: metadata || "",
        storage_url: storage_url || ""
      };

      // Persist to Firestore securely from backend
      await db.collection('poi_records').doc(poi_id).set(poiRecord);

      // Update user trust score slightly
      await db.collection('users').doc(uid).update({
        trust_score: admin.firestore.FieldValue.increment(0.1)
      });

      res.json({
        success: true,
        ...poiRecord,
        timestamp: new Date().toISOString() // For client immediate use
      });
    } catch (error) {
      console.error("PoI generation error:", error);
      res.status(500).json({ error: "Failed to generate PoI" });
    }
  });

  // 3. Projects API (Real Firestore fetch)
  app.get("/api/projects", async (req, res) => {
    try {
      const snapshot = await db.collection('projects').limit(10).get();
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // --- VITE MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
