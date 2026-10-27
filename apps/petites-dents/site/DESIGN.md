# Petites Dents — Chaque dent a sa date

## Produit réel
Qui : les parents qui veulent garder la chronologie dentaire de chaque enfant.
Moment : une dent vient de percer ; plus tard, une visite chez le dentiste ou un souvenir à partager.
Problème : retrouver la date de chaque percée et l’âge exact de l’enfant, sans fouiller les photos.
Preuve : la bouche interactive ; la préparation du carnet et la carte d’événement sur la fiche App Store 2.1.4.

Sources lues : `content/product-sites/petites-dents.mjs` en entier ; description et release notes iOS fr-FR ; description Play fr-FR ; `MouthView.swift`, `HistoryView.swift`, `PetitesDentsStyle.swift` (lecture seule). Fiche Apple et Play : HTTP 200 le 27 octobre 2026. L’API publique iTunes confirme 2.1.4. Les images historiques de marketing/site.json datent de 2.1.2 : remplacées par les trois captures actuellement exposées par Apple, dans chaque storefront FR/US/GB. URL, dimensions et SHA source dans `media/SOURCES.json`. Aucun écran recomposé.

Concurrents ouverts : [Toothli](https://play.google.com/store/apps/details?id=at.mariodev.toothli), [Baby Teeth Tracker & Teething](https://play.google.com/store/apps/details?id=com.milchzaehne_app), [Miloh](https://getmiloh.com/). Les deux premiers mettent aussi en avant le diagramme et le journal ; Miloh expose une inscription à une liste. Notre différence éditoriale est la séparation concrète entre fiche pour le professionnel, carte gratuite et carnet familial en achat unique. Aucun classement ni avis inventé.

### Option A — La chronologie familiale
Concept : un grand titre sur les dates, puis le vrai schéma au centre d’une composition typographique ouverte.
Palette UI : encre #332b29, corail #ff7366, rose #ffd9d1, abricot #ffe6c7, papier #fffaf2. Corail réservé aux surfaces et séparateurs, jamais au petit texte.
Typographie : Fredoka 500 pour les titres ; Mulish 400–700 pour les explications.
Premier écran :
```
nom                  Suivi / Souvenirs / Assistance / Langue
Chaque dent a sa date.
Et votre enfant, son âge au jour près.
[texte + badges]      [capture réelle]      [lait / définitives]
```
Élément mémorable : le vrai schéma dentaire pris entre deux colonnes de mots, sous un titre très large.

### Option B — Le dossier de visite
Concept : présentation documentaire centrée sur les informations à donner au dentiste.
Palette : encre #332b29, sauge #829c7a, papier #fffaf2, blanc #ffffff.
Fredoka 500 pour les titres ; Mulish pour le corps et les libellés.
```
nom / assistance
La date. L’âge. Les notes.
[capture]   [fiche dentaire PDF]
```
Élément mémorable : une grande liste éditoriale de renseignements utiles. Écartée : trop administrative pour un parent qui vient de repérer une nouvelle dent.

### Option C — Le souvenir à transmettre
Concept : la carte d’événement réelle occupe l’ouverture, avec le partage familial comme récit.
Palette : corail #ff7366, rose #ffd9d1, abricot #ffe6c7, encre #332b29, papier #fffaf2.
Fredoka 500 à grande échelle, Mulish 400 pour le récit.
```
nom / télécharger
[capture carte]      Une dent à partager.
[badges]            [texte court]
```
Élément mémorable : la carte de dent à échelle généreuse. Écartée : elle masquerait la valeur première du suivi gratuit et ferait croire à une app de cartes.

## Piste retenue et test du template
Option A. Elle rejoint le moment précis de la percée et conserve la chaleur des couleurs réelles. Elle distingue la valeur documentaire et les souvenirs, plutôt que de promettre un suivi médical. Elle se réalise uniquement avec les trois captures publiques actuelles et du texte.

Test du template : une app de sommeil ne pourrait pas garder le récit « dents de lait / dents définitives / fiche dentaire / carte d’une dent ». La grille de fonctionnalités initialement envisagée a été supprimée au profit de ce parcours. La capture signature est celle des dents définitives, explicitement nommée ; le titre et l’introduction couvrent les deux dentitions.

## Règles de réalisation
- Fredoka + Mulish OFL, sous-ensemble latin avec accents français, WOFF2 local, swap ; seule Fredoka préchargée. Aucun changement de couple.
- Échelle voisine de 1,25 : 16 / 20 / 25 / 31 / 39 / 61 / 76 ; titres fluides jusqu’à 88 px, corps 17 px et interligne 1,65 ; paragraphes ≤ 65 caractères.
- Palette prélevée dans le thème Swift et les captures : #fffaf2, #332b29, #ffd9d1, #ffe6c7 ; texte secondaire assombri #63534e pour AA.
- Une colonne par défaut, grille uniquement à partir de 960 px. Aucune hauteur de texte fixe, aucune coupure de capture. La capture est visible au premier écran mobile et desktop.
- Aucun dessin ajouté : uniquement les captures Apple actuelles, l’icône et les badges officiels. Aucun SVG de décoration, canvas, pseudo-objet CSS, animation décorative.
- Navigation courte, ancres historiques conservées. Pas de prix local figé : boutique avant achat. Partage familial explicitement Apple uniquement.
- Confidentialité et pages d’assistance conservées. Formulaire de contact vers POST /api/contact, champs app et _subject, pot de miel et Turnstile conservés ; aucune preuve de réception en production n’est revendiquée.
- CSS avec hash SHA-256 et cache de quatre heures ; OG locale 1200 × 630 à partir de la vraie capture et de texte.

## Grille finale
À renseigner après lecture des captures et mesures effectives.

### Grille finale renseignée le 27 octobre
- [x] Aucun dessin ajouté : seuls visuels = captures publiques, icône, badges officiels.
- [x] Identité liée au produit : dentitions, dates et âges, fiche dentaire et carte de dent ; aucun autre app ne garde ce récit sans réécriture.
- [x] Fredoka et Mulish, aucune famille interdite ; palette issue du produit.
- [x] Pas de cartes répétées, de rangée d’emojis ni de phrase bannie (§6).
- [x] Classes propres préfixées pd-, 0 % de classes partagées dans le contrôle anti-template.
- [x] Un élément mémorable : schéma dentaire réel au milieu d’une grande composition de mots.
- [x] Aucune donnée textuelle inventée ; captures provenant des fiches actuelles ; aucun exemple chiffré ajouté autour.
- [ ] Premier écran à 390 et 1440 px regardé : bloqué, lancement WebKit terminé par SIGABRT dans l’environnement restreint.
- [ ] Test des 5 secondes et envie de télécharger relus sur les captures du site : non prouvés, même blocage.
- [x] Premier écran prévu avec le schéma dentaire et non des réglages ; ordre HTML vérifié.
- [ ] Aucune coupure à 375/390/430 avec zoom et texte 120 % : non vérifié en navigateur.
- [ ] Lighthouse mobile ≥ 95 FR et EN : lancement Chrome bloqué, aucun score disponible.
- [x] Badges officiels, stores testés à 200 ; liens locaux et confidentialité vérifiés statiquement.
- [x] Captures App Store 2.1.4 actuelles, URL et SHA consignés dans media/SOURCES.json.

La grille ne donne pas un GO de publication : les cases navigateur restent à prouver par Studio. Le script `qa.mjs` prépare les captures et contrôles aux dimensions demandées ; son zoom CSS émule le zoom de mise en page et ne prétend pas être un pincement natif iPhone.
