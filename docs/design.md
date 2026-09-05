# Portfolio design and verification

The portfolio is a small static site. Its two roles remain visible from the first screen: independent products and professional software work. The art direction uses warm paper, dark green ink, generous sans-serif titles and one italic serif accent. Product stories use different compositions: an analytical dark surface for LoadSense, a wide real landscape for Échappée and a warm family journal presentation. The full catalogue is an ordered list with use filters and accent-insensitive search; it remains complete without JavaScript.

## Sources and routes

- `content/catalog.json`: shared public product identity, site path, store identifier and icon.
- `content/copy.mjs`: paired English/French editorial copy and use categories.
- `content/profile.json`, `content/experience-en.html`, `content/experience-fr.html`: the previously public professional profile and eight assignments. French is a translation of that public material.
- `scripts/build-site.mjs`: generates `/index.html`, `/fr/index.html`, `sitemap.xml` and `sitemap-pages.xml`. Never edit these generated files alone.
- `styles.css`, `assets/site.js`: responsive rendering and progressively enhanced catalogue.
- `404.html`: direct, bilingual static error page, noindex.
- `scripts/og-card.html`: source for the 1200×630 social image at `assets/social/og.jpg`.

The old root URL remains English. `/fr/` is a new French counterpart with reciprocal hreflang and a separate canonical URL. Every application remains in its own repository and GitHub Pages subpath. French product links use their existing `/fr-FR/` routes (RealmBox and TaskLane use `/fr/`). Support stays with each product; this portfolio has no support form or new service.

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

The copy describes stable uses rather than repeating fragile exercise counts, prices or unreleased details. App Store links are preserved. Prices and compatibility are referred to the store. Échappée is explicitly available for Apple silicon Mac, with iPhone/iPad later. RealmBox is explicitly a public prerelease. The former unsupported blanket Android availability is removed from the portfolio. Nova Station Pinball remains excluded.

Sources reviewed: the public portfolio, LoadSense and Échappée websites, current local website assets and existing public professional text. RealmBox public repository status was independently confirmed during the parent inventory. This is not a new store release qualification: changing catalogue copy still requires the product's current release evidence.

## Local verification

`npm run build` renders both languages. `npm run check` verifies freshness, all local references, catalogue/store identity, sitemap coverage, canonical/hreflang, all eight assignments, image dimensions, focus/reduced-motion hooks and the public deployment allowlist. `npm run check:links` covers both languages and reports network failures; rate limiting is not a successful destination check.

Real Chrome inspection through CUA covered the old public first screen and new EN desktop, FR mobile (390×844) and FR tablet (768×1024). Checked use filters (family = four), no-result search, clearing filters, accent-insensitive search (`echappee`), visible images, JavaScript console, language navigation and keyboard access to skip link and experience disclosure. Tablet document width matched its viewport and no broken image or console warning/error was observed. The main element was made focusable after checking the skip-link behavior; the final keyboard readback confirmed focus on `main`. The bilingual 404 page and its return link to `/fr/` were also inspected. Final automated browser results are recorded separately by the shared browser checker.

No push, production deployment or store mutation was performed for this design work.
