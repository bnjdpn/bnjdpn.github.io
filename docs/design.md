# Portfolio design and verification

The portfolio is a small static site. Its first screen introduces app uses: training, everyday routines, life with a baby and virtual rides. The publisher name is a discreet identity. The art direction uses warm paper, dark green ink, generous sans-serif titles and one italic serif accent. Product stories use different compositions: an analytical dark surface for LoadSense, a wide real landscape for Échappée and a warm family journal presentation. The full catalogue is an ordered list with use filters and accent-insensitive search; it remains complete without JavaScript.

## Sources and routes

- `content/catalog.json`: shared public product identity, site path, store identifier and icon.
- `content/copy.mjs`: paired English/French editorial copy and use categories.
- `content/profile.json`: publisher name and URL only. No career, client, employer or service content is included.
- `scripts/build-site.mjs`: generates `/index.html`, `/fr/index.html`, `sitemap.xml` and `sitemap-pages.xml`. Never edit these generated files alone.
- `styles.css`, `assets/site.js`: responsive rendering and progressively enhanced catalogue.
- `404.html`: direct, bilingual static error page, noindex.
- `scripts/og-card.html`: source for the 1200×630 social image at `assets/social/og.jpg`.

The old root URL remains English. `/fr/` is a new French counterpart with reciprocal hreflang and a separate canonical URL. Every application remains in its own repository and GitHub Pages subpath. French product links use their existing `/fr-FR/` routes . Support stays with each product; this portfolio has no support form or new service.

## Product assets

The preview files are copies of existing product website assets, inspected visually on 5 September 2026. They are real app interfaces composed for the stores, plus a real Échappée game capture. No interface was drawn or generated for this redesign.

| Portfolio asset | Source repository and path | Language |
| --- | --- | --- |
| `assets/previews/loadsense-{en,fr}.webp` | `LoadSense/docs/assets/shots/{en-US,fr-FR}/01-440.webp` | EN/FR |
| `assets/previews/temporeps-{en,fr}.webp` | `TempoReps/docs/assets/shots/{en-US,fr-FR}/01-440.webp` | EN/FR |
| `assets/previews/petites-gouttes-{en,fr}.webp` | `petites-gouttes/docs/assets/shots/{en-US,fr-FR}/01-440.webp` | EN/FR |
| `assets/previews/echappee.webp` | `Echappee/site/assets/img/world/monde-col-1520.webp` | No interface text |

Échappée's caption preserves the public reproduction coordinates: seed 52025, km 8.3, 17:45. The seven compressed preview files total approximately 130 KB. Existing app icons and the public GitHub avatar are reused. The hero frames are CSS presentation around those existing images.

## Content boundaries

The copy describes stable uses rather than repeating fragile exercise counts, prices or unreleased details. App Store links are preserved. Prices and compatibility are referred to the store. Échappée is explicitly available for Apple silicon Mac, with iPhone/iPad later. The former unsupported blanket Android availability is removed from the portfolio. Nova Station Pinball remains excluded.

The public App Store lookup was read on 7 September 2026 for all 17 identifiers. The JSON response is kept with this task’s QA evidence; candidate metadata does not replace public facts.

## Validation

See [verification.md](verification.md) for this intervention’s executed checks. The catalogue boundary guard examines public sources and shipped assets, including structured data, maps and share previews. Internal documentation can explain exclusions without triggering false positives.
