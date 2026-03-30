import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const verifyEvidence = async (evidence: string, context: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Analyze the following evidence for a global impact protocol.
      Evidence: ${evidence}
      Context: ${context}
      
      Provide a trust score (0-100) and a brief verification narrative.
      Format as JSON: { "score": number, "narrative": string, "confidence": number }
    `,
    config: {
      responseMimeType: "application/json"
    }
  });
  
  return JSON.parse(response.text || "{}");
};
