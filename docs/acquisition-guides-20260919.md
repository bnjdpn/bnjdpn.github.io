# Deux guides d’usage — 19 septembre 2026

Trois pages, deux besoins : [minuteur de tempo/circuit en français](https://bnjdpn.github.io/fr/guides/minuteur-tempo/), [timer in English](https://bnjdpn.github.io/guides/tempo-timer/) et [journal de diversification](https://bnjdpn.github.io/fr/guides/journal-diversification/). Les fiches produit restent indépendantes. Les pages n’utilisent ni script, ni collecte, ni URL personnalisée par visiteur.

## Destinations et attribution

| Usage / campagne | App | URL d’installation | Source et date |
| --- | --- | --- | --- |
| `Web Guide Tempo` | TempoReps (`6758854166`) | <https://apps.apple.com/app/apple-store/id6758854166?pt=128480256&ct=Web%20Guide%20Tempo&mt=8> | App Store Connect → TempoReps → Analyses → Acquisition → Campagnes → Générer un lien, 19 septembre 2026 |
| `Web Guide Journal` | Petites Bouchées (`6760203890`) | <https://apps.apple.com/app/apple-store/id6760203890?pt=128480256&ct=Web%20Guide%20Journal&mt=8> | App Store Connect → Petites Bouchées → Analyses → Acquisition → Campagnes → Générer un lien, 19 septembre 2026 |

La session ASC du compte Benjamin Dupin était accessible lors de la passe de clôture. Les deux liens ont été produits dans l’interface Apple, avec le même provider token `128480256` et deux seuls noms de campagne, sans le déduire d’un autre identifiant. Les versions française et anglaise du guide TempoReps partagent la même campagne. [Apple explique les paramètres `pt`, `ct` et `mt`](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links). Les liens sont opérationnels au niveau des boutons ; aucun téléchargement attribué n’est encore prouvé. Les cellules de campagne peuvent être masquées sous les seuils de confidentialité : une absence de ligne n’est pas zéro.

## Sources et médias réutilisés

- Les formulations « minuteur tempo », « circuit », « journal de diversification » et « transfert familial » ont été confrontées à des résultats de recherche actuels et aux [fiches publiques TempoReps](https://apps.apple.com/fr/app/temporeps-timer-musculation/id6758854166) et [Petites Bouchées](https://apps.apple.com/fr/app/petites-bouch%C3%A9es-allerg%C3%A8nes/id6760203890). Ce n’est pas une mesure de volume ou de classement. La passe Search Console ci-dessous porte sur la découverte et l’indexation, pas sur un volume de recherche.
- Captures déjà intégrées au catalogue : `assets/previews/temporeps-fr-detail.webp`, `temporeps-en-detail.webp` et `petites-bouchees-fr-detail.webp`. Provenance et dimensions dans `content/preview-media.json`. Elles montrent l’interface publiée (la capture Petites Bouchées montre la vue Aliments, pas un faux écran de transmission), servent aussi aux aperçus sociaux et peuvent être réutilisées avec ces mêmes légendes. Aucun visuel natif n’a été recapturé.
- L’état public des fonctions a été relu sur les deux fiches App Store le 19 septembre. Le guide Petites Bouchées s’en tient au transfert manuel, aux aperçus gratuits et aux trois PDF ; il ne met pas en avant la correction récente comme promesse de fiabilité.

## Textes prêts, non envoyés

> Vous réglez le même minuteur à chaque séance ? Ce guide aide à choisir le mode, relire les phases et enregistrer une configuration pour la retrouver. Je suis Benjamin, le développeur de TempoReps : https://bnjdpn.github.io/fr/guides/minuteur-tempo/

> Difficile de se rappeler quand un aliment a été proposé et ce que vous aviez noté ? Ce guide montre comment relire le journal et choisir entre transfert familial manuel et document PDF lisible. Je suis Benjamin, le développeur de Petites Bouchées : https://bnjdpn.github.io/fr/guides/journal-diversification/

Ces textes n’ont été envoyés à personne ni publiés sur un réseau.

## Search Console — clôture du 19 septembre

La propriété `https://bnjdpn.github.io/` est accessible. Avant soumission, l’inspection des trois guides indiquait « Google ne reconnaît pas cette URL », sans exploration ni sitemap référent. Le sitemap principal `/sitemap.xml` portait un échec de lecture daté du 17 août. Après la publication, les sitemaps existants `/sitemap.xml` et `/sitemap-pages.xml` ont chacun été soumis une seule fois dans l’interface officielle, avec l’accusé « Sitemap envoyé ». Immédiatement après, les deux lignes affichaient encore « Impossible de récupérer le sitemap », lecture datée du 19 septembre, type inconnu et zéro page découverte. Les deux fichiers sont pourtant servis en HTTP 200, avec du XML valide ; la cause de l’échec rapporté par Google n’est pas établie. Aucun nouvel essai répété n’a été fait.

L’essai de l’URL active du guide Petites Bouchées a répondu « Google a accès à cette URL » et « La page peut être indexée ». Une demande d’indexation a été acceptée une seule fois pour chacun des trois guides : Google a confirmé « Indexation demandée » et leur ajout à la file d’attente d’exploration prioritaire. Ce reçu ne prouve ni exploration ni indexation effective. Aucune visite issue de la recherche n’est attribuée à ces pages par cette vérification.

Après une première période d’environ 28 jours, distinguer : exploration et indexation réellement observées ; visites de recherche ; téléchargements éventuellement attribués dans ASC ; puis ventes et MRR seulement si les données comparables existent. Ne pas calculer un taux clic-installation à partir de dénominateurs incompatibles. J+28 donne au mieux un signal précoce, pas une maturité SEO.
