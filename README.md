# bnjdpn.github.io

The source of [Benjamin Dupin’s app catalogue](https://bnjdpn.github.io/):
apps for training, everyday routines, baby journals and play.
This is exclusively a product showcase; the publisher identity is not a professional biography.

The site is deliberately static. It ships plain HTML, CSS and JavaScript with
no production framework, cookies or analytics. Its sitemap index connects the
portfolio with the independently published product sites.

## Local development

```sh
npm run build
npm run check
npm run check:links
python3 -m http.server 4173
```

Then open `http://localhost:4173/fr/` or `/`. Content sources live in `content/`
and `scripts/build-site.mjs`; do not edit generated HTML alone.
The checks validate document structure,
metadata, assets and internal/public links.

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

[Design and provenance](docs/design.md) describes the presentation and real assets.
[Visual redesign report](docs/redesign-20260907.md) records this design and its
executed browser checks. The [earlier delivery report](docs/verification.md) keeps
the history of the catalogue and release-maintenance work.
Browser QA is optional tooling, not a visitor dependency; see the inventory for
`check-browser.mjs`. A new route can pass locally while remaining 404 publicly
until its separate site is published. Publish new product routes before the
portfolio links to them, with explicit authorization for each deployment.
