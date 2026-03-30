# Zentari Technical Architecture

## 1. System Overview (Diagram)

```text
[ Frontend: React/Vite + Mobile (Capacitor) ]
      |
      | (HTTPS / WSS)
      v
[ API Gateway: Express + Nginx Proxy ]
      |
      +-------------------------------------------------------+
      |                                                       |
[ Agent Orchestrator ] <-----> [ Google AI Studio (Gemini) ]  |
      |                                                       |
      +----------+----------+----------+----------+-----------+
                 |          |          |          |
[ Z-ID Service ] [ PoI Engine ] [ Verification ] [ Funding ] [ Treasury ]
      |          |          |          |          |           |
      +----------+----------+----------+----------+-----------+
                                |
                    [ Database: Firestore ]
                    [ Storage: Firebase Storage ]
```

---

## 2. Service Breakdown

### A. Identity Service (Z-ID)
*   **Responsibility**: Manage cryptographic identities for nodes, donors, and auditors.
*   **Inputs**: Public keys, Auth tokens, Biometric hashes.
*   **Outputs**: Z-ID JWT, DID Document.
*   **Dependencies**: Firebase Auth.

### B. Proof of Impact (PoI) Engine
*   **Responsibility**: Transform raw multi-modal evidence into structured impact claims.
*   **Inputs**: Images (Base64), GPS coordinates, Timestamp, Device ID.
*   **Outputs**: Impact Claim Object (JSON), Content Hash.
*   **Dependencies**: Z-ID Service, Storage Layer.

### C. Verification Engine (AI-Heavy)
*   **Responsibility**: Execute multi-stage verification using Gemini.
*   **Inputs**: Impact Claim, Historical Node Data, Satellite API Context.
*   **Outputs**: Trust Score (0-100), Verification Proof, Risk Signals.
*   **Dependencies**: Google AI Studio, PoI Engine.

### D. Funding Engine
*   **Responsibility**: Manage capital allocation logic and milestone-based releases.
*   **Inputs**: Verified Trust Score, Donor Allocation, Milestone Proofs.
*   **Outputs**: Allocation Schedule, Release Triggers.
*   **Dependencies**: Verification Engine, Treasury Engine.

### E. Treasury Engine
*   **Responsibility**: Final settlement and ledger management.
*   **Inputs**: Release Triggers, K-ID Signatures.
*   **Outputs**: Transaction Receipt, Updated Ledger State.
*   **Dependencies**: Z-ID Service, Firestore.

### F. Agent Orchestrator
*   **Responsibility**: The "System Brain". Routes tasks between engines and manages the AI Sentinel.
*   **Inputs**: System-wide events, User Intents (Natural Language).
*   **Outputs**: Orchestration commands, Real-time UI updates.
*   **Dependencies**: All Microservices.

---

## 3. AI Integration (Gemini)

### Stage 1: Visual Forensic Audit
*   **Model**: `gemini-3-flash-preview`
*   **Prompt**: "Analyze this image for signs of digital manipulation or 'evidence recycling'. Compare with historical hash [HASH_ID]. Return JSON with similarity score and anomaly flags."
*   **Data**: Current Evidence Image + Historical Reference.

### Stage 2: Contextual Verification
*   **Model**: `gemini-3.1-pro-preview`
*   **Prompt**: "Cross-reference these GPS coordinates [LAT, LNG] with the reported project 'Mangrove Restoration'. Does the visual evidence match the expected vegetation for this region? Identify any logical inconsistencies."
*   **Data**: GPS, Claim Text, Image Metadata.

### Stage 3: Risk Synthesis (Sentinel)
*   **Model**: `gemini-3-flash-preview`
*   **Prompt**: "Synthesize these 3 risk signals into a single trust score delta. Explain the reasoning for a non-technical auditor."
*   **Data**: Output from Stage 1 & 2.

---

## 4. Data Flow Sequences

### Sequence 1: Evidence to Funding
1.  **Node** uploads evidence via Mobile App -> **PoI Engine**.
2.  **PoI Engine** stores raw data in **Storage** and creates a **Claim** in **Firestore**.
3.  **Agent Orchestrator** triggers **Verification Engine**.
4.  **Verification Engine** calls **Gemini** for visual and contextual audit.
5.  **Gemini** returns **Trust Score** -> **Funding Engine**.
6.  **Funding Engine** calculates capital release based on score -> **Treasury**.

### Sequence 2: Funding to Treasury
1.  **Donor** allocates capital -> **Funding Engine**.
2.  **Funding Engine** locks capital in **Escrow** (Firestore State).
3.  **Milestone** is reached -> **Verification Engine** confirms.
4.  **Treasury Engine** executes settlement -> **Node Wallet**.

---

## 5. Scalability & Security

### Scalability
*   **Stateless Services**: All engines are stateless, allowing horizontal scaling via Cloud Run.
*   **Async Processing**: Verification is handled via Pub/Sub queues to prevent API timeouts during heavy AI processing.
*   **Edge Caching**: Global impact data cached at the edge for fast dashboard rendering.

### Security
*   **Zero-Trust Architecture**: Every service-to-service call requires a Z-ID signature.
*   **PII Isolation**: Sensitive user data is stored in a separate, locked-down Firestore collection (`users_private`).
*   **AI Guardrails**: System instructions for Gemini strictly enforce output schemas to prevent prompt injection.

---

## 6. API Structure (High-Level)

| Endpoint | Method | Service | Description |
|----------|--------|---------|-------------|
| `/api/v1/identity/register` | POST | Z-ID | Register new node/donor |
| `/api/v1/impact/submit` | POST | PoI | Submit evidence for verification |
| `/api/v1/audit/status/:id` | GET | Verification | Get real-time audit progress |
| `/api/v1/allocate` | POST | Funding | Commit capital to a node |
| `/api/v1/treasury/balance` | GET | Treasury | Get protocol ledger state |
| `/api/v1/ai/command` | POST | Orchestrator | Execute natural language command |
