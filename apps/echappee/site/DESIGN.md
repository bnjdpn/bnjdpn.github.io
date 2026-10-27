# Échappée — la route continue

## Produit réel
Qui : le cycliste équipé d’un home trainer Bluetooth FTMS, ou le visiteur en Contemplation.
Moment : à la maison, avant de commencer une sortie ou une séance ZWO.
Problème : donner un horizon à l’effort indoor et retrouver sa route avec une graine.
Preuve : route au soleil couchant en Contemplation et sortie SIM dans les captures Mac des fiches publiques App Store FR/EN.

Sources lues : fastlane/metadata/{fr-FR,en-US}/description.txt, promotional_text FR, iap/full.json ; app/src/styles/menu.css et captures stores. App Store France et Play répondent 200 le 27 octobre 2026. La fiche Apple reprend les métadonnées actuelles et n’a pas assez d’avis pour un aperçu : aucun témoignage ajouté. Prix omis (le store donne le prix local).

Repères concurrents ouverts : [Zwift](https://www.zwift.com/) centre la communauté et les courses ; [ROUVY](https://rouvy.com/) les routes filmées ; [MyWhoosh](https://event.mywhoosh.com/auth/register) les cartes, entraînements et événements. La page d’accueil MyWhoosh a expiré, son inscription publique a été lue. Ici : l’horizon généré et la liberté de partir seul, pas une comparaison commerciale visible.

### Option 1 — Grand air (retenue)
Concept : une grande phrase de départ face à la vraie route au soleil couchant ; l’écran fait tout le paysage.
Palette extraite visuellement des captures et de l’UI : ombre #101C18, sapin #233D31, prairie #DFE7D4, lumière #F4CD76, texte #F7F3DF.
Alfa Slab One pour la masse des titres ; Public Sans pour lire et choisir.
Premier écran :
```
Échappée   Rouler Séances Commencer   Langues
Votre home trainer.  | vraie route au soleil couchant
Une route infinie.  | en Contemplation
texte + badges      | graine / horizon
```
Élément mémorable : la route au soleil couchant occupe une grande moitié du premier écran, opposée au titre massif.

### Option 2 — Carnet d’entraînement
Concept : une colonne éditoriale de séance avec un grand écran ERG, effort puis export.
Palette : ombre #101C18, ciel #8BB9C5, feuille #DFE7D4, lumière #F4CD76.
Même paire imposée ; Alfa Slab One compacte, Public Sans en légendes.
```
Titre / badges
[ séance ERG en pleine largeur ]
Effort / intervalles / export
```
Élément mémorable : le graphe de séance réel devient le pivot du récit. Écartée car elle réduit la place de Contemplation.

### Option 3 — Horizon clair
Concept : une affiche claire, un grand titre au-dessus d’une bande panoramique réelle.
Palette : prairie #DFE7D4, sapin #233D31, ombre #101C18, lumière #F4CD76.
Alfa Slab One en très grand, Public Sans pour les deux blocs d’explication.
```
Votre route infinie
[ vraie route au soleil couchant panoramique ]
Contemplation | Home trainer
```
Élément mémorable : la route au soleil couchant traverse toute la page. Écartée car une bande trop basse sur mobile réduit la lisibilité de l’UI.

## Décision et test du template
La première piste met le cycliste devant la route dès l’arrivée. Contrairement aux repères concurrents, elle part de la graine et de Contemplation, puis de l’effort, de l’export et de l’achat unique. Elle utilise uniquement deux captures sources existantes et reste légère.
Test : une app voisine pourrait reprendre une accroche et des badges, mais pas ce récit graine → relief SIM → cible ERG → fichier FIT. Pas de grille de fonctionnalités ni d’objet décoratif ajouté.

## Règles de réalisation
- Alfa Slab One 400 et Public Sans variable, latin WOFF2 avec OFL auto-hébergés. FR/EN uniquement : aucun latin-ext nécessaire. Préchargement de la seule Alfa, font-display swap.
- Échelle : corps 1rem, intro 1.08rem, titres secondaires 2–3.7rem, titre 2.45–5.4rem (progression proche de 1.25). Paragraphes limités à 66ch.
- Une colonne par défaut, grilles à partir de 850px. Aucune animation décorative ; défilement doux désactivé en réduction de mouvement.
- Aucune illustration, aucun canvas, aucun dessin CSS ; seulement captures publiques App Store sans recadrage, icône fournie, badges officiels repris du dépôt. URL publiques et SHA sources dans media/SOURCES.json. La capture SIM reste explicitement une démonstration à données simulées.
- Les textes ne reprennent aucune valeur chiffrée d’effort ; aucun prix fixé. Compatibilité FTMS qualifiée, export FIT manuel, modalités d’accès et connexion pour achats explicites.
- Overlay FR et EN seulement. Les sept autres langues, support, confidentialité et tous les autres fichiers sont conservés. Ancres historiques françaises préservées ; #contact mène au lien vers le formulaire existant.
- scripts/product-site/build.mjs copie la scène _pages dans une sortie distincte puis appelle overlay(out), sans marketing/site.json ni écriture dans le dépôt d’app. Studio peut fournir --ruby-stage avec sa scène qualifiée. L’assembleur doit recevoir cette sortie centrale comme local-generator-stage.
- Attention source préexistante : la scène _pages locale contient Formspree et l’ancien domaine ; le générateur ne les transforme pas, conformément au maintien des pages support/confidentialité. Elle n’est pas une scène publiable telle quelle. Utiliser la scène qualifiée Studio (POST /api/contact et Turnstile) avant toute livraison ; aucun formulaire de production n’a été envoyé.

## Grille finale
Qualification incomplète : le lancement de WebKit et de Chrome/Lighthouse est bloqué dans cet environnement. La relecture studio_reviewer n’a pas donné de GO global. Les cases visuelles restent ouvertes.

- [x] Aucun dessin SVG, CSS ou canvas ajouté : captures publiques, icône fournie, badges officiels uniquement.
- [ ] En masquant le nom, le rendu permet d’identifier l’app : à vérifier en navigateur.
- [x] Polices imposées Alfa Slab One et Public Sans, aucune police ou palette interdite.
- [x] Pas de cartes répétées ni de rangée d’emojis.
- [x] Aucun texte banni, vérifié par check-antitemplate.
- [x] Classes propres ec-, 0 % partagées avec les autres sites et gabarits contrôlés.
- [x] Élément mémorable défini : le titre massif face à la route réelle au soleil couchant.
- [x] Aucun visuel dessiné ajouté, y compris les OG (recadrages de captures publiques uniquement).
- [ ] Vrai écran visible au premier écran à 390 et 1440 px : prévu par la mise en page, non validé par capture.
- [x] Aucune donnée d’effort inventée ni de légende méta ; démonstration SIM signalée.
- [ ] Test des cinq secondes sur le rendu mobile.
- [x] Première image : Contemplation, sans menu ni réglages.
- [ ] Envie de télécharger appréciée sur les captures rendues par le relecteur.
- [ ] WebKit 375/390/430, zoom et texte 120 %, sans débordement ni coupure.
- [ ] Lighthouse mobile FR et EN ≥ 95 dans les quatre catégories ; aucun score disponible.
- [x] Badges officiels FR/EN ; fiches Apple FR/US et Play HTTP 200 ; quatre liens publics support/confidentialité HTTP 200 ; 64 liens et ressources locaux valides.
- [x] Captures conformes aux fiches App Store publiques relues ce jour (URLs et SHA dans media/SOURCES.json).
- [x] Une relecture studio_reviewer sur diff et fichiers non suivis ; corrections de code appliquées. Réponse intégrale dans le reçu externe.
- [ ] Scène qualifiée Studio conservant POST /api/contact et Turnstile appliquée, puis nouvelle QA.
- [ ] Branche actualisée avec le commit FastZen de origin/main (opération interdite dans ce lot).

### Ajustement après vérification des sources
Les captures locales récentes de forêt diffèrent des captures publiques servies par Apple. Elles ont été remplacées par 03_mac.png (Contemplation) et 01_mac.png (sortie SIM) extraites des fiches FR et US le 27 octobre 2026, avec URLs et SHA-256 dans media/SOURCES.json. Aucun recadrage des images affichées ; les OG sont des recadrages photographiques des mêmes captures, sans objet ajouté. Le texte ZWO vient des descriptions publiées ; la légende distingue la sortie libre SIM de démonstration.
