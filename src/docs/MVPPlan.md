# Zentari: Absolute MVP Plan (30 Days)

The goal of the Zentari MVP is to prove one thing: **Can we trust that a specific impact event happened at a specific location using AI and a ledger?**

---

## 1. Core Features (The "Must-Haves")
*   **Mobile-First PoI Submission**: A simple interface for impact creators to upload a photo and capture GPS coordinates.
*   **Basic AI Verification Agent**: A single model that checks if the photo matches the GPS location (e.g., "Is this a farm?") and cross-references with public satellite data.
*   **The Impact Ledger**: A transparent list of verified PoIs and the funding tranches they triggered.
*   **Manual Tranche Release**: A simple "Admin" button to release funds once the AI gives a "Green" signal.
*   **Binary Trust Score**: A simple "Trusted" or "Pending" status for nodes.

---

## 2. What NOT to Build (The "Post-MVP")
*   **Forensic DAO**: No complex jury system. Use a single admin for now.
*   **Behavioral Psychology Layer**: No tiers, streaks, or complex nudges.
*   **Global Impact Markets**: No secondary trading of Impact Bonds.
*   **Advanced AI Retraining**: No recursive learning loops yet.
*   **Multi-Currency Support**: Use a single stablecoin or VU token.

---

## 3. 30-Day Build Sequence

### Week 1: The Foundation
*   Setup basic Express/Vite stack.
*   Implement simple Wallet/Auth.
*   Create the "Impact Ledger" schema.

### Week 2: The Capture
*   Build the mobile-responsive PoI submission form.
*   Integrate GPS and Camera APIs.
*   Store raw PoI data in a temporary "Verification Queue."

### Week 3: The Brain
*   Integrate a single Gemini model for image analysis.
*   Implement basic GPS-to-Satellite cross-referencing logic.
*   Automate the "Trust Signal" (Green/Red) based on AI confidence.

### Week 4: The Loop
*   Build the "Funding Dashboard" for donors.
*   Implement manual "Release Tranche" functionality.
*   Launch pilot with 1 partner and 10 impact creators.

---

## 4. Success Metrics for MVP
*   **Verification Speed**: < 5 minutes from submission to AI signal.
*   **Accuracy**: 90% correlation between AI signal and manual audit.
*   **User Friction**: < 3 clicks to submit a PoI.
