# ESG Integration Guide

> **How companies use Eggologic's Circular Impact NFTs (CIN) for ESG compliance, carbon reporting, and sustainability goals.**

---

## Overview

Eggologic issues **Circular Impact NFTs (CIN)** on Hedera — each representing **1 tCO2e avoided** through verified organic waste diversion. These credits are backed by:

- **CDM AMS-III.F methodology** (UN composting standard, adapted for small-scale BSF bioconversion)
- **VVB manual verification** — independent Validation & Verification Body reviews every impact calculation
- **Full on-chain audit trail** — every delivery, batch, and calculation is recorded as Verifiable Credentials on Hedera
- **70% conservative factor** — deliberately under-counting to ensure credibility

This guide explains how companies can integrate CIN NFTs into their ESG reporting, carbon accounting, and sustainability programs.

---

## CIN NFT Specifications

| Property | Value |
|---|---|
| **Token type** | HTS Non-Fungible Token (NFT) |
| **Token ID** | `0.0.8287362` ([HashScan](https://hashscan.io/testnet/token/0.0.8287362)) |
| **Unit** | 1 CIN = 1 tCO2e avoided |
| **Methodology** | CDM AMS-III.F adapted (Avoidance of methane emissions through composting) |
| **Verification** | VVB manual approval via Guardian policy |
| **Conservative factor** | 0.70 (30% haircut on all calculations) |
| **Threshold** | 1,000 kg adjusted waste = 1 CIN eligible |
| **Trust Chain** | Delivery VCs -> Batch VCs -> Production VCs -> Impact VC -> CIN NFT |
| **Network** | Hedera Testnet (mainnet migration: Phase 2, Q3-Q4 2026) |

---

## ESG Framework Mapping

### GRI Standards (Global Reporting Initiative)

CIN NFTs provide verifiable data for the following GRI disclosures:

| GRI Standard | Disclosure | What CIN Provides |
|---|---|---|
| **GRI 305: Emissions** | 305-5: Reduction of GHG emissions | Each CIN = 1 tCO2e avoided. Trust Chain proves the calculation from waste input to emission avoidance. |
| **GRI 306: Waste** | 306-2: Management of significant waste-related impacts | On-chain records of kg diverted from landfill, categorized by waste type and quality grade. |
| **GRI 306: Waste** | 306-4: Waste diverted from disposal | Exact kg tracked per delivery VC. BSF bioconversion = recovery operation. Compost = organic recycling. |
| **GRI 306: Waste** | 306-5: Waste directed to disposal | Rejected deliveries (Cat D, >30% contamination) are also recorded, providing transparent reporting of non-diverted waste. |

**How to report:** Reference the CIN NFT serial number and HashScan link as supporting documentation for GRI 305-5 and 306-4 disclosures. The Trust Chain provides the third-party verification evidence required by GRI.

### TCFD (Task Force on Climate-Related Financial Disclosures)

| TCFD Pillar | Recommendation | CIN Application |
|---|---|---|
| **Metrics & Targets** | Disclose Scope 1, 2, 3 emissions and targets | CIN documents Scope 3 Category 5 (Waste generated in operations) emission avoidance. Companies sponsoring waste diversion can report CIN-backed offsets. |
| **Risk Management** | Describe processes for managing climate risks | CIN corporate sponsorship demonstrates proactive waste-to-value investment, reducing regulatory and reputational risk. |
| **Strategy** | Describe climate-related risks and opportunities | Participation in verified circular economy programs (Eggologic) shows transition planning toward low-carbon operations. |

### CDP (Carbon Disclosure Project)

| CDP Section | CIN Application |
|---|---|
| **C6: Emissions Data** | CIN provides verified emission avoidance data with methodology reference (CDM AMS-III.F) |
| **C7: Emissions Breakdown** | Waste-related emissions avoidance broken down by delivery, batch, and production cycle |
| **C11: Carbon Pricing** | CIN purchase price establishes a company's internal carbon price signal |

### Scope 3 Reporting (GHG Protocol)

CIN NFTs are most relevant to **Scope 3, Category 5: Waste generated in operations**:

```
Company's restaurant/hotel generates organic waste
        |
        v
Instead of landfill (methane), waste goes to Eggologic hub
        |
        v
BSF bioconversion (aerobic, near-zero methane)
        |
        v
CO2e avoided = (waste kg x MCF x GWP_CH4 x 0.001) x 0.70
        |
        v
When accumulated >= 1 tCO2e --> CIN NFT minted
        |
        v
Company holds CIN as verified proof of Scope 3 emission avoidance
```

**Important distinction:** CIN NFTs represent **emission avoidance** (waste diverted from landfill), not emission removals. Report them as avoided emissions under Scope 3, Category 5, with a footnote referencing the CDM AMS-III.F adapted methodology and Hedera verification.

---

## Corporate Use Case: Hotel Solana (Example)

> *Illustrative scenario showing how a hotel chain integrates Eggologic CIN into ESG reporting.*

### Scenario

**Hotel Solana** operates 3 restaurants in Punta del Este generating ~400 kg of organic waste per week. They want to:
1. Reduce Scope 3 waste emissions
2. Report verified waste diversion in their annual ESG report
3. Demonstrate climate action to investors and guests

### Implementation

| Step | Action | Timeline |
|---|---|---|
| 1 | Sign Eggologic waste collection agreement | Month 1 |
| 2 | Train kitchen staff on waste separation (target: Cat A, ≤5% contamination) | Month 1-2 |
| 3 | Begin weekly deliveries to Eggologic hub (~400 kg/week) | Month 2+ |
| 4 | Monitor delivery dashboard — track kg diverted, quality grades, EGGOCOIN earned | Ongoing |
| 5 | At ~1,000 kg adjusted: first CIN NFT minted and transferred | ~Month 4 |
| 6 | Include CIN in quarterly ESG report with HashScan verification link | Quarter-end |

### Annual Impact (Projected)

| Metric | Value | Verification |
|---|---|---|
| Organic waste diverted | ~20,800 kg/year | Delivery VCs on Hedera |
| Adjusted waste (after 70% factor) | ~14,560 kg/year | Impact Calculation VCs |
| CIN NFTs earned | ~14 CIN/year | HashScan: token/0.0.8287362 |
| CO2e avoided | ~14 tCO2e/year | CDM AMS-III.F adapted methodology |
| EGGOCOIN earned | ~14,560 $EGGO | HashScan: token/0.0.8287358 |

### ESG Report Language (Template)

> *"In 2026, Hotel Solana diverted 20,800 kg of organic waste from landfill through a partnership with Eggologic, a blockchain-verified circular economy hub in Uruguay. The waste was processed through Black Soldier Fly bioconversion, producing protein feed, eggs, and compost while avoiding an estimated 14 tCO2e in methane emissions. Each tonne of CO2e avoided is represented by a Circular Impact NFT (CIN) on the Hedera blockchain, verified by an independent VVB using methodology adapted from CDM AMS-III.F. All delivery records, impact calculations, and token mints are publicly auditable on Hedera's Mirror Node.*
>
> *Verification: HashScan [link to CIN NFT collection] | Methodology: docs/carbon-methodology.md"*

---

## Carbon Methodology Summary

The full methodology is documented in [carbon-methodology.md](carbon-methodology.md). Key parameters:

| Parameter | Value | Rationale |
|---|---|---|
| **Base methodology** | CDM AMS-III.F | UN standard for methane avoidance through composting |
| **Adaptation** | Small-scale BSF bioconversion | BSF larvae process organic waste aerobically, similar to composting |
| **Conservative factor** | 0.70 (70%) | Accounts for moisture content, DOC variability, local conditions. Deliberately under-counts. |
| **Emission factor** | Country-specific (Uruguay) | IPCC 2006 Guidelines |
| **Contamination limit** | >30% = rejected | Ensures only properly separated waste enters calculations |
| **VVB requirement** | Manual approval | Independent verification before any CIN minting |

### Why 70% Conservative Factor?

Most carbon credit methodologies use 80-100% of calculated values. Eggologic uses **70%** because:
1. Small-scale operations have higher measurement uncertainty
2. BSF bioconversion is not identical to traditional composting (CDM AMS-III.F base case)
3. Under-counting builds credibility — better to claim less and be right than claim more and be questioned
4. Creates room for methodology refinement as more data accumulates

---

## Pricing Model

| Model | Description | Estimated Price |
|---|---|---|
| **Direct purchase** | Company buys CIN NFTs on demand | $100-300 per CIN (1 tCO2e) |
| **Corporate sponsorship** | Sponsor X kg/month of waste diversion, receive quarterly CIN | Custom pricing based on volume |
| **Impact partnership** | Co-branded sustainability program with verified metrics | Negotiated |

**Price rationale:** Traditional voluntary carbon credits trade at $5-50/tCO2e. Eggologic CIN commands a premium because:
- Full on-chain traceability (waste → larvae → egg → compost → credit)
- Conservative methodology (70% factor)
- Local, verifiable physical operation (not a faraway forest offset)
- Co-benefits: protein production, egg farming, compost generation, restaurant incentives
- Blockchain verification eliminates double-counting risk

---

## Audit & Verification Process

### For Company Auditors

Any auditor can independently verify CIN NFTs without Eggologic's involvement:

1. **Check CIN NFT on HashScan:** `hashscan.io/testnet/token/0.0.8287362` — view all minted serials, current holders, transfer history
2. **Trace Trust Chain:** Each CIN links back to an Impact Calculation VC, which references specific Waste Delivery VCs
3. **Verify deliveries:** Each Waste Delivery VC contains: date, kg_brutos, kg_impropios, quality grade, supplier ID
4. **Confirm VVB approval:** VVB approval transactions are recorded on HCS topics, timestamped and immutable
5. **Cross-reference Mirror Node:** All token mints, transfers, and balances are publicly queryable via Hedera Mirror Node API

### API Endpoints for Verification

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/tokens/0.0.8287362/nfts` | List all CIN NFTs minted |
| `GET /api/v1/tokens/0.0.8287362/nfts?account.id={companyId}` | CINs held by specific company |
| `GET /api/v1/transactions?account.id={treasuryId}&transactiontype=TOKENMINT` | All mint events with timestamps |
| `GET /api/v1/topics/0.0.8291451/messages` | All policy messages (VC anchors, approvals) |

Base URL: `https://testnet.mirrornode.hedera.com`

---

## Registry Recognition Roadmap

| Phase | Status | Details |
|---|---|---|
| **Phase 1 (current)** | Testnet proof of concept | CIN NFTs represent verified impact within Eggologic's system. Not recognized by external registries. |
| **Phase 2 (Q3-Q4 2026)** | Mainnet migration + registry research | Migrate to Hedera mainnet. Begin formal dialogue with Verra and Gold Standard for methodology recognition. |
| **Phase 3 (2027)** | Pilot recognition | Submit EWD-RB methodology for formal review. Seek provisional recognition as a micro-scale methodology. |
| **Phase 4 (2028+)** | Carbon credit interoperability | Bridge CIN NFTs to established registries. Article 6 compliance for international carbon markets. |

**Current limitation:** CIN tokens are on testnet and represent verified impact within Eggologic's system. They are **not yet recognized by established carbon registries** (Verra, Gold Standard). Companies should report CIN-backed offsets as "voluntary, blockchain-verified emission avoidance" with appropriate disclaimers until formal registry recognition is achieved.

---

## FAQ for Companies

**Q: Can we count CIN in our official carbon footprint?**
A: CIN documents verified emission avoidance with a credible methodology (CDM AMS-III.F adapted). You can report it as voluntary emission avoidance in sustainability reports. For regulated carbon markets or mandatory reporting, consult your compliance team regarding local recognition requirements.

**Q: What happens when Eggologic migrates to mainnet?**
A: All testnet CIN records will be preserved. Mainnet CINs will carry the same Trust Chain verification but on Hedera's production network, suitable for financial and regulatory reporting.

**Q: How do we explain blockchain-based carbon credits to our board?**
A: "Instead of trusting a PDF from a carbon offset broker, every credit we purchase is verified on a public blockchain. Anyone — our auditors, our investors, the public — can independently verify that real organic waste was diverted from landfills and converted into productive outputs. The entire chain from restaurant waste to carbon credit is immutably recorded."

**Q: What co-benefits come with CIN beyond carbon?**
A: Each CIN is linked to:
- X kg of organic waste diverted from landfill (waste reduction)
- BSF larvae protein produced (sustainable protein)
- Eggs produced from BSF-fed hens (regenerative agriculture)
- Compost generated (soil health)
- Restaurant incentives paid via EGGOCOIN (circular economy)

These co-benefits strengthen the narrative for SDG reporting (SDG 2: Zero Hunger, SDG 12: Responsible Consumption, SDG 13: Climate Action, SDG 15: Life on Land).

**Q: Minimum purchase?**
A: 1 CIN (1 tCO2e). Corporate sponsorship starts at ~1,000 kg/month of sponsored waste diversion.
