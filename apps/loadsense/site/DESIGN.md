# LoadSense : direction artistique du site

Site publié à `https://bnjdpn.com/LoadSense/` (en-US à la racine, `fr-FR/`, `de-DE/`, `es-ES/`, `ja/`).
Sources de la page : `copy.mjs` (textes), `page.mjs` (HTML), `day.css` (styles), `media/` (captures réelles), `fonts/` (OFL).
Construction : `node apps/loadsense/site/build.mjs --base <stage>/public/LoadSense --out <stage>/public/LoadSense`.
Les pages confidentialité, conditions, guides, `en-US/index.html` (redirection), `site.js` et badges restent ceux du stage existant, octet pour octet.

## Produit réel (4 lignes)

- **Qui** : quelqu'un qui s'entraîne (course, salle, vélo) avec une Apple Watch et qui se demande « je force aujourd'hui ou pas ? ».
- **Quel moment** : le matin, avant la séance, téléphone en main au réveil ; puis un coup d'œil au poignet dans la journée.
- **Quel problème** : les données Santé existent (VFC, sommeil, FC au repos) mais personne ne dit quand elles ont été mesurées ni sur quoi repose un score.
- **Preuve visible** : l'écran Aujourd'hui, « 90/100, calcul du 3 oct. 2026 à 7:51, confiance élevée », avec la phrase de l'app « Tiens aussi compte de ton ressenti avant de t'entraîner ».

## Révision du 27 octobre 2026 : plus d’illustration

Benjamin interdit toute image ou illustration dessinée (SVG, CSS ou canvas qui imite un objet ou un dessin), dans le site comme dans les apps et leurs icônes. Les seuls visuels permis sont les vraies captures de l’app, l’icône de l’app et les badges officiels des stores ; les petites icônes d’interface restent permises. L’horloge 07:51 est du vrai texte, pas un dessin : elle reste, mais sans role="img" ni libellé de remplacement, pour être lue comme du texte. Le cadre de montre en CSS autour de la vraie capture Apple Watch reste. Les images de partage ne contiennent que du texte et la vraie capture Aujourd’hui : elles restent.

## Trois options

### Option A : « Relevé d'instrument »
Concept : une console de mesure, cadrans, graduations, valeurs monospace sur fond anthracite.
Palette : #0b1218 fond, #52d4c2 trace, #f2b84b alerte, #8aa0ad graduation. Typo : une monospace + une grotesque.
Élément mémorable : une jauge de récupération animée.
Rejet : trop proche de la direction « traceable-signal-console » déjà vue sur le site et de n'importe quel tableau de bord SaaS ; une jauge animée promet une précision que l'app refuse de revendiquer.

### Option B : « Carnet du coach »
Concept : papier quadrillé, notes manuscrites, captures scotchées comme dans un carnet d'entraînement.
Palette : crème #f4f1ea, encre #1d2a33, rouge correcteur #c8553d. Typo : une manuscrite + une serif.
Élément mémorable : annotations manuscrites autour des captures.
Rejet : fond crème + accent terracotta est exactement le tic visuel des sites générés ; l'UI de l'app est native iOS, bleu-vert, pas papier ; les manuscrites sont un gadget peu lisible en japonais.

### Option C : « 24 heures » (retenue)
Concept : la page suit une journée d'un utilisateur, heure par heure, de 23:40 (la montre mesure la nuit) à dimanche 20:00 (la semaine à plat). Le fond passe de la nuit à l'aube, au matin, à midi, au soir, puis à la nuit.
Palette (pipette sur l'icône et les captures) : nuit #0f1c25, aube #17333f, matin #e4efec, midi #edf3e0, soir #568cc5, sarcelle #52d4c2, lime #c3dda5, bleu #568cc5 (texte bleu sur clair #2f6299).
Typo : Big Shoulders Display 700/800 (chiffres et titres, inspirée des panneaux horaires de Chicago, OFL) ; Atkinson Hyperlegible Next 400/700 (texte, conçue pour la lisibilité, OFL). Japonais : titres en gothique système, chiffres en Big Shoulders.
Élément mémorable : l'horloge géante « 07:51 » du haut de page, en trois couleurs de l'icône (sarcelle, lime, bleu), qui défile de 07:47 à 07:51 au chargement (désactivé si `prefers-reduced-motion`). C'est l'heure de calcul réellement affichée dans la capture.

```
 LoadSense                      La journée  Gratuit et Pro  Assistance  Langue
 ███  ███ ▪ ███  █                                           ┌──────────┐
 █ █    █   █    █   (07:51, hauteur ~ 1/3 de l'écran)       │Aujourd'hui│
 ███    █ ▪ ███  █                                           │ 90/100    │
 Avant de vous entraîner, voyez d'où vous partez.            │ 7:51      │
 LoadSense lit votre nuit, votre VFC…   [App Store]          └──────────┘
 ── 23:40 nuit ── 07:51 aube ── 07:52 ── 07:55 matin ── 12:30 midi ── 18:10 soir ── Dim. 20:00 nuit ──
```

Une option écartée en route : la métaphore « bulletin météo » de la forme, abandonnée parce qu'elle suggère une prévision, ce que LoadSense exclut explicitement.

## Pourquoi « 24 heures »

1. L'utilisateur vit l'app à des heures précises (au réveil, avant la séance, le dimanche soir) : la page raconte ce moment au lieu d'empiler des fonctionnalités.
2. Aucune autre app du studio n'a l'heure comme preuve : « calcul du 3 oct. à 7:51 » est le détail qui distingue LoadSense des apps de récupération qui donnent un score sans date.
3. Faisable avec les seules captures réelles du build en vente (Aujourd'hui, mesures, carnet, tendances, bilan, montre) ; aucun visuel généré.

Test du template : pour TempoReps ou PRVault, une journée heure par heure n'aurait pas de sens (une séance dure une heure, pas une journée). Le plan ne se transpose pas.

## Règles de la page

- Captures : réelles uniquement. en-US et fr-FR ont toutes leurs captures natives ; de-DE, es-ES et ja ont Aujourd'hui, mesures et bilan natifs, et reprennent les captures anglaises pour le carnet, les tendances et la montre.
- Chaque capture est placée à côté du texte de son heure, qui la décrit ; `alt` détaillé sur chaque image.
- La citation de 07:51 est la phrase de l'écran Aujourd'hui, mot pour mot, dans la langue de la page.
- Pas de badge Google Play tant que la fiche Play répond 404. Badge Apple officiel, dans la langue de la page.
- Prix : renvoyés au store, avec les montants de la fiche FR et US mentionnés dans les notes (texte repris de `content/product-sites/LoadSense.mjs`).
- Ancres conservées pour les redirections : `#contact`, `#free-and-pro`, `#features`.
- Le formulaire d'assistance garde le balisage attendu par `assets/site.js` (Turnstile, honeypot, statut).

## Grille finale (captures 1440 et 390 du 27 oct. 2026)

Anti-slop :
- [x] Nom masqué, on reconnaît une app de récupération Apple Watch (heure de calcul, mesures de nuit, montre).
- [x] Aucune police ni palette interdite (vérifié par `scripts/check-antitemplate.mjs`).
- [x] Pas deux sections à cartes identiques, pas d'emoji.
- [x] Aucune phrase bannie (vérifié par le script, 5 langues).
- [x] 11 % des classes partagées avec les gabarits existants (bar, jump, clock, intro, screen) (seuil 30 %).
- [x] Un seul élément mémorable : l'horloge 07:51.

Envie :
- [x] 5 secondes sur mobile : l'heure, « Avant de vous entraîner, voyez d'où vous partez », l'écran 90/100.
- [x] La première capture est l'écran Aujourd'hui (le bénéfice).
- [x] « Ça donne envie de télécharger » : oui, la journée se lit d'une traite et chaque heure montre l'écran correspondant.

Technique :
- [x] Lighthouse mobile local : performance 97 à 98, accessibilité 100, SEO 100 sur les 5 langues, CLS 0 (après correction du contraste et de la barre mobile).
- [x] Badge officiel, lien App Store avec `ct=loadsense_web_day_20261027`, confidentialité et assistance à un clic.
- [x] Captures du build en vente (store screenshots d'octobre 2026).
