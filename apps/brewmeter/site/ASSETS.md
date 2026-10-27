# Assets et reproduction

Captures : copie sans retouche de `BrewMeter/marketing/shots/<locale>/{01,02,03}-{440,880}.{avif,webp}`. Vérifiées visuellement en français face aux captures store `01_Dashboard`, `02_Favorite`, `05_Trends`. Elles représentent respectivement le journal (221 mg), l'ajout d'un espresso (284 mg), puis la semaine (200 mg de moyenne). Aucun de ces nombres n'est utilisé comme donnée utilisateur universelle. La provenance de la version en vente est celle du fichier de référence `content/product-sites/BrewMeter.mjs` ; le champ `public_version` de l'ancien `marketing/site.json` est historique et ne sert pas à la page.

Badges Apple : fichiers officiels déjà servis par le site dans `BrewMeter/docs/assets/app-store-badges/`, copiés sans retouche dans `badges/`. Google : les fichiers officiels du dépôt central dans `assets/badges/google-play/`, via `googlePlayBadge()`.

Polices : Google Fonts, familles Caprasimo et Outfit, WOFF2 latin et latin-ext téléchargés depuis fonts.gstatic.com. Licences : fichiers `fonts/OFL-Caprasimo.txt` et `fonts/OFL-Outfit.txt`, sources `https://github.com/google/fonts/tree/main/ofl/caprasimo` et `https://github.com/google/fonts/tree/main/ofl/outfit`. Outfit est une fonte variable, déclarée 100–900 ; la page utilise 400 et 600. Caprasimo latin est le seul fichier préchargé. Les caractères japonais utilisent les glyphes de repli de la plateforme.

OG : deux JPEG 1200 × 630 composés de texte Caprasimo, d'un fond uni et de la vraie capture Dashboard dans la langue correspondante. Aucune illustration. Les pages des autres langues utilisent l'OG anglais. Aucun outil de génération d'image.

Construction : le générateur `scripts/product-site/build.mjs` appelle automatiquement `overlay(out)` ; cette fonction ne réécrit que les huit pages produit et copie ses assets. Les pages juridiques, guides et script de support restent ceux du stage. `scripts/assemble-cloudflare-preview.py` consomme `cache-headers.txt` uniquement si le CSS BrewMeter est présent dans le plan public : cache de quatre heures au niveau racine Pages, aucun `_headers` dans le stage produit.
