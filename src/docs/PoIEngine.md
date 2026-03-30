# KulimaVerse Proof of Impact (PoI) Engine

## 1. Mathematical Scoring Model
The PoI Score ($S$) is a weighted, normalized metric that represents the verified truth of an impact claim.

### The Core Formula
$$S = \left( V \cdot w_v + P \cdot w_p + E \cdot w_e \right) \cdot W \cdot B \cdot D(t)$$

| Variable | Name | Range | Weight ($w$) | Description |
| :--- | :--- | :--- | :--- | :--- |
| $V$ | Verification Score | $[0, 1]$ | $0.60$ | Output from the AI Verification Engine (AVE). |
| $P$ | PAS Score | $[0, 1]$ | $0.30$ | Protocol Adherence Score (Historical reliability). |
| $E$ | Engagement Score | $[0, 1]$ | $0.10$ | Quality of node interaction and community validation. |
| $W$ | Policy Weight | $[0.5, 1.5]$ | Multiplier | Global risk/priority multiplier (e.g., 1.2 for high-priority zones). |
| $B$ | Boosting Factor | $[1.0, 2.0]$ | Multiplier | Rare impact types or difficult-to-verify milestones. |
| $D(t)$ | Decay Factor | $[0, 1]$ | Multiplier | $e^{-\lambda t}$ where $\lambda$ is the decay constant for time-sensitive impact. |

---

## 2. Trust Tiers & Normalization
The final score $S$ is normalized to a $[0, 1]$ range before being mapped to a Trust Tier.

| Final Score ($S$) | Trust Tier | Funding Release | Description |
| :--- | :--- | :--- | :--- |
| $0.90 - 1.00$ | **Platinum** | 100% | Elite node, perfect verification, high historical trust. |
| $0.75 - 0.89$ | **Gold** | 90% | Highly trusted, minor variance in engagement. |
| $0.50 - 0.74$ | **Silver** | 70% | Standard verification, reliable but new node. |
| $0.30 - 0.49$ | **Bronze** | 40% | Weak evidence or low historical PAS. Requires manual audit. |
| $< 0.30$ | **Flagged** | 0% | High risk of fraud or catastrophic evidence failure. |

---

## 3. Anti-Gaming Mechanisms
*   **Sybil Resistance**: PoI scores are tied to K-ID (Cryptographic Identity) which requires a minimum stake.
*   **Outlier Detection**: If a node's $V$ score is significantly higher than its neighbors' for the same event, a "Peer Variance" penalty is applied.
*   **Collusion Detection**: Cross-referencing timestamps and GPS of multiple nodes to detect "Copy-Paste" evidence.

---

## 4. PoI Lifecycle
1.  **Submission**: Node operator uploads multi-modal evidence.
2.  **Verification (AVE)**: AI runs forensic, geo, and temporal checks ($V$).
3.  **Contextual Synthesis**: System retrieves historical PAS ($P$) and Engagement ($E$).
4.  **Scoring**: PoI Engine calculates $S$ using the weighted formula.
5.  **Settlement**: Treasury Agent releases funds based on the Trust Tier.
6.  **Archival**: PoI record is hashed and stored in the immutable ledger.

---

## 5. Update Rules
*   **Finality**: Once a PoI is "Settled," it cannot be changed unless **Fraud** is detected.
*   **Clawback**: If downstream audits (Satellite/Human) detect fraud, the PoI is revoked, the node's PAS is reset to 0, and stake is slashed.

---

## 6. Example Calculation
**Scenario**: A node operator in Kenya submits reforestation evidence.
*   $V = 0.95$ (High visual confidence)
*   $P = 0.80$ (Good history)
*   $E = 0.70$ (Average engagement)
*   $W = 1.10$ (High-priority reforestation zone)
*   $B = 1.00$ (No boost)
*   $D(t) = 1.00$ (Fresh evidence)

**Calculation**:
$S_{base} = (0.95 \cdot 0.6) + (0.80 \cdot 0.3) + (0.70 \cdot 0.1) = 0.57 + 0.24 + 0.07 = 0.88$
$S_{final} = 0.88 \cdot 1.10 \cdot 1.00 \cdot 1.00 = 0.968$

**Result**: **Platinum Tier** (100% Funding Release).
