# Vesper Drift — au milieu du vol

## Produit réel
Qui : amateur de shoot’em up sur iPhone, iPad ou Android, qui joue d’un pouce.
Moment : une partie mobile, éventuellement hors connexion ; aucune durée de session promise.
Problème : esquiver tout en construisant une flotte et en progressant dans une campagne.
Preuve : Première lumière en vol, Reconquête, les quatre vaisseaux et les contrats ; captures App Store 2.0.0 référencées dans marketing/site.json.

Sources lues : content/product-sites/VesperDrift.mjs en entier ; métadonnées FR/EN et CampaignView.swift du dépôt d’app, en lecture seule. Les captures marketing/shots sont reprises sans retouche. Palette vérifiée visuellement sur le vol et la flotte, et dans le code : encre #061113, menthe #a6f2c9, or #f2b869, papier #f0f0db, séparation #344c45.

Concurrents consultés le 27/10/2026 : [Phoenix 2](https://apps.apple.com/us/app/phoenix-2/id1134895689), [Galaxy Attack](https://apps.apple.com/us/app/galaxy-attack-alien-shooter/id1176011642), [Sky Force Reloaded](https://apps.apple.com/us/app/sky-force-reloaded/id976116090). Leurs fiches privilégient collections, effets et accumulation. Les avis de Phoenix évoquent le plaisir de pilotage et le souhait du hors ligne. Ici : gestes, campagne finie, progression locale ; aucune comparaison commerciale ajoutée à la page.

### Option A — au milieu du vol (retenue)
Le vol réel est la colonne centrale d’une affiche de jeu, entre promesse et invitation à jouer.
Palette : encre #061113, menthe #a6f2c9, or #f2b869, papier #f0f0db, séparation #344c45.
Tektur 600–700 pour les titres et chiffres ; Exo 2 400–600 pour la lecture.
```
nom                         campagne / aide / FR EN
Un pouce.      | vrai vol | 18 missions
18 missions…   |          | trois boss
intro / stores |          | hors ligne
```
Élément mémorable : le couloir de vol réel traverse le premier écran entre deux blocs typographiques.

### Option B — le manuel ouvert
Une édition claire du manuel : une grande capture sous un titre, puis texte et détails.
Palette : papier #f0f0db, encre #061113, menthe #a6f2c9, or #f2b869.
Tektur pour les entrées ; Exo 2 pour la lecture.
```
nom / manuel / aide
Un pouce pour les jardins
[             vol             ]
notice                  stores
```
Élément mémorable : une notice de pilotage à la taille d’une affiche. Écartée : le fond clair s’éloigne du jeu.

### Option C — la flotte d’abord
Un catalogue sombre des vaisseaux, suivi du vol et des missions.
Palette : encre #061113, papier #f0f0db, or #f2b869, séparation #344c45.
Tektur pour les noms ; Exo 2 pour les fiches.
```
nom / flotte / aide
Quatre vaisseaux à gagner
[flotte]    [vol]
stores      campagne
```
Élément mémorable : la flotte occupe toute la largeur. Écartée : un menu explique moins vite le plaisir de jouer.

## Choix et test du template
A donne immédiatement le geste et le jeu au joueur mobile. Le jardin orbital réel et la typographie technique évitent le catalogue d’explosions des concurrents. La composition se fait uniquement avec les captures disponibles, sans décor dessiné ni vidéo à produire.
Test : une app voisine n’aurait ni ce couloir organique ni cette campagne. Le plan initial de trois cartes a été supprimé au profit du trajet vol → mission → flotte → contrat, puis achats en lignes lisibles.

## Règles
- Aucun dessin SVG/CSS/canvas ; seulement captures, icône et badges officiels.
- Tektur + Exo 2 exclusivement, WOFF2 latin OFL auto-hébergés ; seule Tektur préchargée, font-display swap.
- Échelle 1,25 environ : lecture 18, sous-titres 23, titres 36 à 68 ; lignes de lecture limitées à 65 caractères.
- Une colonne mobile, composition desktop à partir de 900 px. Aucun cadre de faux téléphone.
- Palette sombre de l’app ; contrastes AA, focus or, aucune animation automatique.
- Texte FR d’abord, EN adapté ; prix renvoyés aux stores ; Arcade/Maîtrise explicitement Apple.
- Support, Turnstile, champs et script conservés ; confidentialité et guides hérités.
- CSS hashée et cache Pages de 4 h (max-age=14400 confirmé par le relecteur sur le CSS public existant).

## Grille finale
À remplir après QA visuelle et mesures, sans anticiper les résultats.

Vérification statique du 27/10/2026 ; qualification visuelle bloquée au lancement des navigateurs dans l’environnement courant. Ne pas publier sur cette seule grille.

Anti-slop :
- [x] Aucun dessin SVG/CSS/canvas ; seuls visuels : captures réelles, icône et badges officiels.
- [ ] En masquant le nom, on devine l’app : à confirmer sur capture du site.
- [x] Aucune police par défaut interdite, aucune palette interdite.
- [x] Aucune répétition de cartes, aucune rangée d’emojis.
- [x] Aucune phrase bannie : contrôle anti-template passé.
- [x] Classes partagées sous 30 % : résultat mesuré 0 %.
- [x] Un élément mémorable : le couloir de vol central.
- [x] Aucune illustration dessinée, y compris dans les images OG (texte et vraie capture uniquement).
- [ ] Vrai écran dans le premier écran à 390 et 1440 : implémenté, preuve navigateur à obtenir.
- [x] Aucune donnée contradictoire avec les captures, aucune légende méta.

Envie :
- [ ] Test des 5 secondes sur la capture mobile : à regarder après déblocage navigateur.
- [x] Première image : le vol réel, et non un écran de réglages.
- [ ] Envie de télécharger : validation visuelle Studio encore nécessaire.

Technique :
- [ ] Lighthouse mobile ≥ 95 dans les quatre catégories, FR et EN : lancement Chrome bloqué, aucun score obtenu.
- [x] Badges officiels et liens stores HTTP 200 ; confidentialité et assistance HTTP 200 ; contrôle des liens locaux passé.
- [x] Captures de combat de la fiche Apple 2.0.0 vérifiée en direct le 27 octobre ; provenance, recadrages et SHA-256 dans ASSETS.md.
- [ ] WebKit 375/390/430 avec texte et zoom 120 %, captures 390/1440 : lancement WebKit bloqué avant toute navigation.

## Relecture studio_reviewer
Deux P2 corrigés : chargeur Turnstile inline supprimé (le script hérité reste seul responsable) et sélecteur desktop .vd-launch .vd-shot-1 prioritaire. Réponse intégrale et preuves dans _studio/.local/site-vesperdrift/RELECTURE.md. Aucune seconde relecture : une seule demandée pour ce lot.

## Reprise Studio — 27 octobre 2026

Le test du futur utilisateur a échoué sur les captures WebKit fournies par Studio : le vol trop long et sombre ne rendait pas le combat lisible. Le premier écran utilise maintenant un détail réel du combat iPad de la fiche App Store 2.0.0 ; la section campagne montre le terrain entier. Les menus flotte et contrats ont été retirés, leurs textes et liens conservés. Sur mobile, le détail occupe 86 % de la largeur disponible et reste court (ratio 740/800) ; sur desktop il conserve son maximum de 360 px. Tektur et Exo 2 restent identiques. Les images de partage reprennent aussi ce combat.

Les pixels des médias ont été inspectés directement. npm run build, npm run check, npm run check:links, le build produit et ses contrôles statiques passent après la reprise. Aucune nouvelle QA navigateur : Studio refera les captures 390/1440 ; les cases correspondantes restent ouvertes. Aucun nouveau studio_reviewer.
