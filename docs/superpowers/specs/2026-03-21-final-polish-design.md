# Final Polish — Pre-Hackathon UX Improvements

**Date:** 2026-03-21
**Deadline:** 2026-03-22 (Hedera Apex Hackathon)
**Priority:** First impressions + screenshot quality for judges

---

## 1. Footer "Powered by" Logo Strip

### What
Add a "Powered by" section with Hedera, Guardian, and Hashgraph logos to the footer of all 4 pages (index.html, wallet.html, impact.html, marketplace.html).

### Layout
The footer's top-level layout is `flex flex-col md:flex-row`. The inner columns (Platform/Company/Legal) live in a nested `grid grid-cols-2 md:grid-cols-3 gap-20` div. The "Powered by" block is added as a **4th child in that grid**, changing it to `grid-cols-2 md:grid-cols-4`.

```
[Eggologic logo + desc]     [Platform]  [Company]  [Legal]  [Powered by]
                                                              Powered by
                                                            [H] · [G] · [HG]
─────────────────────────────────────────────────────────────────────────────
                    © 2026 Eggologic Regenerative Finance...
```

### Styling
- "Powered by" label: same `font-bold text-primary text-xs uppercase tracking-[0.2em] mb-8` as other column headers
- Logos: inline SVGs, rendered monochrome using `fill="currentColor"` inheriting from parent text color
- Logo height: ~24px, muted opacity (`opacity-40 hover:opacity-70 transition-opacity`)
- Logos arranged horizontally with `flex items-center gap-6`
- Column uses same grid alignment as existing footer columns

### Logos (inline SVGs, monochrome)
- **Hedera**: Hedera "H" logomark — simplified path, `fill="currentColor"`
- **Guardian**: Guardian shield logomark — simplified path, `fill="currentColor"`
- **Hashgraph**: Hashgraph swirl/network logomark — simplified path, `fill="currentColor"`

SVGs will be sourced from official brand pages and simplified to single-path monochrome marks. If official SVGs cannot be obtained quickly, clean approximations will be hand-drawn at ~24px viewport.

### Files changed
- `dashboard/index.html` — footer section
- `dashboard/wallet.html` — footer section
- `dashboard/impact.html` — footer section
- `dashboard/marketplace.html` — footer section

---

## 2. Animated Count-Up on Hero Metrics

### What
On index.html, the 3 hero metrics (waste processed, CO2 avoided, eggs produced) animate from 0 to their final value on page load.

### Behavior
- Triggers when data arrives (after Guardian/Mirror Node fetch, or on fallback values)
- Numbers animate from `0` to final value over **1.4s**
- Easing: ease-out (fast start, decelerates)
- Handles suffixes: numeric part animates, suffix (e.g., `t`, `kg`) stays fixed
- Eggs metric: **intentionally changed from current value 1,020 to 936** (user-requested correction)
- No Intersection Observer needed — metrics are above the fold

### Implementation
- New function `countUp(elementId, target, suffix, duration)` in `dashboard.js`
- `target` is a **raw number** (e.g., `1.8`, `859`, `936`). At each animation frame, the interpolated value is formatted using `UI.fmt()` (integers) or `toFixed(1)` (decimals) before setting `textContent`. A `decimals` parameter controls this.
- Uses `requestAnimationFrame` — no external libraries
- Called from `loadGlobalMetrics()` instead of `UI.setText()` for the 3 metric elements
- `duration` default: 1400ms
- Both the success path (line 31-40) and fallback/catch path (line 46-49) in `loadGlobalMetrics()` must be updated

### Edge cases
- If element not found, skip silently
- If target is 0, just set "0" + suffix immediately (no animation)
- Decimals: supports 1 decimal place for values like `1.8t` via `decimals` param

### Files changed
- `dashboard/js/dashboard.js` — add `countUp()`, modify `loadGlobalMetrics()`

---

## 3. "Live from Hedera" Pulse Glow

### What
Enhance the existing green dot next to "Live from Hedera" on the index.html hero with a soft pulsing box-shadow glow.

### Implementation
New CSS keyframe + class in `custom.css`:

```css
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 6px 2px rgba(74, 222, 128, 0.4); }
  50% { box-shadow: 0 0 14px 6px rgba(74, 222, 128, 0.7); }
}
.live-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}
```

Applied to the **inner** solid green dot span (the `relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500` element). The **outer** span with `animate-ping` is left unchanged — the two animations layer: ping ring expands outward, glow pulses on the dot.

### Files changed
- `dashboard/css/custom.css` — add keyframe + `.live-glow` class
- `dashboard/index.html` — add `live-glow` class to the inner dot span

---

## Summary of all file changes

| File | Changes |
|------|---------|
| `dashboard/index.html` | Footer logo strip, `live-glow` class on hero dot |
| `dashboard/wallet.html` | Footer logo strip |
| `dashboard/impact.html` | Footer logo strip |
| `dashboard/marketplace.html` | Footer logo strip |
| `dashboard/js/dashboard.js` | `countUp()` function, eggs → 936, call from `loadGlobalMetrics()` |
| `dashboard/css/custom.css` | `pulseGlow` keyframe + `.live-glow` class |
