# Deux guides d’usage — 19 septembre 2026

Trois pages, deux besoins : [minuteur de tempo/circuit en français](https://bnjdpn.github.io/fr/guides/minuteur-tempo/), [timer in English](https://bnjdpn.github.io/guides/tempo-timer/) et [journal de diversification](https://bnjdpn.github.io/fr/guides/journal-diversification/). Les fiches produit restent indépendantes. Les pages n’utilisent ni script, ni collecte, ni URL personnalisée par visiteur.

## Destinations et attribution

| Usage / campagne envisagée | App | URL d’installation | Attribution | Source, consultée le 19 septembre 2026 |
| --- | --- | --- | --- | --- |
| Guide minuteur réutilisable | TempoReps | <https://apps.apple.com/app/id6758854166> | Indisponible : aucun `pt`/`ct` officiel obtenu | [App Store public](https://apps.apple.com/fr/app/temporeps-timer-musculation/id6758854166) |
| Guide journal et transmission | Petites Bouchées | <https://apps.apple.com/app/id6760203890> | Indisponible : aucun `pt`/`ct` officiel obtenu | [App Store public](https://apps.apple.com/fr/app/petites-bouch%C3%A9es-allerg%C3%A8nes/id6760203890) |

Une tentative de consultation de la session App Store Connect existante a abouti à la page de connexion avec `authResult=FAILED` le 19 septembre. Aucun token n’a été inventé, aucune campagne n’a été créée, aucun lien UTM ne se substitue à la mesure Apple. [Apple décrit la création des liens dans Analytics](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links) : il faut d’abord générer le lien dans l’interface pour obtenir le provider token. Une reprise autorisée consisterait à créer seulement ces deux campagnes, copier leurs URL officielles, remplacer les deux liens des guides dans `content/guides.mjs` et consigner leur source/date ici ; reconstruire, valider et republier. Aucun clic de QA ne constitue un téléchargement attribué. Les seuils de confidentialité peuvent masquer les petites cohortes ; une ligne absente n’est pas un zéro.

## Sources et médias réutilisés

- Les formulations « minuteur tempo », « circuit », « journal de diversification » et « transfert familial » ont été confrontées à des résultats de recherche actuels et aux [fiches publiques TempoReps](https://apps.apple.com/fr/app/temporeps-timer-musculation/id6758854166) et [Petites Bouchées](https://apps.apple.com/fr/app/petites-bouch%C3%A9es-allerg%C3%A8nes/id6760203890). Ce n’est pas une mesure de volume ou de classement. Search Console n’a pas été consultée faute de session autorisée.
- Captures déjà intégrées au catalogue : `assets/previews/temporeps-fr-detail.webp`, `temporeps-en-detail.webp` et `petites-bouchees-fr-detail.webp`. Provenance et dimensions dans `content/preview-media.json`. Elles montrent l’interface publiée (la capture Petites Bouchées montre la vue Aliments, pas un faux écran de transmission), servent aussi aux aperçus sociaux et peuvent être réutilisées avec ces mêmes légendes. Aucun visuel natif n’a été recapturé.
- L’état public des fonctions a été relu sur les deux fiches App Store le 19 septembre. Le guide Petites Bouchées s’en tient au transfert manuel, aux aperçus gratuits et aux trois PDF ; il ne met pas en avant la correction récente comme promesse de fiabilité.

## Textes prêts, non envoyés

> Je suis Benjamin, le développeur de TempoReps. J’ai rédigé un guide court pour choisir un mode, vérifier les phases et retrouver un minuteur enregistré. L’exemple de circuit sert à comprendre le réglage, pas à prescrire une séance : https://bnjdpn.github.io/fr/guides/minuteur-tempo/

> Je suis Benjamin, le développeur de Petites Bouchées. Ce guide explique comment relire un journal de diversification et choisir entre transfert manuel gratuit et documents PDF à partager. Il ne donne pas de conseil médical : https://bnjdpn.github.io/fr/guides/journal-diversification/

Ces textes n’ont été envoyés à personne ni publiés sur un réseau. Après une première période d’environ 28 jours, distinguer : indexabilité technique des pages versus indexation réellement observée dans Search Console ; visites des pages versus téléchargements éventuellement attribués dans App Store Connect ; puis ventes et MRR seulement si les données comparables existent. Aucun taux clic-installation n’est calculable avec les seules URL non attribuées. J+28 donne au mieux un signal précoce, pas une maturité SEO.
