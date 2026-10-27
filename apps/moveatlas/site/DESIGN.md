# MoveAtlas : direction artistique du site

Page produit de MoveAtlas (https://bnjdpn.com/MoveAtlas/), générée par `page.mjs` et `plate.css`, posée par `build.mjs` sur la scène produite par `scripts/product-site/build.mjs`. Les faits viennent de FACTS.md (27 oct. 2026). Les langues sont celles déjà servies : en-US, fr-FR, de-DE, es-ES. Pas de page de mentions légales : confidentialité et assistance seulement.

## Produit réel (4 lignes)

- **Qui** : quelqu’un qui s’entraîne sur des machines, dans une salle précise, et qui ne retient pas le siège ni le dossier d’une fois sur l’autre.
- **Quel moment** : debout devant la presse guidée 45°, entre deux séries, le téléphone à la main.
- **Quel problème** : les réglages changent d’une salle à l’autre, et le catalogue doit s’ouvrir même sans réseau.
- **La preuve dans l’app** : la fiche machine à Studio Atlas, siège 4, dossier 2, charge en kg (captures App Store). Autour : la recherche (1 324 exercices), les consignes écrites, la séance avec En salle / At the gym, et Ma salle / My gym.

## Trois options

### Option A : « Plan de salle »

La page est un plan au sol, chaque machine un plot avec ses chiffres. Ça raconte plusieurs salles, mais MoveAtlas n’a pas de plan : il a une fiche par machine. Un plan dessiné serait une interface que l’app ne montre pas. Rejetée.

### Option B : « Atlas anatomique »

Une planche de muscles, et les exercices qui s’y rattachent. Le nom s’y prête, mais les captures réelles sont une recherche, une fiche et des réglages, pas un corps dessiné. Et une planche anatomique ressemblerait à n’importe quel catalogue d’exercices. Rejetée.

### Option C : « La plaque de la machine » (retenue)

Sur le bâti de la presse, une plaque indique les réglages qu’on a notés la dernière fois. Le haut de page est cette plaque : Studio Atlas, presse guidée 45° (ou sled 45° leg press), siège 4, dossier 2, charge en kg. Les deux chiffres se tamponnent au chargement. La capture réelle de la fiche est juste dessous, puis le parcours dans la salle : chercher, lire les consignes, rouvrir la fiche dans la séance, retrouver Ma salle.

## Pourquoi « La plaque de la machine »

- C’est l’objet du moment d’usage : on ne veut pas un programme, on veut le siège et le dossier de cette machine, dans cette salle.
- L’élément mémorable est unique : les deux chiffres tamponnés, 4 et 2.
- TempoReps, l’autre app de salle, est un tableau de séance sombre à côté d’un minuteur. Ici pas de chrono, pas de phases, pas d’orange : une plaque d’acier aux couleurs de l’app (#04060A, #0B1117, #121821, #7DD3FC, #DBEBFA, #8CA1B8), puis les vraies fiches.

## Test du template

Une app voisine (TempoReps, un minuteur) n’aboutit pas à une plaque siège/dossier. Nom masqué, on reconnaît un carnet de réglages de machines et un catalogue hors ligne. `scripts/check-antitemplate.mjs` compare la page aux gabarits historiques et aux autres sites `apps/*/site`.

## Règles de la page

- Ordre : la plaque et les badges, la fiche machine, la recherche, les consignes écrites, la séance, Ma salle, le carnet gratuit (5 éléments) et l’achat unique, l’appel final, les autres apps, l’assistance.
- Polices : Sofia Sans Condensed 800 pour la plaque et les titres, Newsreader 400/600 pour la lecture. OFL, auto-hébergées, latin et latin-ext, `font-display: swap`. Préchargement de la seule police du titre (Sofia Sans Condensed 800).
- Une seule colonne par défaut. Toute grille à plusieurs colonnes vit dans une media query `min-width` (760, 900, 1100 px).
- `plate.css?v=<sha256 court>` pour le cache de 4 h de Pages.
- Badges officiels App Store et Google Play, dans la langue de la page. Liens vers les fiches de FACTS.md (`ct=moveatlas_web_plate_20261027`). Aucun prix Google Play. Le 6,99 € cité est celui de l’App Store français.
- de-DE et es-ES réutilisent les captures anglaises, et le texte le dit.
- Ancres conservées : `#contact`, `#features`, `#machine-settings`, `#workouts`, `#free-and-pro`, `#more-apps`.
- Le formulaire d’assistance reste sur `POST /api/contact`, avec le même Turnstile (`0x4AAAAAAFb8sZbCULV4skmB`, `data-action="contact"`), le même pot de miel et les champs `app` / `_subject`.

## Grille finale

Relue le 27 oct. 2026 sur les captures WebKit (`moveatlas-fr-390.png`, `moveatlas-fr-1440.png`) et sur Lighthouse mobile local de `/MoveAtlas/fr-FR/`.

Anti-slop :
- [x] Sans le nom, on reconnaît un carnet de réglages de machines (siège 4, dossier 2, plaque rivetée, fiche Studio Atlas), pas le tableau de séance de TempoReps.
- [x] Sofia Sans Condensed et Newsreader, palette de l’app (#04060A, #0B1117, #121821, #7DD3FC, #DBEBFA, #8CA1B8). Aucune police ni palette interdite.
- [x] Pas deux sections au même gabarit de cartes, pas de rangée d’emojis.
- [x] Aucune phrase bannie du §6.
- [x] Classes préfixées `mv-` : le contrôle anti-template mesure le partage avec les gabarits et les autres sites.
- [x] Un seul élément mémorable : les deux chiffres tamponnés, 4 et 2.

Envie :
- [x] En 5 secondes sur le mobile 390 : le siège et le dossier de cette salle, pour quelqu’un devant la machine, et les badges juste au-dessus de la vraie fiche.
- [x] La première capture visible est la fiche machine (siège, dossier, charge), le bénéfice, pas un menu.
- [x] Les badges officiels sont dans le premier écran, mobile et bureau 1440, à côté de la preuve.

Technique :
- [x] Lighthouse mobile local, 27 oct. 2026 : performance 99, accessibilité 100, SEO 100. LCP 2,0 s, CLS 0, poids 235 KiB. Débordement WebKit : 0 sur fr/en/de/es × 375/390/430, y compris zoom 120 % et texte 120 %, et sur bureau 1440.
- [x] Badges officiels blancs App Store (langue de la page) et Google Play. Liens des fiches FACTS. Confidentialité et assistance dans le pied. Pas de page de mentions légales.
- [x] Captures App Store du 27 oct. 2026, avif/webp. de-DE et es-ES disent que la capture est en anglais.
