# BrewMeter — journal de torréfaction

Qui : les personnes qui boivent du café, du thé ou des boissons énergisantes.
Moment : juste après une boisson, puis avant d'en reprendre une ou de se coucher.
Problème : noter vite une portion et distinguer le cumul bu de la caféine estimée restante.
Preuve : accueil avec Espresso 30 mL ≈ 63 mg, Café filtre 240 mL ≈ 95 mg, Cappuccino 180 mL ≈ 63 mg ; total 221 mg.

## Produit et sources

Lecture seule : `BrewMeter/fastlane/metadata/fr-FR/{description,release_notes}.txt`, `Views/Dashboard/DashboardView.swift`, `Views/Dashboard/CoffeeShapes.swift`, `marketing/site.json`, captures store et `marketing/shots/`. Texte de référence intégral : `content/product-sites/BrewMeter.mjs` (1.7.0 en vente selon sa provenance). Les captures natives marketing correspondent au contenu des captures store 01 Dashboard, 02 Favorite et 05 Trends ; elles retirent seulement l'habillage store. Aucun écran reconstitué.

Concurrents ouverts le 27/10/2026 : [HiCoffee](https://apps.apple.com/us/app/hicoffee-caffeine-tracker/id1507361706) (catalogue, écosystème Apple), [RECaf](https://recaf.app/) (fréquence et Siri), [Caffeine Clock](https://www.caffeineclock.app/) (niveau et sommeil). Leurs listes et promesses de sommeil n'organisent pas cette page. Le choix ici est de rendre tangible le geste de saisie puis la différence entre journal et estimation.

### Option A — Le journal de torréfaction

Concept : une grande page brune, chaleureuse et typographique, ouverte sur le journal réel.
Palette : noir torréfié #14100c, ombre #2d1f18, espresso #a87349, crème #f5efe5, papier secondaire #d8c5ae.
Typographies : Caprasimo pour les titres, Outfit pour la lecture et la navigation.
Premier écran :
```
BrewMeter                    Journal   Pro   Langue
UN CAFÉ NOTÉ.          |    [vrai accueil]
SA CAFÉINE SUIVIE.     |    [boissons]
texte + badges        |    [221 mg]
```
Élément mémorable : le grand titre à la rondeur du café face au journal de portions réel.

### Option B — Le registre de portions

Concept : un registre clair et dense, où textes et captures forment des lignes de lecture.
Palette : crème #f5efe5, brun #54301b, ombre #2d1f18, blanc #ffffff.
Typographies : Caprasimo en titre court ; Outfit pour les entrées.
Premier écran :
```
BrewMeter / langues
TITRE SUR TOUTE LA LARGEUR
[accueil]   texte + badges
```
Élément mémorable : de longues séparations horizontales comme un journal d'entrées.

### Option C — Le temps du coucher

Concept : entrée par la projection au coucher, puis retour aux boissons enregistrées.
Palette : noir #14100c, brun #2d1f18, crème #f5efe5, espresso #a87349.
Typographies : Caprasimo pour la projection ; Outfit pour les hypothèses.
Premier écran :
```
BrewMeter                  Langues
ESTIMER AU COUCHER
[estimation réelle]   réglage de la demi-vie + badges
```
Élément mémorable : l'estimation réglable comme point d'entrée.

## Choix

Option A retenue. Elle parle au geste quotidien et montre immédiatement les portions au lieu de commencer par une hypothèse. Elle se distingue des promesses de sommeil des concurrents par une entrée concrète dans le journal. Les vraies captures existantes suffisent, sans objet dessiné ni pseudo-interface.

Test du template : une app voisine pourrait avoir le même duo titre/capture ; le récit a donc été révisé autour de la saisie des portions, de la correction, du calcul mg/100 mL, puis de l'estimation réglable et de l'historique. Le brun est celui du thème sombre réel, pas un décor de café ajouté.

## Règles

- Caprasimo 400 et Outfit 400/600, auto-hébergées, OFL, latin et latin-ext ; seul Caprasimo latin préchargé. Repli de glyphes pour le japonais.
- Échelle 1,25 : lecture 18 px, petit texte 15 px, interligne 1,6 ; titres fluides 36–84 px. Paragraphes sous 70 caractères.
- Un seul flux mobile. Colonnes uniquement à partir de 900 px. Vrai écran dès le premier viewport ; pas de hauteur fixe qui coupe le texte.
- Palette pipetée sur l'icône et les captures Dashboard/Favorite : brun sombre et crème confirmés par BrewTheme. Texte crème sur noir, brun réservé aux surfaces et séparations ; contrastes calculés sur les couleurs CSS (preuve `contrasts.json` dans le reçu), sans qualification navigateur.
- Aucun dessin SVG/CSS/canvas ; uniquement captures, icône fournie et badges officiels. Aucune animation décorative.
- Aucun montant figé. Gratuit et Pro sont distingués avec les fonctions sourcées ; prix dans le store.
- Huit locales et mêmes URL, anciennes ancres conservées. Formulaire POST, champs, Turnstile et script conservés. Confidentialité et guides transportés sans modification.

## Grille finale

Le lancement des navigateurs est bloqué dans cet environnement. Les cases visuelles et de performance restent ouvertes ; cette page est implémentée, pas qualifiée pour publication.

Anti-slop :
- [x] AUCUNE IMAGE NI ILLUSTRATION DESSINÉE (SVG, CSS, CANVAS) : seuls visuels = vraies captures, icône de l’app, badges officiels.
- [ ] En masquant le nom de l’app, on devine l’app (et pas une autre du même éditeur) : appréciation sur capture finale indisponible.
- [x] Aucune police par défaut de la liste du §3, aucune palette interdite du §4.
- [x] Pas deux sections avec la même structure de cartes ; pas de rangée d’emojis.
- [x] Zéro phrase du §6 « bannir » : contrôle anti-template réussi dans les huit langues.
- [x] La page ne partage pas plus de 30 % de ses classes/gabarits avec une autre page d’app du même site (0 % hors classes fonctionnelles).
- [x] Un seul élément mémorable, identifiable en une phrase : un grand titre rond face au journal réel des portions.
- [x] Aucune illustration dessinée (SVG, CSS, canvas) : seulement captures réelles, icône et badges.
- [ ] Un vrai écran de l’app dans le premier écran, à 390 et à 1440 px : présent dans le flux, position visuelle à confirmer dans le navigateur.
- [x] Aucune donnée qui contredit une capture, aucune légende méta : valeurs relues sur les trois captures sources.

Envie :
- [ ] Test des 5 secondes sur la capture mobile : quoi, pour qui, pourquoi maintenant. Capture indisponible.
- [x] La première capture dans le flux montre le journal des boissons, pas des réglages ou un menu.
- [ ] Le relecteur peut dire honnêtement « ça donne envie de télécharger » : avis visuel final impossible sans capture.

Technique :
- [ ] Lighthouse mobile ≥ 95 dans les quatre catégories sur fr/en (seuil de l’issue plus strict que la skill) : Chrome ne démarre pas.
- [x] Badges officiels, liens store testés (Apple dans les huit pays et Google Play : 200), références locales de confidentialité et d’assistance résolues.
- [x] Captures conformes au build en vente selon la provenance de la source produit et comparaison avec les captures store 01, 02 et 05. Aucun écran généré.
- [ ] WebKit iPhone 375/390/430 px, zoom et texte à 120 %, pas de débordement ni texte coupé : WebKit avorte avant navigation.

## Relecture

Une relecture `studio_reviewer` sur diff et fichiers non suivis. Réponse exacte conservée dans `_studio/.local/site-brewmeter/RELECTURE.md`. Corrections : ancres `features-title` / `related-title` rétablies, cache 4 h généré au seul niveau racine de l’artefact par l’assembleur (source `cache-headers.txt`, validation préalable, hash au manifeste, allowlist inchangée), affirmation de QA visuelle retirée. Pas de seconde relecture, conformément à la demande d’une seule passe. Qualification navigateur bloquée : aucune case visuelle cochée par supposition.
