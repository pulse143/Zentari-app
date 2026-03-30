# KulimaVerse AI Verification Engine (AVE)

## 1. Engine Overview
The AI Verification Engine (AVE) is the trust backbone of KulimaVerse. It transforms raw, multi-modal evidence into cryptographically signed Proof of Impact (PoI) records with a granular trust score.

---

## 2. Multi-Step Verification Pipeline

### Stage 1: Cryptographic Ingestion (Pre-AI)
*   **Hash Verification**: Check if the file hash already exists in the `evidence` collection (Duplicate Detection).
*   **Device Fingerprinting**: Validate the `deviceId` and signature against the node's registered `K-ID`.
*   **Metadata Extraction**: Extract EXIF data, GPS coordinates, and timestamps.

### Stage 2: Contextual Validation (Heuristics)
*   **Geo-Fencing**: Compare GPS metadata against project boundary polygons.
*   **Temporal Check**: Ensure the timestamp is within the active milestone window and matches the server's `request.time`.
*   **Velocity Check**: Verify that the distance from the previous submission is physically possible within the elapsed time.

### Stage 3: Visual Forensic Audit (Gemini 3 Flash)
*   **Authenticity Check**: Detect AI-generated images, deepfakes, or screen-captures of other photos.
*   **Content Verification**: Confirm the image content (e.g., "mangrove saplings") matches the project category.
*   **Environmental Consistency**: Check if weather/lighting in the image matches historical weather data for that location/time.

### Stage 4: Consensus & Scoring
*   **Cross-Node Verification**: Optional peer-review by neighboring nodes.
*   **Final Scoring**: Aggregate all signals into a 0.0–1.0 `Verification Score`.

---

## 3. Gemini Integration & Prompt Structure

### Model Selection
*   **Gemini 3 Flash**: Used for high-speed, low-latency visual forensics and metadata cross-referencing.

### System Instruction
```text
You are a Senior Forensic Auditor for a global impact protocol. Your task is to analyze evidence for fraud, AI generation, or contextual inconsistencies.
```

### Prompt Structure
```json
{
  "task": "Verify the authenticity of this impact evidence.",
  "context": {
    "projectType": "Reforestation",
    "expectedContent": "Mangrove saplings in coastal environment",
    "reportedGps": "1.234, 103.456",
    "reportedTime": "2026-03-26T06:45:12Z"
  },
  "analysis_requirements": [
    "Check for signs of AI generation (warped textures, inconsistent lighting).",
    "Verify if the vegetation matches the reported region.",
    "Look for 're-photography' (taking a photo of a screen)."
  ],
  "response_format": "application/json"
}
```

---

## 4. Scoring Logic & Risk Flags

| Component | Weight | Logic |
|-----------|--------|-------|
| **Crypto Hash** | 20% | 0 if duplicate, else 1. |
| **Geo-Consistency** | 20% | 1 if within 500m of project site, else 0. |
| **Temporal Match** | 10% | 1 if within 1h of reported time, else 0. |
| **AI Visual Audit** | 50% | Gemini confidence score (0.0-1.0). |

### Risk Flags
*   `RED_FLAG_DUPLICATE`: Immediate rejection.
*   `YELLOW_FLAG_GEO_MISMATCH`: Requires manual auditor review.
*   `AMBER_FLAG_AI_UNCERTAIN`: Trigger fallback (Request 2nd evidence).

---

## 5. Handling Adversarial Attempts
*   **Adversarial Noise Detection**: Gemini is prompted to look for noise patterns used to confuse AI classifiers.
*   **Honey-Pot Nodes**: Deploying fake projects to identify and blacklist malicious node operators.
*   **Staking Slashing**: Node operators must stake tokens; fraud detection results in immediate slashing of the stake.

---

## 6. Example Output (JSON)
```json
{
  "verificationId": "V_99281",
  "score": 0.94,
  "status": "verified",
  "flags": [],
  "explanation": "High visual confidence in mangrove sapling identification. GPS and Timestamp are perfectly aligned with project boundaries. No signs of digital manipulation detected.",
  "confidence": 0.98
}
```
