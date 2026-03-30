# KulimaVerse Treasury & Funding Engine

The Treasury Engine is the financial heart of KulimaVerse, ensuring that every Value Unit (VU) in circulation is backed by real-world assets and released only upon verified impact.

## 1. Monetary Logic

### Voucher Issuance (VU)
*   **1:1 Backing**: Every 1 VU is backed by 1 USD (or equivalent stablecoin) held in the KulimaVerse Treasury.
*   **Minting**: VU is minted only when a donor's capital is successfully deposited and verified by the Treasury Agent.
*   **Burning**: VU is burned upon successful redemption by a merchant, at which point the backing capital is released.

### Reserve Ratio & Liquidity
*   **Target Reserve Ratio**: 100% (Full Reserve).
*   **Liquidity Buffer**: 5% of treasury assets are held in highly liquid stablecoins for immediate redemptions.
*   **Safety Trigger**: If the reserve ratio drops below 98%, new VU issuance is halted until the treasury is rebalanced.

---

## 2. Funding Flow (Donor to Impact)

1.  **Allocation**: Donor selects a project and allocates $X$ amount.
2.  **Escrow**: Capital is moved to the Treasury Escrow.
3.  **VU Minting**: $X$ VU are minted and locked in a Smart Contract.
4.  **Tranche Release**:
    *   **Tranche 1 (Setup)**: 20% released upon node registration and K-ID verification.
    *   **Tranche 2 (Mid-point)**: 40% released when PoI Score $\ge 0.75$.
    *   **Tranche 3 (Final)**: 40% released when PoI Score $\ge 0.90$ and final audit is complete.

---

## 3. Redemption Flow (Merchant to Payout)

1.  **Transaction**: Impact Node pays Merchant in VU for goods/services (e.g., seeds, tools).
2.  **Request**: Merchant submits a Redemption Request via the Merchant Portal.
3.  **Validation**:
    *   **Double-Spend Check**: Verify VU has not been previously redeemed.
    *   **Origin Check**: Verify VU was issued to a valid node and transferred to a valid merchant.
    *   **Fraud Check**: Cross-reference with PoI status of the originating node.
4.  **Payout**: Treasury Agent executes a fiat/stablecoin transfer to the merchant's bank/wallet.
5.  **Settlement**: VU is burned from the ledger.

---

## 4. Security & Fraud Prevention

*   **Double-Spending Protection**: Every VU has a unique cryptographic ID tracked on the immutable ledger.
*   **Audit Trail**: Every movement (Mint -> Transfer -> Redeem -> Burn) is logged with a timestamp and K-ID signature.
*   **Suspicious Activity Trigger**: Redemptions exceeding $10,000 or originating from "Flagged" nodes are routed for manual forensic audit.

---

## 5. Edge Cases

### Insufficient Reserves
*   **Scenario**: A sudden spike in redemptions exceeds the 5% liquidity buffer.
*   **Logic**: Redemptions are queued. The Treasury Agent automatically triggers a liquidation of secondary reserve assets (e.g., staked stablecoins) to fulfill the queue within 24 hours.

### Suspicious Redemption
*   **Scenario**: A merchant attempts to redeem VU from a node currently under fraud investigation.
*   **Logic**: The redemption is "Frozen." The merchant is notified, and the funds are held in escrow until the investigation concludes. If fraud is proven, the VU is voided.
