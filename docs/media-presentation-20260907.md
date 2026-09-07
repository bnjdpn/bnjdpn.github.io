# Product media refinement — 7 September 2026

The portfolio now gives product interfaces more room and removes the repeated
App Store poster headings and artificial perspective frames. The existing
discovery cycle, generative backgrounds and scroll chapters remain in place.

## Media and framing

- 32 localized previews are byte-identical copies of already public app media.
  Fifteen apps use their 880 px files; Pas du Jour retains its 422 px source.
  Échappée retains the existing 1520 × 950 game capture.
- `content/preview-media.json` records the exact source, dimensions and normalized
  interface frame. A separate catalogue offset keeps charts, calendars, comparisons
  and tooth diagrams visible in the shorter cards.
- FastZen uses published image 03, with separate FR/EN frames because its source
  composition differs between languages. It remains existing marketing media,
  not a newly invented interface.
- CSS performs the framing. Source image pixels are neither altered nor upscaled.
  Watch imagery is capped at 210 CSS pixels; the tooth diagram has its own width
  cap so both arches fit.
- The social card uses the same original LoadSense media and flat presentation.
  CSS and JavaScript URLs include content hashes to refresh returning visitors.

## Verification executed

- Static generation and catalogue checks passed, including all 17 products,
  paired EN/FR routes, local assets, store destinations and deployment boundaries.
- The portable site check and its seven simulated scenarios passed.
- Browser inspection covered all 17 featured apps in both languages at 390, 768
  and 1440 px, followed by focused checks after the framing refinements.
- The final catalogue pass checked 102 card layouts, with all images loaded and
  no horizontal overflow or exposed gaps below the cropped frames.
- Fourteen landscape layouts checked separation between Échappée's caption and
  the bottom navigation. Motion pause kept the product in place; reduced motion,
  the static fallback, catalogue filters and app rotation were also exercised.
- SHA-256 comparisons confirmed all 32 preview files against both their local
  originals and the corresponding images served by the product sites.

Local browser images and machine-readable reports are in the ignored
`output/playwright/media-final/` and `output/playwright/media-layout/` directories.
These are local checks; Pages workflow success and the deployed public files are
verified separately after the authorized push.
