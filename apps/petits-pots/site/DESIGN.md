# Petits Pots — partir des réserves

## Produit réel, en quatre lignes
- Qui : les parents qui préparent les repas de bébé et suivent leurs réserves.
- Moment : avant de cuisiner, de prévoir les prochains repas ou de faire les courses.
- Problème : retrouver les quantités des lots, puis composer un menu avec ce qui reste.
- Preuve : Stock, détail Carotte, Menus et Courses, véritables captures de la fiche Google Play FR/EN.

## Sources relues le 27 octobre 2026
Métadonnées Android FR/EN (title, short_description, full_description), MainActivity.kt (thème), Stock.kt, PreparedPots.kt et MenuViews.kt, dans le dépôt d'app en lecture seule. La fiche Play répond 200 en FR et US. Les captures locales proposées dans l'issue ont changé depuis celles publiées (Stock par catégories, sixième visuel Pots préparés). On utilise donc les captures publiques de la fiche du jour, sans retouche de contenu. Le sixième visuel public est Réglages : il n'est pas utilisé. Le manifeste des URL et SHA-256 est dans le reçu externe `store-media.json`. Cela prouve l'identité aux visuels publics, pas une nouvelle qualification native du binaire.

Concurrents ouverts : [Cuisinez pour bébé](https://www.cuisinez-pour-bebe.fr/app/) met en avant recettes et accompagnement ; [Solid Starts](https://solidstarts.com/app/) privilégie les conseils de diversification ; [MilkyLady](https://milkylady.fr/) couvre un ensemble plus large autour de l'alimentation. Petits Pots se concentre ici sur le chemin réserves → menus → courses ; aucune comparaison concurrentielle n'est publiée.

### Option A — L'inventaire culinaire (retenue)
Concept : commencer par ce qu'il reste, avec des titres généreux et une lecture de liste, puis préparer la journée et les courses.
Palette : lait #FAF9F5, feuille #285B48, sauge #D8E7DA, encre #19392D, trait #BAC9BD. Ces couleurs viennent du thème réel et des captures (surfaces et boutons verts).
Bree Serif pour titres, Work Sans pour lecture et liens. Élément mémorable : « Des menus pour bébé avec vos cubes et compotes », grand et direct, en face du stock réel, puis le récit des réserves jusqu'aux achats.

```text
Petits Pots                     Menus / Gratuit / Aide / FR EN
DES MENUS POUR BÉBÉ              [vrai stock]
AVEC VOS CUBES ET COMPOTES.      [Carotte bientôt fini]
texte bref + Google Play        [Courgette en stock]
Cubes congelés. Compotes à part. [Potiron en stock]
```

### Option B — La journée à composer
Concept : une page organisée autour de midi, goûter, soir ; Menus devient le premier écran.
Palette : lait #FAF9F5, brun #946336, feuille #285B48, sauge #E9EEE7, encre #19392D. Bree Serif sur les repas, Work Sans pour leurs explications.
Élément mémorable : les trois noms de repas en très grand dans un sommaire vertical.

```text
Petits Pots / Google Play
Midi       [vrai Menus]
Goûter     [vrai Menus]
Soir       [vrai Menus]
```
Le premier écran public des menus est un formulaire de préparation : il prouve moins vite le bénéfice que les aliments déjà renseignés.

### Option C — La fiche de lot
Concept : suivre un aliment du congélateur au prochain achat, en centrant tout le premier écran sur le détail Carotte.
Palette : feuille #285B48, lait #FAF9F5, sauge #D8E7DA, gris #79747E, encre #19392D. Bree Serif pour les questions pratiques, Work Sans pour les faits.
Élément mémorable : le lot Carotte grandeur lisible, au centre d'une composition éditoriale symétrique.

```text
          Petits Pots
     Gardez le fil de chaque lot
            [Carotte]
            Google Play
```
Cette piste réduit trop l'app au stockage et ralentit l'accès aux menus.

## Choix et test du template
A correspond au moment où le parent ouvre ses réserves avant de préparer le repas. Elle expose d'abord l'inventaire, là où les concurrents relus commencent souvent par les recettes ou les conseils. Elle utilise uniquement des captures disponibles, sans décor ni composant interactif à inventer.
Test du template : une autre app familiale ne pourrait reprendre le titre, la distinction cubes/compotes ni la progression lots → réservations de menus → achats. Le plan générique « fonctionnalités / avantages / témoignages » a été écarté ; aucun témoignage ni chiffre de conversion n'est ajouté.

## Règles de la page
- Bree Serif + Work Sans exclusivement ; WOFF2 latin auto-hébergés, OFL jointes, swap, seul Bree préchargé. Work Sans variable 400–700.
- Échelle : corps 1rem, introduction 1.125rem, h3 1.5rem, h2 2.5rem, h1 adaptatif 2.375–5.75rem ; paragraphes limités à 62ch. Titres Bree à 1.08, lecture à 1.6.
- Une colonne par défaut, grilles exclusivement dans min-width. Captures entières sans mockup, rotation ou recadrage ; AVIF/WebP 400/800 px.
- Aucun dessin, SVG décoratif, canvas, photo ou texture. Icône fournie, captures publiques et badges officiels seulement. OG : composition typographique et capture réelle, sans illustration.
- Aucun montant, aucune promesse médicale ; les limites des dates sont données sobrement dans les questions pratiques.
- Android, français et anglais ; données locales, sans compte ni publicité ; gratuit et achat unique Pro distincts.
- Aucun mouvement décoratif ni JavaScript produit. Navigation native et liens directs. Le formulaire existant reste sur ses URL, intact.
- Canonical /petits-pots/ et /petits-pots/fr-FR/, anciennes pages et ancres #contact conservées, seuls points d'entrée catalogue redirigés en 301. Privacy/support inchangés.

## Grille finale
À cocher après QA et relecture, pas sur intention.
- [x] Aucun dessin : captures réelles, icône et badges seulement (les deux exigences anti-dessin de la skill).
- [ ] Identité reconnaissable même sans le nom, élément mémorable identifiable.
- [x] Polices uniques et palette produit, aucune police/palette interdite.
- [x] Aucune répétition de cartes ni rangée d'emojis.
- [x] Aucun terme marketing banni ; aucune donnée inventée ni légende méta.
- [x] Moins de 30 % de classes communes aux autres pages.
- [ ] Vrai stock visible au premier écran, 390 et 1440 px.
- [ ] Test cinq secondes : bébé, menus et réserves compris ; premier écran utile.
- [ ] Relecteur : envie de télécharger, ou réserve explicitement écrite et corrigée.
- [ ] Captures pleine page 390/1440 regardées.
- [ ] Lighthouse mobile FR/EN ≥95 dans les quatre catégories.
- [x] Liens, badges et routes privacy/support vérifiés ; formulaire conservé (contrôles HTTP/statiques ; interaction navigateur en attente).
- [x] Captures identiques à la fiche publique du jour (aucune nouvelle qualification du binaire).

## État de qualification
Contrôles statiques et anti-template acquis sur la base locale. La relecture studio_reviewer a signalé deux P2 (parcours du nouveau dossier dans le vérificateur et alt Courses), corrigés. WebKit2359 et Chrome abortent au lancement dans le sandbox : aucun premier écran, pleine page, zoom ni résultat Lighthouse ne peut être certifié ici. Les cases correspondantes restent ouvertes, ainsi que le jugement visuel et l’envie de télécharger. Aucun contournement ni publication. Le reçu donne les journaux, le script de reprise et la mise à jour Git à effectuer par Studio.
