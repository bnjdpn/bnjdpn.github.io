# Complete portfolio redesign — 7 September 2026

The portfolio has been rebuilt around an editorial app collection: charcoal and
orange on a light background, an opening composed from authentic product screens,
three spotlights, a searchable catalogue, and a product-specific support picker.
Both English and French pages, the 404 page, favicon, manifest and social preview
use the new presentation. The 17-product catalogue and product destinations are
preserved. The previous swipe, selection and generative animation runtime has
been removed; its browser storage is neither read nor cleared.

## Executed local validation

- `npm run check`: generated EN/FR outputs, 17 products and store IDs, structured
  data, sitemaps, 56 local references, static fallback, and catalogue boundary pass.
- Portable `site-release-sync` checks and all 7 simulated scenarios pass.
- `scripts/check-redesign-browser.mjs`: **408 / 408 checks pass** in Chromium at
  widths 1440, 768, 390 and 320, in both languages. This covers search, categories,
  reset/focus, empty results, support selection, keyboard access, no-JavaScript
  content, images, console, horizontal overflow and clipped headings. Enlarged
  text uses a doubled root font size, not browser page zoom. No network writes.
- 404 supplementary checks pass at 1440, 390 and 320; both language links reach
  the correct homepage. The local server tests `/404.html` directly and does not
  emulate GitHub Pages' missing-route behavior.
- Desktop/mobile screenshot review includes the opening, Échappée and the paired
  LoadSense/family blocks. The new 1200 × 630 social image was rendered from
  `scripts/og-card.html` and visually checked after image proportions were fixed.
- Syntax checks and `git diff --check` pass.

Browser reports and screenshots are local, ignored artifacts under
`output/playwright/redesign/`. They are excluded from the Pages allowlist.

## Independent public-content audit

All 17 public Apple Lookup records were confirmed with HTTP 200 and one result;
versions match `public-store-readback.json`. Échappée remains Mac software 1.0.0
for Apple silicon, with iPhone/iPad coming later. All 33 localized preview files
match their currently served product-site sources byte for byte (SHA-256).

The public-link check confirmed 48 destinations. Five App Store web requests
returned HTTP 429 (ColdLoad, MoveAtlas, BrewMeter, NoBuy Cart and Pas du Jour),
so that command did not fully pass. Their IDs were independently confirmed by
Apple Lookup. All 34 support destinations and the 32 product contact anchors
were separately confirmed. No destination change was needed.

This records the candidate checks before publication. A successful Pages workflow
and an independent comparison of the served files are separate delivery evidence.
The earlier design and swipe reports remain historical.
