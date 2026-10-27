# ColdLoad — La charge, en clair

## Produit réel
Qui : la personne qui s’entraîne à la barre, avec ses propres paires de disques.
Moment : entre deux séries, lorsqu’il faut préparer la charge suivante.
Problème : passer d’une cible en kg ou lb aux disques réellement disponibles de chaque côté.
Preuve : le résultat à 80 kg, barre de 20 kg et 25 + 5 kg par côté, dans la capture du store en vente.

## Sources et constat
Lecture du 27 octobre 2026 : `content/product-sites/ColdLoad.mjs` entier, metadata FR, `TargetLoadCard.swift`, `ColdLoadPalette.swift`, captures publiques App Store 01–03, icône. Comparaison directe avec les images téléchargées depuis les URLs mzstatic de la fiche publique : les captures `marketing/shots` correspondent à la fiche en vente. Les PNG locaux `fastlane/screenshots` présentent une interface différente et ne sont donc pas utilisés. Les captures sont reprises en AVIF/WebP sans retouche depuis marketing/shots : résultat à 80 kg, stock, et alternatives à 101 kg. Provenance SHA-256 de chaque fichier dans `media-provenance.json`.

Concurrents ouverts : [RackMath](https://rackmath.com/) vend un parcours d’entraînement complet ; [BarbellMax](https://barbellmax.com/) donne directement un outil interactif ; [Mekimeki](https://mekimeki.app/plate-calculator/) intègre le calcul au suivi de séance. ColdLoad reste centré sur le matériel disponible et les disques par côté. Aucun avis utilisateur ni témoignage n’est inventé.

### Option A — La charge, en clair (retenue)
Concept : une consigne de chargement composée en grandes lettres, suivie immédiatement de sa preuve réelle.
Palette issue de l’UI : fond charbon #040507, panneau #141a20, glace #8fcdF0, métal #9cb0ba, encre #e8f0f2 ; rouge des disques uniquement dans les captures.
Typographie : Teko 600 pour les titres et le résultat éditorial ; Barlow 400/600 pour lecture et navigation.
Premier écran :
```
ColdLoad                 Matériel / Pro / Aide
LES DISQUES PAR CÔTÉ.     [vrai résultat de l’app]
AVEC VOTRE STOCK.        [80 kg / 25 + 5 kg]
Texte court + badges     [capture complète]
```
Élément mémorable : la ligne typographique « 25 + 5 kg » accompagne le résultat réel, sur une bande bleu glacier.

### Option B — Le manuel de salle
Concept : un manuel technique clair, grandes marges, illustrations remplacées par les captures.
Palette : papier #e8f0f2, encre #141a20, métal #9cb0ba, glacier #8fcdf0.
Typographie : Teko titres, Barlow texte.
```
ColdLoad / Sommaire
Titre + badges
[capture] / consigne détaillée
```
Élément mémorable : une table des réglages façon index de matériel.
Rejet : le thème clair éloigne trop de l’interface sombre réellement utilisée.

### Option C — Le résultat d’abord
Concept : une capture presque plein écran, puis la fiche produit.
Palette : noir #040507, acier #1f252b, blanc #e8f0f2, bleu #8fcdf0.
Typographie : Teko pour les intertitres, Barlow pour la fiche.
```
ColdLoad / Langues
[très grande capture]
Titre / badges / détails
```
Élément mémorable : l’écran domine toute la page.
Rejet : sur téléphone, la proposition et les badges arriveraient trop tard.

## Choix et test du template
A convient à une lecture debout entre deux séries : cible, résultat, matériel. Contrairement aux concurrents consultés, le récit reste consacré au chargement et ne devient pas une présentation de suivi sportif. Il est réalisable uniquement avec les captures fournies et une composition typographique.
Test : une app voisine pourrait reprendre un simple duo titre/téléphone ; la bande « 25 + 5 kg », les détails barre/stock, puis stock et cible impossible rattachent le plan à ColdLoad. La grille de cartes initialement envisagée est supprimée au profit de lignes éditoriales et de deux séquences visuelles différentes.

## Règles de réalisation
- Aucun dessin SVG, CSS ou canvas : captures, icône, badges officiels uniquement.
- Colonne unique de base ; grilles uniquement sous `min-width`.
- Échelle typographique proche de 1,25 : 16 / 20 / 25 / 31 / 49 / 76. Lecture 1,5, lignes limitées à 65 caractères.
- Teko et Barlow auto-hébergées, latin et latin-ext ; fallback natif pour les écritures non couvertes. Seul Teko latin préchargé.
- Pas d’animation décorative. Focus visible, `lang`, titres, dimensions d’image et alternatives utiles.
- 21 langues et devises conservées. Les prix sont renvoyés au store, sans montant figé.
- Formulaire, confidentialité, calculateur et redirections inchangés.

## Grille finale
Les lignes visuelles restent ouvertes : le sandbox empêche de démarrer WebKit et Chrome. Cette page n’est pas qualifiée pour publication.

Anti-slop :
- [x] Aucun dessin SVG, CSS ou canvas : uniquement captures réelles, icône et badges officiels.
- [ ] Nom masqué, identité ColdLoad reconnaissable : jugement sur capture à terminer.
- [x] Aucune police interdite ; palette tirée de l’UI réelle.
- [x] Pas deux sections en cartes identiques, aucune rangée d’emojis.
- [x] Recherche des expressions bannies : anti-template passe sur les 21 langues.
- [x] Moins de 30 % des classes partagées : 0 % avec les autres pages produit.
- [x] Un élément mémorable : la ligne typographique « 25 + 5 kg ».
- [x] Aucun dessin ; provenance des images documentée.
- [ ] Écran réel visible dans le premier écran à 390 et 1440 px : capture à vérifier.
- [x] Chiffres cohérents avec les captures (80 kg ; 25 + 5 kg), aucune légende méta.

Envie :
- [ ] Test des cinq secondes sur la capture mobile : bloqué.
- [x] Première capture = résultat de chargement, pas des réglages.
- [ ] Envie de télécharger confirmée par relecture visuelle : bloquée.

Technique :
- [ ] Lighthouse mobile ≥ 95 dans les quatre catégories FR et EN : Chrome ne démarre pas.
- [x] Badges officiels localisés ; liens stores 200 ; liens locaux contrôlés dans le stage.
- [x] Captures conformes à la fiche publique en vente : images mzstatic FR comparées à `marketing/shots` ; les PNG fastlane divergents ont été écartés.
- [ ] WebKit iPhone 375, 390, 430 px, zoom et texte 120 %, absence de débordement/coupure/image cassée : navigateur non démarré.
- [ ] Captures pleine page et premier écran FR 390 et 1440 px regardées : indisponibles.

## Relecture du lot
Une relecture `studio_reviewer` sur fichiers non suivis ; réponse brute dans `_studio/.local/site-coldload/RELECTURE.md`. Corrections appliquées : `font-display: swap`, locale OG régionale, grille finale honnête et un seul chargement Turnstile. Le script `assets/site.js` d’origine reste inchangé ; son chargement est différé à l’approche du formulaire, puis lui seul charge l’API et conserve son callback explicite.
