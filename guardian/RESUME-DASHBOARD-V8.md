## STATUS
CORS proxy live, auto-workflow working, HashScan links everywhere. Hackathon deadline March 22, 2026.

## PROMPT

```
Read guardian/DASHBOARD-HANDOFF-V8.md first.

Then read files ON DEMAND as needed (don't read everything upfront — saves context):
- dashboard/js/api.js — if touching Guardian POST/auth
- dashboard/js/dashboard.js — if touching delivery form, workflow orchestrator, stepper
- dashboard/js/config.js — if touching block IDs, proxy URL, config
- dashboard/js/hedera.js — if touching Hedera API calls
- dashboard/js/wallet.js — if touching wallet/CIT data
- dashboard/js/ui.js — if touching login/toast/loading
- dashboard/js/impact.js — if touching impact page data
- dashboard/css/custom.css — if adding CSS animations
- dashboard/index.html — if touching delivery form HTML
- dashboard/wallet.html — if touching wallet/CIT layout
- dashboard/marketplace.html — if touching marketplace layout
- dashboard/impact.html — if touching impact page
- proxy/src/index.js — if touching CORS proxy

CONTEXT:
- Eggologic circular economy platform on Hedera for Apex Hackathon (deadline March 22, 2026)
- Dashboard DEPLOYED at https://c4p5.github.io/EggoLogic-Hedera-Hackathon/
- CORS proxy LIVE at https://eggologic-proxy.sargas.workers.dev
- Architecture: static HTML + JS fetch + Tailwind CDN, no build tools
- GitHub Pages deploys on push to main (~20s)
- Guardian login now works with REAL tokens (no more offline fallback)
- Auto-workflow: PP submit → VVB auto-approve → EGGOCOIN mint (all automated)
- Token display uses "$EGGO" not "EGO"
- Password for all demo accounts: "test"
- CDM AMS-III.F methodology: kg_ajustados = (kg_bruto - kg_impropios) × 0.70
- EGGOCOIN supply: 1,215 (1,205 PP + 10 OWNER)
- CIT Token: 0.0.8287362 (NFT), 4 minted, 1 valid (serial #4)

WHAT WAS DONE (V8 session):
- Cloudflare Worker CORS proxy deployed (resolved CORS blocker)
- Guardian login works from browser with real tokens
- Auto-workflow orchestrator: PP submit → VVB approve → mint (with 3-step stepper UI)
- HashScan deep links on all pages (policy, tokens, accounts, transactions)
- Button text changes on impact.html CTA
- ENT-011 approved live, confirmed +15 $EGGO minted

TASK:
-Final QA
-Fine-grain brainstorming
-minor UX Improvements

Key constraints:
- Less than 1 day until hackathon deadline
- No build tools — static HTML + JS fetch + Tailwind CDN
- Auto-deploys on push to main via GitHub Actions
- Local server: cd dashboard && npx http-server . -p 8080 -c-1 --cors
- Proxy redeploy: cd proxy && wrangler deploy
- Windows 10, no python, use node for scripting
- READ FILES ON DEMAND to save context window
```
