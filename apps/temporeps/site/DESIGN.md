# TempoReps : direction artistique du site

Page produit de TempoReps (https://bnjdpn.com/TempoReps/), générée par `page.mjs` et `wall.css`, posée par `build.mjs` sur la scène produite par `scripts/product-site/build.mjs`. Les textes viennent de `content/product-sites/TempoReps.mjs` (déjà relus pour les stores) et de `copy.mjs` pour les quelques phrases propres à cette page.

## Produit réel (4 lignes)

- Minuteur d'entraînement pour iPhone, Apple Watch et Android : 9 modes (TEMPO, EMOM, TABATA, AMRAP, FOR TIME, MIX, REPOS, CHRONO, MIRROR), tous gratuits.
- On règle la séance une fois (durées de phase, tours, enchaînement MIX), puis le minuteur affiche la phase, le temps restant et le tour, en couleur et en très gros.
- Les configurations s'enregistrent et se relancent ; la montre suit la séance et l'écran verrouillé affiche le décompte (Activité en direct).
- Pro (2,99 € par mois, 14,99 € par an, 34,99 € à vie en France) ajoute plus de configurations, des MIX illimités, l'historique complet et l'export Santé. Pas de compte, pas de pub, pas d'analytics tiers.

## Trois options

### Option A : « Chrono de ring »

Le site comme l'horloge d'une salle de boxe : chiffres LED géants, rouge et vert, un grand décompte de round qui défile en haut de page. Fort à la première seconde, mais un énorme nombre en tête de page reprend exactement le geste de LoadSense (l'heure 07:51 en vedette). Les deux pages du même studio se ressembleraient. Rejetée.

### Option B : « Partition 3-0-2-0 »

La séance écrite comme une partition : portée, mesures, signes de tempo, police de notation à empattements. Élégant pour le mode TEMPO, mais confus pour quelqu'un qui fait du CrossFit ou de la boxe, et TempoReps n'est pas qu'un métronome à répétitions : 8 des 9 modes n'ont rien à voir avec une partition. Rejetée.

### Option C : « Programme au mur » (retenue)

En salle, la séance du jour est écrite au tableau : TABATA 20/10 s × 8, EMOM 10 × 1 min, AMRAP 10 min, repos 1 min. La page part de ce tableau et le pose à côté du vrai écran MIX de l'app qui contient exactement le même circuit (4 blocs, 25 min) : ce qu'on écrit au mur, l'app le compte. Ensuite, chaque bloc s'ouvre sur un bandeau de phase aux couleurs réelles de l'app (travail terracotta, tempo bleu, sable, vert montre) et sur l'écran qui le fait tourner.

## Pourquoi « Programme au mur »

- C'est le geste réel de l'utilisateur : recopier un programme dans son minuteur. La page montre le résultat sans le raconter.
- L'élément mémorable est unique : le tableau et l'écran MIX côte à côte, les lignes qui s'allument l'une après l'autre comme le minuteur qui avance (désactivé si l'utilisateur réduit les animations).
- Contraste net avec LoadSense : pas d'heure en vedette, pas de déroulé heure par heure, pas de serif. Ici, un tableau, des blocs par mode, une liste de modes, des couleurs de phase.
- Les couleurs ne sont pas inventées : elles viennent des écrans (orange de l'icône, terracotta TRAVAIL, bleu DESCENDEZ, sable de la pause, vert de la montre).

## Test du template

Nom masqué, la page se reconnaît comme un minuteur de salle : tableau de séance, phases colorées, décompte 00:24, écran de montre. Elle ne peut pas être prise pour LoadSense (horloge et journée) ni pour les anciennes pages générées (hero, trois cartes, FAQ). `scripts/check-antitemplate.mjs` compare désormais chaque site aux gabarits historiques et aux autres sites `apps/*/site` (classes partagées sous 30 %, aucune police commune).

## Règles de la page

- Ordre : tableau + écran MIX et badges, puis 4 blocs (TABATA, TEMPO 3-0-2-0 avec le ruban de phases et le guide, configurations enregistrées, Apple Watch), puis les 9 modes avec l'écran d'accueil, Pro, l'appel orange avec les deux badges, les autres apps, l'assistance.
- Polices : Archivo variable (large, graisse 800 pour les titres, normale pour le texte) et Martian Mono pour la notation du tableau et les libellés de phase. Auto-hébergées, OFL.
- Couleurs : carbone #151314, carbone 2 #1f1b1d, marine #222b3a pour Pro, orange #f5772b (icône et appel final), travail #d36c50, descente #5a82c0, sable #d9ab63, montre #4fb26c, craie #f2ede7.
- Une seule colonne par défaut. Toute grille à plusieurs colonnes vit dans une media query `min-width` (620 px pour tableau + écran, 900 px pour les blocs, 1120 px pour le haut de page), jamais en dehors.
- Les libellés de phase du ruban reprennent les mots exacts de l'app dans chaque langue (DESCENDEZ, MAINTENEZ, MONTEZ…). Leur taille est plafonnée en vw pour tenir à 120 % de texte.
- `wall.css?v=<sha256 court>` : le cache de 4 h de Pages ne sert jamais une ancienne feuille.
- Badges officiels App Store et Google Play dans chaque langue, en haut et dans l'appel final. Lien App Store avec `ct=temporeps_web_wall_20261027`.
- Captures : les écrans App Store de la version en vente, recadrés sans le cadre marketing, en AVIF et WebP 440/880.

## Grille finale (captures du 27 oct. 2026)

Anti-slop :
- [x] Nom masqué, on reconnaît un minuteur de salle (tableau, phases, décompte, montre).
- [x] Aucune police ni phrase interdite (vérifié par `scripts/check-antitemplate.mjs`, 8 langues).
- [x] Polices et classes distinctes de LoadSense (vérifié par le même script, dans les deux sens).
- [x] Pas deux sections à cartes identiques, pas d'emoji, pas de flèche dans les liens.
- [x] Un seul élément mémorable : le tableau à côté de l'écran MIX.

Envie :
- [x] 5 secondes sur mobile : le titre, les deux badges, puis le tableau et l'écran qui compte la même séance.
- [x] Chaque mode montré est un vrai écran de l'app, dans la langue de la page.
- [x] « Ça donne envie de télécharger » : oui, on voit sa propre séance de salle déjà prête dans l'app.

Technique :
- [x] WebKit iPhone 15 à 375, 390 et 430 px, zoom 120 % et texte 120 %, en 8 langues : aucun débordement, aucune capture sous 58 % de la largeur.
- [x] Desktop 1440 et 960 px relus section par section.
- [x] Lighthouse mobile local : performance 93 à 98, accessibilité 100 (après contraste du ruban et ordre des titres), bonnes pratiques 100, SEO 100, CLS 0 à 0,02.
- [x] Confidentialité, conditions et assistance à un clic, badges officiels dans chaque langue.
