# Petits Besoins — les mots du relais

## Produit réel, avant la forme
Qui : les parents d'un enfant qui passe des couches au pot, à la maison et à la crèche.
Moment : une observation à noter d'une main ; les consignes à transmettre lors du départ à la crèche.
Problème : se souvenir de la journée et expliquer les habitudes de l'enfant à la personne qui le garde.
Preuve : Aujourd'hui sépare maison/crèche et couche mouillée/accident ; Kit crèche conserve les mots, habitudes et vêtements de rechange.

Sources lues le 27 octobre 2026 : métadonnées Android fr-FR/en-US, products.json, Theme.kt, KitScreen.kt, NotebookStyle.swift ; fiches Apple et Play publiques (HTTP 200). Les PNG Play locaux ont été comparés pixel à pixel aux cinq captures publiques de chaque langue : différence nulle. Preuve : CAPTURES-SOURCES.json dans le reçu Studio. Aucune capture iOS utilisée.

## Trois pistes

### Option A — les mots du relais (retenue)
Un grand texte accueillant mène du geste de saisie aux mots que l'on passe à la crèche, avec les vrais écrans comme seule preuve.
Palette issue de l'UI : papier #FFFAF4, encre #342C2A, sarcelle #397C79, menthe #C6E8E2, lavande #E6E0EC. Sniglet pour la voix et les titres ; Lato pour les explications et les liens.
```
[icône + Petits Besoins]     [Carnet / Crèche / FR EN]
[Notez le pot.        ]     [capture Aujourd'hui]
[Passez les mots      ]     [                  ]
[à la crèche.         ]     [                  ]
[texte / badges       ]     [                  ]
```
Élément mémorable : « Une couche mouillée reste une couche mouillée. », en grand, au passage du geste au journal.

### Option B — le carnet consultable
Un sommaire compact et des grands écrans de journal, comme une documentation pratique que l'on ouvre au retour du soir.
Palette : papier #FFFAF4, encre #342C2A, sarcelle #397C79, lavande #E6E0EC. Sniglet pour les titres courts, Lato pour les entrées longues.
```
[Petits Besoins] [Sommaire]
[Retrouvez sa journée]
[capture Journal pleine largeur utile]
[consulter / modifier / partager]
```
Élément mémorable : le journal devient le fil de navigation. Écartée : la consultation prend le dessus sur le geste immédiat de saisie.

### Option C — la transmission d'abord
Le kit crèche occupe l'ouverture ; les notes du quotidien arrivent après les consignes.
Palette : menthe #C6E8E2, encre #342C2A, papier #FFFAF4, sarcelle #397C79, brun #876044. Sniglet pour la phrase principale, Lato pour le contenu.
```
[Petits Besoins] [Le kit]
[Ses mots, pour la crèche]
[capture kit] [capture aperçu]
[badges] [ce qui reste gratuit]
```
Élément mémorable : le duo consignes/aperçu. Écartée : l'ouverture pourrait faire croire que l'export PDF payant est la fonction principale.

## Choix et test du template
La piste A convient au parent pressé : le premier écran dit quoi noter et à qui transmettre. Les pages concurrentes consultées — [Potty Whiz](https://www.pottywhiz.app/?locale=en), [OneStepTwo](https://onesteptwo.com/), [Puddy](https://puddly.app/) — mettent en avant les célébrations, le partage synchronisé ou le minuteur ; ici le relais passe par les mots de l'enfant et le kit. Elle est réalisable avec les captures publiques exactes, sans dessin ni démonstration fictive.

Test du template : un simple parcours « noter / consulter / exporter » conviendrait à un autre carnet. Révision : le titre mentionne le pot et la crèche, la charnière typographique distingue couche mouillée et accident, la deuxième partie reprend les rubriques précises du kit. Aucun objet dessiné, aucune fausse fiche de l'app.

## Règles de la page
- Sniglet 400 + Lato 400/700, inchangées par rapport à l'attribution. Latin inclut les caractères français employés ; WOFF2 locaux et licences OFL dans fonts/. Seule Sniglet est préchargée.
- Échelle approximative 1,25 : lecture 18–20 px ; sous-titres 25 px ; titres 39–56 px ; titre principal jusqu'à 82 px. Texte courant limité à 62 caractères, interligne 1,6.
- Fond clair de l'app, sarcelle assombrie #28625F pour les petits textes colorés. L'encre reste #342C2A. Aucun dégradé, aucune ombre décorative.
- Une colonne mobile ; composition desktop dans min-width: 900px. Capture réelle visible dès le premier écran ; images entières, sans découpe de l'UI.
- Seules images : captures publiques Play, icône fournie, badges officiels locaux. OG : texte et vraie capture, 1200 × 630.
- Parcours : noter → retrouver/transmettre → préparer la crèche → distinguer gratuit et achat PDF → installer.
- Pas de motion automatique ; focus visible et navigation native. Pas de JavaScript sur la page produit.
- Gratuit : profils, saisie, historique, rappels, synthèse texte et aperçu ; seul le PDF et les feuilles réutilisables se débloquent par achat unique à vie. Prix renvoyé au store dans les deux langues, sans extrapoler la France.
- /petits-besoins/ en anglais, /petits-besoins/fr-FR/ en français. Les anciennes pages et ancres restent servies ; les anciennes entrées catalogue redirigent 301. Assistance/confidentialité et POST /api/contact inchangés.

## Grille finale
À cocher après les mesures et la relecture visuelle, pas avant.
- [x] Aucun dessin SVG, CSS ou canvas ; seulement captures, icône et badges.
- [x] Nom masqué, le pot et les consignes de crèche identifient le produit.
- [x] Polices et palette conformes, distinctes des autres sites.
- [x] Pas de cartes répétées, pas de rangée d'emojis.
- [x] Aucun terme banni, aucune légende méta ni donnée inventée.
- [x] Moins de 30 % de classes partagées ; préfixe pb-.
- [x] Élément mémorable unique : couche mouillée distincte de l'accident.
- [ ] Vrai écran visible au premier écran mobile et desktop.
- [ ] Test des 5 secondes : carnet du pot pour les parents, relais crèche.
- [ ] Première capture : saisie quotidienne, pas les réglages.
- [ ] Envie de télécharger relue par studio_reviewer.
- [ ] Lighthouse mobile ≥ 95 dans les quatre catégories, français et anglais.
- [x] Badges officiels ; liens stores 200 ; assistance et confidentialité accessibles.
- [x] Captures publiques identiques aux sources du site.
- [ ] Captures pleine page 390 et 1440 regardées, WebKit 375/390/430 à 120 % vérifié.

Qualification visuelle bloquée le 27/10/2026 : le WebKit installé (2359) termine avec Abort trap 6 / code 134 ; Chromium termine avec SIGABRT, et Lighthouse ne parvient pas à ouvrir son port de débogage. Aucun contournement du sandbox. La visibilité du vrai écran, l’absence de débordement à 120 %, les captures complètes, l’envie de télécharger et les quatre scores Lighthouse restent à qualifier hors sandbox. Relecture unique studio_reviewer : DÉFAUTS ; parcours de vérification des dossiers publics corrigé, blocage de qualification conservé.
