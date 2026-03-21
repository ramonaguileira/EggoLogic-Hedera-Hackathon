## STATUS
V9 polish done: count-up animations, footer logos, pulse glow. Hackathon deadline March 22, 2026. Changes NOT yet committed or pushed.

## PROMPT

```
Read guardian/DASHBOARD-HANDOFF-V9.md first.

Then read files ON DEMAND as needed (don't read everything upfront — saves context):
- dashboard/js/api.js — if touching Guardian POST/auth
- dashboard/js/dashboard.js — if touching delivery form, workflow orchestrator, stepper, count-up
- dashboard/js/config.js — if touching block IDs, proxy URL, config
- dashboard/js/hedera.js — if touching Hedera API calls
- dashboard/js/wallet.js — if touching wallet/CIT data
- dashboard/js/ui.js — if touching login/toast/loading
- dashboard/js/impact.js — if touching impact page data
- dashboard/css/custom.css — if adding CSS animations
- dashboard/index.html — if touching delivery form HTML, hero, footer
- dashboard/wallet.html — if touching wallet/CIT layout, footer
- dashboard/marketplace.html — if touching marketplace layout, footer
- dashboard/impact.html — if touching impact page, footer
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

WHAT WAS DONE (V9 session):
- Animated count-up on hero metrics (1.4s ease-out, requestAnimationFrame)
- Eggs metric changed from 1,020 → 936
- Footer "Powered by" logo strip on all 4 pages (Hedera, Guardian, Hashgraph)
- Logo SVGs saved in dashboard/img/ (monochrome, h-6, opacity-40)
- "Live from Hedera" pulse glow CSS animation
- V9 changes are NOT YET committed or pushed

IMMEDIATE NEXT STEPS:
1. Visual QA on localhost:8080 — verify count-up, logos, glow look correct
2. Mobile QA — check footer grid responsive (4 cols → 2 cols)
3. Commit and push to deploy to GitHub Pages
4. Verify on live site: https://c4p5.github.io/EggoLogic-Hedera-Hackathon/

TASK:
[describe what you want to do next]

Key constraints:
- Hackathon deadline is TODAY (March 22, 2026)
- No build tools — static HTML + JS fetch + Tailwind CDN
- Auto-deploys on push to main via GitHub Actions
- Local server: cd dashboard && npx http-server . -p 8080 -c-1 --cors
- Proxy redeploy: cd proxy && wrangler deploy
- Windows 10, no python, use node for scripting
- READ FILES ON DEMAND to save context window
```
