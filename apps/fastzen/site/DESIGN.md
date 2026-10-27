# FastZen : direction artistique du site

Page produit de FastZen (https://bnjdpn.com/FastZen/), générée par `page.mjs` et `dial.css`, posée par `build.mjs` sur la scène produite par `scripts/product-site/build.mjs`. Les faits viennent de FACTS.md (27 oct. 2026). Les noms de l’achat dans les langues autres que le français et l’anglais sont ceux déjà publiés dans `content/product-sites/FastZen.mjs`. Pas de page de mentions légales : confidentialité et assistance seulement.

## Produit réel (4 lignes)

- **Qui** : quelqu’un qui fait un jeûne intermittent (16:8, 18:6, 20:4, OMAD ou une durée libre).
- **Quel moment** : pendant le jeûne, téléphone en poche, pour voir depuis combien de temps ça dure et à quelle heure c’est prévu de finir.
- **Quel problème** : le temps passe, l’app a été fermée, et la semaine n’est pas la même tous les jours (repos compris).
- **La preuve dans l’app** : l’accueil « Jeûne en cours », 02:00:04 écoulé, fin prévue à 13:00, durée 16 h (captures App Store). La semaine sur mesure montre mardi et samedi en repos.

## Trois options

### Option A : « Horloge de cuisine »

Un 02:00:04 géant, comme un minuteur posé sur le plan de travail. Fort à la première seconde, mais c’est exactement le geste de LoadSense (l’heure 07:51 en vedette). Les deux pages du studio se ressembleraient. Rejetée.

### Option B : « Carte de restaurant »

La fin prévue comme une réservation, papier clair et filet cuivre. L’heure où l’on mange est le bon sujet, mais un fond clair avec un accent cuivre retombe sur le tic crème et terracotta, et les captures de l’app sont sombres (Tea Black, sauge, cuivre). Rejetée.

### Option C : « Le cadran du jeûne » (retenue)

Un cadran de 24 heures, comme l’accueil de l’app : le début (21:00) est en haut, le sens est celui des aiguilles. L’arc clair est le temps écoulé, l’arc sauge est ce qui reste du jeûne, le bambou est la fenêtre où l’on mange, le point sauge porte l’heure de fin. Les repères 00:00, 03:00, 06:00… tournent avec le début. Ensuite les vrais écrans.

## Pourquoi « Le cadran du jeûne »

- C’est le coup d’œil réel : combien de temps déjà, et à quelle heure ça s’arrête. Le cadran le montre avant le premier paragraphe.
- L’élément mémorable est unique : l’arc qui se dessine au chargement (coupé si l’utilisateur réduit les animations). Changer de protocole est une réponse à une action, pas un deuxième effet.
- Contraste net avec les autres pages : LoadSense est une journée heure par heure avec une horloge 07:51, TempoReps un tableau de salle sombre, Petites Gouttes un tiroir de sachets clair. Ici le fond est celui de l’app (Tea Black), la forme est un cadran, la suite est une semaine en lignes.

## Test du template

TempoReps n’aboutirait pas à un cadran de jeûne avec des jours de repos. Nom masqué, on reconnaît un jeûne en cours (02:00:04, fin prévue, 16:8, semaine avec repos). `scripts/check-antitemplate.mjs` compare la page aux gabarits historiques et aux autres sites `apps/*/site`.

## Règles de la page

- Ordre : cadran, titre, badges, choix du protocole. À partir de 900 px, la capture d’accueil est dans le premier écran, à côté du cadran. Puis la semaine, une seule date, l’historique, l’achat unique, les deux autres apps, l’assistance.
- Le cadran se lit sans légende. Pas de phrase qui décrit la page (« le cadran reprend l’écran »).
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
- [x] Nom masqué, on reconnaît un jeûne en cours (02:00:04, fin prévue, arc de 16 h, semaine avec repos).
- [x] Aucune police ni phrase interdite. Fraunces n’est la police d’aucun autre site.
- [x] Classes distinctes de LoadSense, TempoReps et Petites Gouttes (`scripts/check-antitemplate.mjs`).
- [x] Pas de cartes numérotées, pas d’emoji, pas de flèche dans les liens.
- [x] Un seul élément mémorable : le cadran qui se dessine au chargement. Changer de protocole met à jour l’arc, sans deuxième animation.

Envie :
- [x] 5 secondes sur mobile (390×844) : le temps écoulé, la fin prévue, le titre, les deux badges officiels.
- [x] Les écrans sont les captures App Store, fr-FR et en-US. Les autres langues le disent quand elles reprennent l’anglais.
- [x] Le prix affiché n’apparaît qu’en français (6,99 €) et en anglais (5,99 $, et 6,49 $ sur Google Play US).

Technique :
- [x] WebKit (Playwright, iPhone) à 375, 390 et 430 px, zoom 120 % et texte 120 %, sur les 8 langues : pas de débordement hors le champ honeypot. Capture d’accueil à 73 % de la largeur avec le zoom.
- [x] Desktop 1440×900 : navigation en un ou deux mots, cadran et capture d’accueil dans le premier écran (la capture va de y 217 à y 716).
- [x] Clic 18:6 : fin prévue 15:00, arc restant 16 h, repère 15:00. `prefers-reduced-motion` : pas d’animation.
- [x] Lighthouse mobile local sur `/FastZen/fr-FR/` après le recadrage : performance 100, accessibilité 100, bonnes pratiques 100, SEO 100, LCP 1,8 s, CLS 0.
- [x] Confidentialité et assistance à un clic. Pas de page de mentions légales. Formulaire `/api/contact`, honeypot, Turnstile `0x4AAAAAAFb8sZbCULV4skmB`, `assets/site.js` inchangé.
