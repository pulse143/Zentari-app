# Zentari API Reference (v1)

Welcome to the Zentari API. Our API is designed to be programmable, predictable, and secure—enabling developers to build impact-first applications on top of our trust protocol.

## 1. Authentication
All API requests must include your secret API key in the `Authorization` header.

```bash
Authorization: Bearer zt_live_...
```

---

## 2. Identity API
Manage Z-IDs, node registration, and staking.

### `POST /v1/identity/nodes`
Register a new impact node.
*   **Request**: `{ "name": "Nairobi Reforestation", "location": { "lat": 1.29, "lng": 36.82 }, "stake": 5000 }`
*   **Response**: `{ "id": "node_921", "z_id": "did:zt:0x123...", "status": "active" }`

### `GET /v1/identity/nodes/:id`
Retrieve node details and current PAS score.

---

## 3. Verification API
Submit evidence and track forensic audit status.

### `POST /v1/v1/verification/evidence`
Submit multi-modal evidence for verification.
*   **Request**: `{ "node_id": "node_921", "media_url": "https://...", "metadata": { "gps": "...", "timestamp": "..." } }`
*   **Response**: `{ "id": "evid_442", "status": "processing", "estimated_completion": "30s" }`

### `GET /v1/verification/evidence/:id`
Retrieve detailed forensic audit results and risk flags.

---

## 4. PoI API
Retrieve and manage Proof of Impact records.

### `GET /v1/poi/:id`
Retrieve a settled PoI record.
*   **Response**: `{ "id": "poi_882", "score": 0.96, "tier": "platinum", "verified_at": "2026-03-26T07:00:00Z" }`

### `GET /v1/poi`
List PoI records with filtering by node, date, or score.

---

## 5. Funding API
Allocate capital and track settlements.

### `POST /v1/funding/allocations`
Allocate capital to a specific project or node.
*   **Request**: `{ "donor_id": "donor_11", "target_id": "node_921", "amount": 10000, "currency": "USDC" }`
*   **Response**: `{ "id": "alloc_001", "status": "pending_poi" }`

### `GET /v1/funding/settlements/:id`
Track the status of a fund release.

---

## 6. Analytics API
Protocol-wide metrics and impact trends.

### `GET /v1/analytics/protocol`
Retrieve global TVL, total PoI generated, and fraud prevention rate.

---

## 7. Webhooks
Receive real-time updates for protocol events. Configure your webhook URL in the Developer Dashboard.

| Event | Description |
| :--- | :--- |
| `poi.settled` | Triggered when a PoI reaches finality and funds are released. |
| `evidence.flagged` | Triggered when the AVE detects a high-risk anomaly. |
| `node.slashed` | Triggered when a node's stake is slashed due to fraud. |

---

## 8. Rate Limiting & Permissions
*   **Rate Limit**: 100 requests per second (Standard), 1000 requests per second (Enterprise).
*   **Permissions**: API keys are scoped to `read_only`, `write_impact`, or `admin`.
