# bnjdpn.github.io

Lire d’abord le [socle Studio](../_studio/AGENTS.md), puis ce fichier.
Le renvoi au socle doit être lu explicitement ; les instructions du dossier
parent ne sont pas héritées entre dépôts Git.

Dans un worktree, lire le socle à
`/Users/benjamin/Documents/Studio/_studio/AGENTS.md`. Sur une autre machine, le
retrouver dans le [dépôt de coordination](https://github.com/bnjdpn/Studio/blob/main/AGENTS.md)
avec les accès autorisés. Si le socle manque, le signaler avant une opération engageante.

## Particularités du dépôt

- Lire `package.json` et les sources dans `content/`. Modifier les sources puis générer ; ne pas éditer seulement le HTML produit.
- Vérifications documentées : `npm run build`, `npm run check`, et `npm run check:links` pour les destinations publiques. Ajouter une QA navigateur des parcours et formats touchés.
- Le dépôt publie bnjdpn.com et les pages prévues par sa configuration Cloudflare. Aligner catalogue, pages d'apps et liens sur la version soumise ou présente dans les stores. Préparer les mises à jour pendant le chantier et les publier avec la soumission correspondante, sans annonces « en préparation », « à venir » ou « bientôt ».
- Le site reste statique. Ne pas ajouter framework, tracking ou dépendance de production pour une simple modification de contenu. Une preuve locale de formulaire ne prouve pas la livraison des messages en production.
