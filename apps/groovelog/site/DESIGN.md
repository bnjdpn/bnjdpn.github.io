# GrooveLog — la prochaine petite série

## Produit réel
Qui : les pratiquants de tractions, pompes ou tenues en Grease the Groove.
Moment : une pause dans la journée, pour faire puis noter une petite série.
Problème : retrouver la prochaine action et garder la trace de la pratique réelle.
Preuve : Aujourd’hui propose 3 tractions ; l’écran suivant confirme la série et propose la suivante vers 15:45.

Sources : `content/product-sites/GrooveLog.mjs` entier, descriptions et notes de version fastlane EN/FR/DE/ES, `TodayView.swift`, `Views/Components/Theme.swift`, icône et trois captures localisées de `marketing/shots`. Les captures sont celles désignées par l’issue comme captures du build en vente ; aucune capture de développement fabriquée. Palette relevée sur les captures (fond #090d0a, surface #1c241e, accent #b5e764, texte #f0f2ec), cohérente avec Theme.swift. L’icône fournie reprend le vert.

Concurrents ouverts le 27/10/2026 : [Light Work](https://uselightwork.com/) (plan et promesse de record), [Grease the Groove Workouts](https://apps.apple.com/us/app/grease-the-groove-workouts/id6740294311) (points et séries quotidiennes), [GTG](https://play.google.com/store/apps/details?hl=en_US&id=com.forevernewvie.projectgtg) (widget et calendrier). GrooveLog peut montrer la proposition, sa correction et les semaines prévues, sans promettre un résultat sportif. Aucun avis de GrooveLog vérifié : aucun témoignage ni note ajoutés.

### Option A — La prochaine petite série
Concept : le rythme vient des mots et des espaces entre les moments de pratique ; le bouton réel de l’app est la preuve centrale.
Palette : fond forêt #101a14, papier végétal #f6f8f0, texte clair #f0f2ec, citron UI #b5e764, secondaire #b0bbad.
Typographies : Unbounded 600 pour les titres ; Hanken Grotesk 400/600/700 pour lire et naviguer.
Premier écran :
```
GrooveLog                         Langues
3 tractions.             [vraie capture]
Un toucher.              [Aujourd’hui ]
Votre prochaine série…  [            ]
[App Store] [Play]       [            ]
```
Sur mobile : titre, capture, texte et badges dans cet ordre.
Élément mémorable : « 3 tractions. Un toucher. », tout entier dans la même couleur.

### Option B — Le journal ouvert
Concept : une page claire et éditoriale, tournée vers les séries déjà faites.
Palette : papier #f6f8f0, encre #183827, vert #245738, gris #546e59, filet #bfd1bd.
Typographies : mêmes familles attribuées, Unbounded 600 en titres compacts, Hanken Grotesk en texte.
```
GrooveLog
Une série qui reste dans le journal.
[capture enregistrée]   corrections et historique
[badges]
```
Élément mémorable : la confirmation « Série enregistrée » comme entrée dans le produit.

### Option C — Les semaines en vue
Concept : commencer par la lecture du prochain cycle, comme une préparation de pratique.
Palette : surface #1c241e, texte #f0f2ec, vert #b5e764, secondaire #b0bbad, fond #090d0a.
Typographies : Unbounded 600 pour une accroche large, Hanken Grotesk pour les phases.
```
GrooveLog                     Stores
Voyez votre prochain cycle.
[capture cycle]   Référence / pratique / retest
```
Élément mémorable : l’aperçu réel du cycle en très grand.

## Piste retenue et test du template
A : le besoin immédiat est de faire la prochaine petite série, avec un toucher pour la garder. Les concurrents consultés privilégient les résultats ou la gamification ; ici la preuve est une action modeste, concrète et corrigeable. Les trois captures existantes suffisent à raconter proposition, enregistrement, préparation du cycle.
Test : une app de séances classiques n’ouvrirait pas sur trois tractions espacées dans la journée. Révision du plan initial : pas de grille de fonctions ; le récit suit faire, noter, prévoir, puis choisir gratuit ou Pro. Le titre est court et les deux premières lignes sont textuelles, sans compteur dessiné ni interface reconstruite.

## Règles de réalisation
- Aucun dessin SVG/CSS/canvas, aucune image générée. Captures, icône et badges officiels seulement.
- Fond sombre justifié par les captures sombres ; deuxième partie claire issue du thème clair réel. Pas de dégradé, d’ombre ni de décor.
- Mobile en une colonne ; grille uniquement en media query min-width. Capture complète, non rognée, dans le premier écran ; texte et badges suivent sur mobile.
- Échelle : texte 18 px ; petits textes 15 px ; h3 22 px ; h2 32–48 px ; h1 34–68 px. Interligne 1,5 pour lire, 1,15 pour les titres ; paragraphes limités à 65 caractères.
- Polices attribuées conservées, auto-hébergées latin (allemand, français, espagnol couverts), OFL ; swap ; seul Unbounded préchargé. Aucune animation nécessaire à l’usage.
- Quatre langues et mêmes URL ; ancres, documents, formulaire et scripts conservés par le build. Prix renvoyés aux stores pour éviter un montant figé par pays.
- CSS à hash, images AVIF/WebP 440/880, OG localisées 1200×630 composées uniquement de typographie et de vraies captures.

## Grille finale
Contrôles statiques terminés ; les cases visuelles attendent la levée du blocage navigateur.

Anti-slop :
- [x] Aucun dessin SVG, CSS ou canvas ; uniquement captures réelles, icône fournie, badges officiels et typographie.
- [x] Identité explicite de pratique Grease the Groove : trois tractions, un toucher, prochaine série espacée.
- [x] Unbounded + Hanken Grotesk, aucune famille ni palette interdite ; thème tiré de l’interface.
- [x] Pas de cartes répétées, de rangée d’emojis ou de décoration illustrée.
- [x] Recherche automatique des phrases bannies : check-antitemplate passe dans les quatre langues.
- [x] Zéro classe de style partagée avec les gabarits ou autres pages, contrôle anti-template.
- [x] Un seul élément mémorable : « 3 tractions. Un toucher. ».
- [x] Aucune illustration, y compris dans les OG : texte et capture existante seulement.
- [ ] Présence et lisibilité du vrai écran dans le premier écran à 390/1440 : prévue dans le CSS, preuve navigateur bloquée.
- [x] Chiffres cohérents avec les trois captures localisées ; aucune légende méta.

Envie :
- [ ] Test visuel de cinq secondes sur la capture mobile : bloqué avant lancement navigateur.
- [x] Le premier écran choisi est la proposition de série, pas les réglages.
- [ ] Avis visuel « donne envie de télécharger » : à relire par Studio avec les captures à produire.

Technique :
- [ ] Captures pleine page 390 et 1440 regardées : non produites, navigateur interdit par le sandbox.
- [ ] Lighthouse mobile ≥95 dans les quatre catégories FR et EN : non mesuré, même blocage navigateur.
- [x] Badges officiels Apple et Google localisés ; curl 200 des cinq destinations store ; documents conservés et liens locaux contrôlés.
- [x] Captures issues de la source désignée par l’issue comme celle du build en vente ; App Store relu par curl : version 3.3.0. Aucun écran de développement ajouté.

Blocage de qualification : Playwright Chrome et WebKit 2359 s’arrêtent avant toute navigation (`SIGABRT` / `Abort trap: 6`, `kill EPERM`). Aucun contournement du sandbox. Les cases dépendant d’une observation navigateur restent ouvertes. L’OG française a été ouverte et inspectée séparément : typographie et capture complète 1200×630. Les quatre OG sont composées avec Pillow à partir du vrai écran et des polices attribuées, sans dessin.

Relecture studio_reviewer effectuée une fois sur le diff suivi et les fichiers non suivis. P2 signalé : le widget Turnstile de 300 px pouvait déborder au zoom 120 %. Correction appliquée : padding adaptatif de la section assistance, garantissant 300 px utiles dès 312,5 px de largeur CSS ; formulaire et widget inchangés. La preuve du rendu réel reste bloquée. Réponse intégrale : `_studio/.local/site-groovelog/RELECTURE.md`.
