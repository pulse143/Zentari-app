# The Zentari Trust Economy

In Zentari, **Trust is the ultimate asset.** It is a measurable, cryptographic metric that determines an actor's access to capital, influence, and protocol privileges.

---

## 1. Trust as a Metric (The Trust Score)

The **Trust Score (TS)** is a value between `0.00` and `1.00`, calculated by the Forensic Agent based on historical performance.

### How Trust is Earned
*   **Verified PoI**: Every successful Proof of Impact (PoI > 0.90) adds a deterministic increment to the TS.
*   **Staking Longevity**: Maintaining a stake in the protocol without flags increases the "Loyalty Multiplier."
*   **Peer Validation**: High-trust nodes can "vouch" for new nodes, sharing a portion of their trust equity.

### How Trust is Lost
*   **Metadata Mismatch**: Small drops for technical errors (e.g., wrong GPS).
*   **Forensic Flag**: Large drops for suspicious data patterns.
*   **Fraud Detection**: Immediate reset to `0.00` and slashing of staked capital.

---

## 2. The Trust-Capital Link

| Trust Score | Tier | Funding Access | Protocol Influence |
| :--- | :--- | :--- | :--- |
| **0.90 - 1.00** | **Institutional** | Unlimited; Instant Escrow Release | Governance Voting; Validator Status |
| **0.75 - 0.89** | **Verified** | High; 24h Audit Delay | Proposal Submission |
| **0.50 - 0.74** | **Emerging** | Capped; 72h Audit Delay | Community Discussion |
| **0.00 - 0.49** | **Restricted** | None; Funding Paused | Read-Only Access |

---

## 3. Penalties & Recovery

### Penalties
*   **Slashing**: Fraudulent nodes lose 100% of their staked capital to the Treasury.
*   **Quarantine**: Nodes with TS < 0.50 are moved to a "Restricted" state where all evidence is manually audited.
*   **Blacklisting**: Repeated fraud results in a permanent Z-ID ban.

### Recovery Mechanisms
*   **The Redemption Path**: Restricted nodes can regain trust by completing 5 "Perfect Verifications" (PoI > 0.98) with zero errors.
*   **Collateralized Trust**: Nodes can "buy back" into the system by posting 2x the standard stake, which is held for a 6-month probation period.

---

## 4. Trust Transferability & Sharing

### Can Trust be Transferred?
**No.** Trust is non-transferable (SBT - Soulbound Token logic). It is tied to the Z-ID and its historical performance.

### Can Trust be Borrowed or Shared?
**Yes.** High-trust "Anchor Nodes" can extend a **Trust Line** to new nodes.
*   The Anchor Node "stakes" their own Trust Score to vouch for the new node.
*   If the new node performs well, the Anchor earns a "Mentorship Bonus."
*   If the new node commits fraud, the Anchor's Trust Score is penalized.

---

## 5. Example Scenarios

### Scenario A: The High-Performer
An NGO in Zambia maintains a TS of 0.96 for 12 months. They unlock "Instant Liquidity," allowing them to withdraw impact capital the moment their photo is uploaded, as the system trusts their historical integrity.

### Scenario B: The Technical Error
A node submits evidence with a dead battery, causing a GPS drift. Their TS drops from 0.85 to 0.82. They are not penalized, but their next three submissions face a 48h audit delay to ensure the error was technical, not malicious.

### Scenario C: The Fraud Attempt
A node uses a Photoshop filter to simulate crop growth. The Forensic Agent detects the manipulation. TS is reset to 0.00. $5,000 in staked capital is slashed and distributed to the "Forensic Bounty" pool.
