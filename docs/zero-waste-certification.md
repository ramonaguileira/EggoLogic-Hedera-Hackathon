# Zero-Waste Certification Program

> **Eggologic's on-chain certification program for restaurants committed to diverting organic waste from landfills.**

---

## Overview

The Eggologic Zero-Waste Certification is a **verifiable, blockchain-backed credential** that restaurants earn by consistently delivering clean, separated organic waste to the Eggologic circular economy hub. Every delivery is recorded as a Verifiable Credential on Hedera, creating an immutable track record that restaurants can use for marketing, regulatory compliance, and customer trust.

Unlike traditional certifications that rely on annual audits and paper trails, the Eggologic certification is **continuously verified** — every kilogram is tracked, every delivery is graded, and progress updates in real time.

---

## How It Works

```
Restaurant delivers organic waste
        |
        v
Project_Proponent submits Waste Delivery (VC on Hedera)
        |
        v
VVB reviews and approves --> EGGOCOIN minted + delivery recorded
        |
        v
System tracks: kg diverted, quality grades, frequency, consecutive months
        |
        v
Restaurant reaches certification threshold --> Certification VC issued on Hedera
        |
        v
Restaurant displays digital badge + verifiable link to on-chain proof
```

---

## Certification Levels

### Bronze — Waste Diversion Partner

| Criteria | Threshold |
|---|---|
| Consecutive months of participation | 3+ months |
| Total kg diverted from landfill | 100+ kg (adjusted) |
| Average quality grade | B or better (avg contamination ≤15%) |
| Minimum delivery frequency | 2+ deliveries/month |

**What you get:**
- Digital badge: "Eggologic Waste Diversion Partner"
- On-chain Verifiable Credential linked to delivery history
- Public profile on Eggologic dashboard with verified kg diverted
- EGGOCOIN bonus: 50 $EGGO upon certification

---

### Silver — Circular Economy Contributor

| Criteria | Threshold |
|---|---|
| Consecutive months of participation | 6+ months |
| Total kg diverted from landfill | 500+ kg (adjusted) |
| Average quality grade | A/B (avg contamination ≤10%) |
| Minimum delivery frequency | 4+ deliveries/month (Alliance level) |
| Alliance status | Active |

**What you get:**
- Everything in Bronze, plus:
- Digital badge: "Eggologic Circular Economy Contributor"
- Featured listing on Eggologic marketplace
- Alliance bonus: 1.1x multiplier on EGGOCOIN rewards
- EGGOCOIN bonus: 200 $EGGO upon certification
- Access to Eggologic compost and eggs at preferred pricing

---

### Gold — Zero-Waste Champion

| Criteria | Threshold |
|---|---|
| Consecutive months of participation | 12+ months |
| Total kg diverted from landfill | 1,000+ kg (adjusted) |
| Average quality grade | A (avg contamination ≤5%) |
| Minimum delivery frequency | 4+ deliveries/month (Alliance level) |
| Alliance status | Active for 6+ consecutive months |
| Associated CIN NFT | At least 1 CIN minted from this restaurant's waste |

**What you get:**
- Everything in Silver, plus:
- Digital badge: "Eggologic Zero-Waste Champion"
- Linked to CIN NFT — restaurant's waste directly contributed to verified carbon credits
- Co-branded marketing materials with verified impact data
- EGGOCOIN bonus: 500 $EGGO upon certification
- Priority access to future EGGTOKEN allocation (Phase 3)
- Right to claim: "X kg of our organic waste was verified on Hedera blockchain as diverted from landfill, avoiding Y kg CO2e"

---

## Quality Grading System

Every waste delivery is graded based on contamination ratio (kg_impropios / kg_brutos):

| Grade | Contamination | Quality Factor | Certification Impact |
|---|---|---|---|
| **A** | ≤5% | 1.0 | Full credit toward certification |
| **B** | 5–15% | 0.85 | Full credit toward certification |
| **C** | 15–30% | 0.70 | Partial credit (counted at 50% for certification metrics) |
| **D** | >30% | Rejected | Does not count toward certification |

**Key formula:**
```
kg_ajustados = kg_netos x 0.70 (conservative factor)
kg_netos = kg_brutos - kg_impropios
```

Certification thresholds use `kg_ajustados` (adjusted kg after conservative factor), ensuring credits are conservative and credible.

---

## Alliance System

Restaurants that maintain high delivery frequency earn **Alliance status**, which accelerates certification progress:

| Level | Criteria | Benefit |
|---|---|---|
| **Standard** | < 4 deliveries/month | Base EGGOCOIN rate |
| **Alliance** | 4+ deliveries/month | 1.1x EGGOCOIN multiplier + faster certification progress |

Alliance status is required for Silver and Gold certification levels, encouraging consistent participation rather than sporadic large deliveries.

---

## On-Chain Verification

Every certification is backed by Hedera:

| Data Point | Where It Lives | How to Verify |
|---|---|---|
| Individual deliveries | Waste Delivery VCs (Guardian policy) | Guardian API or HCS topic messages |
| EGGOCOIN rewards | HTS token transfers | [HashScan](https://hashscan.io/testnet/token/0.0.8287358) |
| Certification credential | Certification VC (Guardian policy) | Guardian API + IPFS Verifiable Presentation |
| Carbon impact link | CIN NFT metadata | [HashScan](https://hashscan.io/testnet/token/0.0.8287362) |

**Anyone** can verify a restaurant's certification by:
1. Checking the restaurant's Hedera account on HashScan
2. Reviewing EGGOCOIN transaction history (each tx = 1 approved delivery)
3. Confirming the Certification VC via Guardian's Trust Chain

---

## How Restaurants Use Their Certification

### Marketing Claims (Verified)
- "We diverted X kg of organic waste from landfill — verified on Hedera blockchain"
- "Our kitchen waste was converted into BSF larvae protein and compost, avoiding Y kg CO2e"
- "Zero-Waste Champion certified by Eggologic — verify at [HashScan link]"

### Regulatory & Compliance
- Proof of waste diversion for municipal sustainability programs
- Documentation for ISO 14001 (Environmental Management) alignment
- Evidence for B Corp certification waste criteria
- Support for local government sustainability incentives

### Customer-Facing
- Display digital badge on website, menu, or storefront
- QR code linking to live verification on Hedera
- Inclusion in Eggologic's public directory of certified restaurants

---

## Certification Timeline

| Phase | Certification Features |
|---|---|
| **Phase 1 (current)** | Delivery tracking + quality grading operational. Certification criteria defined. Manual badge issuance based on dashboard data. |
| **Phase 2 (Q3-Q4 2026)** | Automated certification VC issuance via Guardian policy. Public restaurant profiles on dashboard. Digital badges with QR verification. |
| **Phase 3 (2027)** | Multi-restaurant leaderboard. Cross-hub certification. Integration with external certification bodies (TRUE Zero Waste, local standards). |

---

## Alignment with External Standards

The Eggologic certification program is designed to complement (not replace) established frameworks:

| Standard | Alignment |
|---|---|
| **TRUE Zero Waste** | Eggologic tracks waste diversion rate — a core TRUE metric. Certification data can support TRUE applications. |
| **ISO 14001** | On-chain delivery records provide documented evidence for environmental management system audits. |
| **B Corp (Environment)** | Waste diversion tracking and carbon impact data support B Impact Assessment scoring. |
| **Local municipal programs** | Uruguay's emerging waste management regulations can use on-chain data as compliance evidence. |

---

## FAQ

**Q: Do restaurants need a Hedera wallet?**
A: No. In Phase 1-2, Eggologic custodies EGGOCOIN balances on behalf of restaurants. Restaurants interact through the dashboard. Self-custody wallets are planned for Phase 3.

**Q: What if a restaurant has a bad month (low quality, few deliveries)?**
A: Certification progress pauses but does not reset. The "consecutive months" counter resets only if a restaurant has zero deliveries for 2+ months. Quality issues reduce EGGOCOIN earned but accumulated kg are retained.

**Q: Can a restaurant lose its certification?**
A: Certifications are permanent records on Hedera — they represent what was achieved. However, "active" status requires ongoing participation. A restaurant that stops delivering for 3+ months moves to "inactive" status and must resume deliveries to display the active badge.

**Q: How does this differ from traditional certifications?**
A: Traditional certifications (ISO, TRUE) rely on periodic audits — a snapshot in time. Eggologic certification is **continuous** — every delivery is recorded in real time, and the certification threshold is calculated from the full on-chain history. No auditor needed; the blockchain IS the audit trail.
