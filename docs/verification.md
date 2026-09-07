# Vérification locale — 7 septembre 2026

## Livraison

Le catalogue présente exclusivement les 17 apps de `content/catalog.json`.
La refonte produit existante a été réutilisée : les 16 sites Ruby gardent leurs
compositions, interfaces réelles, 315 routes HTML et toutes leurs langues.
Échappée conserve 46 routes sur neuf langues ; sa section plateformes montre
maintenant le Mac publiquement distribué, avec une capture lisible pleine largeur.
L’accueil FR/EN, sa 404, ses données structurées et son aperçu de partage sont
recentrés sur les usages des apps. Le répertoire support renvoie à chaque produit.

RealmBox, TaskLane et les présentations de carrière sont retirés des sources
éditoriales, pages livrées, navigation, catalogue, sitemaps, métadonnées et aperçu
social. Les sources des anciennes expériences et l’icône TaskLane sont supprimées.
Les sites indépendants des projets exclus ne sont pas modifiés.

## Faits publics

La [lecture Apple](public-store-readback.json) du 7 septembre confirme les 17
identifiants, leurs versions et leurs descriptions. Les descriptions françaises
des 16 apps Ruby correspondent aux snapshots existants. Petites Bouchées et
Pas du Jour sont passées à 1.1.1 ; leurs descriptions FR/EN sont inchangées et
leurs sources web ont été actualisées. Les captures conservent leur provenance.
Échappée est distribuée uniquement sur Mac, version 1.0.0, macOS 12+/M1+ ;
la lecture française confirme le prix existant de 25 €. Aucune nouveauté iOS
soumise n’est présentée comme disponible.

51 destinations publiques répondent HTTP 200. Deux liens App Store génériques
(Petites Gouttes et Vesper Drift) répondent HTTP 429 : ce contrôle de liens est
explicitement incomplet et retourne un code d’échec. Leur présence et leur
version sont toutefois confirmées par la lecture publique Apple distincte.

## Contrôles exécutés

- Catalogue : génération et fraîcheur EN/FR ; 17 identifiants, références locales,
  titres, canoniques, hreflang, JSON-LD, sitemaps, images, ancrages, allowlist Pages.
- Exclusions : contrôle des sources et fichiers publics, y compris noms d’assets,
  styles, manifeste et source de l’aperçu social. Les règles internes sont hors
  de ce contrôle pour éviter les faux positifs. Exécuté aussi dans la CI PR.
- Chacun des 16 sites Ruby : génération et `--check`, six tests de snapshots,
  sept simulations de maintenance et huit tests du workflow ; tous réussis.
- Échappée : génération images/HTML, staging et 7 323 contrôles réussis ; sept
  simulations de maintenance réussies. Aucun nouveau binaire média inventé.
- Chrome réel : 364 routes × 390/768/1440 px ; aucun HTTP en échec, débordement,
  image cassée ou erreur console/JavaScript. Routes historiques redirigées suivies.
  Captures de chaque app FR/EN et principaux types de pages examinées.
- Accueil FR/EN : filtre famille = 4, recherche sans accent « echappee » = 1,
  absence de résultat puis remise à zéro = 17, lien d’évitement focalisant `main`,
  navigation linguistique et 34 destinations/ancres de support vérifiées.
  Galerie et menus linguistiques produits vérifiés.
- Formulaires LoadSense, Petites Bouchées, Échappée FR/EN : champs invalides bloqués,
  erreur 503 conserve la saisie, succès 200 simulé, bouton réactivé. Les 12 POST
  sont interceptés ; aucun message réel transmis.
- YAML des workflows et frontmatter du skill analysés avec le parseur local ;
  liens portables vérifiés par le garde Ruby. Le validateur Python optionnel du
  skill n’a pas tourné, PyYAML étant absent ; aucun résultat de cet outil n’est revendiqué.

Les rapports et captures de cette exécution résident dans
`output/verification-20260907/` (artefacts locaux ignorés par Git).
Les tests ne prouvent pas à eux seuls la fidélité éditoriale ou la disponibilité.

## Maintenance installée

Chaque dépôt d’app et le catalogue possèdent déjà leur règle dans `AGENTS.md`,
leur skill `.agents/skills/site-release-sync/` et une carte locale accessible dans
un clone isolé. Les raccordements Fastlane et GitHub Actions ont été vérifiés.
Les revues identifient le candidat et son empreinte, les langues, les décisions
site/captures/catalogue, l’impact et chaque plateforme.

Les trois cas demandés passent : nouvelle UI exigeant des captures, refactoring
sans impact justifié, nouveauté encore en validation conservée hors publication.
Une revue obsolète est refusée. Un travail différé reste déclaré comme restant.
Les gardes ne remplacent pas le jugement éditorial et ne tournent pas en permanence.

Correction des 16 générateurs : seules les sources publiques déterminent la
fraîcheur des pages ; préparer des métadonnées Fastlane candidates n’invalide plus
le site confirmé. Un test par dépôt protège cette séparation. Pour Échappée,
un lot de captures Fastlane validé ne remplace plus automatiquement les médias
publics : la promotion est explicite après confirmation publique, documentée dans
le dépôt. Les changements prêts pour une release encore en attente restent dans
une branche/patch non publié, hors de l’artefact Pages courant.

## État à la fin de la validation locale

Changements locaux non publiés dans les 18 dépôts concernés. Les modifications
Échappée préparées dans son worktree ont été appliquées sans conflit au dépôt
principal, initialement propre et au même commit. Aucun push, déploiement,
upload, remplacement ou relance de soumission au store. Benjamin a ensuite autorisé les commits et push avec « Commit et push tout ».
Les résultats de cette publication et la relecture des URL servies sont enregistrés
séparément dans les preuves locales `output/publish-20260907/`.
