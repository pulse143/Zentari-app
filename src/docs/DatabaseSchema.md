# KulimaVerse Hybrid Database Schema

## 1. Architecture Strategy
KulimaVerse uses a **Hybrid Database Architecture** to balance real-time performance with relational integrity.

*   **PostgreSQL (Relational Core):** Used for financial transactions, identity management, and structured project relationships where ACID compliance is critical.
*   **Firestore (Real-time Feed):** Used for high-frequency evidence streams, Proof of Impact (PoI) records, and AI agent logs where low-latency updates and horizontal scale are required.

---

## 2. PostgreSQL Schema (Structured Relationships)

### `users`
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID (PK) | Unique user identifier |
| `email` | VARCHAR(255) | Unique email address |
| `role` | ENUM | `admin`, `donor`, `node_operator`, `auditor` |
| `created_at` | TIMESTAMP | Account creation time |

### `k_id_profiles`
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID (PK) | Profile identifier |
| `user_id` | UUID (FK) | Reference to `users.id` |
| `public_key` | TEXT | Cryptographic public key |
| `did` | TEXT | Decentralized Identifier (DID) |
| `trust_score` | DECIMAL(5,2) | Aggregated trust score (0-100) |
| `verified_at` | TIMESTAMP | Last verification timestamp |

### `projects`
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID (PK) | Project identifier |
| `name` | VARCHAR(255) | Project name |
| `owner_id` | UUID (FK) | Reference to `users.id` |
| `category` | VARCHAR(50) | e.g., `reforestation`, `education` |
| `status` | ENUM | `active`, `paused`, `completed` |

### `transactions`
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID (PK) | Transaction identifier |
| `from_id` | UUID (FK) | Sender (User or Treasury) |
| `to_id` | UUID (FK) | Receiver (Project or User) |
| `amount` | DECIMAL(18,2) | Transaction amount |
| `type` | ENUM | `allocation`, `redemption`, `fee` |
| `status` | ENUM | `pending`, `completed`, `failed` |

---

## 3. Firestore Collections (Real-time & High-Volume)

### `evidence` (Collection)
*   **Path:** `/evidence/{evidenceId}`
*   **Fields:**
    *   `projectId`: string (FK to PG `projects.id`)
    *   `actorId`: string (FK to PG `users.id`)
    *   `type`: string (`image`, `video`, `sensor`)
    *   `storageUrl`: string (Firebase Storage path)
    *   `metadata`: map { `gps`: geopoint, `timestamp`: timestamp, `deviceId`: string }
    *   `hash`: string (SHA-256 of raw file)

### `poi_records` (Collection)
*   **Path:** `/poi_records/{poiId}`
*   **Fields:**
    *   `evidenceId`: string (FK to `evidence`)
    *   `projectId`: string
    *   `impactValue`: number (Calculated impact)
    *   `trustScore`: number (0-100)
    *   `aiAnalysis`: string (Gemini output summary)
    *   `status`: string (`pending`, `verified`, `flagged`)

### `agent_logs` (Collection)
*   **Path:** `/agent_logs/{logId}`
*   **Fields:**
    *   `agentId`: string (`sentinel_01`, `orchestrator`)
    *   `action`: string (e.g., `fraud_detected`)
    *   `context`: map (Dynamic metadata)
    *   `timestamp`: timestamp

---

## 4. Data Linking & Relationships

1.  **Evidence → PoI:** Each `poi_record` contains an `evidenceId`. The AI Orchestrator triggers a PoI creation immediately after evidence is hashed and stored.
2.  **Funding → PoI:** `funding_allocations` in PG are released to the `transactions` table only when `poi_records` in Firestore reach a `verified` status with a `trustScore > 90`.
3.  **Users → Everything:** `users.id` is the primary anchor, used as `owner_id` in projects, `actorId` in evidence, and `from_id`/`to_id` in transactions.

---

## 5. Security & Indexing

### Indexing Strategy
*   **PostgreSQL:** B-Tree indexes on `user_id`, `owner_id`, and `status` for fast lookups.
*   **Firestore:** Composite indexes on `projectId` + `status` + `timestamp` for the Live Impact Feed.

### Security Rules (Row-Level Logic)
*   **Evidence:** Only the `actorId` can write; only `auditors` and `project_owners` can read raw metadata.
*   **Transactions:** Read-only for involved parties; write-only for the `Treasury Engine` service account.
*   **PoI Records:** Publicly readable (transparency); write-only for the `Verification Engine`.
