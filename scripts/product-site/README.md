# Product site generator

One Node generator for the app sites served at `bnjdpn.com/<App>/`. It replaces
the Ruby generator copied into each app repository (`marketing_site.rb`).

```sh
node scripts/product-site/build.mjs --repo /path/to/App --out .local/<run>/<App>
node scripts/product-site/check.mjs --stage .local/<run>/<App> --reference .local/<previous run>/<App>
```

The stage then goes into `scripts/assemble-cloudflare-preview.py` like any other
`local-generator-stage` entry, with the app repository and its commit.

## Inputs

- From the app repository, read only: `marketing/site.json` (locales, URLs,
  screenshots, assets to copy), `marketing/base.css`, `theme.css`, `site.js`,
  the legal pages and guides listed in `local_assets`, and
  `fastlane/metadata/<locale>/name.txt`.
- From this repository: `content/product-sites/<App>.mjs` (page copy per
  language, store facts with the date they were read) and
  `content/product-sites/ui.mjs` (form labels, menus, shared by every app).

## What it guarantees

- Same URLs as the Ruby stage: `check.mjs --reference` fails on any added or
  missing file.
- Legal pages, guides and the 404 keep their bytes; legal pages stay `noindex`.
- Each home page has a title of 60 characters or less, its own description,
  one H1, a canonical equal to its final URL, hreflang with `x-default`, Open
  Graph and a `SoftwareApplication` JSON-LD with a free offer and store links.
- Links are written in their final form (no `.html`, no internal 308).

## Writing the copy

Describe what the version submitted or on sale does, from its store listing,
release notes and strings. Keep displayed version numbers as they are. Short
sentences, concrete facts, no em dashes, no lists of negations, no pasted
store description.
