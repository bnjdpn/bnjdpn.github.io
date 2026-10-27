---
name: app-landing-site
description: >-
  Créer ou refondre le site vitrine d'une app mobile avec une direction
  artistique propre à cette app (concept, typo, palette, mise en page, textes),
  sans le look générique des sites faits par IA. À utiliser avant d'écrire la
  moindre ligne de HTML/CSS pour la page d'une app, et pour relire une page
  existante qui « fait template ».
---
# Site d'app avec une direction artistique propre

But : un visiteur qui arrive sur la page comprend en 5 secondes ce que fait l'app, pour qui, et a envie de l'installer. La page ne pourrait appartenir à aucune autre app.

## 0. RÈGLE BLOQUANTE : AUCUN DESSIN

**AUCUNE IMAGE NI ILLUSTRATION DESSINÉE EN SVG, NI EN CSS OU CANVAS QUI IMITE UN DESSIN. LES SEULS VISUELS AUTORISÉS SONT LES VRAIES CAPTURES DE L'APP, L'ICÔNE DE L'APP ET LES BADGES OFFICIELS DES STORES.** Les petites icônes d'interface (flèche du menu, etc.) restent permises. Le concept passe par la typographie, la couleur, la mise en page, le texte et les vraies captures.

## 1. Partir du produit réel (avant tout design)

Rassembler et lire, pas imaginer :
- l'icône en haute définition, les captures réelles du build en production, la vidéo si elle existe ;
- le code des écrans clés (couleurs, polices, composants, vocabulaire de l'UI) ;
- la fiche store actuelle, les avis des utilisateurs, ce que l'app fait de mieux que les concurrentes (ouvrir 3 concurrentes) ;
- l'utilisateur cible et le moment d'usage précis (« entre deux séries, téléphone posé au sol », « à 3 h du matin, une main libre »).

Écrire en 4 lignes : **qui**, **quel moment**, **quel problème**, **la preuve visible dans l'app** (l'écran qui le montre). Si une ligne reste vague, ne pas commencer le design.

## 2. Concept et direction artistique : 3 pistes, une retenue

Écrire 3 pistes **contrastées** (pas 3 variantes de couleur). Pour chacune :
- une phrase-concept qui relie l'univers de l'app à une forme (« un chronomètre de salle de boxe : chiffres géants, sonnerie, ruban adhésif ») ;
- palette (4 à 6 hex nommés), typographies et leurs rôles, une esquisse ASCII du premier écran ;
- l'élément mémorable unique (un seul).

Retenir une piste, avec sa justification en 3 phrases (fit avec l'utilisateur, différence avec les concurrents, faisabilité). Puis faire le test du template : « si on me donnait une app voisine, est-ce que j'arriverais au même plan ? » Si oui, réviser la partie fautive et noter ce qui a changé.

## 3. Typographie

- Interdit par défaut : Inter, Roboto, Arial, Helvetica, system-ui seul, Poppins, Montserrat, Open Sans, et la paire « grotesque + serif display » réutilisée d'un autre site.
- Choisir 1 ou 2 familles qui viennent de l'univers du produit (affichage sportif, étiquette alimentaire, carnet de santé, jeu d'arcade…). Si deux, nettement différentes.
- Polices auto-hébergées en WOFF2, sous-ensemble latin, `font-display: swap`, préchargement de la seule police du titre. Vérifier la licence (OFL ou achetée).
- Échelle typographique explicite (ratio choisi), lignes < 75 caractères, interlignage plus grand pour un texte à empattements.

## 4. Couleur

- Palette tirée de l'icône et de l'UI réelle (pipette sur l'icône et 2 captures), pas d'une palette « tendance ».
- Interdit sans raison produit : dégradé violet-bleu, fond crème #F4F1EA + accent terracotta, noir #0B0B0B + un seul accent acide, lavis dégradés décoratifs.
- Contraste AA minimum (4,5:1 texte, 3:1 grands titres et composants). Thème sombre seulement si l'app l'est.

## 5. Mise en page et contenu

- Le haut de page montre la chose la plus caractéristique de l'app sous sa forme la plus juste : l'écran signature en grand, une démo interactive, l'objet du monde réel… Pas le gabarit « titre à gauche, iPhone à droite » par réflexe.
- Une structure qui suit le récit de l'utilisateur (avant / pendant / après, ou le moment d'usage), pas une grille de fonctionnalités.
- Bannir : cartes identiques arrondies avec la même ombre, rangée de 3 cartes à emojis, numéros 01/02/03 sur un contenu qui n'est pas une séquence, sur-titres en capitales espacées au-dessus de chaque titre, « → » ajouté aux boutons, chaînes « A · B · C », un mot du titre en couleur ou en italique.
- Les captures sont réelles, nettes, à la bonne échelle, avec une légende qui dit ce qu'on voit. Pas de maquette générée qui ne correspond pas au build.
- Motion : un seul moment orchestré (chargement ou démonstration), réponses aux actions de l'utilisateur, `prefers-reduced-motion` respecté. Pas de fondu-glissé sur chaque section.

## 6. Textes : concrets, précis, sans slop

- Le titre dit ce que l'app fait pour quelqu'un, avec un détail que seule cette app peut dire (« Compte 3-0-2-0 à ta place »), pas un slogan.
- Bannir : trio d'adjectifs (« simple, puissant et élégant »), « Découvrez », « Libérez », « révolutionnaire », « tout-en-un », « en toute sérénité », « conçu pour vous », promesses non vérifiables, questions rhétoriques en titre.
- Chiffres réels (nombre d'aliments, de modes, de niveaux) plutôt qu'adjectifs. Prix : renvoyer au store, pas de montant figé si plusieurs pays.
- Phrases actives, vocabulaire de l'utilisateur, un bouton = une action nommée (« Télécharger sur l'App Store »).
- Écrire la page d'abord dans la langue principale de la cible, puis localiser (pas de traduction littérale).

## 7. Stores, technique, obligations

- Badges officiels uniquement (Apple « Download on the App Store », Google « Get it on Google Play »), fichiers officiels, taille et zone de protection respectées, dans la langue de la page, liens directs vers la fiche.
- Performance : LCP < 2,5 s, CLS < 0,1, INP < 200 ms sur mobile 4G ; images AVIF/WebP dimensionnées (`width`/`height`), poids de page < 1 Mo hors vidéo, zéro script tiers non nécessaire.
- Accessibilité : HTML sémantique, `alt` utiles sur chaque capture, focus visible, navigation clavier, `lang` correct.
- SEO : `<title>` et meta description propres à l'app, `hreflang` si plusieurs langues, données structurées `SoftwareApplication`, URL canonique, sitemap.
- Image OG 1200×630 propre à l'app (pas le logo du studio sur fond uni), `apple-itunes-app` smart banner si utile.
- Pages confidentialité et support accessibles en un clic, cohérentes avec la fiche store (mêmes déclarations de données).

## 8. Grille de relecture finale (bloquante)

Avant publication, prendre une capture pleine page desktop 1440 px et mobile 390 px, et les **regarder**. Cocher chaque ligne ; une seule case non cochée = pas de publication.

Anti-slop :
- [ ] AUCUNE IMAGE NI ILLUSTRATION DESSINÉE (SVG, CSS, CANVAS) : seuls visuels = vraies captures, icône de l'app, badges officiels.
- [ ] En masquant le nom de l'app, on devine l'app (et pas une autre du même éditeur).
- [ ] Aucune police par défaut de la liste du §3, aucune palette interdite du §4.
- [ ] Pas deux sections avec la même structure de cartes ; pas de rangée d'emojis.
- [ ] Zéro phrase du §6 « bannir » (rechercher les mots dans le texte).
- [ ] La page ne partage pas plus de 30 % de ses classes/gabarits avec une autre page d'app du même site.
- [ ] Un seul élément mémorable, identifiable en une phrase.

Envie :
- [ ] Test des 5 secondes sur la capture mobile : quoi, pour qui, pourquoi maintenant.
- [ ] La première capture visible montre le bénéfice, pas un écran de réglages ou un menu.
- [ ] Le relecteur peut dire honnêtement « ça donne envie de télécharger », sinon nommer ce qui manque et corriger.

Technique :
- [ ] Lighthouse mobile ≥ 90 en performance, accessibilité, SEO ; aucun lien cassé.
- [ ] Badges officiels, liens store testés, confidentialité et support joignables.
- [ ] Captures du site conformes au build actuellement en vente.
