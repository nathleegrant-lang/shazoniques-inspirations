# Mobile responsiveness review — v2.4

Launch Readiness Phase 2. A review-and-refine pass, not a redesign. The guiding rule for every
call below: **where a choice was more impressive but less peaceful, the peaceful one was kept.**

## What was already right

The site was built mobile-first, and the review confirmed it holds up:

- **Viewport** is correctly set (`width=device-width, initial-scale=1`).
- **Every multi-column grid collapses to one or two columns on phones** — the homepage's
  three-column author row, the reflection library, the book shelves, the education and community
  cards all have single- or two-column bases and only widen at `sm`/`lg`.
- **No fixed-pixel widths force horizontal scroll.** The two wide containers (`max-w-[88rem]`,
  `max-w-[92rem]`) are centring caps with responsive padding, not fixed widths.
- **The hero uses a fixed `min-h-[30rem]`, not `100svh`** — which is the calmer, safer choice on
  a phone: no full-screen-height surprise, and it survives landscape orientation.
- **No tables, no wide code blocks, no unbreakable strings.** The longest book titles are ordinary
  multi-word English and wrap cleanly.
- **The mobile menu lays every destination open** — no nested taps.

A static scan of all 145 rendered pages found **zero** overflow-prone patterns.

## What was fixed

Three small, real issues — each a comfort fix, none a redesign:

1. **Mobile menu height.** The scrollable menu capped its height at `100svh − 5rem`, but the
   header had grown to `h-24` (6rem). On a short screen the last nav item could sit under the
   fold. Corrected to `100svh − 6rem` so it matches the header exactly.

2. **Search and filter tap targets.** The reflection library's search box and dropdowns were
   `py-2` (~34px tall) — usable, but below the ~44px that a fingertip wants. Raised to `py-2.5`
   with more horizontal padding.

3. **iOS zoom-on-focus.** Those same inputs used 14px text. Mobile Safari zooms the whole page
   when you focus an input smaller than 16px — a jarring, distinctly un-peaceful lurch. They now
   render at 16px on phones and return to 14px from `sm` up, where the zoom behaviour doesn't
   apply.

## One honest limit

Live pixel-measurement in a real browser (Playwright/headless Chromium) could not run here: the
sandbox blocks the Chromium download. This review is therefore based on static analysis of the
rendered HTML and a full audit of the responsive class system, not on screenshots at device
widths. Both are reliable for structure and overflow; neither is a substitute for opening the site
on an actual phone.

**Recommended before launch:** open the deployed Vercel preview on a real iPhone and a real
Android device, and walk the homepage, the reflection library (with the filters open), a book
page, and the mobile menu. That is the one check this environment cannot perform.
