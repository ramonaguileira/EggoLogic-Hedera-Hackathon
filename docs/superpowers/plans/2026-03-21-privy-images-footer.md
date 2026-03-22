# Privy Login + Marketplace Images + Footer Links — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Privy Web2 login alongside Guardian auth, add real images to 3 marketplace cards, link "Explore Venues" to Instagram, and update all footer links across 4 pages.

**Architecture:** Static HTML + JS (no build tools). Privy SDK loaded via esm.sh CDN as ES module. All changes are to files in `dashboard/`. Footer and image changes are pure HTML edits. Privy adds one new JS module file + config changes + UI modifications.

**Tech Stack:** HTML, Tailwind CDN, vanilla JS, Privy JS SDK Core via esm.sh, Hedera Mirror Node API

**Spec:** `docs/superpowers/specs/2026-03-21-privy-images-footer-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `dashboard/js/config.js` | Modify | Add `PRIVY_APP_ID` and `PRIVY_CLIENT_ID` placeholders |
| `dashboard/js/privy.js` | **Create** | ES module — Privy SDK init, login, logout, state management |
| `dashboard/js/ui.js` | Modify | Check Privy auth state in `updateAuthUI()`, add Privy login button to modal |
| `dashboard/index.html` | Modify | Add privy module script tag, footer links |
| `dashboard/wallet.html` | Modify | Add privy module script tag, footer links |
| `dashboard/marketplace.html` | Modify | Add privy module script tag, footer links, card images, Explore Venues link |
| `dashboard/impact.html` | Modify | Add privy module script tag, footer links |

---

## Task 1: Footer Links (All 4 Pages)

**Files:**
- Modify: `dashboard/index.html:381,387`
- Modify: `dashboard/wallet.html:207,213`
- Modify: `dashboard/marketplace.html:261,267`
- Modify: `dashboard/impact.html:297,303`

- [ ] **Step 1: Update index.html Company column footer links**

In `dashboard/index.html` line 381, replace:
```html
<li><a href="#">About Us</a></li><li><a href="#">Partners</a></li><li><a href="#">Contact</a></li>
```
with:
```html
<li><a href="https://eggologic.org" target="_blank" rel="noopener noreferrer">About Us</a></li><li><a href="https://www.instagram.com/naturalypopular" target="_blank" rel="noopener noreferrer">Partners</a></li><li><a href="https://www.instagram.com/egg_o_logic" target="_blank" rel="noopener noreferrer">Contact</a></li>
```

- [ ] **Step 2: Update index.html Legal column footer links**

In `dashboard/index.html` line 387, replace:
```html
<li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Security</a></li>
```
with:
```html
<li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1" target="_blank" rel="noopener noreferrer">Privacy</a></li><li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1" target="_blank" rel="noopener noreferrer">Terms</a></li><li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1" target="_blank" rel="noopener noreferrer">Security</a></li>
```

- [ ] **Step 3: Repeat for wallet.html (lines 207, 213)**

Same replacements as Steps 1-2.

- [ ] **Step 4: Repeat for marketplace.html (lines 261, 267)**

Same replacements as Steps 1-2.

- [ ] **Step 5: Repeat for impact.html (lines 297, 303)**

Same replacements as Steps 1-2.

- [ ] **Step 6: Commit**

```bash
git add dashboard/index.html dashboard/wallet.html dashboard/marketplace.html dashboard/impact.html
git commit -m "feat: add footer links across all 4 pages"
```

---

## Task 2: Marketplace Card Images + Explore Venues Link

**Files:**
- Modify: `dashboard/marketplace.html:100-121` (Dine Out card), `171-180` (Certification card), `194-203` (Eggs card), `118` (Explore Venues button)

- [ ] **Step 1: Replace Dine Out card icon area with background image**

In `dashboard/marketplace.html`, replace the Dine Out card's inner div (lines 100-121). Change the content div to use a real image as background:

Replace lines 100-121:
```html
    <div class="relative h-[360px] md:h-[480px] overflow-hidden bg-gradient-to-br from-[#10381E] to-[#284f33] flex items-center justify-center">
      <!-- Decorative pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 border-2 border-white/40 rounded-full"></div>
        <div class="absolute top-20 right-20 w-48 h-48 border border-white/20 rounded-full"></div>
        <div class="absolute bottom-32 left-1/3 w-24 h-24 border border-white/30 rounded-full"></div>
      </div>
      <div class="text-center p-6 md:p-10 relative z-10">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#C1EDC7]/15 border border-[#C1EDC7]/20 flex items-center justify-center">
          <span class="material-symbols-outlined text-[#C1EDC7] text-5xl">restaurant</span>
        </div>
        <h2 class="font-headline text-3xl md:text-5xl text-white font-medium mb-4">Dine Out</h2>
        <p class="text-white/70 text-base md:text-lg mb-6 max-w-md mx-auto">Explore our partners and get discounts at their Restaurants for brunch, tea, or dinner!</p>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
      <div class="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10">
        <span class="inline-block px-3 py-1 rounded-full bg-[#FBD54E] text-primary text-[10px] font-bold uppercase tracking-widest mb-4">Featured Tier</span>
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6">
          <button onclick="UI.showToast('Coming soon')" class="px-8 py-3.5 rounded-full bg-white text-primary font-bold hover:bg-[#C1EDC7] transition-all shadow-lg">Explore Venues</button>
        </div>
      </div>
    </div>
```

With:
```html
    <div class="relative h-[360px] md:h-[480px] overflow-hidden">
      <img src="img/Dine out.jpg" alt="Restaurant partners for Eggologic" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
      <div class="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10">
        <span class="inline-block px-3 py-1 rounded-full bg-[#FBD54E] text-primary text-[10px] font-bold uppercase tracking-widest mb-4">Featured Tier</span>
        <h2 class="font-headline text-3xl md:text-5xl text-white font-medium mb-3">Dine Out</h2>
        <p class="text-white/80 text-base md:text-lg mb-6 max-w-md">Explore our partners and get discounts at their Restaurants for brunch, tea, or dinner!</p>
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6">
          <a href="https://www.instagram.com/naturalypopular" target="_blank" rel="noopener noreferrer" class="px-8 py-3.5 rounded-full bg-white text-primary font-bold hover:bg-[#C1EDC7] transition-all shadow-lg inline-block no-underline">Explore Venues</a>
        </div>
      </div>
    </div>
```

This simultaneously:
- Adds the `Dine out.jpg` image as background
- Converts the "Explore Venues" `<button>` to an `<a>` linking to Instagram
- Keeps overlay text and badges

- [ ] **Step 2: Replace Zero-Waste Certification card icon with image**

In `dashboard/marketplace.html`, replace the Certification card's image area (lines 172-179):

```html
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: radial-gradient(circle at 30% 70%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="relative flex flex-col items-center gap-3">
        <div class="w-20 h-20 rounded-2xl bg-[#C1EDC7]/15 border border-[#C1EDC7]/20 flex items-center justify-center backdrop-blur-sm">
          <span class="material-symbols-outlined text-[#C1EDC7] text-4xl">sensors</span>
        </div>
        <span class="text-[#C1EDC7]/60 text-[10px] font-bold uppercase tracking-widest">GREEN CERT</span>
      </div>
```

With:
```html
      <img src="img/Zero_Waste.png" alt="Zero-Waste Certification" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
```

Also update the parent div (line 172) to remove the gradient background classes:

Change:
```html
    <div class="h-56 md:h-64 overflow-hidden relative bg-gradient-to-br from-[#284f33] to-[#386846] flex items-center justify-center">
```
To:
```html
    <div class="h-56 md:h-64 overflow-hidden relative">
```

- [ ] **Step 3: Replace Eggs card icon with image**

In `dashboard/marketplace.html`, replace the Eggs card's image area (lines 196-202):

```html
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: radial-gradient(circle at 30% 70%, #10381E 1px, transparent 1px), radial-gradient(circle at 70% 30%, #10381E 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="relative flex flex-col items-center gap-3">
        <div class="w-20 h-20 rounded-2xl bg-[#10381E]/8 border border-[#10381E]/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[#10381E]/40 text-4xl">egg</span>
        </div>
        <span class="text-[#C1EDC7]/40 text-[10px] font-bold uppercase tracking-widest">Free Range</span>
      </div>
```

With:
```html
      <img src="img/Eggs.jpg" alt="Free range Eggologic eggs" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
```

Also update the parent div (line 195) to remove the gradient background:

Change:
```html
    <div class="h-56 md:h-64 overflow-hidden relative bg-gradient-to-br from-[#DCC49C]/30 to-[#F5F3E8] flex items-center justify-center">
```
To:
```html
    <div class="h-56 md:h-64 overflow-hidden relative">
```

- [ ] **Step 4: Commit**

```bash
git add dashboard/marketplace.html
git commit -m "feat: add marketplace card images + Explore Venues Instagram link"
```

---

## Task 3: Privy Config + Module

**Files:**
- Modify: `dashboard/js/config.js:41`
- Create: `dashboard/js/privy.js`

**Note:** The `@privy-io/js-sdk-core` is a headless SDK — it does NOT have a hosted login modal. It requires a two-step email OTP flow: (1) send verification code, (2) user enters code to authenticate. The login UI is built into our existing login modal.

- [ ] **Step 1: Add Privy config to config.js**

In `dashboard/js/config.js`, before the closing `};` (line 41), add:

```js
  // Privy Web2 Login (esm.sh CDN)
  PRIVY_APP_ID: 'YOUR_PRIVY_APP_ID',
  PRIVY_CLIENT_ID: 'YOUR_PRIVY_CLIENT_ID',
```

- [ ] **Step 2: Create dashboard/js/privy.js**

Create `dashboard/js/privy.js` as an ES module:

```js
// Eggologic — Privy Web2 Login (ES Module)
// Loaded via <script type="module"> in each HTML page
// SDK served by esm.sh (resolves all transitive deps)
// Uses headless email OTP flow (send code → verify code)

let privyClient = null;
let _pendingEmail = null;

async function initPrivy() {
  // Skip init if using placeholder credentials
  if (!CONFIG.PRIVY_APP_ID || CONFIG.PRIVY_APP_ID === 'YOUR_PRIVY_APP_ID') {
    console.info('[Privy] No App ID configured — Web2 login disabled');
    return;
  }

  try {
    const PrivyModule = await import('https://esm.sh/@privy-io/js-sdk-core@0.60.0');
    const Privy = PrivyModule.default;
    const LocalStorage = PrivyModule.LocalStorage;

    privyClient = new Privy({
      appId: CONFIG.PRIVY_APP_ID,
      clientId: CONFIG.PRIVY_CLIENT_ID,
      storage: new LocalStorage(),
    });

    // Check if already authenticated from previous session via our sessionStorage flag
    const savedUser = getPrivyUser();
    if (savedUser) {
      window.UI?.updateAuthUI?.();
    }

    // Show the Privy login section now that SDK loaded
    const section = document.getElementById('privy-section');
    if (section) section.classList.remove('hidden');
  } catch (e) {
    console.warn('[Privy] SDK failed to load, Web2 login unavailable:', e.message);
  }
}

// Step 1: Send OTP code to email
async function privySendCode() {
  const emailInput = document.getElementById('privy-email');
  const email = emailInput?.value?.trim();
  if (!email) {
    UI.showToast('Please enter your email');
    return;
  }
  if (!privyClient) {
    UI.showToast('Web2 login unavailable');
    return;
  }

  const btn = document.getElementById('privy-send-btn');
  try {
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    _pendingEmail = email;
    await privyClient.auth.email.sendCode(email);

    // Show OTP input, hide email input
    document.getElementById('privy-email-step')?.classList.add('hidden');
    document.getElementById('privy-otp-step')?.classList.remove('hidden');
    document.getElementById('privy-otp')?.focus();
  } catch (e) {
    UI.showToast('Failed to send code: ' + e.message);
  } finally {
    if (btn) { btn.textContent = 'Send Code'; btn.disabled = false; }
  }
}

// Step 2: Verify OTP code
async function privyVerifyCode() {
  const code = document.getElementById('privy-otp')?.value?.trim();
  if (!code || !_pendingEmail) return;

  const btn = document.getElementById('privy-verify-btn');
  try {
    if (btn) { btn.textContent = 'Verifying...'; btn.disabled = true; }
    const authSession = await privyClient.auth.email.loginWithCode(
      _pendingEmail,
      code,
    );

    const user = authSession?.user || privyClient.user;
    setPrivySession({
      id: user?.id || _pendingEmail,
      email: _pendingEmail,
    });
    _pendingEmail = null;

    UI.closeLogin();
    UI.updateAuthUI();
    UI.showToast('Signed in via Privy');
    if (typeof onLogin === 'function') onLogin();
  } catch (e) {
    UI.showToast('Invalid code — try again');
  } finally {
    if (btn) { btn.textContent = 'Verify'; btn.disabled = false; }
  }
}

// Reset the Privy form back to step 1
function privyReset() {
  _pendingEmail = null;
  const emailInput = document.getElementById('privy-email');
  if (emailInput) emailInput.value = '';
  const otpInput = document.getElementById('privy-otp');
  if (otpInput) otpInput.value = '';
  document.getElementById('privy-email-step')?.classList.remove('hidden');
  document.getElementById('privy-otp-step')?.classList.add('hidden');
}

async function privyLogout() {
  try {
    if (privyClient) await privyClient.auth.logout();
  } catch (_) {}
  sessionStorage.removeItem('privy_user');
  privyReset();
  UI.updateAuthUI();
  location.reload();
}

function setPrivySession(info) {
  sessionStorage.setItem('privy_user', JSON.stringify({
    privyUser: true,
    id: info.id,
    email: info.email || 'Web2 User',
  }));
}

function getPrivyUser() {
  try {
    return JSON.parse(sessionStorage.getItem('privy_user'));
  } catch (_) {
    return null;
  }
}

function isPrivyLoggedIn() {
  return !!getPrivyUser();
}

// Expose to global scope for use by ui.js and onclick handlers
window.Privy = {
  init: initPrivy, sendCode: privySendCode, verifyCode: privyVerifyCode,
  reset: privyReset, logout: privyLogout, getUser: getPrivyUser, isLoggedIn: isPrivyLoggedIn,
};

// Auto-init when DOM is ready (CONFIG is loaded before this module via regular script tag)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrivy);
} else {
  initPrivy();
}
```

- [ ] **Step 3: Commit**

```bash
git add dashboard/js/config.js dashboard/js/privy.js
git commit -m "feat: add Privy config and SDK module with email OTP flow"
```

---

## Task 4: Privy UI Integration

**Files:**
- Modify: `dashboard/js/ui.js:36-40` (login modal), `dashboard/js/ui.js:84-108` (updateAuthUI)
- Modify: `dashboard/index.html:409` (script tag)
- Modify: `dashboard/wallet.html:234` (script tag)
- Modify: `dashboard/marketplace.html:314` (script tag)
- Modify: `dashboard/impact.html:324` (script tag)

- [ ] **Step 1: Add Privy email OTP form to login modal in ui.js**

In `dashboard/js/ui.js`, after the Guardian "Sign In" button (line 38), add a Privy section inside the modal. Replace:

```js
        <p class="text-[10px] text-stone-400 text-center mt-6">Demo accounts — Hedera Testnet</p>
```

With:

```js
        <p class="text-[10px] text-stone-400 text-center mt-6">Demo accounts — Hedera Testnet</p>
        <div id="privy-section" class="hidden">
          <div class="relative flex items-center my-6">
            <div class="flex-grow border-t border-stone-200"></div>
            <span class="mx-4 text-xs text-stone-400 font-medium">or continue with email</span>
            <div class="flex-grow border-t border-stone-200"></div>
          </div>
          <div id="privy-email-step">
            <div class="flex gap-2">
              <input id="privy-email" type="email" placeholder="you@email.com" class="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 bg-stone-50" />
              <button id="privy-send-btn" onclick="Privy.sendCode()" class="px-5 py-3 bg-[#6C63FF] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">Send Code</button>
            </div>
          </div>
          <div id="privy-otp-step" class="hidden">
            <p class="text-xs text-stone-500 mb-2">Enter the code sent to your email</p>
            <div class="flex gap-2">
              <input id="privy-otp" type="text" placeholder="6-digit code" maxlength="6" class="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-sm text-center tracking-[0.3em] font-mono focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 bg-stone-50" />
              <button id="privy-verify-btn" onclick="Privy.verifyCode()" class="px-5 py-3 bg-[#6C63FF] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">Verify</button>
            </div>
            <button onclick="Privy.reset()" class="text-xs text-stone-400 hover:text-stone-600 mt-2">Use a different email</button>
          </div>
          <p class="text-[10px] text-stone-400 text-center mt-3">Powered by <span class="font-bold">Privy</span> — Web2 onboarding</p>
        </div>
```

- [ ] **Step 2: Update updateAuthUI() to handle Privy state**

In `dashboard/js/ui.js`, replace the `updateAuthUI` function (lines 84-108):

```js
  function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    if (!authBtn) return;

    if (GuardianAPI.isLoggedIn()) {
      const user = GuardianAPI.currentUser();
      authBtn.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-[#C1EDC7] flex items-center justify-center">
          <span class="material-symbols-outlined text-[14px] text-[#10381E]">person</span>
        </div>
        <span class="text-white text-xs font-semibold">${user.role || 'User'}</span>
        <span class="material-symbols-outlined text-white text-sm cursor-pointer" onclick="event.stopPropagation(); GuardianAPI.logout(); UI.updateAuthUI(); location.reload();">logout</span>
      `;
      authBtn.onclick = null;
    } else {
      authBtn.innerHTML = `
        <div class="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[14px] text-white">person</span>
        </div>
        <span class="text-white text-xs font-semibold">Log In</span>
        <span class="material-symbols-outlined text-white text-sm">keyboard_arrow_down</span>
      `;
      authBtn.onclick = () => UI.openLogin();
    }
  }
```

With:

```js
  function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    if (!authBtn) return;

    if (GuardianAPI.isLoggedIn()) {
      const user = GuardianAPI.currentUser();
      authBtn.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-[#C1EDC7] flex items-center justify-center">
          <span class="material-symbols-outlined text-[14px] text-[#10381E]">person</span>
        </div>
        <span class="text-white text-xs font-semibold">${user.role || 'User'}</span>
        <span class="material-symbols-outlined text-white text-sm cursor-pointer" onclick="event.stopPropagation(); GuardianAPI.logout(); UI.updateAuthUI(); location.reload();">logout</span>
      `;
      authBtn.onclick = null;
    } else if (window.Privy?.isLoggedIn()) {
      const pUser = window.Privy.getUser();
      authBtn.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-[#6C63FF] flex items-center justify-center">
          <span class="material-symbols-outlined text-[14px] text-white">mail</span>
        </div>
        <span class="text-white text-xs font-semibold">${pUser.email || 'Web2 User'}</span>
        <span class="material-symbols-outlined text-white text-sm cursor-pointer" onclick="event.stopPropagation(); Privy.logout();">logout</span>
      `;
      authBtn.onclick = null;
    } else {
      authBtn.innerHTML = `
        <div class="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[14px] text-white">person</span>
        </div>
        <span class="text-white text-xs font-semibold">Log In</span>
        <span class="material-symbols-outlined text-white text-sm">keyboard_arrow_down</span>
      `;
      authBtn.onclick = () => UI.openLogin();
    }
  }
```

- [ ] **Step 3: Add privy.js module script to all 4 HTML pages**

After the `ui.js` script tag in each page, add:

```html
<script type="module" src="js/privy.js"></script>
```

Files and line numbers (insert AFTER the line shown):
- `dashboard/index.html:409` (after `<script src="js/ui.js"></script>`)
- `dashboard/wallet.html:234` (after `<script src="js/ui.js"></script>`)
- `dashboard/marketplace.html:314` (after `<script src="js/ui.js"></script>`)
- `dashboard/impact.html:324` (after `<script src="js/ui.js"></script>`)

- [ ] **Step 4: Commit**

```bash
git add dashboard/js/ui.js dashboard/index.html dashboard/wallet.html dashboard/marketplace.html dashboard/impact.html
git commit -m "feat: integrate Privy email OTP login UI across all pages"
```

---

## Task 5: Manual Verification

- [ ] **Step 1: Start local server and verify all changes**

```bash
cd dashboard && npx http-server . -p 8080 -c-1 --cors
```

Verify in browser at `http://localhost:8080`:
1. Footer links open correct URLs in new tabs (all 4 pages)
2. Marketplace: Dine Out, Eggs, Certification cards show images
3. Marketplace: "Explore Venues" links to Instagram
4. Login modal shows "or" divider + "Continue with Email" button
5. Guardian login still works as before
6. Privy button shows (hidden until SDK loads, graceful fallback if it doesn't)

- [ ] **Step 2: Verify no console errors on pages without login**

Open each page and check browser console — no JS errors should appear. The Privy button should gracefully hide if the App ID is still placeholder.
