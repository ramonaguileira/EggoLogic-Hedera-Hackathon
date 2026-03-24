# Eggologic — Token Economics

## Token → Value Proposition Mapping

Each token directly serves one of Eggologic's three stakeholder groups:

| Token | Who Benefits | Value Delivered | How |
|---|---|---|---|
| **EGGOCOIN** ($EGGO) | Restaurants | Zero-Waste Certification | Rewards clean waste delivery. Accumulated deliveries build toward Bronze/Silver/Gold certification. ([details](zero-waste-certification.md)) |
| **CIN NFT** | Companies | ESG Compliance & Carbon Reporting | 1 CIN = 1 tCO₂e avoided. Auditable on-chain carbon credit for GRI 305/306, TCFD, Scope 3. ([details](esg-integration-guide.md)) |
| **EGGTOKEN** (Phase 3) | Consumers | Real Food Traceability | 1 token = 1 verified egg with full origin chain: restaurant waste → BSF → egg. QR scannable. |

---

## Two-Token Model (Current)

Eggologic uses two Hedera Token Service (HTS) tokens with distinct purposes:

| | EGGOCOIN ($EGGO) | Circular Impact NFT (CIN) |
|---|---|---|
| **Token ID** | 0.0.8287358 | 0.0.8287362 |
| **Type** | Fungible (HTS) | Non-Fungible (HTS) |
| **Purpose** | Supplier incentive + certification progress | Environmental impact credit + ESG compliance |
| **Equivalence** | 1 $EGGO ≈ 1 kg adjusted waste | 1 CIN = 1 tCO₂e avoided |
| **Minted by** | Guardian policy | Guardian policy |
| **Trigger** | VVB approves Waste Delivery | VVB approves Impact Calculation |
| **Mint field** | field12 (kg_ajustados) | field10 |
| **Recipients** | Project_Proponent (suppliers) | OWNER (Eggologic) |
| **Supply** | Infinite (mint on demand) | Infinite (mint on demand) |
| **HashScan** | [View](https://hashscan.io/testnet/token/0.0.8287358) | [View](https://hashscan.io/testnet/token/0.0.8287362) |

---

## EGGOCOIN ($EGGO)

### What It Is

A fungible HTS token that rewards restaurants and suppliers for delivering clean, separated organic waste to the Eggologic processing hub. Every kilogram of verified waste earns tokens.

### Mint Formula

The dashboard calculates these values client-side before submitting to Guardian. The mint amount is `field12` (kg_ajustados):

```
kg_netos     = kg_brutos - kg_impropios
kg_ajustados = kg_netos × 0.70

Mint amount  = kg_ajustados (rounded to integer)
```

**The 0.70 factor** is a conservative adjustment that accounts for:
- Moisture content (restaurant organic waste is 60-80% water)
- DOC variability (degradable organic carbon varies by composition)
- Operational loss during processing

### Quality Categories

The contamination ratio determines eligibility:

```
ratio = (kg_impropios / kg_brutos) × 100

Cat A: ratio ≤ 5%   → eligible, premium quality
Cat B: ratio 5-10%  → eligible, standard quality
Cat C: ratio > 10%  → REJECTED (form blocks submission)
```

Category C deliveries are blocked at the dashboard level — the submit button disables and shows "Contamination too high (Cat. C)". This prevents low-quality waste from entering the system.

### Worked Examples

**Example 1: Clean delivery (Cat A)**
```
kg_brutos     = 50.0 kg
kg_impropios  = 2.0 kg
ratio         = 4.0% → Cat A ✓
kg_netos      = 48.0 kg
kg_ajustados  = 48.0 × 0.70 = 33.6 kg
Mint          = 34 $EGGO
```

**Example 2: Standard delivery (Cat B)**
```
kg_brutos     = 80.0 kg
kg_impropios  = 6.0 kg
ratio         = 7.5% → Cat B ✓
kg_netos      = 74.0 kg
kg_ajustados  = 74.0 × 0.70 = 51.8 kg
Mint          = 52 $EGGO
```

**Example 3: Rejected delivery (Cat C)**
```
kg_brutos     = 60.0 kg
kg_impropios  = 8.0 kg
ratio         = 13.3% → Cat C ✗
→ Dashboard blocks submission. No VC created. No tokens minted.
```

### Previous Formula (Deprecated)

Earlier versions used a more complex formula:

```
EGGOCOINS = kg_netos × factor_calidad × factor_alianza

factor_calidad:  A=1.2, B=1.0, C=0.8, D=0.5
factor_alianza:  ≥4 deliveries/month = 1.1, otherwise 1.0
```

This was simplified in v0.3. The current formula uses only `kg_ajustados = kg_netos × 0.70`. The quality/alliance multipliers were removed because:
- The 0.70 conservative factor already accounts for quality variance
- Cat C rejection removes the need for penalty multipliers
- Simpler formula = easier to audit, easier to explain to suppliers

### Redemption (Marketplace)

EGGOCOIN can be redeemed in the dashboard marketplace for:

| Item | $EGGO Cost | Category |
|---|---|---|
| Composting starter kit | TBD | Equipment |
| Partner restaurant deals | TBD | Rewards |
| Regenerative products | TBD | Sustainability |

Marketplace is functional in the UI but redemption values are not finalized. The current implementation is a product catalog with static pricing — actual token transfers for redemption are a roadmap item.

---

## Circular Impact NFT (CIN)

### What It Is

A non-fungible HTS token representing verified environmental impact. Each CIN represents 1 tonne of CO₂ equivalent emissions avoided through organic waste diversion from landfill.

### Mint Trigger

CIN is minted when:

1. OWNER submits an Impact Calculation VC with accumulated waste data
2. VVB reviews the calculation and supporting evidence
3. VVB approves → Guardian's `mintDocumentBlock` fires
4. 1 CIN NFT minted using `field10` as the mint parameter

### Carbon Calculation

Based on CDM AMS-III.F methodology (adapted):

```
CO₂_avoided = Σ(kg_ajustados across all verified deliveries) × emission_factor

When Σ(kg_ajustados) ≥ 1,000 kg → eligible for 1 CIN (= 1 tCO₂e)
```

The 1,000 kg threshold is an adaptation of CDM small-scale methodology thresholds. At current volumes (300-600 kg/week gross → 210-420 kg/week adjusted), this generates approximately **1 CIN every 3-6 weeks**.

### Verification Chain

Each CIN NFT is traceable back to specific waste deliveries through Guardian's Trust Chain:

```
CIN NFT #1
  └── Impact Calculation VC (approved by VVB)
        └── References delivery VCs:
              ├── ENT-001: 33.6 kg adjusted (Cat A)
              ├── ENT-002: 51.8 kg adjusted (Cat B)
              ├── ENT-003: 45.2 kg adjusted (Cat A)
              ├── ...
              └── ENT-028: 38.1 kg adjusted (Cat A)
                  Total: 1,012.4 kg adjusted → 1 CIN
```

This creates an **auditable chain of custody** from restaurant doorstep to carbon credit — every CIN can be verified against specific physical waste deliveries recorded as Verifiable Credentials on Hedera.

### CIN vs Traditional Carbon Credits

| | CIN (Eggologic) | Traditional Carbon Credit |
|---|---|---|
| Registry | Hedera (on-chain) | Verra, Gold Standard, CDM |
| Verification | VVB + Guardian Trust Chain | Third-party auditor |
| Transparency | Fully public (Mirror Node) | Registry database |
| Double-counting prevention | HTS serial numbers, on-chain ownership | Registry serial numbers |
| Time to issuance | Minutes (after VVB approval) | Months to years |
| Cost per credit | ~$0.02 (mint cost) | $5,000-50,000 (verification) |
| Tradability | HTS transfer (any Hedera account) | Registry transfer |

**Important caveat**: CIN tokens are currently on **testnet** and represent verified impact within Eggologic's system. They are not recognized by established carbon registries (Verra, Gold Standard). Mainnet deployment and registry recognition are roadmap items.

---

## Token Flow Diagram

```
                    EGGOCOIN Flow
                    ─────────────

Restaurant delivers waste
        │
        ▼
Project_Proponent submits Waste Delivery
        │
        ▼
VVB approves ──────► Guardian mints $EGGO (field12 amount)
                            │
                            ▼
                     $EGGO lands in Project_Proponent's Hedera account
                            │
                     ┌──────┴──────┐
                     │             │
                     ▼             ▼
              Hold / accumulate   Redeem in marketplace
                                  (future: token transfer)


                    CIN Flow
                    ────────

Deliveries accumulate over weeks
        │
        ▼
OWNER submits Impact Calculation (Σ kg_ajustados ≥ 1,000)
        │
        ▼
VVB reviews evidence + calculations
        │
        ▼
VVB approves ──────► Guardian mints CIN NFT (1 = 1 tCO₂e)
                            │
                            ▼
                     CIN lands in OWNER's Hedera account
                            │
                     ┌──────┴──────┐
                     │             │
                     ▼             ▼
              Hold as proof     Trade / retire
              of impact         (future: marketplace)
```

---

## On-Chain Verification

Anyone can verify the token state using Hedera Mirror Node (no auth required):

### EGGOCOIN Balance Check
```
GET https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.8287358/balances?account.id=0.0.8294621
```

### EGGOCOIN Total Supply
```
GET https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.8287358
→ total_supply field
```

### CIN NFT Holdings
```
GET https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.8287362/nfts?account.id=0.0.7166777
```

### All CIN NFTs Minted
```
GET https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.8287362/nfts?order=desc&limit=25
→ serial_number, account_id, created_timestamp
```

### Mint Transactions
```
GET https://testnet.mirrornode.hedera.com/api/v1/transactions?account.id={treasury}&transactiontype=TOKENMINT
```

---

## Cost Per Token Operation

Base unit: **1 approved delivery = 8 Hedera transactions** (VC submissions, VVB approval, impact calculation, EGGOCOIN mint, token transfer, fee settlements).

| Scale | Deliveries/month | Hedera Txs | HBAR cost | USD (@ $0.09/HBAR) |
|---|---|---|---|---|
| Current (1 restaurant, 2/week) | 8 | 64 | 0.064 | ~$0.006 |
| 10 restaurants | 80 | 640 | 0.64 | ~$0.058 |
| 50 restaurants | 400 | 3,200 | 3.2 | ~$0.29 |
| 100 restaurants | 800 | 6,400 | 6.4 | ~$0.58 |

CIN NFT mints add ~0.02 HBAR per mint. Token association is ~$0.05 one-time per new supplier.

Even at 100× current volume, the entire MRV verification layer costs less than a dollar a month.

---

## Future Tokenomics (Roadmap)

| Feature | Status | Description |
|---|---|---|
| Marketplace redemption | UI ready, transfers pending | Burn $EGGO for products |
| CIN marketplace | Planned | Trade CIN between accounts |
| Staking / loyalty tiers | Concept | Bonus $EGGO for consistent suppliers |
| Mainnet migration | Planned | Move to Hedera Mainnet |
| Registry recognition | Research | Apply for Verra/Gold Standard listing for CIN |
| Multi-hub expansion | Concept | Each hub mints to same token collections |
