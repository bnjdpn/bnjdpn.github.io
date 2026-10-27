# Petites Bouchées : direction artistique du site

Page produit de Petites Bouchées (https://bnjdpn.com/petites-bouchees/), générée par `page.mjs` et `spoon.css`, posée par `build.mjs` sur la scène de `scripts/product-site/build.mjs`. Les faits viennent de FACTS.md (27 oct. 2026) et les phrases propres à cette page de `copy.mjs`. Pas de page de mentions légales : confidentialité et assistance seulement. Langues déjà servies : en-US (racine), en-GB, fr-FR. L’interface annoncée est le français, l’anglais et l’espagnol.

## Produit réel (4 lignes)

- **Qui** : un parent pendant la diversification, souvent une main sur la cuillère et l’autre près du téléphone.
- **Quel moment** : juste après la cuillère, avant d’oublier si bébé a aimé, est resté neutre ou n’a pas aimé.
- **Quel problème** : retrouver la date, la purée ou le morceau, la réaction observée, puis laisser une fiche à la personne qui garde bébé.
- **La preuve dans l’app** : le journal du 26 octobre (carotte en purée aimée, pomme en morceau neutre, banane en purée pas aimée) et l’écran de saisie, avec les trois boutons Aimé, Neutre, Pas aimé.

## Trois options

### Option A : « Carnet de la chaise haute »

Page comme un cahier manuscrit, scotch et écriture ronde. Chaleureux, mais c’est le gabarit « app de parentalité mignonne » déjà écarté pour Petites Gouttes, et ça ne dit pas le geste : tamponner une réaction. Rejetée.

### Option B : « La fiche administrative »

Toute la page est le PDF de la fiche de garde, déplié comme un formulaire. Fidèle à l’export, mais ça met l’achat en premier et ça ressemble à un dossier, pas au moment où l’on tend la cuillère. Rejetée.

### Option C : « Le couvert » (retenue)

Le haut de page est le couvert de la chaise haute : une cuillère vue de dessus, la purée de carotte encore dedans, le tampon Aimé qui se pose sur le manche, puis les trois lignes du journal sous la date du 26 octobre. La suite suit le geste du parent : ce que le journal a gardé, la réaction pendant que la cuillère est sortie, les 197 aliments, la fiche pour la personne qui garde bébé.

## Pourquoi « Le couvert »

- C’est l’objet dans la main au moment d’ouvrir l’app, et la question exacte : est-ce que bébé a aimé.
- Élément mémorable unique : le tampon de réaction qui se pose sur la cuillère (un seul mouvement au chargement, coupé si l’utilisateur réduit les animations).
- Contraste net : LoadSense est une journée sombre avec une horloge, TempoReps un tableau de salle, Petites Gouttes un tiroir de sachets bleu givre. Ici le thème est clair comme l’app, mais l’objet est une cuillère et un ticket de table, pas un congélateur. Police Literata seule (OFL), absente des trois autres pages.

## Test du template

Une app voisine (Petites Gouttes, Petites Nuits) n’aboutit pas à ce plan : pas de cuillère, pas de tampon Aimé / Neutre / Pas aimé, pas des trois lignes carotte-pomme-banane. Nom masqué, on reconnaît un journal de diversification. `scripts/check-antitemplate.mjs` compare les classes et les polices aux gabarits et aux autres sites `apps/*/site`.

## Règles de la page

- Ordre : titre, badges, cuillère et ticket ; journal ; réaction ; catalogue ; fiche de garde et transfert par fichier ; gratuit et Dossier de Bébé ; appel ; apps sœurs ; assistance.
- Aucun conseil alimentaire ni âge recommandé. La pastille « Souvent ~4 m » / « Often ~4 mo » est décrite comme une pastille du catalogue. Les écrans décrivent les observations. L’app ne remplace pas un professionnel de santé.
- Prix cités seulement s’ils sont dans FACTS : 6,99 € en France, 7,99 $ sur Google Play aux États-Unis. Le reste renvoie à la boutique. iPhone : Partage familial Apple. Android : compte Google.
- Police unique, Literata 500 et 800, sous-ensemble latin (latin-1, dont œ), `font-display: swap`, préchargement du seul graisse 800. Environ 22 Ko par fichier.
- Couleurs de l’app : crème #FFF8EE, encre #1F1B16, sauge #7A9B5A et #3F6B4A, pêche #D4946A, bois #C4844A, réactions #66BB6A, #FFCA28, #EF5350. Les pastilles de catégories reprennent les hex du code.
- Une seule colonne par défaut. Les grilles à plusieurs colonnes ne vivent que dans une media query `min-width` : réactions à 720 px, offres à 800 px, hero à 960 px, navigation et apps sœurs à 980 px. À 880 px, seule l’ombre sauge du journal s’épaissit.
- `spoon.css?v=<sha256 court>`.
- Badges officiels. App Store : fiches FR, US et GB de l’app id6760203890, avec `ct=petitesbouchees_web_couvert_20261027`. Google Play : `com.bnjdpn.petitesbouchees`.
- Captures App Store réelles, sans cadre, en AVIF et WebP 440 et 880. en-GB reprend les captures en-US.
- Le formulaire d’assistance, son action `https://petites-forms.bnjdpn.com/contact`, le champ `_gotcha` et le widget Turnstile `0x4AAAAAAFezChpqNmpql-I3` restent ceux de la page déjà en ligne. `assets/site.js` inchangé.

## Grille finale

Anti-slop :

- [x] Nom masqué, on reconnaît un journal de diversification (cuillère, tampon, carotte, pomme, banane).
- [x] Aucune police ni palette interdite. Literata OFL, crème et sauge de l’app.
- [x] Classes et police distinctes de LoadSense, TempoReps et Petites Gouttes (0 % de classes partagées, `npm run check`).
- [x] Pas deux sections à cartes identiques, pas d’emoji, pas de flèche dans les liens, pas de sur-titre en capitales.
- [x] Un seul élément mémorable : le tampon sur la cuillère.

Envie :

- [x] 5 secondes sur mobile : le titre, les deux badges, la cuillère tamponnée.
- [x] La première capture est le journal, pas un réglage.
- [x] « Ça donne envie de télécharger ».

Technique :

- [x] WebKit iPhone à 375, 390 et 430 px, zoom 120 % et texte 120 %, menu de langue ouvert compris, sans débordement (fr-FR, en-US, en-GB).
- [x] Desktop 1440 relu, sans débordement.
- [x] Lighthouse mobile local : fr-FR performance 100, accessibilité 100, SEO 100 (LCP 1,7 s, CLS 0,004). en-US : 99, 100, 100.
- [x] Confidentialité et assistance à un clic, badges officiels, fiches store de FACTS.
