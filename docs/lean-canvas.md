# Eggologic — Lean Canvas

> **Version:** 1.0 | **Date:** March 2026 | **Author:** Ramon Aguileira

---

## 1. Problem

| # | Problem | Existing Alternative |
|---|---------|---------------------|
| 1 | Restaurant organic waste goes to landfill → methane emissions (80× more potent than CO₂ over 20 years) | Municipal waste collection (no separation, no verification) |
| 2 | No affordable MRV system for small-scale waste diversion (<1,000 tCO₂e/year) — traditional audits cost $10,000+ | Manual spreadsheets, paper-based audit trails |
| 3 | Restaurants have no incentive to separate organic waste properly | No reward systems; waste collection is a cost center |

---

## 2. Customer Segments & Value Propositions

| Segment | Who | Need | What Eggologic Delivers | Token |
|---------|-----|------|------------------------|-------|
| **Restaurants** | Restaurants in tourist zones (Maldonado, Punta del Este, Uruguay) | Affordable waste collection + sustainability credentials | **SCS Environmental Certification** — Bronze/Silver/Gold levels based on kg diverted, quality grades, delivery consistency. On-chain credential for marketing and compliance. Free waste collection + EGGOCOIN rewards. ([details](architecture.md)) | EGGOCOIN ($EGGO) |
| **Companies** | ESG-conscious companies and carbon offset buyers | Verified, auditable micro-scale carbon credits for ESG reporting | **Auditable carbon credits** — CIN NFTs (1 = 1 tCO₂e avoided) with full Trust Chain. Compatible with GRI 305/306, TCFD, CDP, Scope 3 Cat 5. VVB-verified, publicly auditable on HashScan. ([details](esg-integration-guide.md)) | CIN NFT |
| **Consumers** | Regenerative food consumers | Traceable, BSF-fed eggs and certified compost | **Real food traceability** — QR code on each product links to the complete chain on Hedera: which restaurant's waste → BSF batch → egg/compost. Verify on HashScan. Phase 3: EGGTOKEN (1 = 1 verified egg). | EGGTOKEN (future) |

**Early Adopter Profile:** Small-to-medium restaurants (50–200 covers/day) in Maldonado department, Uruguay. Generate 50–150 kg organic waste/week. Currently pay municipal collection fees with no sustainability benefit.

---

## 3. Unique Value Proposition

**Every kilogram of organic waste diverted from landfill is verified on Hedera — from restaurant doorstep to carbon credit — for $0.20/month.**

- **For Restaurants:** SCS Environmental Certification (Bronze/Silver/Gold) backed by immutable delivery records + EGGOCOIN rewards
- **For Consumers:** Full-chain traceability — scan QR, see the complete journey from restaurant waste to your egg, verified on Hedera
- **For Companies:** Auditable carbon credits (CIN NFTs) with VVB verification, compatible with GRI, TCFD, and Scope 3 reporting
- Real operation (not a prototype) — 300–600 kg/week processed today
- First waste-to-BSF circular economy verified on blockchain

---

## 4. Solution

| Problem | Solution |
|---------|----------|
| Waste → landfill → methane | Eggologic hub diverts waste → BSF bioconversion → eggs, compost (aerobic, near-zero methane) |
| No affordable MRV | Hedera Guardian policy digitizes CDM AMS-III.F methodology — VVB approval triggers token mints at $0.001/tx |
| No restaurant incentive | EGGOCOIN rewards (1 kg adjusted waste = 1 $EGGO) redeemable for products from the same circular chain |

---

## 5. Channels

| Phase | Channel | Cost |
|-------|---------|------|
| Phase 1–2 | Direct outreach to restaurants in Maldonado (custodial model — Eggologic holds $EGGO) | $0 (founder-led) |
| Phase 2 | Restaurant association partnerships (CCIU, Cámara de Turismo) | Low |
| Phase 2 | HashScan + dashboard as public verification (trust builder) | $0 |
| Phase 3 | Hub-in-a-Box program + self-custody wallets for restaurant partners | Revenue-generating |
| Ongoing | GitHub Pages dashboard (public impact data, no paywall) | $0 |

---

## 6. Revenue Streams

| Stream | Phase 1 (current) | Phase 2 (2026) | Phase 3 (2027) |
|--------|-------------------|----------------|----------------|
| Egg sales (BSF-fed premium) | $60–90/mo | $1,800–2,400/mo | $4,500–10,000/mo |
| Compost sales (origin-certified) | $90–140/mo | $420–1,000/mo | $1,200–3,600/mo |
| BSF larvae surplus | — | $800–2,400/mo | $2,500–9,600/mo |
| Chicken meat | — | $1,200–2,000/mo | $4,000–8,800/mo |
| CIN NFT sales (carbon credits) | — | $300–450/mo | $2,000–5,000/mo |
| Hub-in-a-Box licensing | — | — | $1,000–3,000/mo |
| **Total** | **~$190/mo** | **$5,190–8,950/mo** | **$15,200–40,000/mo** |

---

## 7. Cost Structure

| Category | Phase 1 | Phase 2 | Phase 3 |
|----------|---------|---------|---------|
| Feed & bedding (BSF) | $50/mo | $200/mo | $500/mo |
| Transport (waste collection) | $0 (partner delivers) | $300/mo | $1,000/mo |
| Hedera blockchain | **$0.20/mo** | **$2/mo** | **$20/mo** |
| Guardian MGS | $0 (free tier) | $0 (free tier) | TBD |
| Hosting (GitHub Pages) | $0 | $0 | $0 |
| CORS proxy (Cloudflare Workers) | $0 (free tier) | $0 | $5/mo |
| IoT sensors | — | $500 (one-time) | $2,000 (per hub) |
| Labor | Founder (sweat equity) | 1 operator ($800/mo) | 2 per hub |
| **Total** | **~$50/mo** | **~$1,800/mo** | **~$5,000/mo per hub** |

**Break-even**: Phase 2 at month 6–12 with $30K–75K investment.

---

## 8. Key Metrics

| Metric | How Measured | Source |
|--------|-------------|--------|
| kg waste diverted/week | Waste Delivery VCs (field8 = kg_brutos) | Guardian API |
| EGGOCOIN minted/month | HTS mint transactions | Hedera Mirror Node |
| CIN NFTs issued (tCO₂e) | NFT serial count | Hedera Mirror Node |
| Contamination rate | field10 (%) per delivery | Guardian VC data |
| Restaurant retention | Active deliveries/month per partner | Dashboard analytics |
| Revenue per hub | Physical product sales + CIN sales | Financial records |

---

## 9. Unfair Advantage

1. **Running operation today** — Not a whitepaper. Physical hub processing 300–600 kg/week with real outputs (eggs, compost, larvae).
2. **First-mover on Guardian for circular economy** — No other project uses Hedera Guardian for waste-to-value MRV.
3. **$0.20/month blockchain cost** — Makes micro-scale carbon credits economically viable for the first time. Traditional MRV costs $10,000+ per audit.
4. **Domain expertise** — Founder operates the BSF bioconversion facility, understands both the biology and the blockchain integration.
5. **Replicable model** — Hub-in-a-Box design allows any operator to deploy the same Guardian policy + dashboard in a new location.

---

## Visual Summary

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  PROBLEM     │     │  SOLUTION    │     │  KEY METRICS    │
│              │     │              │     │                 │
│ Waste →      │     │ BSF hub +    │     │ kg diverted     │
│ Landfill →   │────▶│ Guardian     │────▶│ $EGGO minted    │
│ Methane      │     │ policy on    │     │ CIN NFTs issued │
│              │     │ Hedera       │     │ tCO₂e avoided   │
└─────────────┘     └──────────────┘     └─────────────────┘
        │                   │                      │
        ▼                   ▼                      ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  UNFAIR      │     │  CHANNELS    │     │  REVENUE        │
│  ADVANTAGE   │     │              │     │                 │
│              │     │ Direct       │     │ Eggs, compost,  │
│ Running hub  │     │ outreach +   │     │ larvae, meat    │
│ $0.20/mo     │     │ public       │     │ + CIN NFTs      │
│ First-mover  │     │ dashboard    │     │ + Hub licensing  │
└─────────────┘     └──────────────┘     └─────────────────┘
```

---

## References

- **FAO Food Loss Index**: [fao.org/platform-food-loss-waste](https://www.fao.org/platform-food-loss-waste/en/)
- **CDM AMS-III.F**: [cdm.unfccc.int](https://cdm.unfccc.int/methodologies/DB/GNFWB3Y818MFBDH1SVXBLI8TQGGPK2)
- **Voluntary Carbon Market Report 2024**: [ecosystemmarketplace.com](https://www.ecosystemmarketplace.com/publications/state-of-the-voluntary-carbon-market-2024/)
- **Regenerative Agriculture Market**: [precedenceresearch.com](https://www.precedenceresearch.com/regenerative-agriculture-market)
- **IPCC 2006 Guidelines, Vol. 5**: Waste sector methane emission factors
