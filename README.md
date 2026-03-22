<p align="center">
  <img src="docs/images/eggologic-banner.png" alt="Eggologic" width="600"/>
</p>

<h1 align="center">Eggologic — Circular Economy Verified on Hedera</h1>

<p align="center">
  <strong>Restaurant Organic Waste → BSF Larvae → Eggs → Compost → Verified Carbon Impact</strong>
</p>

<p align="center">
  <a href="#track">Hedera Apex Hackathon 2026 — Sustainability Track</a> ·
  <a href="#demo">Demo</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#quickstart">Quick Start</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hedera-Testnet-blueviolet" alt="Hedera Testnet"/>
  <img src="https://img.shields.io/badge/Guardian-MGS%20v1.5.1-green" alt="Guardian MGS"/>
  <img src="https://img.shields.io/badge/Policy-EWD--RB%20v0.3-blue" alt="EWD-RB"/>
  <img src="https://img.shields.io/badge/HTS-EGGOCOIN%20%2B%20CIN-orange" alt="HTS Tokens"/>
  <img src="https://img.shields.io/badge/Location-Uruguay%20🇺🇾-blue" alt="Uruguay"/>
</p>

---

## The Problem

Every year, **1.3 billion tonnes** of food are wasted globally. In Latin America, most organic waste from restaurants ends up in landfills, producing methane — a greenhouse gas **80× more potent** than CO₂ over 20 years. No transparent, auditable system exists to verify that organic waste was actually diverted from landfills and converted into productive outputs.

## The Solution

**Eggologic** is a running circular economy hub in El Tesoro, Maldonado, Uruguay that transforms restaurant organic waste into Black Soldier Fly (BSF) larvae protein, which feeds laying hens that produce eggs, while the remaining organic matter becomes compost.

We built a blockchain verification layer on **Hedera** using **Guardian (MGS)** that:

1. **Tracks every delivery** — each kilogram of organic waste is recorded as a Verifiable Credential through the EWD-RB methodology policy
2. **Rewards suppliers** with **EGGOCOIN** ($EGGO) — fungible HTS tokens minted automatically when a VVB approves a waste delivery
3. **Issues Circular Impact NFTs** (CIN) — 1 NFT = 1 tCO₂e avoided — minted when VVB approves an impact calculation that crosses the methodology threshold
4. **Full traceability** — every credential, approval, and mint is verifiable on-chain through Guardian's Trust Chain and Hedera Mirror Node

This is **not a simulation**. Every data point maps to a physical operation happening today.

---

<a id="track"></a>

## Hackathon Track & Bounty

| | Details |
|---|---|
| **Main Track** | Sustainability — Guardian-powered MRV for climate and circular economy |
| **Bounty** | Hiero — Native use of HTS + HCS via Guardian MGS |
| **Hackathon** | Hedera Hello Future: Apex 2026 |

### Why This Qualifies

- **Real operation** running in El Tesoro, Maldonado, Uruguay — 300-600 kg/week processed
- **Digitized methodology** (EWD-RB) published as a Guardian policy with 8 schemas
- **Two-token model**: EGGOCOIN (supplier incentive) + CIN (environmental impact NFT)
- **VVB manual validation** — not automated, maintaining credibility and auditability
- **70% conservative factor** on carbon calculations — deliberately under-counting
- **Zero middleware** — dashboard connects directly to Guardian API + Hedera Mirror Node

---

<a id="demo"></a>

## Demo

> **[Watch the Demo Video](https://youtu.be/PLACEHOLDER)**

The demo shows the complete pipeline:

1. **Login** — Role-based access (Owner, Registry, Project Proponent, Operator, VVB)
2. **Submit Waste Delivery** — Project Proponent fills the form → VC created in Guardian
3. **VVB Reviews** — VVB sees pending delivery → approves → **EGGOCOIN auto-minted** via policy
4. **Impact Dashboard** — Real-time CO₂ avoidance metrics from Guardian + Mirror Node
5. **Wallet** — User sees $EGGO balance, transaction history, CIN NFTs — all from Hedera
6. **Marketplace** — Redeem EGGOCOIN for composting equipment, restaurant deals, regenerative products

---

<a id="architecture"></a>

## Architecture

```
  Suppliers / Restaurants          VVB (Validator)            Public Viewers
         │                              │                          │
         │ (deliver waste)              │ (review + approve)       │
         │                              │                          │
    ┌────▼──────────────────────────────▼──────────────────────────▼────┐
    │                    Dashboard (GitHub Pages)                       │
    │              Vanilla HTML/JS + Tailwind CSS                      │
    │                                                                  │
    │   index.html        impact.html      wallet.html   marketplace   │
    │   ├─ Hero metrics   ├─ CO₂ chart     ├─ Balance    ├─ Redeem     │
    │   ├─ Delivery form  ├─ Score %       ├─ Tx history │  catalog    │
    │   └─ Activity feed  └─ Milestones    └─ CIN NFTs   └─ Stats     │
    └────┬────────────────────────┬────────────────────────────────────┘
         │                        │
    Guardian API              Hedera Mirror Node
    (MGS v1.5.1)              (Public REST API)
         │                        │
    ┌────▼────────────────────────▼────┐
    │        Hedera Testnet            │
    │                                  │
    │  ┌──────────────────────────┐    │
    │  │ Policy: EWD-RB v0.3     │    │
    │  │ Topic:  0.0.8291451     │    │
    │  │                         │    │
    │  │ 8 Schemas (VCs)         │    │
    │  │ 5 Roles + OWNER        │    │
    │  │ VVB manual approval     │    │
    │  │                         │    │
    │  │ EGGOCOIN  0.0.8287358   │    │
    │  │ CIN NFT   0.0.8287362   │    │
    │  └──────────────────────────┘    │
    └──────────────────────────────────┘
```

### Key Design Decision: No Middleware

The dashboard connects **directly** to two public APIs:

| Layer | API | Auth | Purpose |
|---|---|---|---|
| **Guardian MGS** | `guardianservice.app/api/v1` | JWT (email/password) | Login, submit VCs, read block data |
| **Hedera Mirror Node** | `testnet.mirrornode.hedera.com` | None (public) | Balances, transactions, NFTs, token info |

Guardian's policy engine handles **all business logic**: VC creation, approval workflows, token minting, and trust chain. The dashboard is a pure presentation layer with one write operation (submit delivery form).

---

## Guardian Policy: EWD-RB v0.3

### Policy Details

| Property | Value |
|---|---|
| **Name** | EWD-RB v0.3 _1773803376991_1773946424790 |
| **Version** | 0.3.0 |
| **Status** | Published |
| **Policy ID** | `0.0.8291451` |
| **Policy Hash** | `69bc4638e755119d0774dd03` |
| **Tag** | `Tag_1773946388068` |
| **Instance Topic** | `0.0.8294148` |
| **Guardian Version** | 1.5.1 (MGS) |
| **Creator DID** | `did:hedera:testnet:Gt2DaoWQqV1NA5P6X4EqoTh9PcrZCv5qAUytYnCGrUJy_0.0.8187554` |

### Roles

| Role | Who | Responsibilities |
|---|---|---|
| **OWNER** | Eggologic | Submit Impact Calculations, system admin |
| **Registry** | Eggologic Admin | Approve/reject supplier registrations |
| **Project_Proponent** | Restaurant/Supplier | Submit waste deliveries |
| **Operator** | Processing facility | Record Waste Batches, Production Output |
| **VVB** | Third-party validator | Approve deliveries (→ mint $EGGO), approve impact (→ mint CIN) |

### Schemas (8 total)

| # | Schema | Submitted By | Approval | Triggers |
|---|---|---|---|---|
| 1 | **Supplier Registration** | Project_Proponent | Registry approves | — |
| 2 | **Waste Delivery** | Project_Proponent | **VVB approves** | **Mint EGGOCOIN** (field12 = kg_ajustados) |
| 3 | **Waste Batch** | Operator | Auto (no approval) | — |
| 4 | **Production Output** | Operator | Auto (no approval) | — |
| 5 | **Impact Calculation** | OWNER | **VVB approves** | **Mint CIN NFT** (field10) |
| 6 | **VVB Assessment Record** | VVB | — | — |
| 7 | **External Validation Record** | VVB | — | — |
| 8 | **Issuance Record** | System | — | — |

### Data Flow (End-to-End)

```
Restaurant delivers waste
        │
        ▼
Project_Proponent submits Waste Delivery form
        │
        ▼ (VC created, status: "Waiting for approval")
        │
VVB reviews delivery ──► Rejects (VC stays pending)
        │
        ▼ Approves
        │
Guardian mints EGGOCOIN to Project_Proponent
        │
        ▼ (accumulates over time)
        │
OWNER submits Impact Calculation
        │
        ▼ (VC created, status: "Waiting for approval")
        │
VVB reviews impact ──► Rejects
        │
        ▼ Approves
        │
Guardian mints CIN NFT (1 NFT = 1 tCO₂e avoided)
        │
        ▼
Trust Chain links: Delivery VCs → Batch VCs → Production VCs → Impact VC → CIN NFT
```

---

## Token Economics

### EGGOCOIN ($EGGO) — `0.0.8287358`

Fungible HTS token. Minted by Guardian when VVB approves a Waste Delivery.

```
Mint amount = field12 = kg_ajustados

where:
  kg_netos     = kg_brutos - kg_impropios
  kg_ajustados = kg_netos × 0.70          (conservative moisture/DOC factor)

Category thresholds (contamination ratio = kg_impropios / kg_brutos):
  Cat A: ≤5%    → eligible
  Cat B: 5-10%  → eligible
  Cat C: >10%   → rejected (not submitted)
```

**Purpose**: Incentivize restaurants to deliver clean, separated organic waste. Redeemable in the marketplace for composting equipment, partner restaurant deals, and regenerative products.

### Circular Impact NFT (CIN) — `0.0.8287362`

Non-fungible HTS token. Minted by Guardian when VVB approves an Impact Calculation.

```
1 CIN = 1 tCO₂e avoided

Carbon calculation (CDM AMS-III.F methodology):
  CO₂_avoided = Σ(kg_ajustados) × 0.70 × emission_factor
  When accumulated total crosses 1,000 kg threshold → eligible for 1 CIN
```

**Purpose**: Auditable, on-chain carbon credits. Each CIN links back to specific Waste Delivery VCs through Guardian's Trust Chain — full provenance from restaurant to carbon credit.

### Token Verification

| Token | HashScan Link |
|---|---|
| EGGOCOIN | [hashscan.io/testnet/token/0.0.8287358](https://hashscan.io/testnet/token/0.0.8287358) |
| CIN NFT | [hashscan.io/testnet/token/0.0.8287362](https://hashscan.io/testnet/token/0.0.8287362) |

---

## Dashboard

Live at: **[c4p5.github.io/EggoLogic-Hedera-Hackathon](https://c4p5.github.io/EggoLogic-Hedera-Hackathon/)**

4 screens, vanilla HTML/JS, Tailwind CSS. No framework, no build step.

| Screen | File | Public Data | Login Required |
|---|---|---|---|
| **Dashboard** | `index.html` | Hero metrics (waste, CO₂, eggs) | Balance, transactions, delivery form |
| **Impact Report** | `impact.html` | Aggregate score, CO₂ chart, milestones | — |
| **Wallet** | `wallet.html` | Total supply, all holders, CIN mint log | Personal balance, tx history, user CIN |
| **Marketplace** | `marketplace.html` | Redeem catalog, H₂O stats | — |

### Data Sources

```
dashboard.js  →  GuardianAPI.getBlockData()    →  Guardian MGS (VCs, delivery docs)
              →  HederaMirror.getEggocoinBalance()  →  Mirror Node (balances)
              →  HederaMirror.getTransactions()      →  Mirror Node (tx history)

impact.js     →  GuardianAPI.getBlockData()    →  Guardian MGS (aggregate score)
              →  HederaMirror.getEggocoinSupply()   →  Mirror Node (total minted)

wallet.js     →  HederaMirror.getAllBalances()       →  Mirror Node (all holders)
              →  HederaMirror.getAllCITNfts()         →  Mirror Node (CIN NFTs)
              →  HederaMirror.getTransactions()      →  Mirror Node (user txs)

marketplace.js → HederaMirror.getEggocoinSupply()   →  Mirror Node (H₂O calc)
```

### Offline Mode

If Guardian API is unreachable (CORS, downtime), the dashboard falls back to:
1. `data/guardian-cache.json` — pre-fetched VC data
2. Hardcoded fallback values for hero metrics
3. Hedera Mirror Node **always works** (public, no CORS)

### Guardian Block IDs (Published Policy)

```javascript
BLOCKS: {
  VVB_DELIVERY:      '3a5afd50-d4a5-49ca-866b-75477790ae4c',
  VVB_IMPACT_CALC:   'a77f0551-9cce-41c9-889d-c7b1110c059e',
  TOKEN_HISTORY:     'cd9ed4c2-ff79-474c-bd7c-6a9c525c6035',
  REGISTRY_SUPPLIER: 'd6b1e092-59c1-48af-8671-1a5dfdeaaddb',
  PP_DELIVERY_FORM:  'b322eaa1-7611-4704-be60-b033db83dadb',
}
```

---

## Hedera Services Used

| Service | Purpose | ID |
|---|---|---|
| **HTS** (Fungible) | Supplier incentive rewards | `EGGOCOIN` — 0.0.8287358 |
| **HTS** (NFT) | Verified carbon credits | `CIN` — 0.0.8287362 |
| **HCS** | Policy messaging + trust chain | Topic 0.0.8291451 (policy), 0.0.8294148 (instance) |
| **Guardian MGS** | MRV policy engine, VC issuance, token minting | Policy hash `69bc4638e755119d0774dd03` |
| **Mirror Node** | Public data queries (balances, txs, NFTs) | `testnet.mirrornode.hedera.com` |

---

## Registered Accounts (Testnet)

| Role | Email | Hedera Account |
|---|---|---|
| OWNER | r.aguileira88@gmail.com | `0.0.7166777` |
| Registry | eggologic-registry@outlook.com | `0.0.8292724` |
| Project_Proponent | eggologic-proponent@outlook.com | `0.0.8294621` |
| Operator | eggologic-operator@outlook.com | `0.0.8294659` |
| VVB | eggologic-vvb@outlook.com | `0.0.8294709` |

---

<a id="quickstart"></a>

## Quick Start

### Prerequisites

- A modern browser (Chrome, Firefox, Edge)
- That's it. No Node.js, no Docker, no build step.

### 1. Clone

```bash
git clone https://github.com/c4p5/EggoLogic-Hedera-Hackathon.git
cd EggoLogic-Hedera-Hackathon
```

### 2. Open Dashboard

```bash
# Option A: Open directly
open dashboard/index.html

# Option B: Local server (for Guardian API calls)
npx serve dashboard
```

### 3. Login

Select any role from the login dropdown. Use the registered email + password for that account. The dashboard authenticates directly against Guardian MGS.

### 4. Submit a Delivery (as Project_Proponent)

1. Login as Project_Proponent
2. Fill: kg bruto, kg impropios, waste type
3. Live preview shows: kg netos, kg ajustados, estimated $EGGO
4. Submit → VC created in Guardian → waits for VVB approval

### 5. Approve (as VVB)

1. Login as VVB in Guardian UI (`guardianservice.app`)
2. Review pending Waste Delivery
3. Approve → EGGOCOIN minted automatically to Project_Proponent

### 6. Verify on HashScan

- [EGGOCOIN Token](https://hashscan.io/testnet/token/0.0.8287358)
- [CIN NFT Collection](https://hashscan.io/testnet/token/0.0.8287362)
- [Policy Topic](https://hashscan.io/testnet/topic/0.0.8291451)

---

## Project Structure

```
EggoLogic-Hedera-Hackathon/
├── dashboard/                 # Frontend (GitHub Pages)
│   ├── index.html             # Main dashboard + delivery form
│   ├── impact.html            # Environmental impact report
│   ├── wallet.html            # Token wallet + CIN NFTs
│   ├── marketplace.html       # Redeem $EGGO for products
│   ├── css/custom.css         # Tailwind extensions
│   ├── data/guardian-cache.json  # Offline fallback data
│   └── js/
│       ├── config.js          # Policy IDs, token IDs, block IDs, accounts
│       ├── api.js             # Guardian API wrapper (auth, GET, POST)
│       ├── hedera.js          # Mirror Node queries (balances, txs, NFTs)
│       ├── ui.js              # UI utilities (loading, toast, formatters)
│       ├── dashboard.js       # index.html data binding + delivery form
│       ├── impact.js          # impact.html data binding + charts
│       ├── wallet.js          # wallet.html data binding + tx history
│       └── marketplace.js     # marketplace.html stats
├── guardian/                  # Guardian policy documentation
│   ├── schemas/               # JSON schema files (legacy format)
│   └── policies/              # Policy export notes
├── docs/                      # Architecture, methodology, tokenomics
│   ├── architecture.md
│   ├── blueprint-en.md
│   ├── blueprint-es.md
│   ├── carbon-methodology.md
│   └── token-economics.md
├── pitch/                     # Hackathon presentation materials
│   ├── pitch-script.md
│   └── demo-recording-notes.md
├── BLUEPRINTS/                # Technical design docs
│   ├── AUTH_FLOW.md
│   ├── DASHBOARD_WIZARDING_THINGY_THING.md
│   └── KMS_INTERFACE_CONNECTION.md
├── _archive/                  # Deprecated middleware (no longer used)
└── .github/workflows/         # GitHub Pages deployment
```

---

## Real-World Impact

Eggologic currently operates in **El Tesoro, Maldonado, Uruguay**, processing **300-600 kg of organic waste per week** from local restaurants.

| Output | Weekly Volume | Verification |
|---|---|---|
| BSF larvae protein | ~210-420 kg | Waste Batch VC |
| Eggs produced | 35-45 units | Production Output VC |
| Compost | ~70 kg | Production Output VC |
| CO₂ avoided | ~210-420 kg CO₂e | Impact Calculation VC → CIN NFT |

Every output is linked back to specific waste deliveries through Guardian's Trust Chain — from restaurant doorstep to carbon credit.

---

## Carbon Methodology: EWD-RB

**EWD-RB** (Egg Waste Diversion — Regenerative Bioconversion) is a custom methodology inspired by **CDM AMS-III.F** (Avoidance of methane emissions through composting).

| Parameter | Value | Source |
|---|---|---|
| Conservative factor | 0.70 (70%) | Moisture content, DOC variability, local correction |
| Threshold for CIN | 1,000 kg adjusted waste | CDM small-scale threshold adaptation |
| Contamination limit | >10% → rejected (Cat C) | Operational quality standard |
| Emission factor | Country-specific (Uruguay) | IPCC 2006 Guidelines |

The methodology is **digitized as a Guardian policy** — every parameter, threshold, and calculation rule is encoded in the schema definitions and enforced through the policy workflow.

---

## Cost Analysis

| Operation | Unit Cost | Monthly Vol. | Monthly Cost |
|---|---|---|---|
| Guardian VC issuance | ~$0.001 | ~24 deliveries | $0.024 |
| EGGOCOIN minting (via policy) | ~$0.001 | ~24 | $0.024 |
| CIN NFT minting (via policy) | ~$0.02 | ~2-4 | $0.04-0.08 |
| HCS messages (policy topic) | ~$0.0008 | ~100 | $0.08 |
| **Total** | | | **~$0.17-$0.21/month** |

Even at **10× current volume**, monthly costs stay under $3. Guardian MGS handles infrastructure. No servers to maintain.

---

## Built With

- **[Hedera Token Service (HTS)](https://hedera.com/token-service)** — EGGOCOIN + CIN tokens
- **[Hedera Consensus Service (HCS)](https://hedera.com/consensus-service)** — Policy messaging and trust chain
- **[Hedera Guardian (MGS)](https://guardian.io)** — Managed Guardian Service for MRV policy engine
- **[Hedera Mirror Node](https://docs.hedera.com/hedera/sdks-and-apis/rest-api)** — Public API for balances, transactions, NFTs
- **[CDM AMS-III.F](https://cdm.unfccc.int/methodologies/DB/GNFWB3Y818MFBDH1SVXBLI8TQGGPK2)** — UN composting methodology (inspiration)
- **Tailwind CSS** — Dashboard styling (CDN, no build)
- **Vanilla JavaScript** — Zero dependencies, zero framework

---

## Team

| Name | Role | Links |
|---|---|---|
| Rafael Aguileira | Founder & Developer | [GitHub](https://github.com/c4p5) |
| Santiago | Technical Advisor | — |

---

## References

- [CDM AMS-III.F Methodology](https://cdm.unfccc.int/methodologies/DB/GNFWB3Y818MFBDH1SVXBLI8TQGGPK2) — Avoidance of methane emissions through composting
- [Guardian Documentation](https://docs.hedera.com/guardian) — Policy engine and MRV framework
- [Hedera Mirror Node API](https://docs.hedera.com/hedera/sdks-and-apis/rest-api) — Public REST API
- [HIP-412](https://hips.hedera.com/hip/hip-412) — NFT metadata standard

---

## License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.

---

<p align="center">
  <strong>Turning waste into protein, eggs, compost, and verified carbon credits — one delivery at a time.</strong>
</p>
