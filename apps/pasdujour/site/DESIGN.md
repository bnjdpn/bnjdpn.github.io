# Pas du Jour — lecture instrumentale

## Produit réel
Qui : les personnes qui portent une Apple Watch sous watchOS 26 et veulent garder leurs pas en vue.
Moment : un regard au poignet entre deux déplacements, puis le bilan de la semaine sur la montre.
Problème : installer une complication lisible sur un cadran compatible et comprendre sa progression.
Preuve : compteur à 13 700 et 137 %, galerie des styles, historique à 6 676 pas de moyenne, capturés dans l’app.

Sources : `content/product-sites/PasDuJour.mjs` entier, métadonnées FR/EN et TodayView.swift, captures fastlane FR/EN du dépôt d’app en lecture seule. Fiches Apple FR et US relues le 27 octobre 2026 : HTTP 200, version publique 1.3.0. Les métadonnées locales correspondent au texte public. Les captures récentes remplacent les anciennes captures marketing 1.2.0. Empreintes dans media/SOURCES.json.

Concurrents ouverts : [Pedometer++](https://pedometer.app/) (récit randonnée et entraînement), [StepsApp](https://steps.app/) (motivation, défis et plusieurs appareils), [Duffy](https://apps.apple.com/us/app/duffy-steps-complication/id1207581673) (accès aux pas et historique). Leurs avis ne deviennent aucune promesse pour Pas du Jour ; la page reste centrée sur les six styles, l’installation et le bilan sur la montre.

### Option 1 — Lecture instrumentale (retenue)
Concept : une lecture de compteur, au rythme des grands chiffres de l’app, puis le passage de la journée à la semaine.
Palette issue des pixels : noir écran #000000, turquoise Santé #00CDBB, vert profond bouton #003D36, gris UI #95959A, blanc texte #FFFFFF. Fond de page #101818 pour détacher les captures sans simuler un boîtier.
Chakra Petch 600 pour les titres instrumentaux ; Red Hat Text 400–600 pour le récit et les commandes.
Esquisse :
```
nom                 styles / guide / FR EN
Vos pas du jour,       | vrai écran du compteur
votre objectif.        | 13 700 / 137 % dans l’app
badge App Store       |
la galerie → la semaine → le guide → Pro
```
Élément mémorable : la rencontre d’un titre typographique ample et du compteur réel, sans cadran inventé.

### Option 2 — Manuel de poche
Concept : un guide d’installation dont la séquence constitue toute la page.
Palette : papier #FFFFFF, encre #101818, turquoise #00CDBB, gris #95959A, vert #003D36.
Chakra Petch pour les étapes ; Red Hat Text pour les instructions.
```
nom / FR EN
Ajouter ses pas
[galerie]  1 maintenir le cadran
          2 choisir l’emplacement
badge / historique / Pro
```
Élément mémorable : les instructions occupent le premier écran. Rejet : trop de procédure avant le bénéfice.

### Option 3 — La semaine en regard
Concept : un journal éditorial qui part du bilan hebdomadaire pour revenir au compteur quotidien.
Palette : blanc #FFFFFF, gris #95959A, noir #000000, turquoise #00CDBB, vert #003D36.
Chakra Petch pour le bilan ; Red Hat Text pour les paragraphes.
```
nom / FR EN
[historique]  Vos sept derniers jours
compteur quotidien / galerie des six styles
installation / badge
```
Élément mémorable : historique en ouverture. Rejet : ne donne pas assez vite envie d’installer la complication.

## Choix et test du template
La lecture instrumentale respecte le regard bref au poignet et la place des chiffres dans l’app. Elle se distingue du discours d’entraînement et des défis des concurrents en suivant choisir → regarder sa semaine → installer. Toutes les images sont des captures fournies, donc réalisables sans illustration ni simulation.
Test : une app voisine pourrait avoir un titre et une capture côte à côte ; le récit a donc été révisé pour ouvrir sur la progression au-delà de 100 %, puis montrer les formats de complication avant la semaine et le guide. Pas de rangée de cartes, pas de mockup de montre, pas de données recréées en HTML.

## Règles de page
- Chakra Petch et Red Hat Text exclusivement, WOFF2 latin auto-hébergés, OFL jointes ; seul Chakra préchargé. Aucun changement du couple attribué. Français et anglais couverts par latin.
- Échelle 1,25 : lecture 18 px, titres de section 35–60 px, titre 38–84 px ; paragraphes limités à 62ch. Interligne lecture 1,6, titres 1,07.
- Blanc et turquoise sur fond sombre, texte secondaire clair ; focus visible. Pas de dégradé, animation ou décoration dessinée.
- Une colonne mobile ; grilles uniquement dans min-width. Captures sans découpage, rayon ni contour simulant un appareil, taille intrinsèque 422 × 514.
- Achat unique facultatif sans prix figé. Un seul store, Apple Watch et watchOS 26 explicitement indiqués.
- Formulaire protégé conservé ; confidentialité et assistance inchangées. Pas de promesse de livraison de messages fondée sur le local.

## Réserve à lever
Aucune capture fournie ne montre un cadran watchOS installé avec la complication. L’écran réel du compteur remplit le premier écran ; le critère spécifique « vrai cadran et complication » reste bloqué par cet asset manquant. Aucun cadran n’a été inventé. Validation visuelle Studio requise sur ce point avant publication.

## Grille finale
Vérification statique effectuée ; aucune case visuelle ne vaut une QA navigateur.

Anti-slop :
- [x] Aucun dessin SVG/CSS/canvas : uniquement captures réelles, icône fournie et badges officiels. Cartes OG : typographie et capture entière.
- [ ] App reconnaissable nom masqué : appréciation visuelle à faire hors sandbox.
- [x] Couple attribué, aucune police ni palette interdite ; noir de l’écran et deux verts de l’UI.
- [x] Pas de cartes répétées, ni emojis.
- [x] Aucun terme banni détecté par le contrôle anti-template.
- [x] Classes partagées sous 30 % : 0 % avec les autres pages et les gabarits selon check-antitemplate.
- [x] Élément mémorable défini : rencontre du grand titre instrumental et du vrai compteur à 137 %.
- [x] Aucun objet dessiné ni faux appareil.
- [ ] Premier écran réel visible à 390 et 1440 : prévu dans la mise en page, capture navigateur bloquée. Vrai cadran installé absent des assets.
- [x] Chiffres cohérents avec les captures récentes ; aucune légende méta.

Envie :
- [ ] Test des cinq secondes sur capture mobile : navigateur bloqué.
- [x] Première image choisie : compteur et progression, pas le menu ni les réglages seuls.
- [ ] Avis visuel « donne envie de télécharger » : à obtenir après captures.

Technique :
- [ ] Lighthouse mobile FR et EN ≥ 95 dans les quatre catégories : lancement Chrome bloqué, aucun score disponible.
- [x] Badges officiels FR/EN et liens store HTTP 200 ; confidentialité et assistance publiques HTTP 200. Formulaires et confidentialité identiques octet pour octet dans le stage.
- [x] Captures locales confrontées aux dix images publiques FR/EN : mêmes dimensions et écart absolu moyen inférieur à 1/255 par canal, compatible avec la compression WebP Apple. Compteur public FR inspecté visuellement ; données et UI concordent.

## Qualification locale et livraison
`npm run check`, `npm run build` et `npm run check:links` : résultats dans le reçu local. Stage généré exclusivement dans ce worktree, aucun dépôt d’app modifié. Pages déduites de la configuration publique réelle : `/PasDuJour/`, `/PasDuJour/fr-FR/`, redirection primaire `/PasDuJour/en-US/`, confidentialité existante `/PasDuJour/privacy`.

WebKit 2359 et Chrome s’arrêtent avant ouverture d’une page avec Abort trap / SIGABRT et EPERM dans le sandbox. Aucune capture WebKit ni revue visuelle n’est revendiquée. `qa-browser.mjs` prépare 375/390/430 px, modes normal, zoom CSS 120 %, taille de texte 120 %, et les deux combinés en FR/EN ; le zoom CSS est une approximation de reflow, une vérification du zoom natif Safari reste à faire. Les premiers écrans et pleines pages sont prévus à 390 et 1440.

Le fichier natif Cloudflare `_headers` fixe quatre heures sur `/PasDuJour/assets/glance/*` ; les outils de preview et d’assemblage emportent ce fichier à la racine. CSS versionnée par SHA-256 court. Aucun déploiement. La [documentation Cloudflare](https://developers.cloudflare.com/pages/configuration/serving-pages/) actuelle annonce par défaut `max-age=0, must-revalidate` : la règle est donc explicite, limitée aux assets de cette page.

## Provenance des images
La fiche publique annonce 1.3.0 et son texte correspond aux métadonnées locales. Les dix images FR/EN effectivement liées par Apple ont été téléchargées (HTTP 200) et comparées aux PNG fastlane : 422 × 514, différence absolue moyenne de 0,4858 à 0,9155 sur 255 par canal. Les pixels ne sont pas identiques à cause de la compression WebP ; cette proximité établit la concordance des écrans. Le compteur FR public a aussi été regardé : 13 700 pas, 137 %, objectif de 10 000. URLs publiques, provenance, date et différences mesurées figurent dans media/SOURCES.json ; fichiers téléchargés dans le reçu local. Les anciens fichiers marketing 1.2.0 ne sont pas réutilisés.

## Relecture indépendante
Une relecture par studio_reviewer sur diff et fichiers non suivis. Les deux P2 sont corrigés : titres Pro affirmatifs FR/EN et décodage de toutes les images avant les captures du runner, avec échec sur image incomplète. Sa réponse demeure telle quelle dans RELECTURE.md. Une contre-relecture limitée confirme les deux corrections et la règle de cache (_headers et allowlist d’assemblage), sans défaut résiduel dans ce diff ; réponse dans CONTRE-RELECTURE.md. Les réserves de QA navigateur et de cadran sont conservées.


## Reprise Studio — 27 octobre 2026
Les captures WebKit fournies par Studio (`/tmp/sitecap/pasdujour/fr-390-first.png` et `fr-1440-first.png`) ont révélé une contradiction entre le titre et le compteur montré. Nouvelle inspection des cinq captures fastlane et des quatre captures marketing FR, ainsi que des noms des captures de la fiche Apple publique : aucun cadran installé avec l’heure et les pas. Les aperçus de complications et le guide ne constituent pas cette preuve.

Ouverture retenue : « Vos pas du jour, votre objectif. » ; le chapô décrit le compteur, la progression et le réglage de l’objectif dans l’app. Même correction en anglais et sur les cartes OG. Le sur-titre est supprimé ; la compatibilité reste en phrase simple en bas de page. Capture réelle, polices, liens et reste du récit conservés.

Point à décider : conserver cette ouverture centrée sur le compteur ou fournir une vraie capture de cadran avant de remettre une promesse de cadran en ouverture. QA après correction et Lighthouse à refaire par Studio hors sandbox ; aucun navigateur ni seconde relecture lancés pendant cette reprise.
