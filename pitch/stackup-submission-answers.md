# StackUp Submission Form — Prepared Answers

---

## Challenge Selection

**Challenge Theme**: Theme 3: Sustainability

---

## Project Details

**Project Name**: Eggologic — Circular Economy Verified on Hedera

**Project Description** (100 words):

Eggologic is a real circular economy hub in Uruguay that solves three problems on Hedera: (1) **Restaurants** earn EGGOCOIN rewards and build toward blockchain-verified Zero-Waste Certification (Bronze/Silver/Gold levels); (2) **Consumers** get real food traceability — every egg links to specific waste deliveries via Guardian Trust Chain; (3) **Companies** purchase CIN NFTs (1 = 1 tCO₂e avoided) for ESG compliance, compatible with GRI 305/306, TCFD, and Scope 3 reporting. Guardian MRV policy (EWD-RB v0.3) with 8 schemas, 5 roles, VVB verification. Zero-middleware: static dashboard → Guardian + Mirror Node. $0.20/month blockchain cost.

Tech stack: Vanilla HTML/JS, Tailwind CSS, Guardian MGS v1.5.1, Hedera HTS, HCS, Mirror Node, Cloudflare Workers, GitHub Pages/Actions.

Setup: Dashboard is LIVE at https://c4p5.github.io/EggoLogic-Hedera-Hackathon/ — no local setup required. Login credentials for demo accounts provided in README.

---

**Project's GitHub Repo Link**: https://github.com/ramonaguileira/EggoLogic-Hedera-Hackathon

---

**Pitch Deck**: Upload `pitch/EggoLogic-PitchDeck.pdf`

---

**Project Demo Video Link**: [YouTube link — TO BE RECORDED AND UPLOADED]

**Project Demo Link**: https://c4p5.github.io/EggoLogic-Hedera-Hackathon/

---

## Feedback Ratings

| Question | Rating |
|----------|--------|
| Confidence after reading docs | **8** |
| Ease of getting help when blocked | **7** |
| Intuitiveness of APIs/SDKs | **8** |
| Ease of debugging issues | **7** |
| Likelihood to build again on Hedera | **9** |

---

**What are your main goals or objectives for participating in this hackathon?**

My main goal is to bring blockchain verification to a real-world circular economy operation that already exists, serving three distinct audiences. Eggologic has been running in Uruguay since 2025, processing 300-600 kg of organic waste weekly. The hackathon gave me the opportunity to build a verification layer that: helps **restaurants** earn Zero-Waste Certification with on-chain credentials, gives **consumers** real food traceability through Guardian Trust Chains, and enables **companies** to purchase auditable carbon credits (CIN NFTs) for ESG compliance. I want to demonstrate that blockchain can serve real environmental impact at negligible cost ($0.20/month). Long-term, I aim to create a Hub-in-a-Box franchise model that any organic waste operation worldwide can adopt, bringing thousands of new users to the Hedera ecosystem through the waste management, agriculture, and corporate ESG sectors.

---

**What was the biggest friction or blocker you faced?**

Guardian custom policy development required significant trial and error. Building the EWD-RB v0.3 methodology with 8 schemas and 5 roles involved understanding block interactions (requestVcDocumentBlock, calculateMathAddOnBlock, switchBlock, aggregateDocumentBlock) that aren't always intuitive from documentation alone. The CORS issue between browser and Guardian API was solved with a Cloudflare Worker proxy, which ended up enabling a zero-middleware architecture. I relied heavily on DOVU's open-source Guardian policies as reference implementations. The @hashgraph/sdk and Mirror Node API documentation was excellent.

---

**What's one thing we could improve to make this hackathon experience better?**

More Guardian-specific tutorials for custom policy creation, particularly: how block data flows between requestVcDocumentBlock and calculateMathAddOnBlock, how switchBlock conditional routing works with real examples, and how to structure multi-role approval chains. A "build your first custom Guardian policy in 30 minutes" tutorial with a working reference implementation would be incredibly valuable for sustainability track participants. The methodology library is great as inspiration, but adapting policies to novel use cases requires deep understanding that took significant time to build.

---

**What worked especially well that we should not change?**

The Hedera SDK is excellent — clear API, predictable costs, fast testnet execution. The fixed USD-denominated fees make cost planning trivial ($0.20/month for our entire operation). HashScan is invaluable for verifying testnet transactions during development. The Mirror Node public API being CORS-enabled was crucial for our zero-middleware architecture. Guardian's Managed Guardian Service (MGS) eliminated infrastructure complexity entirely. The hackathon tracks are well-defined and the sustainability track is a perfect fit for Guardian-based projects. The Discord community was responsive and helpful.

---

**Hedera Testnet Account ID of the team**:

0.0.7166777

---

**Mainnet wallet addresses of all members (to receive Apex NFT)**:

 
---

**Discord Handles of all members**:

Ramon.Eggologic / mf.caps

---

**LinkedIn Profile URLs of all members**:

https://www.linkedin.com/in/ramon-aguileira-b9a74997 / https://www.linkedin.com/in/sancapri/

---

**Please share your thoughts on building on Hedera**:

Building on Hedera was a remarkably efficient experience. The SDK is well-designed, testnet is fast and reliable, and the fixed fee model eliminates cost uncertainty. Guardian is a unique differentiator — no other blockchain ecosystem offers an integrated MRV policy engine with Verifiable Credentials and token minting in a single platform. For sustainability projects, this is transformative. The cost efficiency is extraordinary: our entire circular economy verification system — 8 schemas, 5 roles, 2 HTS tokens, 3 HCS topics — runs for $0.20/month. The zero-middleware architecture (browser → Guardian + Mirror Node) was only possible because of Hedera's public, CORS-enabled Mirror Node. I'm committed to continuing development on mainnet and believe Guardian + HTS + HCS is uniquely suited for real-world environmental verification.

---

**Would you want to submit for a bounty?**

Yes — **Hiero bounty** (native use of HTS + HCS via Guardian MGS / Hiero SDKs)

Submit at: https://go.hellofuturehackathon.dev/submit-bounty
