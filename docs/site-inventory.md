# Carte des sites

Inventaire mis à jour pour la livraison éditoriale du 10 septembre 2026. Chaque dépôt reste
indépendant. La carte locale `.agents/skills/site-release-sync/references/site-map.md`
fait autorité pour ses captures, validations et étapes de publication ; les sources
ci-dessous font autorité pour le contenu. Les nombres incluent les redirections
et pages d’erreur existantes, sans compter deux fois une ancre d’aide/FAQ.

| Produit | Dépôt | Source éditable → sortie | Langues produit | Routes HTML | URL |
| --- | --- | --- | --- | ---: | --- |
| BrewMeter | `bnjdpn/BrewMeter` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, es-ES, es-MX, fr-FR, it, ja, pt-BR | 30 | [Site](https://bnjdpn.github.io/BrewMeter/) |
| ColdLoad | `bnjdpn/ColdLoad` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-AU, en-CA, en-GB, en-US, es-ES, es-MX, fr-CA, fr-FR, it, ja, ko, nl-NL, pl, pt-BR, ru, sv, tr, uk, zh-Hans, zh-Hant | 81 | [Site](https://bnjdpn.github.io/ColdLoad/) |
| FastZen | `bnjdpn/FastZen` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, es-ES, es-MX, fr-FR, it, ja, pt-BR | 19 | [Site](https://bnjdpn.github.io/FastZen/) |
| GrooveLog | `bnjdpn/GrooveLog` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, es-ES, fr-FR | 9 | [Site](https://bnjdpn.github.io/GrooveLog/) |
| LoadSense | `bnjdpn/LoadSense` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, fr-FR, ja | 16 | [Site](https://bnjdpn.github.io/LoadSense/) |
| MoveAtlas | `bnjdpn/MoveAtlas` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, es-ES, fr-FR | 43 | [Site](https://bnjdpn.github.io/MoveAtlas/) |
| NeatShift | `bnjdpn/NeatShift` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | en-US, fr-FR | 7 | [Site](https://bnjdpn.github.io/NeatShift/) |
| NoBuy Cart | `bnjdpn/NoBuyCart` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, es-MX, fr-FR, ja, ko, pt-BR, zh-Hans, zh-Hant | 20 | [Site](https://bnjdpn.github.io/NoBuyCart/) |
| Pas du Jour | `bnjdpn/PasDuJour` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | en-US, fr-FR | 5 | [Site](https://bnjdpn.github.io/PasDuJour/) |
| Petites Bouchées | `bnjdpn/petites-bouchees` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | en-GB, en-US, fr-FR | 9 | [Site](https://bnjdpn.github.io/petites-bouchees/) |
| Petites Dents | `bnjdpn/petites-dents` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | en-GB, en-US, fr-FR | 6 | [Site](https://bnjdpn.github.io/petites-dents/) |
| Petites Gouttes | `bnjdpn/petites-gouttes` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | en-GB, en-US, fr-FR | 9 | [Site](https://bnjdpn.github.io/petites-gouttes/) |
| Petites Nuits | `bnjdpn/petites-nuits` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | en-GB, en-US, fr-FR | 9 | [Site](https://bnjdpn.github.io/petites-nuits/) |
| PRVault | `bnjdpn/PRVault` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, es-ES, es-MX, fr-FR, it, ja, pt-BR | 19 | [Site](https://bnjdpn.github.io/PRVault/) |
| TempoReps | `bnjdpn/TempoReps` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | de-DE, en-US, es-MX, fr-FR, it, ja, pl, pt-BR | 28 | [Site](https://bnjdpn.github.io/TempoReps/) |
| Vesper Drift | `bnjdpn/VesperDrift` | `marketing/site.json`, `site.html.erb`, `theme.css`, `legal/` → `docs/` | en-US, fr-FR | 5 | [Site](https://bnjdpn.github.io/VesperDrift/) |
| Échappée | `bnjdpn/Echappee` | `site/_src/`, `site/assets/` → `site/` puis `_pages/` | da, de-DE, en, es-ES, fr-FR, it, nl-NL, pt-BR, sv | 46 | [Site](https://bnjdpn.github.io/Echappee/) |
| Portfolio | `bnjdpn/bnjdpn.github.io` | `content/`, `scripts/build-site.mjs`, `styles.css`, `assets/` → HTML racine + `fr/` | en, fr ; 404 bilingue | 3 | [Site](https://bnjdpn.github.io/) |

Pour les 16 sites Ruby, l’accueil inclut usages, fonctions, description et support,
visionneuse de captures et découverte d’autres apps. Les 155 pages juridiques
existantes (confidentialité et conditions selon le produit/la langue) ont leurs
sources sous `marketing/legal/`. Leur HTML généré conserve les routes utilisées
par les stores. Les pages 404 et les anciennes routes de langue restent couvertes.
Échappée conserve accueil, support, confidentialité, catalogue et remerciement
pour chacune des neuf langues.

## Captures et langues

Les captures proviennent des interfaces natives qualifiées des releases, ou des
sources inchangées déjà publiées. La livraison du 10 septembre présente les nouveautés
comme disponibles sur instruction explicite de l’éditeur, sans attendre Apple ;
cela ne constitue pas un reçu d’approbation. `marketing/site.json` contient les
versions/sources publiques et les mappings `local_assets`; `marketing/README.md`
décrit leur usage. FR/EN sont rédigés autour des usages réels. Les autres langues
conservent leurs catalogues publics vérifiés et leurs pages juridiques.

Échappée : `site/_src/media-sources.json` et `image-manifest.json`, vues réelles
localisées ; aucune nouvelle scène de développement présentée comme vendue.

Le portfolio réutilise ces visuels ; leur provenance est dans [design.md](design.md).

## Contrôler et publier

- Sites Ruby : `ruby scripts/marketing_site.rb`, puis `--check` et leurs tests
  de snapshots publics ; suivre `marketing/README.md` pour le staging.
- Échappée : `node site/_src/build.mjs && node site/_src/stage.mjs`.
- Portfolio : `npm run check`, puis `npm run check:links` pour les URL publiques.
  [check-browser.mjs](../scripts/check-browser.mjs) contrôle des routes locales
  aux tailles 390, 768 et 1440 px. Il nécessite Playwright 1.62.1 disponible dans
  l’environnement QA (`PLAYWRIGHT_MODULE` peut sélectionner une installation).
  `PLAYWRIGHT_CHANNEL=chrome` réutilise Chrome déjà installé ; sinon installer
  le navigateur Chromium correspondant à la version de Playwright utilisée.
  Passer `--routes` avec un JSON `[{"path":"/fr/","name":"portfolio-fr","capture":true}]`
  et `--base` avec l’URL du serveur local. Aucun framework navigateur n’est livré
  aux visiteurs. Les formulaires demandent en plus une revue interactive ; tous
  leurs POST doivent être interceptés.

Les workflows Pages de chaque dépôt définissent l’artefact public. Ne pas publier les sources, outils,
artefacts de release ou documents internes. Aucun push/déploiement n’est autorisé
par cet inventaire. Après accord, publier d’abord les sites ajoutant des routes,
puis le catalogue qui les référence. Relire ensuite les fichiers servis et les stores.
Une release candidate se prépare avec ses textes/captures, mais ses nouvelles
promesses attendent la confirmation publique séparée pour chaque plateforme.

## Frontière du catalogue

Les 17 apps ci-dessus constituent le catalogue autorisé. RealmBox et TaskLane
sont exclus ; leurs sites indépendants ne sont pas modifiés. Les autres dépôts
GitHub ne sont pas ajoutés automatiquement. Nova Station Pinball reste retiré.
