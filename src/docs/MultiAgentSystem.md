# KulimaVerse Multi-Agent System (MAS) Design

## 1. Agent Definitions

### A. Donor Agent (The Capital Allocator)
*   **Objective**: Maximize impact per dollar based on donor preferences (e.g., "Focus on reforestation in Brazil").
*   **Inputs**: Donor preferences, Project trust scores, Global impact trends.
*   **Tools**: `getProjectStats()`, `allocateCapital()`, `getTrustScore()`.
*   **Decision Logic**: If `trustScore > 90` and `category == donorPreference`, allocate `X%` of available funds.
*   **Output Actions**: `COMMIT_FUNDS`, `UPDATE_ALLOCATION_STRATEGY`.

### B. NGO Agent (The Impact Reporter)
*   **Objective**: Maintain high trust scores and secure funding by providing high-fidelity evidence.
*   **Inputs**: Project milestones, Raw evidence, Verification feedback.
*   **Tools**: `submitEvidence()`, `requestAudit()`, `getMilestoneStatus()`.
*   **Decision Logic**: If `milestoneReached` and `evidenceQuality > 0.8`, submit for verification.
*   **Output Actions**: `SUBMIT_CLAIM`, `REQUEST_RE_AUDIT`.

### C. Auditor Agent (The Truth Verifier)
*   **Objective**: Detect fraud and ensure evidence matches physical reality.
*   **Inputs**: Raw evidence (images/GPS), Satellite data, Historical node behavior.
*   **Tools**: `callGeminiVisualAudit()`, `getSatelliteContext()`, `flagAnomaly()`.
*   **Decision Logic**: If `imageHashMatchesHistorical` or `gpsVariance > 500m`, flag as `FRAUD`.
*   **Output Actions**: `VERIFY_CLAIM`, `FLAG_ANOMALY`, `REJECT_CLAIM`.

### D. Treasury Agent (The Financial Executor)
*   **Objective**: Ensure protocol solvency and execute cryptographic settlements.
*   **Inputs**: Verified claims, Funding triggers, K-ID signatures.
*   **Tools**: `executeSettlement()`, `getTreasuryBalance()`, `verifySignature()`.
*   **Decision Logic**: If `claimVerified` and `signatureValid` and `fundsAvailable`, release payment.
*   **Output Actions**: `EXECUTE_PAYMENT`, `UPDATE_LEDGER`.

### E. Policy Agent (The Governance Guardian)
*   **Objective**: Enforce protocol-wide rules and manage risk parameters.
*   **Inputs**: System-wide risk signals, Governance votes, Global anomaly rates.
*   **Tools**: `updateRiskThresholds()`, `pauseNode()`, `getGlobalRiskIndex()`.
*   **Decision Logic**: If `globalAnomalyRate > 5%`, increase `verificationThreshold` by 10%.
*   **Output Actions**: `UPDATE_PROTOCOL_PARAMS`, `SUSPEND_NODE`.

---

## 2. Orchestration & Communication

### Orchestration Layer (The "Blackboard" Pattern)
Agents do not call each other directly. Instead, they communicate via a **Central Event Bus (Blackboard)**.
1.  **Event Emitted**: e.g., `EVIDENCE_SUBMITTED`.
2.  **Agents React**: Auditor Agent picks up the event, processes it, and emits `CLAIM_VERIFIED`.
3.  **Downstream Reaction**: Treasury Agent picks up `CLAIM_VERIFIED` and executes payment.

### Conflict Resolution
*   **Priority-Based**: Policy Agent overrides all other agents if a protocol-wide risk is detected.
*   **Consensus-Based**: For high-value transactions, multiple Auditor Agents must reach consensus.

### Final Authority
*   **Human-in-the-Loop (HITL)**: Any decision flagged as "High Risk" or involving >$50k requires a human auditor's signature in the **Audit Dashboard**.

---

## 3. Scheduling & Decisions
*   **Real-time**: Evidence submission, Fraud detection, UI updates.
*   **Batch**: Trust score re-calculation, Global risk synthesis, Treasury rebalancing (every 4 hours).

---

## 4. Safeguards
*   **No Hallucinations**: Gemini outputs are strictly parsed against JSON schemas. If parsing fails, the decision is routed to a human.
*   **Audit Logging**: Every agent action is logged to the `agent_logs` Firestore collection with a full trace of inputs and model versions used.
*   **Human Override**: Admins can "Freeze" any agent or manually reverse a decision via the K-ID signature.

---

## 5. Example Scenario: "NGO Submits Weak Evidence"
1.  **NGO Agent** submits a claim with a low-resolution image and missing GPS metadata.
2.  **Auditor Agent** (Gemini) analyzes the image and detects `metadata_missing` and `low_visual_confidence`.
3.  **Auditor Agent** emits `CLAIM_FLAGGED` with a risk score of 75.
4.  **Policy Agent** sees the high risk and emits `NODE_WARNING`.
5.  **Donor Agent** automatically pauses funding to this specific node.
6.  **UI Sentinel** alerts the user: "Suspicious evidence detected at Node X. Funding paused pending human review."
