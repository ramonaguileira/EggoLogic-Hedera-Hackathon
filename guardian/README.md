# Guardian — EWD-RB v0.3 Policy Reference

> Complete reference for the published Eggologic Guardian policy on MGS v1.5.1.

---

## Policy Overview

| Parameter | Value |
|---|---|
| **Policy Name** | EWD-RB v0.3 (Egg Waste Diversion — Regenerative Bioconversion) |
| **Policy ID** | `69bc4638e755119d0774dd03` |
| **Policy Tag** | `Tag_1773946388068` |
| **Topic ID** | `0.0.8291451` |
| **Instance Topic** | `0.0.8294148` |
| **Guardian** | MGS v1.5.1 (Managed Service at guardianservice.app) |
| **Status** | PUBLISH |
| **API Base** | `https://guardianservice.app/api/v1` |

### HCS Topics (Hedera Consensus Service)

| Topic | ID | Purpose |
|---|---|---|
| **Policy Topic** | [`0.0.8291451`](https://hashscan.io/testnet/topic/0.0.8291451) | All schemas, VCs, and policy messages published here |
| **Instance Topic** | [`0.0.8294148`](https://hashscan.io/testnet/topic/0.0.8294148) | Runtime policy instance data |
| **Sync Topic** | [`0.0.8294149`](https://hashscan.io/testnet/topic/0.0.8294149) | Guardian synchronization messages |

---

## Roles (5)

| Role | Email | Hedera ID | Responsibility |
|---|---|---|---|
| **OWNER** | r.aguileira88@gmail.com | 0.0.7166777 | Policy admin, submits Impact Calculation |
| **Registry** | eggologic-registry@outlook.com | 0.0.8292724 | Approves supplier registrations |
| **Project_Proponent** | eggologic-proponent@outlook.com | 0.0.8294621 | Registers suppliers, submits Waste Deliveries |
| **Operator** | eggologic-operator@outlook.com | 0.0.8294659 | Submits Production Output, Waste Batches |
| **VVB** | eggologic-vvb@outlook.com | 0.0.8294709 | Validates deliveries + impact calculations → triggers minting |

---

## Tokens (2)

| Token | Symbol | Type | HTS ID | Mint Trigger |
|---|---|---|---|---|
| **EGGOCOIN** | $EGGO | Fungible | `0.0.8287358` | VVB approves Waste Delivery → reads `field12` (kg_ajustados) |
| **CIN NFT** | CIN | Non-Fungible | `0.0.8287362` | VVB approves Impact Calculation → reads `field10` |

---

## Schemas (8)

All 8 schemas are **Published** on policy topic [`0.0.8291451`](https://hashscan.io/testnet/topic/0.0.8291451), version 1.0.0, type VC.

| # | Schema Name | Schema UUID | Submitted by | Triggers |
|---|---|---|---|---|
| 1 | **EWD-RB Supplier Registration** | `#85f16b9d-f3f8-4763-9522-8977957ccb6f&1.0.0` | Project_Proponent | Registry approval |
| 2 | **EWD-RB Waste Delivery** | `#8f0b83a5-da18-47ac-a849-e2f46d3ae9b6&1.0.0` | Project_Proponent | EGGOCOIN mint |
| 3 | **EWD-RB Waste Batch** | `#5414b8bf-f06c-4129-bdf1-033f76090714&1.0.0` | Operator | — |
| 4 | **EWD-RB Production Output** | `#379210b0-4291-4b40-abb6-45c3d221ba03&1.0.0` | Operator | — |
| 5 | **EWD-RB Impact Calculation** | `#35dd5b7f-5f1c-46f0-809e-26a0e3fd6198&1.0.0` | OWNER | CIN NFT mint |
| 6 | **EWD-RB VVB Assessment Record** | `#9a08c91d-9414-4d94-8d0b-cf0e20905777&1.0.0` | VVB | — |
| 7 | **EWD-RB External Validation Record** | `#912044fe-8201-4227-bc4a-5c001aa59a6c&1.0.0` | VVB | — |
| 8 | **EWD-RB Issuance Record** | `#70fca042-7578-4607-92d3-171a903bfb88&1.0.0` | Auto-generated | — |

All calculations (kg_netos, kg_ajustados, category) are performed **client-side** by the dashboard and submitted as pre-computed values.

### Schema 1: Supplier Registration
**Submitted by:** Project_Proponent | **Approved by:** Registry

Registers restaurants and waste sources into the system.

### Schema 2: Waste Delivery
**Submitted by:** Project_Proponent | **Approved by:** VVB | **Triggers:** EGGOCOIN mint

The core MRV schema. Dashboard submits field0–field17:

```
field0:  delivery_id          (e.g., "ENT-005")
field1:  supplier_id          (e.g., "SUP-001")
field2:  supplier_name        (e.g., "Restaurante La Esquina")
field3:  fecha                (ISO date)
field4:  kg_brutos            (gross weight)
field5:  kg_impropios         (contaminant weight)
field6:  pct_impropios        (contamination %, calculated client-side)
field7:  category             ("A" ≤5%, "B" 5-10%, "C" >10% = rejected)
field8:  tipo_residuo         ("organico", "poda", "mixto", etc.)
field9:  destino              ("BSF", "compost", "mixto")
field10: kg_netos             (= kg_brutos - kg_impropios)
field11: factor_conservador   (always 0.70)
field12: kg_ajustados         (= kg_netos × 0.70) ← EGGOCOIN MINT AMOUNT
field13: operador             (operator name)
field14: observaciones        (notes)
field15: foto_url             (evidence photo URL)
field16: gps_lat              (GPS latitude)
field17: gps_lng              (GPS longitude)
```

**Mint logic:** VVB approves → Guardian reads `field12` → mints `round(field12)` EGGOCOIN to Project_Proponent's account.

**Category system:**
- **Cat A** (≤5% contamination): Full reward
- **Cat B** (5–10%): Full reward but flagged
- **Cat C** (>10%): Rejected by VVB — no mint

### Schema 3: Waste Batch
**Submitted by:** Operator

Groups approved deliveries into BSF or compost processing lots.

### Schema 4: Production Output
**Submitted by:** Operator

Daily production records: eggs, larvae harvest, compost output.

### Schema 5: Impact Calculation
**Submitted by:** OWNER | **Approved by:** VVB | **Triggers:** CIN NFT mint

Aggregates verified deliveries for carbon credit issuance:

```
field10: kg_ajustados_total   ← CIN MINT AMOUNT = floor(field10 / 1000)
```

**Mint logic:** When `kg_ajustados_total ≥ 1000`, VVB approves → Guardian mints `floor(total/1000)` CIN NFTs. Each CIN = 1 tCO₂e avoided.

### Schema 6: VVB Assessment Record
**Submitted by:** VVB

Internal assessment of delivery data quality and verification notes. Defined within policy blocks (not a separate importable schema file).

### Schema 7: External Validation Record
**Submitted by:** VVB

Cross-references delivery VCs, verifies accumulation math, confirms category decisions. Defined within policy blocks.

### Schema 8: Issuance Record
**Auto-generated by Guardian**

Records EGGOCOIN mint details per approved delivery.

---

## Block IDs (Published Policy)

These are the Guardian block UUIDs used by the dashboard:

```javascript
BLOCKS: {
  PP_DELIVERY_FORM:    'b322eaa1-7611-4704-be60-b033db83dadb',  // Project_Proponent → Waste Delivery form
  VVB_DELIVERY:        '3a5afd50-d4a5-49ca-866b-75477790ae4c',  // VVB → Waste Delivery approval grid
  VVB_IMPACT_CALC:     'a77f0551-9cce-41c9-889d-c7b1110c059e',  // VVB → Impact Calculation approval
  REGISTRY_SUPPLIER:   'd6b1e092-59c1-48af-8671-1a5dfdeaaddb',  // Registry → Supplier approval
  TOKEN_HISTORY:       'cd9ed4c2-ff79-474c-bd7c-6a9c525c6035',  // Token mint history
}
```

**API pattern:**
```
GET  /policies/{policyId}/blocks/{blockId}       → Read block data
POST /policies/{policyId}/blocks/{blockId}       → Submit form / approve
```

---

## Workflow

### Waste Delivery → EGGOCOIN

```
1. Project_Proponent fills delivery form in dashboard
   → Dashboard calculates: kg_netos, pct_impropios, category, kg_ajustados
   → POST to PP_DELIVERY_FORM block

2. Guardian creates Verifiable Credential
   → Status: "Waiting for approval"
   → VC stored on HCS (policy topic 0.0.8291451)

3. VVB logs into Guardian UI
   → Reviews delivery at VVB_DELIVERY block
   → Checks: weight plausible? Category correct? Photo evidence?
   → Approves (Button_0)

4. Guardian mints EGGOCOIN
   → Amount: round(field12) = round(kg_ajustados)
   → To: Project_Proponent account (0.0.8294621)
   → Visible on HashScan: hashscan.io/testnet/token/0.0.8287358
```

### Impact Calculation → CIN NFT

```
1. Deliveries accumulate over weeks
   → Each approved delivery adds kg_ajustados to running total

2. When total ≥ 1,000 kg, OWNER submits Impact Calculation
   → Aggregates all verified deliveries
   → field10 = total kg_ajustados

3. VVB reviews Impact Calculation
   → Cross-references individual delivery VCs
   → Verifies accumulation math
   → Approves

4. Guardian mints CIN NFT
   → Amount: floor(field10 / 1000)
   → 1 CIN = 1 tCO₂e avoided (CDM AMS-III.F methodology)
   → Visible on HashScan: hashscan.io/testnet/token/0.0.8287362
```

---

## Carbon Methodology

**CDM AMS-III.F adapted** — Avoidance of methane emissions through composting.

```
CO₂e_avoided = Σ(kg_ajustados)

where:
  kg_ajustados = (kg_brutos - kg_impropios) × 0.70
  0.70 = conservative factor covering moisture, DOC variability, MCF correction
  1,000 kg_ajustados = 1 tCO₂e = 1 CIN NFT
```

See `docs/carbon-methodology.md` for full methodology documentation.

---

## API Authentication

```
POST /accounts/login
Body: { "username": "<email>", "password": "<password>" }
Response: { "accessToken": "eyJ...", "refreshToken": "..." }

Header for all subsequent calls:
  Authorization: Bearer <accessToken>

Token expires in ~30 min. Dashboard re-authenticates 2 min before expiry.
```

---

## Verification (On-Chain)

| What to verify | How |
|---|---|
| EGGOCOIN supply & holders | `GET /api/v1/tokens/0.0.8287358` on Mirror Node |
| CIN NFT supply & serials | `GET /api/v1/tokens/0.0.8287362/nfts` on Mirror Node |
| Specific account balance | `GET /api/v1/accounts/{id}/tokens` on Mirror Node |
| Mint transactions | `GET /api/v1/transactions?transactiontype=TOKENMINT&account.id=0.0.8287358` |
| Policy messages | `GET /api/v1/topics/0.0.8291451/messages` on Mirror Node |
| Any transaction | HashScan: `hashscan.io/testnet/transaction/{txId}` |

All verification is **free** — Hedera Mirror Node is a public API with no authentication required.

---

## Complete Hedera Testnet Asset Inventory

```
TOKENS (HTS)
  EGGOCOIN (Fungible)     0.0.8287358    hashscan.io/testnet/token/0.0.8287358
  CIN NFT (Non-Fungible)  0.0.8287362    hashscan.io/testnet/token/0.0.8287362

TOPICS (HCS)
  Policy Topic            0.0.8291451    hashscan.io/testnet/topic/0.0.8291451
  Instance Topic          0.0.8294148    hashscan.io/testnet/topic/0.0.8294148
  Sync Topic              0.0.8294149    hashscan.io/testnet/topic/0.0.8294149

ACCOUNTS
  OWNER                   0.0.7166777    hashscan.io/testnet/account/0.0.7166777
  Registry                0.0.8292724    hashscan.io/testnet/account/0.0.8292724
  Project_Proponent       0.0.8294621    hashscan.io/testnet/account/0.0.8294621
  Operator                0.0.8294659    hashscan.io/testnet/account/0.0.8294659
  VVB                     0.0.8294709    hashscan.io/testnet/account/0.0.8294709

SCHEMAS (all on topic 0.0.8291451, version 1.0.0)
  Supplier Registration   #85f16b9d-f3f8-4763-9522-8977957ccb6f&1.0.0
  Waste Delivery          #8f0b83a5-da18-47ac-a849-e2f46d3ae9b6&1.0.0
  Waste Batch             #5414b8bf-f06c-4129-bdf1-033f76090714&1.0.0
  Production Output       #379210b0-4291-4b40-abb6-45c3d221ba03&1.0.0
  Impact Calculation      #35dd5b7f-5f1c-46f0-809e-26a0e3fd6198&1.0.0
  VVB Assessment Record   #9a08c91d-9414-4d94-8d0b-cf0e20905777&1.0.0
  External Validation     #912044fe-8201-4227-bc4a-5c001aa59a6c&1.0.0
  Issuance Record         #70fca042-7578-4607-92d3-171a903bfb88&1.0.0
```
