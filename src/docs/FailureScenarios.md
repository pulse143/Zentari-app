# KulimaVerse Failure Scenarios & Edge Cases

Trust is not maintained by the absence of failure, but by the transparency and precision of the response when failure occurs.

---

## 1. Failed Verification (Incomplete Evidence)
*   **Scenario**: A node submits evidence (e.g., a photo of a newly planted tree) but the metadata is missing or the image quality is too low for the Forensic Agent to process.
*   **User Sees**: A "Verification Pending: Action Required" status pill.
*   **Microcopy**: `"Evidence Audit Incomplete: Metadata mismatch detected in GPS coordinates. Please resubmit high-resolution evidence with active location services."`
*   **System Action**: The PoI score for this specific event is set to `0.00`. The associated VU tranche remains locked in escrow.
*   **Recovery Path**: The user is prompted to re-upload the evidence. The system provides a "Metadata Checklist" to ensure the next submission passes.

## 2. Fraudulent Evidence (Malicious Intent)
*   **Scenario**: A node attempts to submit a recycled photo from a different project or uses a deepfake/AI-generated image to simulate impact.
*   **User Sees**: A high-contrast red "Node Flagged: Forensic Alert" banner.
*   **Microcopy**: `"Forensic Audit Alert: Image fingerprint matches existing record [ID_8821]. Node stake has been frozen pending manual review. Access to Treasury redemptions is suspended."`
*   **System Action**: The node's K-ID is added to the "High Risk" cluster. The Forensic Agent broadcasts a `fraud.detected` event to the network. The node's staked capital is moved to a "Slashing Escrow."
*   **Recovery Path**: The node owner must submit a "Forensic Appeal" which triggers a manual audit by three independent Validator Nodes.

## 3. Low Trust Score (Performance Decay)
*   **Scenario**: A node consistently submits late evidence or has minor discrepancies in its data, causing its Trust Score to drop below the protocol threshold (0.50).
*   **User Sees**: A "Trust Warning: Performance Threshold" indicator.
*   **Microcopy**: `"Trust Score: 0.42 (Below Threshold). Node is currently ineligible for new funding allocations. Improve evidence precision to restore status."`
*   **System Action**: The node is removed from the "Active Allocation" pool. Current funding tranches are paused but not voided.
*   **Recovery Path**: The node must complete three consecutive "Perfect Verifications" (PoI > 0.95) to restore its Trust Score to the "Active" range.

## 4. Funding Rejection (Treasury Constraint)
*   **Scenario**: A donor attempts to allocate capital to a project, but the Treasury's Reserve Ratio is currently below the 98% safety threshold.
*   **User Sees**: A "Treasury Hold: Rebalancing" notification.
*   **Microcopy**: `"Allocation Paused: Protocol Reserve Ratio is currently 97.8%. New VU issuance is suspended until treasury rebalancing is complete (Est. 4h)."`
*   **System Action**: The transaction is queued. No new VU is minted. The Treasury Agent triggers a liquidation of secondary assets to restore the 100% reserve.
*   **Recovery Path**: The user can opt-in to an "Auto-Allocate" queue which executes the transaction as soon as the Reserve Ratio returns to 100%.

## 5. System Errors (Infrastructure Failure)
*   **Scenario**: The Forensic Agent or the Ledger API is temporarily unresponsive due to high network load or maintenance.
*   **User Sees**: A "System Latency: Maintenance Mode" overlay.
*   **Microcopy**: `"Infrastructure Sync in Progress: The Forensic Audit engine is currently processing a high volume of records. Your submission is queued and secured. Real-time updates will resume shortly."`
*   **System Action**: All incoming evidence is buffered in a secure, encrypted queue. The system enters "Read-Only" mode for the ledger to prevent state inconsistencies.
*   **Recovery Path**: No user action required. The system automatically processes the queue once services are restored.

---

## How KulimaVerse Maintains Trust During Failure

1.  **Immutable Logging**: Every failure (and the reason for it) is logged on the ledger. We don't hide errors; we document them as part of the node's history.
2.  **Non-Blaming Precision**: We use technical language ("Metadata mismatch") rather than moral language ("You lied"). This keeps the focus on data integrity.
3.  **Deterministic Recovery**: Every failure has a clear, documented path to resolution. Users always know exactly what they need to do to restore their status.
4.  **Escrow Protection**: In case of doubt, funds are always held in escrow rather than being lost or released. The Treasury prioritizes capital safety over speed.
