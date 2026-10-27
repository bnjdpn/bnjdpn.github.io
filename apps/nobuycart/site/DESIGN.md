# NoBuyCart : direction artistique du site

Page produit de NoBuyCart (https://bnjdpn.com/NoBuyCart/), générée par `page.mjs` et `slip.css`, posée par `build.mjs` sur la scène produite par `scripts/product-site/build.mjs`. Les faits viennent de FACTS.md (27 oct. 2026). Les titres, l’assistance et la phrase de confidentialité viennent de `content/product-sites/NoBuyCart.mjs`. Pas de page de mentions légales : confidentialité et assistance seulement.

## Produit réel (4 lignes)

- **Qui** : quelqu’un qui veut un objet (une veste, une lampe, un sac) et n’achète pas tout de suite.
- **Quel moment** : au moment où l’envie est là, téléphone en main, avant de passer en caisse.
- **Quel problème** : garder l’envie, le prix qu’on a soi-même saisi, et ce qui l’a provoquée, puis revenir noter la décision.
- **La preuve dans l’app** : l’éditeur « A cotton jacket » ; la liste (veste en coton, lampe de lecture, sac de voyage) ; les trois notes « I chose to buy », « I chose not to buy », « Not sure yet ». Le montant d’exemple s’écrit avec le symbole de la langue : 100 €, $100, €100, R$ 100, ¥100, ₩100, NT$100.

## Trois options

### Option A : « Ticket de caisse »

Toute la page en un long reçu thermique, monospace, noir sur blanc. Rejetée : un reçu pleine page est le gabarit des apps d’argent, la monospace fatigue à la lecture, et le reçu suggère une dépense déjà faite. NoBuyCart s’arrête avant.

### Option B : « Vitrine de nuit »

Plein écran vert forêt comme l’icône, les envies exposées derrière une vitre. Rejetée : l’app est claire (fond gris très pâle, cartes blanches). Un thème sombre contredit l’app, et une vitrine donne envie d’acheter, le contraire du geste.

### Option C : « Le bordereau » (retenue)

Une seule feuille, couleur du chariot de l’icône, avec la veste en coton et le prix saisi (100 €, $100, et le symbole de chaque langue). Les trois décisions de l’app sont des lignes qu’on peut marquer. Un vrai écran de l’app est dans le premier écran, sous les badges : la liste en français, l’éditeur ailleurs. Ensuite les autres écrans, dans l’ordre d’une pause. No Buy November est une bande datée (1er au 30 novembre 2026, version 1.5.0 et suivantes, gratuit), pas l’identité de la page.

## Pourquoi « Le bordereau »

- C’est l’objet du moment d’usage : le papier qu’on remplit à la place de payer. L’élément mémorable est cette feuille, avec le montant en Fragment Mono.
- LoadSense met une horloge, TempoReps un tableau de salle, Petites Gouttes un tiroir de sachets. Ici une feuille de comptoir, un thème clair, une typo de lecture.
- Faisable avec les captures App Store recadrées (sans le cadre vert du store) et les seuls faits de FACTS.md.

## Test du template

Une app voisine (un minuteur, un carnet de bébé) n’aboutit pas à une veste à 100 € et à trois notes d’achat. Le titre tient toute la largeur. À partir de 960 px, la feuille est à gauche et l’écran de l’app est à droite, sous les badges. Nom masqué, on reconnaît une liste d’envies où le prix est écrit à la main.

## Règles de la page

- Ordre : titre ; sur téléphone, badges puis l’écran puis la feuille ; à partir de 960 px, feuille à gauche, badges et écran à droite. Ensuite enregistrer l’envie, la liste, les trois notes, l’historique, le bilan, No Buy November, le Registre, l’appel, NeatShift et FastZen, l’assistance.
- Chaque ligne vend l’usage. Le montant d’exemple ne s’écrit jamais « 100 EUR ».
- Polices : Literata (lecture, titres) et Fragment Mono (le montant et les dates). OFL, latin et latin-ext, `font-display: swap`. Préchargement du seul fichier Literata 700 latin.
- Couleurs : champ de l’icône #14382F, papier du chariot #E0E0C8, action #1A6647, fond d’écran de l’app #F6F6FD, texte secondaire #525252. Pas de thème sombre.
- Une seule colonne par défaut. Toute grille à plusieurs colonnes est dans une media query `min-width` (960 px pour la feuille et les badges, 1040 px pour le texte à côté d’une capture).
- `slip.css?v=<sha256 court>`.
- Badges officiels App Store (largeur native du SVG, hauteur 40) et Google Play, vers les fiches de FACTS.md. Lien App Store avec `ct=nobuycart_web_slip_20261027`.
- Neuf langues déjà servies : en-US, fr-FR, de-DE, es-MX, ja, ko, pt-BR, zh-Hans, zh-Hant.
- La feuille répond au clic (une note personnelle). Le mouvement est coupé si l’utilisateur réduit les animations.
- Formulaire inchangé : `action="/api/contact"`, champ `app` = `NoBuy Cart`, Turnstile `0x4AAAAAAFb8sZbCULV4skmB`, `data-action="contact"`. `assets/site.js` charge Turnstile.
- Confidentialité : l’URL déjà servie, y compris `https://bnjdpn.com/NoBuyCart/privacy` pour zh-Hans. Pas de page de conditions.

## Grille finale

Anti-slop :
- [x] Nom masqué, on reconnaît une liste d’envies au prix saisi.
- [x] Aucune police ni palette interdite.
- [x] Pas deux sections à cartes identiques, pas d’emoji, pas de flèche dans les liens.
- [x] Un seul élément mémorable : le bordereau, montant avec le symbole de la langue.

Envie :
- [x] 5 secondes sur mobile : le titre, les deux badges, et la liste française (capture WebKit 390 px, fr-FR, image dès y=250 sur 844).
- [x] Le premier écran montre un vrai écran de l’app. À 1440 px il est à droite, sous les badges (x 769–1121, visible dès y=398 sur 900).

Technique :
- [x] WebKit iPhone (Playwright WebKit 27.2, 27 oct. 2026) à 375, 390 et 430, zoom 120 % et texte 120 %, fr-FR, en-US, de-DE et ja, menu langue ouvert compris : 42 mesures, aucun élément hors du viewport.
- [x] Desktop 1440, fr-FR et de-DE, aucun débordement.
- [x] Lighthouse mobile en local sur fr-FR : performance 99, accessibilité 100, SEO 100, bonnes pratiques 100. LCP 2,1 s, poids 229 KiB.
- [x] Confidentialité et assistance à un clic, badges officiels.
