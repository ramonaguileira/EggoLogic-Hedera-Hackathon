# Privy Login + Marketplace Images + Footer Links

**Date:** 2026-03-21
**Deadline:** 2026-03-22 (Hedera Apex Hackathon)
**Status:** Approved

---

## Overview

Four changes to the Eggologic dashboard before hackathon submission:

1. **Privy Web2 login** — alongside existing Guardian auth for web2 onboarding
2. **Marketplace card images** — add real photos to 3 of 5 cards
3. **Explore Venues link** — point to Instagram instead of "Coming soon" toast
4. **Footer links** — replace all `#` placeholders across 4 pages

---

## 1. Privy Integration (Approach A — Alongside Guardian)

### Architecture

- Privy JS SDK loaded via CDN (`@privy-io/js-sdk-core`)
- No build tools — static HTML compatible
- Guardian login unchanged — still works for PP/VVB demo roles
- Privy users get "viewer" mode (read-only dashboard access)

### Files Changed

| File | Change |
|------|--------|
| `dashboard/js/config.js` | Add `PRIVY_APP_ID` placeholder |
| `dashboard/js/privy.js` | **NEW** — Privy SDK init, login, logout, state management (~60 lines) |
| `dashboard/js/ui.js` | Check Privy auth state on page load, show/hide nav elements |
| `dashboard/index.html` | Add Privy CDN script, "Continue with Email" button below Guardian login, Privy nav indicator |
| `dashboard/wallet.html` | Add Privy CDN script, nav indicator |
| `dashboard/marketplace.html` | Add Privy CDN script, nav indicator |
| `dashboard/impact.html` | Add Privy CDN script, nav indicator |

### Login Flow

1. User sees login modal with Guardian form (existing)
2. Below: divider ("or") + "Continue with Email" button
3. Click → Privy SDK opens hosted login modal (email, Google, etc.)
4. On success → store `{ privyUser: true, email, displayName }` in sessionStorage
5. Dashboard loads in viewer mode:
   - Hero metrics, impact, marketplace, wallet all visible (read-only)
   - Delivery form hidden (same as non-PP roles)
   - Nav shows "Logged in via Privy" + logout button
6. On logout → clear sessionStorage, return to login state

### Guardian Precedence

If a user logs in via Guardian, Guardian auth takes precedence. Privy state is independent — both can coexist but Guardian controls role-based access (PP form, VVB approvals).

### Config

```js
// dashboard/js/config.js
PRIVY_APP_ID: 'YOUR_PRIVY_APP_ID' // Replace with real App ID from privy.io
```

---

## 2. Marketplace Card Images

### Mappings

| Card | Current | New |
|------|---------|-----|
| Dine Out | Material Symbol icon + gradient | `img/Dine out.jpg` as background image |
| Eggs | Material Symbol icon + gradient | `img/Eggs.jpg` as background image |
| Certification | Material Symbol icon + gradient | `img/Zero_Waste.png` as background image |
| Compost | Material Symbol icon + gradient | No change (stays icon-only) |
| Bins | Material Symbol icon + gradient | No change (stays icon-only) |

### Implementation

Replace the icon/gradient `<div>` with an `<img>` tag using `object-cover` for responsive fill, keeping existing overlay text and badges.

---

## 3. Explore Venues Link

**File:** `dashboard/marketplace.html`

Change Dine Out card's "Explore Venues" button:

```html
<!-- Before -->
<button onclick="UI.showToast('Coming soon')" class="...">Explore Venues</button>

<!-- After -->
<a href="https://www.instagram.com/naturalypopular" target="_blank" rel="noopener noreferrer" class="...">Explore Venues</a>
```

---

## 4. Footer Links (All 4 Pages)

**Files:** `index.html`, `wallet.html`, `marketplace.html`, `impact.html`

All footers are identical. Update the Company and Legal columns:

### Company Column

| Link | href |
|------|------|
| About Us | `https://eggologic.org` |
| Partners | `https://www.instagram.com/naturalypopular` |
| Contact | `https://www.instagram.com/egg_o_logic` |

### Legal Column

| Link | href |
|------|------|
| Privacy | `https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1` |
| Terms | `https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1` |
| Security | `https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1` |

All external links use `target="_blank" rel="noopener noreferrer"`.

---

## Constraints

- No build tools — static HTML + JS fetch + Tailwind CDN
- Auto-deploys on push to main via GitHub Actions
- Windows 10, node-based scripting only
- Privy App ID will be provided by user (placeholder for now)
