# Eggologic — Carbon Credit Methodology (EWD-RB)

## EWD-RB: Egg Waste Diversion — Regenerative Bioconversion

EWD-RB is a custom methodology for quantifying carbon credits from organic waste diversion through Black Soldier Fly (BSF) bioconversion. It adapts principles from the **CDM AMS-III.F** methodology (Avoidance of Methane Emissions Through Composting) to a circular economy model that produces larvae protein, eggs, and compost.

---

## Baseline Scenario

Without Eggologic's intervention, restaurant organic waste in El Tesoro, Maldonado, Uruguay follows this path:

```
Restaurant organic waste → municipal collection → landfill disposal
                                                        │
                                                        ▼
                                                 Anaerobic decomposition
                                                        │
                                                        ▼
                                                 Methane (CH₄) emissions
                                                 80× more potent than CO₂
                                                 over 20-year horizon
```

**Key fact**: Uruguay lacks widespread composting infrastructure. Most organic waste from restaurants ends up in sanitary landfills with partial or no methane capture.

---

## Project Scenario

Eggologic diverts organic waste from landfill into a controlled aerobic bioconversion process:

```
Restaurant organic waste → Eggologic hub → BSF larvae processing
                                                │
                                          ┌─────┼─────┐
                                          ▼     ▼     ▼
                                       Larvae  Eggs  Compost
                                       protein       (aerobic)
                                          │           │
                                          ▼           ▼
                                    Animal feed   Agriculture
                                    (hens)        (soil amendment)
```

**Result**: Methane emissions avoided because waste decomposes aerobically (composting) instead of anaerobically (landfill). Additional co-benefits: protein production, egg production, soil regeneration.

---

## Carbon Quantification

### Formula

```
CO₂e_avoided = Σ(kg_ajustados) / 1000    [in tCO₂e]

where:
  kg_ajustados = (kg_brutos - kg_impropios) × 0.70
  1,000 kg_ajustados = 1 tCO₂e = 1 CIN NFT
```

### The 0.70 Conservative Factor

Eggologic applies a **70% discount** on net input weight before accumulating toward carbon credits:

```
kg_ajustados = kg_netos × 0.70
```

This factor covers three variables simultaneously:

| Variable | Range | Why it matters |
|---|---|---|
| **Moisture content** | 60-80% | Water in organic waste does not generate methane. Only dry matter contributes to emissions. |
| **DOC variability** | 15-50% | Degradable Organic Carbon varies by waste composition (fruit peels vs cooked food vs bread). |
| **MCF correction** | 0.4-0.8 | Methane Correction Factor depends on local landfill conditions — depth, temperature, management. |

A precise calculation would require lab analysis of each delivery's composition. The 0.70 blanket factor is deliberately conservative — it ensures Eggologic **under-counts** emissions avoided rather than over-counting.

### Threshold for CIN Minting

```
When Σ(kg_ajustados) across verified deliveries ≥ 1,000 kg
  → eligible to mint 1 CIN NFT
  → 1 CIN = 1 tCO₂e avoided
```

The 1,000 kg threshold is adapted from CDM small-scale methodology thresholds. At current operational volumes:

| Metric | Value |
|---|---|
| Weekly gross intake | 300-600 kg |
| Weekly adjusted (×0.70) | 147-294 kg |
| Time to 1,000 kg adjusted | ~4-7 weeks |
| CIN mints per year | ~8-13 |

---

## CDM AMS-III.F: Source Methodology

### Overview

**CDM AMS-III.F** ("Avoidance of Methane Emissions Through Composting") is a UNFCCC Clean Development Mechanism methodology for quantifying emission reductions from controlled aerobic treatment of organic waste.

### Applicability Conditions

| CDM Requirement | Eggologic Status |
|---|---|
| Organic waste that would otherwise be disposed in landfill | ✅ Restaurant waste from El Tesoro/Maldonado goes to landfill |
| Controlled aerobic treatment (composting) | ✅ BSF processing is aerobic bioconversion |
| Project scale < 60,000 tCO₂e/year | ✅ Current scale is ~10-15 tCO₂e/year |
| Baseline is landfill disposal | ✅ No alternative processing exists locally |

### Tools Referenced

| CDM Tool | Purpose | Eggologic Application |
|---|---|---|
| Tool 04 | Emissions from solid waste disposal | Baseline calculation (what would happen at landfill) |
| Tool 05 | Electricity grid emission factor | Energy used in BSF processing |
| Tool 13 | Project/leakage emissions from composting | Emissions from BSF bioconversion process |

### Adaptations Made

EWD-RB adapts AMS-III.F in the following ways:

| AMS-III.F Original | EWD-RB Adaptation | Rationale |
|---|---|---|
| Pure composting | BSF bioconversion + composting | BSF is aerobic — same emission profile as composting |
| Lab-measured waste composition | 0.70 conservative blanket factor | Lab analysis not feasible at small scale |
| Annual monitoring reports | Per-delivery VC tracking | More granular — every delivery is a data point |
| Third-party DOE verification | VVB approval in Guardian | Digital verification with on-chain audit trail |
| CER issuance via UNFCCC | CIN mint via Guardian/HTS | On-chain token replaces registry certificate |

---

## Verification Process

### Current Flow (EWD-RB v0.3)

```
1. Project_Proponent submits Waste Delivery
   → VC created with kg_brutos, kg_impropios, kg_ajustados
   → Status: "Waiting for approval"

2. VVB reviews delivery data
   → Checks: weights plausible? Evidence provided? Category valid?
   → Approves → EGGOCOIN minted (field12)

3. Deliveries accumulate over weeks

4. OWNER submits Impact Calculation
   → Aggregates verified deliveries
   → Calculates total kg_ajustados
   → If ≥ 1,000 kg → requests CIN mint

5. VVB reviews Impact Calculation
   → Cross-references individual delivery VCs
   → Verifies accumulation math
   → Approves → CIN NFT minted (1 = 1 tCO₂e)
```

### What VVB Checks

| Check | How |
|---|---|
| Weight plausibility | kg_brutos within expected range (10-500 kg per delivery) |
| Contamination ratio | Matches field photo evidence |
| Delivery frequency | Consistent with supplier history |
| No double-counting | Delivery ID is unique, not previously claimed |
| Evidence quality | Photo URLs accessible, show actual waste |
| Accumulation math | Sum of field12 across referenced deliveries = claimed total |

### Audit Trail

Every step is recorded on Hedera through Guardian:

```
Waste Delivery VC ──► HCS message (policy topic 0.0.8291451)
       │
       ▼
VVB Approval ──► HCS message + EGGOCOIN mint tx
       │
       ▼
Impact Calculation VC ──► HCS message
       │
       ▼
VVB Approval ──► HCS message + CIN mint tx
       │
       ▼
Trust Chain: all VCs linked as Verifiable Presentations on IPFS
```

Any auditor can reconstruct the full chain from CIN NFT → Impact Calculation → individual deliveries using:
- Hedera Mirror Node (transaction history)
- Guardian Trust Chain (VC relationships)
- IPFS (Verifiable Presentations)

---

## Comparison with Other Methodologies

| Methodology | Scope | Credits | Eggologic Relevance |
|---|---|---|---|
| **CDM AMS-III.F** | Composting | CER (1 tCO₂e) | Primary inspiration — direct applicability |
| **Verra VM0044** | Biochar / waste biomass | VCU | Relevant for BSF residue processing |
| **MCER01** | Circular economy recycling | MCER | Covers waste diversion broadly |
| **IWCSH** | Waste collection & handling | — | Covers supply chain logistics |
| **SSFLWGRP001** | Food loss & waste GHG reduction | — | Covers restaurant waste specifically |

EWD-RB draws primarily from AMS-III.F but could be extended to incorporate elements from VM0044 (for the bioconversion component) and SSFLWGRP001 (for the food waste supply chain).

---

## Limitations and Future Work

### Current Limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| No lab-measured waste composition | 0.70 factor may be too conservative or too generous | Conservative by design — under-count preferred |
| Single-site data | Cannot generalize emission factors | Each hub should calibrate independently |
| VVB is manual review | Scalability bottleneck | Acceptable at current volume (~24 deliveries/month) |
| CIN not recognized by registries | Cannot trade as certified carbon credits | Roadmap: apply for Verra/Gold Standard listing |
| Testnet only | No real economic value yet | Mainnet migration planned |

### Future Improvements

| Improvement | Benefit | Complexity |
|---|---|---|
| IoT scales at delivery point | Automated weight capture, no manual entry | Medium |
| Periodic waste composition sampling | Refine 0.70 factor with real data | Low |
| Temperature/humidity sensors in BSF processing | Prove aerobic conditions continuously | Medium |
| Automated VVB via sensor data (dMRV) | Remove manual verification bottleneck | High |
| Multi-hub deployment | Aggregate impact across locations | Medium |
| Mainnet + Verra registration | CIN becomes tradable carbon credit | High |

---

## References

- [CDM AMS-III.F](https://cdm.unfccc.int/methodologies/DB/GNFWB3Y818MFBDH1SVXBLI8TQGGPK2) — Avoidance of methane emissions through composting
- [IPCC 2006 Guidelines](https://www.ipcc-nggip.iges.or.jp/public/2006gl/) — National greenhouse gas inventories (Vol. 5, Ch. 3: Solid Waste Disposal)
- [CDM Tool 04](https://cdm.unfccc.int/methodologies/PAmethodologies/tools/am-tool-04-v8.0.pdf) — Emissions from solid waste disposal sites
- [CDM Tool 13](https://cdm.unfccc.int/methodologies/PAmethodologies/tools/am-tool-13-v1.pdf) — Project and leakage emissions from composting
- [Guardian Methodology Library](https://github.com/hashgraph/guardian/tree/main/Methodology%20Library) — 50+ pre-built Guardian policies
