# Livraison locale — 5 septembre 2026

La refonte est implémentée dans les sources de **20 dépôts indépendants** :
le portfolio et les 19 produits de [l’inventaire](site-inventory.md).
Les 17 produits demandés sont couverts ; RealmBox et TaskLane complètent le
catalogue public. Ce document décrit la validation locale précédant les commits
et pushes demandés ensuite. Il ne constitue pas une preuve de déploiement.
Aucun message de support ni changement de soumission aux stores n’a été effectué.

## Résultat

Le portfolio conserve ses deux fonctions : découvrir les produits et parcourir
le travail professionnel. Il dispose maintenant de pages FR/EN complètes,
d’un catalogue filtrable accessible sans JavaScript et de compositions montrant
des interfaces réelles. Les sites produits déclinent une direction éditoriale
commune avec des présentations adaptées : suivi sportif, carnet familial,
outils du quotidien, jeu et environnement desktop.

Les sources éditables, langues, captures et commandes sont documentées dans
chaque dépôt. Les générateurs produisent les pages publiques ; aucun changement
ne dépend d’une retouche manuelle du HTML généré. Les 155 textes juridiques des
16 sites Ruby sont identiques à ceux de départ. Leurs 707 occurrences d’ancres
existantes sont conservées. Échappée garde ses cinq types de pages dans neuf
langues ; TaskLane gagne une véritable route française.

La prévisualisation de cette session est servie sur
[le portfolio français](http://127.0.0.1:8765/fr/) et ses sous-chemins produits.
Elle exige que le serveur local de la session soit encore actif. Pour relancer
un site isolé, utiliser les commandes de son README et son sous-chemin Pages.

## Vérifications exécutées

| Contrôle | Résultat observé |
| --- | --- |
| Navigation automatisée Chromium | 370 routes, aux largeurs 390, 768 et 1440 px ; aucun échec HTTP sur les routes listées, débordement, image cassée ou erreur console détecté |
| Inspection visuelle | Chaque produit et le portfolio ; comparaisons avant/après, desktop et mobile, principaux types de pages ; inspections tablette et contrôles de largeur sur l’ensemble |
| Interactions | Navigation clavier, liens d’évitement, menus, langues, FAQ, zoom de captures et fermeture avec Échap ; filtres et recherche du portfolio |
| Formulaires | 16 apps et Échappée FR/EN : champs requis, protections, erreur réseau, conservation du message, succès simulé ; 36 requêtes interceptées, aucun message envoyé |
| Générateurs Ruby | Génération et `--check` réussis dans les 16 dépôts ; 80 tests / 320 assertions sur les données publiques manquantes ou incohérentes |
| Portfolio | `npm run check` réussi : 19 produits, 58 références locales, huit expériences professionnelles, métadonnées et fraîcheur des fichiers générés |
| Échappée | Génération et staging réussis : 7 386 contrôles, artefact de 330 fichiers ; absence des sources internes dans l’artefact |
| RealmBox | Build Astro réussi ; routes FR/EN, redirection racine et nouvelle 404 vérifiées au navigateur |
| TaskLane | Génération, contrôle de fraîcheur et `check-site.mjs` réussis ; rendu de la vue SwiftUI du tag public v0.5.0 avec données de démonstration |
| Maintenance de release | Garde portable et sept simulations dans chacun des 20 dépôts ; trois scénarios demandés exercés aussi par la CLI sans publication |

Les rapports détaillés et captures de cette session sont conservés localement
sous `output/playwright/` dans le dépôt du portfolio, hors des fichiers publiés.
`browser-report.json` agrège les 370 routes. Les pages produits ont été revérifiées
après les derniers changements visuels. Les images sans source dans les
visionneuses fermées sont des emplacements vides : leur ouverture a été testée
séparément. Elles ne sont pas comptées comme des images cassées.

## Prochaines releases

Chaque dépôt contient la règle demandée dans son `AGENTS.md` et une copie
autonome du [skill site-release-sync](../.agents/skills/site-release-sync/SKILL.md),
avec carte des sources et contrat de revue. Les quatre surfaces `ios/` renvoient
également vers le skill de leur dépôt. Les gardes sont raccordés aux 17 chemins
Fastlane concernés ainsi qu’aux workflows GitHub Actions existants.

La revue est liée au commit et à l’empreinte des fichiers courants du candidat.
Une édition ultérieure invalide cette revue. Les contrôles automatiques vérifient
les fichiers, les tests et la cohérence des décisions ; la lecture du contenu,
des captures et du store reste explicitement nécessaire.

- Changement d’interface : captures et pages à mettre à jour, ou préparation
  différée explicitement localisée si la version n’est pas encore publique.
- Refactoring interne : raison précise d’absence d’impact, sans modification
  artificielle du site.
- Fonctionnalité en validation : préparation autorisée, nouvelle promesse de
  disponibilité refusée ; confirmation distincte requise pour chaque plateforme.

Le fichier de revue utilise les artefacts de release existants ou un emplacement
temporaire, sans fichier d’état perpétuel ajouté au dépôt. Les tests ne donnent
aucune autorisation de publication et ne remplacent pas la relecture après
déploiement.

## Limites et ordre de publication

- Le contrôle initial rencontrait un **404 sur TaskLane `/fr/`**. Après
  autorisation de push, TaskLane a été publié en premier et cette route a été
  relue en HTTP 200 avec son nouveau contenu, avant le push du portfolio.
  Le contrôle des 58 destinations a ensuite obtenu 44 réponses 200 et 14
  réponses Apple 429 : ces dernières restent limitées par le service, sans
  nouvelle validation de destination par cette requête. LinkedIn est exclu du
  contrôle automatisé à cause de sa protection antibot.
- La distribution Android des quatre apps Petites n’a pas été confirmée par
  une fiche publique : aucune nouvelle disponibilité Android n’est promise.
  Échappée distingue le Mac publié de l’iPhone/iPad encore à venir. RealmBox
  reste présenté comme une préversion publique, sans qualification native
  supplémentaire déduite de la présence de ses installateurs.
- Le binaire public TaskLane v0.5.0 exige macOS 15 alors que son Info.plist
  annonce 14 et une version interne 1.0.0. Le site indique macOS 15 ; la
  correction de ces métadonnées natives reste à traiter dans sa prochaine
  release. Son avertissement de non-notarisation est conservé.
- Pas du Jour utilise ses véritables captures Watch déjà versionnées ; Apple
  Lookup n’a pas fourni de captures Watch permettant de les renouveler.
- Les builds natifs complets, lanes de soumission, exécutions distantes de CI,
  tests de comportement des apps installées et déploiements ne font pas partie
  des preuves exécutées ici. Le rendu natif TaskLane prouve sa vue illustrée,
  pas le fonctionnement de son gestionnaire de fenêtres.

Aucun dépôt requis n’est resté inaccessible. Les changements Échappée et
RealmBox sont isolés sur la branche `codex/portfolio-sites-redesign-20260905`
dans leurs worktrees ; TaskLane est dans un clone dédié. Les autres dépôts
conservent leurs changements locaux préexistants. Cette validation a précédé
les commits ; leur présence distante doit être relue séparément.
