# Audit du site avant refonte

Relevé du 8 octobre 2026, sur les sources alors en place sur `main`, avant réécriture. Les numéros de ligne désignent ces fichiers-là. Le site est bilingue, anglais à `/` et français à `/fr/`. La marque visible du studio devient `bnjdpn`. Le nom Benjamin Dupin reste dans le titre du site et dans le pied de page, comme demandé après ce relevé.

Les pages support et confidentialité citées par les fiches App Store ne sont pas dans ce dépôt. Elles sont publiées par les sites produit, sur le même domaine. Elles répondent encore. Cette refonte ne les remplace pas.

## Textes

Formules vagues, slogans, tirets longs, et un hero qui demande au visiteur ce qu'il ressent au lieu de montrer les apps.

| Élément | Fichier | Ligne |
| --- | --- | --- |
| Titre « Small apps. For real life. — Benjamin Dupin ». Slogan et tiret long. | `content/studio-copy.mjs` | 3 |
| Description « For your next workout, the little things at home, life with a baby, and a moment to escape. » Groupe de quatre formules, pas une liste de faits. | `content/studio-copy.mjs` | 3 |
| Hero « What brings you here? » | `content/studio-copy.mjs` | 5 |
| « Find the app for what you want to do. » / « Find your app » | `content/studio-copy.mjs` | 5 |
| « A little help. A lot of possibilities. » | `content/studio-copy.mjs` | 5 |
| « Three ways to begin. » Règle de trois. | `content/studio-copy.mjs` | 6 |
| « A change of scenery. » / « Turn the pedals. Watch the world unfold. » | `content/studio-copy.mjs` | 7 |
| « Take the scenic route » | `content/studio-copy.mjs` | 7 |
| « Your recovery, with context. » / « Meet LoadSense » | `content/studio-copy.mjs` | 8 |
| « Little moments. Less to remember. » / « Meet the family » | `content/studio-copy.mjs` | 9 |
| « Find your app. » / « Real screens, a clear purpose. » | `content/studio-copy.mjs` | 10 |
| « A helping hand » / « Help with your app. » | `content/studio-copy.mjs` | 12 |
| Pied « Small apps. For real life. » | `content/studio-copy.mjs` | 13 |
| Titre « Des apps. Pour la vraie vie. — Benjamin Dupin ». Slogan et tiret long. | `content/studio-copy.mjs` | 16 |
| « les petites choses de la maison » et « les envies d'évasion » | `content/studio-copy.mjs` | 16 |
| Hero « Quel usage vous amène ? » | `content/studio-copy.mjs` | 18 |
| « Un petit coup de main. Plein de possibilités. » | `content/studio-copy.mjs` | 18 |
| « Trois points de départ. » | `content/studio-copy.mjs` | 19 |
| « Changer d'horizon. » / « Laissez le paysage défiler. » | `content/studio-copy.mjs` | 20 |
| « Votre récupération, avec du contexte. » | `content/studio-copy.mjs` | 21 |
| « Petits moments. Moins à retenir. » / « Rencontrer la famille » | `content/studio-copy.mjs` | 22 |
| « Trouvez votre app. » | `content/studio-copy.mjs` | 23 |
| « Un coup de main » / « L'aide de votre app. » | `content/studio-copy.mjs` | 25 |
| Pied « Des apps. Pour la vraie vie. » | `content/studio-copy.mjs` | 26 |
| Accroches d'apps qui promettent un ressenti. « Understand today's recovery. », « Keep your eyes on the next rep. », « Your next record starts with the last one. », « Small sets. A regular practice. », « The right plates, without the maths. », « Find a movement that fits. », « A simple rhythm for fasting. », « A clearer plan for a shared home. », « Keep an eye on your caffeine. », « The pleasure of a cart. Without checkout. », « Your daily steps, at a glance. », « One less thing to remember. », « Remember every first taste. », « A gentle record of little nights. », « Keep the story of every little tooth. », « One thumb. One more run. », « Turn the pedals. Let the road unfold. » | `content/copy.mjs` | 8, 21, 34, 47, 60, 73, 86, 98, 112, 125, 138, 152, 165, 178, 191, 204, 217 |
| Mêmes accroches en français. « Comprendre sa récupération du jour. », « Garder le rythme, jusqu'à la dernière répétition. », « Le prochain record commence par le précédent. », « De petites séries, une pratique régulière. », « Les bons disques, sans calcul mental. », « Trouver le mouvement qui convient. », « Un rythme simple pour le jeûne. », « Un planning plus clair pour le foyer. », « Garder un œil sur sa caféine. », « Le plaisir du panier, sans passer en caisse. », « Vos pas du jour, en un regard. », « Une chose de moins à retenir. », « Se souvenir de chaque première bouchée. », « Un carnet doux pour les petites nuits. », « Garder l'histoire de chaque petite dent. », « Un pouce. Encore une partie. », « Tourner les jambes. Laisser la route venir. » | `content/copy.mjs` | 14, 27, 40, 53, 66, 79, 92, 104, 118, 131, 144, 156, 169, 182, 195, 208, 221 |
| « A contemplative indoor cycling game » et « jeu de cyclisme en intérieur contemplatif » | `content/copy.mjs` | 217, 223 |
| Tiret long dans l'exemple MIX | `content/guides.mjs` | 14 |
| Titre, description Open Graph et JSON-LD reprennent le slogan anglais | `index.html` | 4, 6, 33, 34 |
| Hero rendu « What brings you here? » | `index.html` | 154 |
| Bloc « Three ways to begin. » | `index.html` | 155 |
| « A helping hand » | `index.html` | 175 |
| Pied « Small apps. For real life. » | `index.html` | 176 |
| Équivalents français du hero, du bloc trois points de départ, du contact et du pied | `fr/index.html` | 4, 154, 155, 175, 176 |
| 404 « Let's get you back to the apps. » et tiret long dans le titre | `404.html` | 1 |
| Nom du manifeste « Apps — Benjamin Dupin » avec tiret long, description « Apps for training, everyday life, baby journals and play. » | `site.webmanifest` | 2, 3, 4 |
| Carte de partage « Small apps. Clear purposes. » et « 17 apps to explore » | `scripts/og-card.html` | 2 |
| Carte française « Des apps. Des usages précis. » | `scripts/og-card.html` | 2 |
| Le générateur pose « Benjamin Dupin » comme marque du header, du `og:site_name` et du mot du pied, en plus du titre | `scripts/build-site.mjs` | 35, 45, 47, 54, 63, 65 |

Le header traite le nom de l'éditeur comme un logo. Après correction, le nom reste dans `<title>` et dans le pied. Le mot du header est `bnjdpn`.

## Visuels

| Élément | Fichier | Ligne |
| --- | --- | --- |
| Favicon inventé, carré orange `#ff5c28` et lettre dessinée, sans rapport avec une icône d'app | `assets/favicon.svg` | 1 |
| Panneau Échappée en aplat sombre `#1d3538`, photo plein cadre traitée comme une affiche | `styles.css` | 55, 56 |
| Ombre portée sur les vignettes du catalogue | `styles.css` | 50 |
| Ombre portée et coins arrondis sur la capture des guides | `styles.css` | 78 |
| Pastille colorée `#fff4ee` sur la note de guide | `styles.css` | 82 |
| Monogramme « b. » en 2,9 rem, point orange | `styles.css` | 22 |
| Titres de hero jusqu'à 4,4 rem, serrés, avec retour à la ligne forcé | `styles.css` | 30 |
| Cartes de guides, hauteur minimale 220 px, grille de deux blocs identiques | `styles.css` | 71, 72 |
| Astérisque décoratif à huit branches pour l'état vide | `scripts/build-site.mjs` | 20 |
| Flèche et diagonale répétées sur presque tous les liens | `scripts/build-site.mjs` | 18, 19 |
| Les mêmes SVG dans le HTML servi | `index.html` | 153, 154, 155 |
| Photo de profil GitHub utilisée comme icône Apple du site, à la place d'une marque sobre | `scripts/build-site.mjs` | 44 |
| `apple-touch-icon` vers `assets/profile/github-avatar.jpg` | `index.html` | 5 |

Les captures dans `assets/previews/` et les icônes dans `assets/apps/` sont de vraies interfaces. Elles restent. Aucune illustration de stock n'est ajoutée.

## Mise en page

| Élément | Fichier | Ligne |
| --- | --- | --- |
| Hero en deux colonnes avant le catalogue | `styles.css` | 29 |
| Index d'usages numéroté 01 à 04, sous le hero | `styles.css` | 33, 34 |
| Trois mises en avant après le hero. LoadSense, famille Petites, Échappée en bandeau | `scripts/build-site.mjs` | 49 |
| Grille de deux colonnes de rangées produit, vignette à droite | `styles.css` | 43, 44 |
| Le catalogue n'arrive qu'après le hero et les trois sujets | `index.html` | 154, 155, 156 |
| Sélecteur de support masqué, qui remplace une adresse lisible | `scripts/build-site.mjs` | 53 |
| Le contrôle `check-site.mjs` interdit tout `mailto:` | `scripts/check-site.mjs` | 43 |
| Sourcils en capitales espacées sur presque chaque bloc | `styles.css` | 18 |
| Cartes de guides entre le catalogue et le contact | `styles.css` | 71, 72 |
| Pied noir pleine largeur, mot « Benjamin Dupin » en grand | `styles.css` | 61 |

La page d'accueil est un récit, puis un annuaire. La refonte met l'annuaire en premier.

## Icônes

| Élément | Fichier | Ligne |
| --- | --- | --- |
| Flèche droite sur les liens internes | `scripts/build-site.mjs` | 18 |
| Flèche diagonale sur App Store, support et liens externes | `scripts/build-site.mjs` | 19 |
| Astérisque de l'état vide | `scripts/build-site.mjs` | 20 |
| Loupe du champ de recherche | `scripts/build-site.mjs` | 50 |
| Compteur rond dans la navigation | `styles.css` | 25 |
| Émoji de réinitialisation « ↺ » et flèche « ↑ » | `scripts/build-site.mjs` | 50, 54 |
| Les mêmes signes dans `index.html` | `index.html` | 156, 176 |

Ce ne sont pas des emojis décoratifs de titre, mais des pictogrammes sans texte de remplacement utile, répétés à chaque ligne.

## URLs conservées

Ces chemins de ce dépôt restent servis aux mêmes adresses.

- `https://bnjdpn.github.io/` et `https://bnjdpn.github.io/fr/`
- Ancres `#main`, `#about`, `#selected`, `#products`, `#contact` sur les deux accueils
- `https://bnjdpn.github.io/guides/tempo-timer/`
- `https://bnjdpn.github.io/fr/guides/minuteur-tempo/`
- `https://bnjdpn.github.io/fr/guides/journal-diversification/`
- `404.html`, `robots.txt`, `sitemap.xml`, `sitemap-pages.xml`, `site.webmanifest`
- `sitemap.xml` continue de citer le sitemap de chaque site produit

Les fiches App Store pointent vers les sites produit, pas vers ce catalogue. Vérification HTTP du 8 octobre 2026. `bnjdpn.github.io` redirige vers `bnjdpn.com`. Les chemins ci-dessous répondent en 200. Ils ne sont pas recopiés ici, pour ne pas entrer en collision avec ces dépôts.

Support déjà en ligne.

- `https://bnjdpn.github.io/LoadSense/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/TempoReps/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/PRVault/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/GrooveLog/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/FastZen/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/ColdLoad/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/MoveAtlas/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/NeatShift/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/BrewMeter/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/NoBuyCart/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/PasDuJour/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/VesperDrift/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/petites-gouttes/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/petites-bouchees/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/petites-nuits/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/petites-dents/#contact` et `.../fr-FR/#contact`
- `https://bnjdpn.github.io/Echappee/support.html` et `.../fr-FR/support.html`

Confidentialité déjà en ligne. La variante localisée est utilisée quand elle répond. Sinon, la page unique.

- LoadSense, TempoReps, PRVault, GrooveLog, FastZen, ColdLoad, MoveAtlas, NeatShift, BrewMeter, NoBuyCart, petites-gouttes, petites-bouchees, petites-nuits. `/{app}/en-US/privacy.html` et `/{app}/fr-FR/privacy.html`
- Pas du Jour, Vesper Drift, Petites Dents. `/{app}/privacy.html` seulement. `fr-FR/privacy.html` et `en-US/privacy.html` répondent 404. Ils n'ont jamais été les URL de la fiche.
- Échappée. `/Echappee/privacy.html` et `/Echappee/fr-FR/privacy.html`. `/Echappee/en/privacy.html` répond 404.

Les nouvelles pages du catalogue vivent sous `/apps/` et `/fr/apps/`. Elles lient ces URL. Elles ne les remplacent pas.

La redirection `www` vers la racine est gérée par le DNS et GitHub Pages. Ce dépôt n'y touche pas. `CNAME` est absent de ce dépôt. Le workflow Pages n'est modifié que pour copier le dossier public `apps/` dans l'artefact, sur le même modèle que `fr/` et `guides/`.
