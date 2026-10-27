# GrooveLog : sources de la page produit

`copy.mjs` organise le texte et reprend les faits de `content/product-sites/GrooveLog.mjs`. `page.mjs` rend les quatre langues ; `rhythm.css` contient le style propre à GrooveLog. `build.mjs` est appelé automatiquement par le générateur produit. Il conserve les documents et le script de formulaire du stage, vérifie le formulaire à l’octet près et conserve toutes les ancres précédentes. `support.mjs` contient les quatre formulaires de référence pour ce contrôle.

Les captures `media/<locale>/01–03` sont les fichiers AVIF/WebP 440/880 de `GrooveLog/marketing/shots`, copiés sans retouche. L’icône reste celle du stage. Les badges Apple sont les fichiers officiels blancs déjà présents dans le dépôt ; les badges Google sont les fichiers officiels localisés de `assets/badges/google-play`. Les quatre OG 1200×630 sont composées de texte et de la première capture, avec les polices attribuées. Les polices latin couvrent les quatre langues et sont distribuées avec leurs licences OFL.

Préparer sans écrire dans le dépôt d’app (choisir une nouvelle sortie de référence) :

```sh
ruby scripts/stage-product-preview.rb /Users/benjamin/Documents/Studio/GrooveLog .local/groovelog-reference
node scripts/product-site/build.mjs --repo /Users/benjamin/Documents/Studio/GrooveLog --out .local/groovelog-preview/GrooveLog --ruby-stage .local/groovelog-reference
node scripts/product-site/check.mjs --stage .local/groovelog-preview/GrooveLog
```

Le cache CSS à 4 h est défini dans `_headers`, généré par `scripts/build-site.mjs` et inclus dans l’artefact par l’assembleur. Le hash de la feuille dans l’URL invalide le cache lorsque le style change.
