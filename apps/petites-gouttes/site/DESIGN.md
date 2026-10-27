# Petites Gouttes : direction artistique du site

Page produit de Petites Gouttes (https://bnjdpn.com/petites-gouttes/), générée par `page.mjs` et `drawer.css`, posée par `build.mjs` sur la scène produite par `scripts/product-site/build.mjs`. Les textes viennent de `content/product-sites/petites-gouttes.mjs` (relus contre la fiche App Store) et de `copy.mjs` pour les phrases propres à cette page. Pas de page de mentions légales : confidentialité et assistance seulement.

## Produit réel (4 lignes)

- **Qui** : un parent qui tire son lait et le congèle, souvent avant la reprise du travail ou l'entrée en crèche.
- **Quel moment** : devant le congélateur, un sachet à la main, ou le dimanche soir en préparant les sachets de la semaine.
- **Quel problème** : savoir combien il reste, quel sachet sortir en premier, et confier les bons sachets étiquetés à la crèche ou à l'assistante maternelle.
- **La preuve dans l'app** : le tableau de bord (3 240 mL en 22 sachets, prochain sachet 150 mL du 8 juillet, 15 jours d'autonomie), l'écran Stock, Préparer la semaine et la planche d'étiquettes (captures App Store de la 1.8.0).

## Trois options

### Option A : « Planche d'étiquettes »

La page entière comme une planche A4 de 21 étiquettes, chaque section dans une étiquette. Très fidèle à l'export du Pack Crèche, mais cela donne une grille de rectangles identiques (le gabarit à cartes qu'on veut fuir) et met en avant la partie payante au lieu du stock gratuit. Rejetée.

### Option B : « Porte du frigo »

Aimants, post-it et écriture manuscrite sur une porte de frigo familiale. Chaleureux, mais l'écriture manuscrite partout fait vite gabarit « app de parentalité mignonne », pourrait servir à n'importe quelle app de la famille Petites, et ne dit rien du geste précis : classer les sachets par date. Rejetée.

### Option C : « Le tiroir du congélateur » (retenue)

Beaucoup de parents congèlent les sachets à plat puis les rangent debout, par date, dans un tiroir ou une boîte. Le haut de page montre ce tiroir : huit sachets classés, chacun avec son étiquette au feutre (volume, date), le niveau de lait visible, et le prochain sachet qui se soulève avec l'étiquette « Prochain sachet ». Les volumes et dates sont ceux des étiquettes réelles de l'app (150 mL du 8 juillet, 120 mL du 2 août…). La suite raconte la vie d'un sachet sur les vrais écrans annotés : au tire-lait, au congélateur, au moment du biberon, puis pour la crèche.

## Pourquoi « Le tiroir du congélateur »

- C'est l'objet que l'utilisatrice a sous les yeux au moment où elle ouvre l'app, et la question exacte à laquelle l'app répond : lequel sortir.
- Élément mémorable unique : le sachet qui se soulève du tiroir (un seul mouvement au chargement, coupé si l'utilisateur réduit les animations).
- Contraste net avec les autres pages : LoadSense raconte une journée heure par heure sur fond sombre avec une horloge, TempoReps un tableau de salle sombre à côté de l'écran MIX. Ici : thème clair comme l'app, un objet du quotidien dessiné, puis des captures annotées par numéros.

## Test du template

Une app voisine (Petites Bouchées, Petites Nuits) n'aboutirait pas à ce plan : pas de sachets, pas de tiroir, pas d'étiquettes. Nom masqué, on reconnaît un stock de lait maternel congelé. `scripts/check-antitemplate.mjs` compare la page aux gabarits historiques et aux autres sites `apps/*/site` (classes partagées sous 30 %, aucune police commune).

## Règles de la page

- Ordre : titre, badges et tiroir ; puis trois chapitres annotés (Au tire-lait, Au congélateur, Au moment du biberon) ; puis la crèche (Préparer la semaine, planche d'étiquettes, une étiquette agrandie, le guide) ; Gratuit et Pack Crèche ; appel final ; apps sœurs ; assistance.
- Police unique, Recursive (OFL), variable et sous-ensemblée : axe CASL 0 pour la lecture, CASL 1 pour ce qu’un parent écrit à la main (étiquettes des sachets, rubans adhésifs), réduite à 61 Ko (latin, graisses 400 à 800). Aucune police des autres sites.
- Couleurs de l'app (`PGTheme`) : primary #7AB0C4, primaryText #32697F, container #E5F0F4, texte décongélation #1F4A5C, bleu nuit #102D3A ; fond givre #EEF5F8 ; lait #F6EEDB ; ruban #EFE2AB. Thème clair, comme l'app par défaut.
- Repères numérotés posés en pourcentage sur chaque capture, avec la légende au même numéro : on lit l'écran sans deviner.
- Une seule colonne par défaut. Toute grille à plusieurs colonnes vit dans une media query `min-width` (640, 900 et 1100 px). Sous 560 px, le tiroir garde six sachets pour que les étiquettes restent lisibles ; leurs tailles de texte sont plafonnées en vw pour tenir à 120 % de texte.
- `drawer.css?v=<sha256 court>` pour que le cache de 4 h de Pages ne serve jamais une ancienne feuille.
- Badges officiels App Store (id6760202126, `ct=petitesgouttes_web_drawer_20261027`) et Google Play (com.bnjdpn.petitesgouttes), les deux fiches vérifiées publiques (version 1.8.0).
- Aucune durée de conservation ni conseil médical : la page répète que l'utilisatrice saisit les durées de sa famille.

## Grille finale (captures du 27 oct. 2026)

Anti-slop :
- [x] Nom masqué, on reconnaît un stock de lait maternel (tiroir de sachets, étiquettes, écrans Stock et Tableau de bord).
- [x] Aucune police ni palette interdite (vérifié par `scripts/check-antitemplate.mjs`, 3 langues).
- [x] Polices et classes distinctes de LoadSense et TempoReps (même script, dans les deux sens).
- [x] Pas deux sections à cartes identiques, pas d'emoji, pas de flèche dans les liens, pas de sur-titre en capitales.
- [x] Un seul élément mémorable : le prochain sachet qui sort du tiroir.

Envie :
- [x] 5 secondes sur mobile : « 22 sachets au congélateur. Petites Gouttes vous dit lequel sortir. », les deux badges, puis le tiroir.
- [x] Chaque écran montré est une capture App Store de la version en vente, dans la langue de la page (fl oz en en-US).
- [x] « Ça donne envie de télécharger » : oui, on reconnaît son propre tiroir et on voit l'app répondre à la question qu'on se pose devant.

Technique :
- [x] WebKit iPhone 15 à 375, 390 et 430 px, zoom 120 % et texte 120 %, en en-US, en-GB et fr-FR : aucun débordement, aucune capture sous 58 % de la largeur.
- [x] Desktop 1440 px relu section par section.
- [x] Lighthouse mobile : voir le rapport de livraison.
- [x] Confidentialité et assistance à un clic, badges officiels dans chaque langue, fiches App Store et Google Play vérifiées.
