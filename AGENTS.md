# Catalogue public des apps

Site statique HTML/CSS/JavaScript, sans framework de production, cookies ou analytics. Node >=22 dans `package.json` ; la CI utilise Node 24. Ce dépôt contient seulement les éléments publics du portfolio, pas les CV privés, échanges, credentials ou documents sources personnels.

## Points d'entrée

- `content/` et `scripts/build-site.mjs` : sources du contenu bilingue et du catalogue. `npm run build` génère `index.html`, `fr/index.html` et les sitemaps ; ne pas modifier ces sorties seules. `styles.css`, `assets/` : rendu ; `404.html`, `site.webmanifest`, `robots.txt` : surfaces associées.
- `scripts/check-site.mjs` : cohérence locale ; `scripts/check-live-links.mjs` : liens réseau ; `scripts/check-browser.mjs` : routes en vrai navigateur. Le générateur utilise Node seul, sans framework de production. [docs/site-inventory.md](docs/site-inventory.md) relie les dépôts et leurs cartes locales.
- Un changement de catalogue doit garder cartes, compteurs, données structurées, liens, assets et sitemaps cohérents. Vérifier les faits publiables à leur source actuelle ; ne pas réintroduire un projet retiré à partir d'une ancienne liste.

## Validation et publication

`npm run check` valide le site local. Exécuter `npm run check:links` si des destinations publiques changent ; son résultat dépend du réseau. Prévisualiser avec `python3 -m http.server 4173`, puis examiner le rendu mobile et bureau, les interactions et les liens concernés. Pour une simple modification d'instructions, contrôler les liens et le diff suffit.

`.github/workflows/pages.yml` valide puis publie `main`. Un push peut donc publier : tenir compte de l'autorisation de livraison. Une validation locale, une CI verte et le contenu servi sont des preuves distinctes.

Terminer le travail autorisé en préservant les modifications locales. Résoudre les inconnues ordinaires par inspection ; demander une précision quand elle change le contenu public ou l'autorisation. Déléguer les vérifications indépendantes si utile et disponible, sans lancer de tests ni de publications dans les apps voisines. Respecter la hiérarchie des instructions et les permissions. Rapporter les contrôles effectivement exécutés et leurs limites.

## Cohérence du site avec les releases

Toute modification susceptible de rendre la présentation publique inexacte ou obsolète doit déclencher une vérification du site associé. Si nécessaire, sa mise à jour fait partie du travail à livrer, sans que Benjamin ait à le redemander. Sinon, indiquer brièvement pourquoi le changement n’a aucun impact sur le site.

Appliquer le skill portable [site-release-sync](.agents/skills/site-release-sync/SKILL.md), y compris pour conclure sans impact. Il fournit la carte des sources, langues, captures et validations, et le contrat de revue du candidat. Fonctionnalités, UI/navigation, captures, noms, compatibilité, plateformes, monétisation et traitement des données sont concernés. Préparer les nouveautés avec la release ; les promesses de disponibilité attendent une confirmation publique sur chaque plateforme.

## Positionnement permanent

Le site principal est exclusivement consacré aux apps du catalogue. Ne jamais y réintroduire RealmBox, TaskLane, des projets professionnels, un CV, une présentation de carrière ou d’autres projets hors catalogue, y compris lors d’une découverte automatique de dépôts GitHub. Le nom de Benjamin Dupin identifie uniquement l’éditeur. `npm run check` contrôle les sources éditoriales et l’artefact public, sans examiner ces exclusions internes.
