# Design, sources et entretien des sites

Le portfolio est un outil de choix parmi 17 apps indépendantes. Son ouverture
propose quatre usages, puis le catalogue montre immédiatement chaque produit,
sa fonction, une vraie capture et ses destinations. Les trois éclairages
Échappée / LoadSense / famille viennent ensuite. Benjamin Dupin identifie
l’éditeur ; aucune présentation de carrière ou de prestations n’est ajoutée.

## Fondations et compositions

Le portfolio utilise un fond presque blanc, une typographie sombre, des repères
orangés et une grille de catalogue à deux colonnes, puis une sur mobile.
Bricolage Grotesque et DM Sans sont locales. La recherche et les catégories
filtrent les 17 entrées ; sans JavaScript, tout le catalogue reste accessible.
Le support dirige vers la bonne app et conserve un annuaire natif sans script.
Les ancres `main`, `about`, `selected`, `products` et `contact` sont conservées.

Les sites produit conservent leur propre générateur et publication. La cohérence
porte sur les comportements, la lisibilité, les tailles de contrôle, les médias
et la maintenance ; la structure du récit reste propre au produit :

| Site ou famille | Composition retenue |
| --- | --- |
| LoadSense | Lecture des données et limites expliquées autour de trois vues contextualisées |
| ColdLoad | Guide de chargement : poids cible, matériel, comptage inverse |
| PRVault | Archive des records et progression de la version publique vérifiée |
| TempoReps | Modes de séance, bibliothèque puis comparaison Tempo / MIX |
| MoveAtlas | Recherche dans l’atlas, carnet et référence iPad |
| BrewMeter | Journal caféiné, tableau de bord puis favori et tendances |
| FastZen | Minuteur central puis calendrier et exception ponctuelle |
| GrooveLog | Prochain set / set enregistré, puis lecture du cycle |
| NeatShift | Exemple de foyer, répartition, tâches et retards |
| NoBuy Cart | Envie, temps de décision et simulation explicitement séparée |
| Pas du Jour | Trois vues Watch lisibles et guide propre à la montre |
| Petites Bouchées | Journal d’introductions et double lecture aliments / progression |
| Petites Dents | Album, historique et souvenirs PDF |
| Petites Gouttes | Inventaire et guide d’impression conservé |
| Petites Nuits | Démarrage rapide d’un sommeil et carnet 24 h de midi à midi |
| Vesper Drift | Vol réel, gestes, règles et score |
| Échappée | Paysage, parcours et vues jour/nuit ; support et pages auxiliaires propres |

Les fondations communes ont été éprouvées sur le portfolio, LoadSense et Petites
Bouchées avant extension. Les six sites BrewMeter / FastZen / GrooveLog /
NeatShift / NoBuyCart / PasDuJour partagent `scripts/site-foundations.css` par
copie explicite versionnée sous `marketing/foundations.css`. Leurs thèmes et
compositions restent locaux. `scripts/sync-site-foundations.mjs --check` détecte
une divergence ; sans option il synchronise ces seuls adopteurs et leurs deux
petits outils de médias. Aucun build ne charge un fichier parent ou une branche
GitHub mutable. Les autres familles gardent leur socle local, sans migration
artificielle dans ce mécanisme.

Ces règles sont révisables. Le nombre de sections, la palette, la serif ou la
symétrie ne sont pas des obligations. Revoir une décision à partir des usages
et du rendu entier, y compris sans animation. Les captures ne doivent pas servir
d’ornements illisibles ; leurs liens ouvrent l’original avec ou sans JavaScript.

## Références sélectionnées

- [Impeccable](https://impeccable.style/) et son [dépôt](https://github.com/pbakaus/impeccable) : clarifier la hiérarchie et retirer les éléments sans rôle. Aucun kit, score de goût, hook ou style par défaut importé.
- [Utopia](https://utopia.fyi/), [CUBE CSS](https://cube.fyi/) et le [Sidebar gratuit d’Every Layout](https://every-layout.dev/layouts/sidebar/) : échelles fluides, séparation des compositions et primitives, reflow dicté par l’espace disponible. Pas de framework ni accès payant.
- [Whole Earth Index](https://wholeearth.info/), repéré via [Siteinspire](https://www.siteinspire.com/) et ouvert dans Chrome : une collection indexée peut se découvrir sans récit promotionnel préalable. La grille et les repères sont utiles ; son noir intégral et sa typographie ne sont pas transposés au catalogue d’apps.
- [Poetry Camera](https://poetry.camera/), également ouvert : l’objet réel porte l’identité. La photographie plein écran n’est pas une recette pour des captures verticales ; le flou observé à l’ouverture est écarté pour préserver l’accès immédiat au produit.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Web Interface Guidelines](https://vercel.com/design/guidelines), [Playwright accessibility](https://playwright.dev/docs/accessibility-testing) : comportements clavier, focus, erreurs de saisie, contraste et contrôle du rendu. Axe complète l’inspection ; il ne certifie pas le site.
- [Web Vitals](https://web.dev/articles/vitals) : séparer observations locales et données de terrain. Aucun gain de conversion ou d’usage n’est déduit des chronométrages locaux.

Les deux références visuelles sont conservées dans les preuves locales du
14 septembre. Aucun média, code ou identité de ces sites n’a été copié.

## Sources et vérité publique

- `content/catalog.json` : catalogue explicitement autorisé, chemins et identifiants Store.
- `content/copy.mjs` et `content/studio-copy.mjs` : textes FR/EN du catalogue et de la page.
- `content/preview-media.json` : fichiers, dimensions, provenance, langue et cadrage des captures. Réexaminer les copies lorsque les médias d’un produit changent.
- `scripts/build-site.mjs`, `styles.css`, `assets/site.js` : génération, présentation et amélioration progressive.
- `scripts/og-card.html` et `scripts/render-social.mjs` : cartes EN et FR de 1200 × 630, avec médias locaux authentiques.
- `assets/fonts/` : fontes et textes de licence SIL OFL versionnés.
- [Inventaire](site-inventory.md) : sources, langues et routes confirmées par dépôt.

Les captures conservent leur provenance : interface native ou capture marketing
publique Apple. Une capture encadrée n’est pas décrite comme une interface brute.
Échappée réutilise ses paysages réels avec leurs repères de scène ; aucune
modification fonctionnelle du jeu n’appartient à cette mission.

La lecture Apple du 14 septembre a notamment révélé PRVault public en 1.4.0 :
le site et le catalogue ne présentent plus l’import CSV du candidat 1.5.0.
Les anciens snapshots des autres produits restent datés et ne sont plus
annoncés comme la dernière version. Les tarifs et compatibilités sont délégués
aux fiches officielles ; une autorisation éditoriale historique ne démontre
pas la disponibilité d’une nouvelle release. Les pages juridiques conservent
leur fond et les routes utilisées par les stores.

## Vérification et prochaine release

Les commandes sont dans le [README](../README.md), les cartes locales
`site-release-sync` et le [bilan du 14 septembre](redesign-20260914.md).
Inspecter les accueils entiers FR/EN sur mobile et bureau, puis les variantes
qui changent réellement de modèle. Tester les écritures longues/non latines,
le clavier, le texte agrandi et l’absence de JavaScript selon les surfaces
modifiées. Tous les envois de formulaire de test doivent être interceptés.

Une future modification d’usage, UI, capture, nom, compatibilité, offre ou
traitement des données déclenche une revue du site associé et du catalogue.
Mettre à jour ce qui a changé ou expliquer l’absence d’impact public. Garder
les preuves locales, la CI et l’état servi distincts ; une publication demande
son autorisation propre. Le site ne crée ni collecte, ni cookies, ni tracking.
