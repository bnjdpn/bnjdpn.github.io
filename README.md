# bnjdpn.github.io

The source of [Benjamin Dupin’s app catalogue](https://bnjdpn.github.io/):
apps for training, everyday routines, baby journals and play.
This is exclusively a product showcase; the publisher identity is not a professional biography.

The site is deliberately static. It ships plain HTML, CSS and JavaScript with
no production framework, cookies or analytics. Its sitemap index connects the
portfolio with the independently published product sites.

The catalogue opens with a short usage index and a searchable directory with
real product previews. Three editorial spotlights and product-specific support
follow. English lives at `/`; French at `/fr/`. Product sites keep independent
compositions and build systems, documented in [design.md](docs/design.md).

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

This updates `assets/social/og.jpg` and `assets/social/og-fr.jpg`; run `npm run build` afterwards to refresh
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
real assets. [Current validation](docs/redesign-20260914.md) records the
executed local checks and per-site evidence for this redesign. The earlier [redesign report](docs/redesign-20260907.md),
[swipe report](docs/swipe-explorer-20260907.md),
[media report](docs/media-presentation-20260907.md) and
[delivery report](docs/verification.md) are historical records. They describe
previous iterations; their checks do not validate the current redesign.

A local check, a successful Pages workflow and the content served publicly are
separate evidence. A new product route can pass locally while remaining 404
publicly until its separate site is published. Publish new product routes before
the portfolio links to them, with explicit authorization for each deployment.

## Local ecosystem review

The explicit catalogue is the only input to the cross-site preview and checker.
Existing generated outputs are required; this command does not build or publish:

```sh
python3 scripts/preview-ecosystem.py check --apps /path/to/Apps --echappee /path/to/Echappee
python3 scripts/preview-ecosystem.py serve --apps /path/to/Apps --echappee /path/to/Echappee --port 4174
# To inspect the exact prepared artifacts instead of generated docs:
python3 scripts/preview-ecosystem.py check --staged --apps /path/to/Apps --echappee /path/to/Echappee
node scripts/sync-site-foundations.mjs --check
```

The server binds to loopback and serves only public output paths, including
GitHub Pages prefixes. It does not emulate GitHub's missing-route handling.
The checker visits all HTML references, CSS assets, sitemap destinations,
manifest icons and cross-site anchors. Public destinations still require the
separate network check.

Reusable optional browser tools use an existing Playwright and axe installation:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright AXE_PATH=/path/to/axe.min.js node scripts/review-site-browser.mjs --routes routes.json --base http://127.0.0.1:4174 --out output/playwright/review
PLAYWRIGHT_MODULE=/path/to/playwright node scripts/review-site-interactions.mjs --base http://127.0.0.1:4174 --out output/playwright/interactions
PLAYWRIGHT_MODULE=/path/to/playwright node scripts/measure-product-performance.cjs /path/to/Apps BrewMeter,FastZen,GrooveLog,NeatShift,NoBuyCart,PasDuJour
```

`routes.json` is an explicit list such as
`[{"path":"/BrewMeter/fr-FR/","name":"brewmeter-fr","capture":true}]`.
The first tool captures selected routes at 1440/390 px, scans the other routes
at 320/768/1440, and checks enlarged text plus axe on the captured sample.
The interaction tool covers the six explicit foundation adopters; other sites
have local checks described in their README. Network writes are intercepted.
Performance uses each requested `_site`, three fresh browser contexts per width,
and reports current local observations without claiming field performance.
No QA dependency is shipped to visitors.

After an authorized publication, compare the served files with the exact staged
commit using `python3 scripts/check-published-artifacts.py --spec sites.json
--out output/playwright/publication-readback.json`. The JSON list supplies
`site`, `stage`, `base_url` (HTTPS, trailing slash) and full `sha` for each site.
The report checks every HTML, CSS, JavaScript, sitemap and manifest plus selected
media; `extra_paths` extends the explicit media sample. This read-only comparison
complements exact-commit CI and a browser visit to the public URLs.

The dated September 7–10 reports retain earlier decisions and checks. They are
historical evidence, not continuing authorization to announce a candidate as
available or publish the current work.
