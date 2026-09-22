---
name: site-release-sync
description: Synchroniser le site et le catalogue quand la présentation publique du produit change, ou préparer la revue web d’un candidat de release.
---

# Maintenir le site avec le produit

- Pour une modification du site ou un impact public à vérifier, consulter [la carte locale](references/site-map.md) : sources, langues, captures et publication. Choisir les contrôles adaptés aux surfaces touchées.
- Pour une release, consulter aussi [le contrat de revue](references/review.md) : JSON lié au candidat, commandes et preuves exigées par Fastlane. La revue reste requise même si son résultat est « aucun impact public ».
- Un changement interne sans effet sur le contenu public ne demande pas de travail web. Si le skill a été chargé pour lever un doute, conclure avec la raison, sans créer de modifications artificielles.

Le skill et ses scripts fonctionnent dans ce clone, sans dossier parent du portefeuille.

## Contraintes de contenu et de livraison

Modifier les sources puis régénérer les sorties. Préserver l’identité visuelle, FR/EN et les autres traductions concernées, les URL store/sous-chemins, le sens juridique, les avertissements et les protections de formulaire. Une UI qui rend les visuels inexacts exige des captures réelles, avec données de démonstration et provenance.

Préparer textes et captures avec le candidat. Les nouvelles promesses doivent correspondre au produit **publiquement téléchargeable sur chaque plateforme** : code, merge, tag ou soumission ne prouvent pas cette disponibilité. Lorsqu’une promesse change, relire le store public ou les fichiers téléchargeables et garder version, plateforme, URL, date et preuve dans les artefacts existants. En attendant la release, garder les nouveautés dans une branche/patch non publié, hors de l’artefact Pages courant ; conserver les snapshots publics confirmés plutôt que les métadonnées du candidat.

Si le catalogue est touché, traiter aussi `bnjdpn/bnjdpn.github.io`, selon ses instructions et l’autorisation en cours. Un dépôt inaccessible reste un travail à signaler. Une préparation de contenu n’autorise pas sa publication.

## Résultat attendu

Livrer les sources et sorties cohérentes, avec contrôles pertinents réussis et rendu examiné pour les changements visuels ou de parcours (routes, formats, clavier et langues concernés). Tester les formulaires sans envoyer de message réel. Une garde déterministe ne prouve ni fidélité des captures ni disponibilité distante.

Une attente de release peut terminer la préparation locale si les nouveautés sont prêtes et leur emplacement indiqué ; elle ne termine pas la synchronisation publique. Après une publication autorisée, relire l’URL servie, ses téléchargements et les plateformes concernées. Distinguer validation locale, CI et contenu effectivement servi.

Le catalogue principal reste exclusivement consacré aux apps autorisées. RealmBox, TaskLane, projets professionnels et biographies de carrière sont exclus, même si un dépôt GitHub est public. `npm run check` contrôle les sources et l’artefact public.
