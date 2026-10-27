# FastZen : direction artistique du site

Page produit de FastZen (https://bnjdpn.com/FastZen/), générée par `page.mjs` et `dial.css`, posée par `build.mjs` sur la scène produite par `scripts/product-site/build.mjs`. Les faits viennent de FACTS.md (27 oct. 2026). Les noms de l’achat dans les langues autres que le français et l’anglais sont ceux déjà publiés dans `content/product-sites/FastZen.mjs`. Pas de page de mentions légales : confidentialité et assistance seulement.

## Produit réel (4 lignes)

- **Qui** : quelqu’un qui fait un jeûne intermittent (16:8, 18:6, 20:4, OMAD ou une durée libre).
- **Quel moment** : pendant le jeûne, téléphone en poche, pour voir depuis combien de temps ça dure et à quelle heure c’est prévu de finir.
- **Quel problème** : le temps passe, l’app a été fermée, et la semaine n’est pas la même tous les jours (repos compris).
- **La preuve dans l’app** : l’accueil français « Jeûne en cours », 02:00:04 écoulé, début samedi à 17:38, fin prévue dimanche à 09:38, durée 16 h. L’accueil anglais montre le même type de jeûne, commencé à 17:20 (5:20 PM) et fini à 09:20 (9:20 AM). La semaine sur mesure montre mardi et samedi en repos.

## Trois options

### Option A : « Horloge de cuisine »

Un 02:00:04 géant, comme un minuteur posé sur le plan de travail. Fort à la première seconde, mais c’est exactement le geste de LoadSense (l’heure 07:51 en vedette). Les deux pages du studio se ressembleraient. Rejetée.

### Option B : « Carte de restaurant »

La fin prévue comme une réservation, papier clair et filet cuivre. L’heure où l’on mange est le bon sujet, mais un fond clair avec un accent cuivre retombe sur le tic crème et terracotta, et les captures de l’app sont sombres (Tea Black, sauge, cuivre). Rejetée.

### Option C : « Les trois écrans » (retenue)

Le premier écran est fait des captures réelles : l’accueil (le cadran de l’app, 02:00:04, fin dimanche à 09:38), la semaine, et le jour sur mesure. Aucun cadran, arc ou téléphone n’est redessiné en SVG, en CSS ou en canvas. Le sélecteur 16:8, 18:6, 20:4, OMAD et le curseur 1 à 48 h restent, en texte et en contrôles simples : ils mettent à jour la phrase « fin prévue », pas un dessin.

## Pourquoi « Les trois écrans »

- Le cadran que le visiteur lit est celui de l’app, sur la capture d’accueil, avec la semaine et le jour sur mesure à côté.
- L’élément mémorable est cette rangée de trois captures. Changer de protocole répond par une phrase, sans animation.
- Contraste net avec les autres pages : LoadSense est une journée heure par heure, TempoReps un tableau de salle, Petites Gouttes un tiroir, MoveAtlas une plaque, NoBuyCart un bordereau, Petites Bouchées un couvert. Ici le fond est celui de l’app (Tea Black) et la preuve est la capture.

## Test du template

TempoReps n’aboutirait pas à trois captures de jeûne (accueil, semaine, jour sur mesure). Nom masqué, on reconnaît un jeûne en cours (02:00:04, fin prévue, 16:8, semaine avec repos). `scripts/check-antitemplate.mjs` compare la page aux gabarits historiques et aux autres sites `apps/*/site`.

## Règles de la page

- Ordre : titre, trois captures (accueil, semaine, sur mesure), badges, choix du protocole en texte. Le numéro de version n’est pas dans le premier écran. À partir de 900 px, les trois captures font 70 % de la hauteur de l’écran. Puis le jeûne en cours, la semaine, une seule date, l’historique, l’achat unique, les deux autres apps, l’assistance.
- Pas de visuel dessiné. Les seuls visuels sont les captures App Store, l’icône et les badges officiels. Pas de phrase qui décrit la page (« le cadran reprend l’écran »).
- Navigation desktop : un ou deux mots (Jeûne, Semaine, Sur mesure, Assistance).
- Police unique, Fraunces (OFL, The Fraunces Project), variable et sous-ensemblée latin, 36 Ko, graisses 400 à 700. Japonais : les glyphes absents passent à une mincho système. Aucune police des autres sites.
- Couleurs de l’app en thème sombre, celui des captures : Tea Black #0F1311, Bamboo #262E29, Sage Mist #8FA897, Copper #C26A3A, Mochi #F2EFE8. Le texte secondaire est Sage Mist (7,3:1 sur Tea Black). Le cuivre sur Tea Black est à 4,8:1. Le texte des boutons cuivre est Tea Black.
- Une seule colonne par défaut. La navigation textuelle et les grilles à deux colonnes vivent dans des media queries `min-width` (860 px et 900 px).
- `dial.css?v=<sha256 court>` pour que le cache de 4 h de Pages ne serve jamais une ancienne feuille.
- Badges officiels App Store et Google Play. L’App Store français pour la page fr-FR, l’App Store US pour les autres langues (les deux fiches de FACTS.md), avec `ct=fastzen_web_dial_20261027`. Google Play : `com.bnjdpn.fastzen`.
- Captures : fr-FR et en-US natives. Les autres langues reprennent les captures anglaises et le disent. Le prix affiché sur l’écran d’achat n’est montré qu’en français (6,99 €) et en anglais (5,99 $). Google Play US : 6,49 $. Les autres langues renvoient au prix du store, sans montant.
- Ancres conservées : `#contact`, `#features`, `#routine`, `#custom-week`, et les ancres vides de l’ancienne page.
- Le formulaire d’assistance garde l’action `/api/contact`, le champ honeypot, Turnstile `0x4AAAAAAFb8sZbCULV4skmB` (`data-action="contact"`) et `assets/site.js`, qui charge Turnstile. Les pages confidentialité et guides ne sont pas réécrites.

## Grille finale (captures du 27 oct. 2026)

Anti-slop :
- [x] Nom masqué, on reconnaît un jeûne en cours (accueil 02:00:04, fin prévue 09:38, semaine avec repos, jour sur mesure).
- [x] Aucune police ni phrase interdite. Fraunces n’est la police d’aucun autre site.
- [x] Classes distinctes des six autres sites (`scripts/check-antitemplate.mjs` : 43 classes, 0 % partagées).
- [x] Pas de cartes numérotées, pas d’emoji, pas de flèche dans les liens. Aucun visuel dessiné.
- [x] Un seul élément mémorable : les trois captures réelles. Changer de protocole met à jour la phrase, sans animation.

Envie :
- [x] Premier écran mobile (WebKit, iPhone 13, 390×664) : titre, accueil, semaine, sur mesure, et les deux badges (badges de y 440 à y 488).
- [x] L’accueil français montre 02:00:04, début samedi 17:38, fin dimanche 09:38. Les pages qui montrent la capture anglaise partent de 17:20 et finissent à 09:20.
- [x] Les écrans sont les captures App Store, fr-FR et en-US. Les autres langues le disent quand elles reprennent l’anglais.
- [x] Le prix affiché n’apparaît qu’en français (6,99 €) et en anglais (5,99 $, et 6,49 $ sur Google Play US). Le numéro de version n’est pas dans le premier écran.

Technique :
- [x] WebKit à 375, 390 et 430 px, zoom 120 %, texte 120 %, et les deux ensemble, sur les 8 langues : `scrollWidth` égale `clientWidth`. Aucun élément `svg`. Le lien d’évitement et le honeypot restent hors champ.
- [x] Desktop 1440×900 : navigation en un ou deux mots. Les trois captures mesurent 290×630, soit 70 % de la hauteur, et tiennent dans le premier écran (y 105 à y 735).
- [x] Clic 18:6 depuis 17:38 : « fin prévue 11:38 ». En anglais, depuis 17:20 : 11:20 AM. Aucune animation, y compris avec `prefers-reduced-motion`.
- [x] Lighthouse mobile local sur `/FastZen/fr-FR/` : performance 99, accessibilité 100, bonnes pratiques 100, SEO 100, LCP 2,0 s, CLS 0,016, TBT 0.
- [x] `npm run check` vert, y compris l’anti-gabarit sur 7 sites. Confidentialité et assistance à un clic. Pas de page de mentions légales. Formulaire `/api/contact`, honeypot, Turnstile `0x4AAAAAAFb8sZbCULV4skmB`, `assets/site.js` inchangé.
