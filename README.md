# bnjdpn.github.io

The source of [Benjamin Dupin’s public portfolio](https://bnjdpn.github.io/):
shipped applications, selected product work and open-source tools.

The site is deliberately static. It ships plain HTML, CSS and JavaScript with
no production framework, cookies or analytics. Its sitemap index connects the
portfolio with the independently published product sites.

## Local development

```sh
npm install
npm run check
npm run check:links
python3 -m http.server 4173
```

Then open `http://localhost:4173`. The checks validate document structure,
metadata, assets and internal/public links.

## Deployment

GitHub Pages publishes the validated `main` branch through
`.github/workflows/pages.yml`. This repository contains only public portfolio
material; private résumés, email, credentials and source documents do not
belong here.
