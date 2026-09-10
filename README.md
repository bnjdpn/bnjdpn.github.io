# bnjdpn.github.io

The source of [Benjamin Dupin’s app catalogue](https://bnjdpn.github.io/):
apps for training, everyday routines, baby journals and play.
This is exclusively a product showcase; the publisher identity is not a professional biography.

The site is deliberately static. It ships plain HTML, CSS and JavaScript with
no production framework, cookies or analytics. Its sitemap index connects the
portfolio with the independently published product sites.

The current design uses a warm off-white background, charcoal typography and
orange accents. Real app captures introduce the collection, followed by three
spotlights, a searchable catalogue of 17 apps and a product-specific support
picker. English lives at `/`; French lives at `/fr/`.

## Local development

```sh
npm run build
npm run check
npm run check:links
python3 -m http.server 4173
```

Then open `http://localhost:4173/fr/` or `/`. Content sources live in `content/`
and `scripts/build-site.mjs`; do not edit generated HTML alone.
`content/studio-copy.mjs` contains the page copy; `productCopy` in
`content/copy.mjs` contains the product descriptions and categories.
`npm run check` validates generated outputs, document structure, metadata,
assets, internal links and the catalogue boundary. `npm run check:links`
checks public destinations and depends on network availability.

Optional browser QA uses an existing Playwright installation, with no visitor
dependency added to the site:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright npm run check:browser -- --base http://127.0.0.1:4173
```

`scripts/check-redesign-browser.mjs` checks both languages, responsive layouts,
filters, search, support, keyboard access and the page without JavaScript. It
writes screenshots and a report to `output/playwright/redesign/` by default.
`scripts/check-browser.mjs` remains separate tooling for product-route checks.
To regenerate the 1200 × 630 social preview from `scripts/og-card.html`, run:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright node scripts/render-social.mjs
```

This updates `assets/social/og.jpg`; run `npm run build` afterwards to refresh
its content hash in the page metadata. The `PLAYWRIGHT_MODULE` setting can be omitted
when `playwright` already resolves in the local environment.

## Deployment

GitHub Pages publishes the validated `main` branch through
`.github/workflows/pages.yml`. This repository contains only app catalogue
material; private résumés, email, credentials and source documents do not
belong here.

## Product sites and release maintenance

[Site inventory](docs/site-inventory.md) maps each independent product to its
sources, languages, captures, checks and publishing procedure. The portable
[site-release-sync skill](.agents/skills/site-release-sync/SKILL.md) accompanies
changes that may affect public accuracy; new availability claims require actual
public release evidence for each platform. A source change without public impact
can be documented as such without an artificial website edit.

[Design and provenance](docs/design.md) describes the current presentation and
real assets. [Current validation](docs/refonte-complete-20260907.md) records the
executed checks for this complete redesign. The earlier [redesign report](docs/redesign-20260907.md),
[swipe report](docs/swipe-explorer-20260907.md),
[media report](docs/media-presentation-20260907.md) and
[delivery report](docs/verification.md) are historical records. They describe
previous iterations; their checks do not validate the current redesign.

A local check, a successful Pages workflow and the content served publicly are
separate evidence. A new product route can pass locally while remaining 404
publicly until its separate site is published. Publish new product routes before
the portfolio links to them, with explicit authorization for each deployment.

## Présentation des évolutions du 10 septembre 2026

Le catalogue FR/EN présente les fonctionnalités finalisées et leurs captures natives, selon la consigne explicite de l’éditeur de les considérer disponibles pour cette publication. Cette décision éditoriale ne constitue pas une preuve d’approbation Apple ; les reçus de soumission restent dans les artefacts privés des apps. Les plateformes et les tarifs ne sont pas extrapolés.
