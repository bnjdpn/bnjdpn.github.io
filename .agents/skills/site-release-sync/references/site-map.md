# Portfolio : carte des sources et de la publication

| Élément | Source / procédure |
| --- | --- |
| Dépôt / URL | `bnjdpn/bnjdpn.github.io` · [site public](https://bnjdpn.github.io/) |
| Sources | [content](../../../../content/), [scripts/build-site.mjs](../../../../scripts/build-site.mjs), [styles.css](../../../../styles.css) et [assets](../../../../assets/) ; le générateur produit les HTML EN/FR et les sitemaps. Ne pas modifier les sorties seules |
| Surfaces | `/`, `/fr/`, `404.html`, ancres portfolio/catalogue/contact, métadonnées JSON-LD et de partage, `sitemap.xml`, `sitemap-pages.xml`, `robots.txt`, manifeste |
| Produits | `content/catalog.json` et `content/copy.mjs` définissent le catalogue et les liens `https://bnjdpn.github.io/<slug>/`, puis le générateur produit le HTML et les données structurées ; ne pas introduire un dépôt privé/non annoncé ou un produit retiré |
| Captures | [assets](../../../../assets/) : copies des captures/icônes publiques confirmées, provenance dans le dépôt app. Aucune UI inventée ni donnée personnelle |
| Langues | Français et anglais ; le générateur et les contrôles définissent leurs routes, liens alternates et canoniques |
| Validation | `npm run check` ; `npm run check:links` si les destinations changent ; `ruby .agents/skills/site-release-sync/scripts/check.rb --check` et `ruby .agents/skills/site-release-sync/scripts/check_test.rb` |
| QA | `python3 -m http.server 4173`, puis formats mobile/tablette/desktop, filtres, menu, clavier, FR/EN, images et console |
| Publication | [.github/workflows/pages.yml](../../../../.github/workflows/pages.yml) valide puis met en scène seulement l'allowlist publique dans `_site`. Un push `main` ou dispatch publie : autorisation préalable, puis readback de l'URL servie |

La carte détaillée de chaque application vit dans son clone sous
`.agents/skills/site-release-sync/references/site-map.md` : sources du site,
langues, captures et pipeline restent auprès de leur propriétaire. Consulter
cette carte lors d'un changement de produit ; ne pas publier un nouveau tarif,
une plateforme ou une fonctionnalité à partir d'un seul commit de l'app.

Lors d'une release d'app, son agent traite le catalogue principal si nécessaire.
La revue indique les changements du catalogue ou la raison précise de l'absence
d'impact. Un clone app inaccessible reste un blocage explicite. La CI PR vérifie
le mécanisme sans produire de preuve de disponibilité ; lire [le contrat](review.md).

Périmètre de la refonte : 19 produits, soit les 17 demandés, RealmBox et TaskLane
(dont le site Pages historique `main/docs` a été retrouvé). Les projets BarPath
et SplitForge n'ont pas de site produit Pages établi ; RandomMountBuddy est un
fork d'addon tiers. Ils ne sont pas transformés en apps téléchargeables dans ce
catalogue. Nova Station Pinball reste exclu à la suite de son retrait explicite.
Les outils web publics Onigiri Exit Calculator et Poop Price Calculator ont
également été repérés ; leur périmètre de site est inventorié séparément des
applications natives, sans leur attribuer une disponibilité store.
