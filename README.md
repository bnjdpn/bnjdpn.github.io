# bnjdpn.github.io

Hub public anglophone de Benjamin Dupin : applications publiées, livraisons professionnelles, produits en développement et outils open source.

Le site est volontairement statique : HTML et CSS, sans framework, cookie, analytics ni dépendance de production.
La racine publie aussi sitemap.xml, un index qui relie les sitemaps des 17 sites d’apps, d’Échappée et du hub lui-même.

## Vérifier localement

```sh
npm run check
npm run check:links
python3 -m http.server 4173
```

La branche `main` est validée puis publiée sur GitHub Pages par `.github/workflows/pages.yml`.
