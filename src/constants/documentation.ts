export const PRD_CONTENT = `
# Product Requirements Document: Zentari

## 1. Vision
Zentari is a global, category-defining Proof-of-Impact (PoI) protocol. It provides a universal verification layer for real-world activities, enabling anyone to prove their impact and access funding.

"If it happened, we verify it. If verified, it can be funded."

## 2. Core Principles
- **Universal Scope:** Supports Agriculture, Education, Health, Infrastructure, Climate, Social Programs, and Government Projects.
- **Forensic Verification:** Uses multi-modal AI (Gemini) and decentralized consensus to verify evidence.
- **Immutable Ledger:** All verified impact is committed to a public, transparent ledger.
- **Trust Economy:** Impact creators build a "Trust Score" over time, unlocking more capital.

## 3. Key Features
- **Multi-Modal Evidence:** Support for images, videos, and sensor data.
- **AI Forensic Auditor:** Real-time verification of authenticity, context, and risk.
- **Proof-of-Impact (PoI) Score:** A weighted metric combining verification, trust, and protocol policy.
- **Impact Markets:** Connecting verified impact creators with global capital providers.

## 4. Target Users
- **Impact Creators:** Individuals or organizations performing real-world activities.
- **Capital Providers:** NGOs, Governments, and Private Donors seeking verified impact.
- **Auditors:** Independent entities verifying high-stakes impact.
`;

export const USER_GUIDE_CONTENT = `
# User Guide: Zentari for Impact Creators

## 1. Getting Started
- Sign in using your Global Impact ID (Z-ID).
- Complete your profile to establish your baseline Trust Score.

## 2. Submitting Evidence
- Select your project category (e.g., Education, Health, Climate).
- Upload high-quality evidence (photos, videos, or data logs).
- Provide a brief description of the activity performed.
- Wait for the AI Forensic Auditor to verify your submission.

## 3. Understanding your PoI Score
Your Proof-of-Impact score is calculated as:
**PoI = (Verification × 0.4) + (Context × 0.3) + (Trust × 0.2) + (Policy × 0.1)**

## 4. Accessing Funding
- Verified PoI records are listed on the Global Impact Ledger.
- Capital providers can allocate funds directly to your verified records.
`;

export const TECHNICAL_GUIDE_CONTENT = `
# Technical Guide: Zentari Protocol

## 1. Architecture
- **Frontend:** React/Vite with Tailwind CSS for a high-density, forensic UI.
- **Backend:** Express server handling AI orchestration and trust logic.
- **AI Layer:** Google Gemini 3 Flash for multi-modal forensic analysis.
- **Data Layer:** Firestore for real-time state and immutable record tracking.

## 2. AI Verification Pipeline
1. **Ingestion:** Evidence is uploaded via the protocol API.
2. **Forensic Analysis:** Gemini analyzes visual authenticity and contextual match.
3. **Risk Scoring:** AI flags potential fraud or manipulation.
4. **Consensus:** Verification is cross-referenced with protocol rules.

## 3. PoI Generation Logic
\`\`\`typescript
PoI = (authenticity * 0.4) + (context * 0.3) + (userTrust * 0.2) + (protocolPolicy * 0.1)
\`\`\`

## 4. Integration
Developers can integrate with Zentari via the standard REST API or by deploying custom Impact Agents.
`;
