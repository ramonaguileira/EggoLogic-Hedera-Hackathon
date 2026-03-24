# Eggologic — Final Demo Video Script

## Hedera Hello Future: Apex Hackathon 2026
### Track: Sustainability | Bounty: Hiero
### Duration: 3:30 – 4:00 minutes

---

## HOOK (0:00 – 0:25)

**[SCREEN: Real photos of hub — waste arriving, BSF larvae, hens, eggs]**

> "Every year, 1.3 billion tonnes of food are wasted globally. In Latin America, most restaurant organic waste goes straight to landfills, producing methane — 80 times more potent than CO₂.
>
> The voluntary carbon market is worth 2 billion dollars, but small operators can't access it — traditional MRV audits cost over $10,000 per cycle.
>
> I'm Ramon, from Uruguay, and this is Eggologic — a REAL, operating circular economy hub that turns restaurant waste into protein, eggs, compost, and verified carbon credits on Hedera. For twenty cents a month.
>
> We solve three problems: we help restaurants earn blockchain-verified SCS Environmental Certification. We give consumers real food traceability — scan a QR, see the full chain. And we enable companies to meet ESG compliance with auditable carbon credits on Hedera."

---

## THE OPERATION (0:25 – 0:55)

**[SCREEN: Circular diagram — Waste → BSF → Hens → Eggs + Compost → Carbon Credits]**

> "In El Tesoro, Maldonado, we collect organic waste from restaurants. That waste feeds Black Soldier Fly larvae — nature's most efficient bio-converters. The larvae feed our laying hens, which produce eggs. The remaining matter becomes compost for local agriculture.
>
> We process 300 to 600 kilograms every week. This is not a concept — it's running today."

**[SCREEN: 4-5 real photos cycling (2-3 seconds each)]**

---

## THE BLOCKCHAIN LAYER (0:55 – 1:50)

**[SCREEN: Architecture diagram]**

> "The question is: how do you PROVE it? How does a restaurant know their waste didn't end up in a landfill? How do you create credible carbon credits from composting?
>
> We built a complete verification system on Hedera using Guardian MGS."

**[SCREEN: Guardian policy flow diagram]**

> "Our custom methodology — EWD-RB version 0.3 — uses 8 Guardian schemas and 5 independent roles. When a restaurant delivers waste, a Project Proponent submits the delivery. An independent VVB — a Validation and Verification Body — reviews and approves. Only THEN does the Guardian policy automatically mint EGGOCOIN tokens as the supplier's reward.
>
> When accumulated verified waste reaches 1,000 kilograms, the system mints a Circular Impact NFT — one NFT equals one tonne of CO₂ avoided. This follows the CDM AMS-III.F composting methodology from the United Nations, with a deliberate 70% conservative factor."

**[SCREEN: HashScan showing EGGOCOIN token 0.0.8287358]**

> "Every token, every credential, every approval — verifiable on Hedera. Right now. On HashScan."

---

## ZERO MIDDLEWARE (1:50 – 2:15)

**[SCREEN: Architecture — Dashboard → CORS Proxy → Guardian + Mirror Node → Hedera]**

> "Here's what makes this architecture unique: zero middleware.
>
> Our dashboard is pure HTML and JavaScript, deployed on GitHub Pages for free. It talks directly to Guardian's API through a tiny Cloudflare Worker proxy, and queries Hedera's Mirror Node for balances and transactions.
>
> No servers. No backend. No hosting costs. The blockchain IS the backend.
>
> Total monthly blockchain cost? Twenty cents."

**[PAUSE for impact]**

---

## LIVE DEMO (2:15 – 3:15)

**[SCREEN: Live dashboard at eggologic.vercel.app/]**

> "Let me show you the live dashboard."

**Step 1 (10s):** Login as Project_Proponent
> "We login with role-based access through Guardian's JWT authentication."

**Step 2 (15s):** Dashboard — show hero metrics + fill delivery form
> "The dashboard shows real-time metrics. I submit a waste delivery — 80 kilograms, 4% contamination, Category A. The system calculates 53 adjusted kilograms."

**Step 3 (10s):** Show the VC being created in Guardian
> "Guardian creates a Verifiable Credential for this delivery."

**Step 4 (10s):** Switch to VVB role — approve delivery
> "Now as VVB, I see the pending delivery. I approve it — and Guardian's policy automatically mints EGGOCOIN tokens."

**Step 5 (10s):** Wallet page — show updated balance
> "Back in the wallet, the supplier's EGGOCOIN balance has increased. Transaction history shows the mint. All sourced from Hedera Mirror Node."

**Step 6 (5s):** HashScan — verify the transaction
> "And on HashScan — token ID 0.0.8287358 — the mint transaction is permanent and public."

> "From restaurant delivery to verified token in minutes. The supplier's workflow is simple. The verification is rigorous. And the cost is negligible."

---

## IMPACT & SCALE (3:15 – 3:40)

**[SCREEN: Scaling projections]**

> "Today: one hub, 5 Hedera accounts, 100 transactions per month.
>
> Phase 2: 15 restaurants, 25 accounts.
> Phase 3: 50 restaurants, 100+ accounts, multiple hubs.
> Phase 4: a Hub-in-a-Box franchise model — bringing Hedera to the waste management and agriculture sector worldwide.
>
> That's millions of potential users who need verification and incentives — not speculation."

---

## CLOSING (3:40 – 4:00)

**[SCREEN: Face cam + circular economy diagram]**

> "Eggologic is the first waste-to-BSF circular economy verified on Hedera Guardian. It's running today in Uruguay. The Guardian policy is published. The tokens are live. The dashboard is deployed.
>
> Restaurants get SCS Environmental Certification. Consumers get real food traceability. Companies get auditable carbon credits for ESG reporting. All verified on Hedera, for twenty cents a month.
>
> Thank you — and let's build the circular economy on Hedera."

**[SCREEN: Logo + links]**
- GitHub: github.com/ramonaguileira/EggoLogic-Hedera-Hackathon
- Dashboard: eggologic.vercel.app/
- Testnet: 0.0.7166777

---

## PRE-RECORDING CHECKLIST

- [ ] Dashboard live and working at eggologic.vercel.app/
- [ ] Login credentials for each role (Owner, Registry, PP, Operator, VVB)
- [ ] EGGOCOIN verified on HashScan (0.0.8287358)
- [ ] CIN NFT verified on HashScan (0.0.8287362)
- [ ] Real photos of operation (waste, BSF, hens, eggs, compost)
- [ ] Architecture diagram (clean, Excalidraw)
- [ ] Pre-recorded demo backup (in case live fails)
- [ ] OBS Studio or Loom ready
- [ ] External microphone
- [ ] Practice 3× before recording
- [ ] Speak slowly — non-native English audience
- [ ] Add English subtitles after recording
