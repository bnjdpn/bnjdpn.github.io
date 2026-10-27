# NeatShift — le temps de chacun

## Produit réel, en quatre lignes
Qui : les personnes d’un foyer qui répartissent le ménage selon leurs disponibilités.
Moment : avant de commencer une tâche ou de préparer la semaine, téléphone en main.
Problème : les tâches récurrentes et le temps disponible ne tombent pas toujours ensemble.
Preuve : le calendrier associe la charge du jour aux tâches et aux personnes ; la liste et les pièces donnent les échéances.

## Sources et vérité produit
Lecture du 27 octobre 2026 : `content/product-sites/NeatShift.mjs` entier, descriptions FR/EN de fastlane, `TaskListView.swift`, `Color+Theme.swift`, AccentColor (`#257260`). Les trois captures ont été regardées. Les images dans `media/` sont les zones natives contiguës des captures officielles `store/app-store-media` sélectionnées pour 2.7.0. Les anciens fichiers `marketing/shots` attribués à 2.6.0 ont été écartés après comparaison : les captures publiques diffèrent. Les SHA-256 locaux correspondent à `store/media-selection-270.json` ; la comparaison aux captures JPEG téléchargées sur la fiche publique donne une erreur moyenne par canal de 0,66 à 0,84 sur 255 (compression JPEG). Le cadrage retire uniquement le titre marketing et son fond, sans modifier le contenu natif ; voir `media/provenance.json`. Aucune nouvelle capture native ni modification du dépôt d’app.

App Store FR et US et fiche Google Play relus par curl : 200 le 27 octobre. Google Play est désormais accessible, contrairement au relevé 404 de l’issue. Android est conservé, avec sa limite explicite : un seul appareil. Les fonctions Pro et le partage iCloud sont distingués par plateforme. Aucun prix figé.

Concurrence ouverte : [Sweepy](https://sweepy.com/) met en avant le jeu et le classement ; [Tody](https://todyapp.com/) la routine et sa mascotte ; [Nipto](https://nipto.app/) la compétition familiale et ses récompenses. NeatShift s’appuie sur la disponibilité, les durées estimées et le planning réel ; aucune revendication d’exclusivité fonctionnelle.

## Trois pistes
### Option 1 — Le temps de chacun (retenue)
Concept : un planning domestique lisible, où la place disponible dans la journée commande le récit.
Palette : encre foyer `#203f36`, vert app `#257260`, brume `#e4efeb`, blanc `#fbfdfc`, filet `#b4c8c0`.
Gabarito 600 pour les grands titres, Figtree 400–600 pour la lecture et les contrôles.
Premier écran :
```
NeatShift                  Planning / Gratuit et Pro / Assistance / EN
Le ménage réparti selon    | vraie capture Calendrier
le temps de chacun.        | avec charge quotidienne
Introduction et badges     | et tâches attribuées
```
Mobile : titre, bénéfice, badges, puis capture visible dans le premier écran.
Élément mémorable : le calendrier réel et sa charge du jour face au titre centré sur le temps de chacun.

### Option 2 — La maison par pièces
Concept : parcourir les pièces comme un index domestique, titres latéraux et écran Cuisine en ouverture.
Palette : blanc pièce `#fbfdfc`, gris sol `#f0f5f2`, encre `#203f36`, vert `#257260`.
Gabarito pour les noms de pièces, Figtree pour les fréquences et paragraphes.
```
NeatShift / Navigation
Cuisine (grand titre) | vraie capture Cuisine
Fréquence et durée   | badges
```
Élément mémorable : le nom de pièce monumental. Écartée : la pièce seule masque le bénéfice collectif.

### Option 3 — Le point du foyer
Concept : une page éditoriale de bilan, grands paragraphes et liste des tâches comme ouverture pleine largeur.
Palette : vert `#257260`, blanc `#fbfdfc`, encre `#203f36`, gris `#b4c8c0`.
Gabarito pour l’affirmation principale, Figtree pour le récit.
```
NeatShift / Navigation
Chacun sait quoi faire
Badges | vraie liste des tâches | texte de bilan
```
Élément mémorable : la liste réelle au centre du premier écran. Écartée : le bilan ne montre pas d’emblée la préparation selon les disponibilités.

## Choix et test du template
La première piste répond au moment où le foyer décide ce qui peut tenir dans sa journée. Face aux références concurrentes consultées, elle privilégie le calendrier réel et les durées plutôt qu’une mécanique de récompense. Elle se réalise uniquement avec les trois captures, les badges et l’icône fournis.

Test : une autre liste de tâches pourrait reprendre un titre et un téléphone côte à côte. Le récit est donc attaché aux preuves NeatShift : charge quotidienne dans le calendrier d’abord, tâches attribuées et partage du foyer ensuite, limite facultative, fréquence par pièce, puis bilan Pro. Aucun tableau de fonctionnalités génériques ni illustration domestique.

## Règles de réalisation
- Aucune illustration SVG, CSS ou canvas ; les seuls SVG sont les badges Apple officiels.
- Une colonne par défaut, grilles uniquement dans `min-width:900px` ; pleine largeur desktop avec marges de 6 %.
- Gabarito et Figtree imposées conservées, variables WOFF2 latin auto-hébergées avec leurs OFL. Préchargement de Gabarito seule ; `font-display:swap`.
- Titres 2,4 / 3,5 / 5,6 rem selon largeur, intertitres 2,2 à 3,5 rem, lecture 1 à 1,3 rem ; progression voisine de 1,25. Paragraphes sous 62ch.
- Couleurs issues des écrans : vert de l’accent et fonds clairs de l’interface ; contrastes AA calculés localement ; audit Lighthouse bloqué au lancement du navigateur.
- Aucune animation décorative. Navigation native et focus explicite ; aucun mouvement à désactiver.
- Toutes les classes visuelles préfixées `ns-`. Formulaire partagé conservé avec ses noms, endpoint, Turnstile et pot de miel.
- Racine EN et `/fr-FR/` conservées, alias d’ancres historiques conservés. Confidentialité et guides générés par le pipeline existant.
- OG : typographie et véritable capture sur fond uni, 1200 × 630 ; aucun objet dessiné.

## Grille finale
- [x] Aucun dessin SVG/CSS/canvas : captures natives, icône fournie et badges officiels uniquement.
- [x] Le contenu reste identifié par le ménage, les disponibilités du foyer, la charge quotidienne et les pièces.
- [x] Aucune police ni palette interdite ; Gabarito + Figtree attribuées conservées.
- [x] Aucune répétition de cartes ni rangée d’emojis.
- [x] Aucune phrase bannie ; vérification anti-template automatique.
- [x] Moins de 30 % de classes partagées : contrôle automatique passé, 0 % NeatShift.
- [x] Un élément mémorable : le calendrier réel face au temps de chacun.
- [x] Aucune donnée inventée ni légende méta ; alt du calendrier corrigé vers le 25 octobre, 20/270 minutes.
- [x] Captures conformes aux médias du build en vente 2.7.0, provenance et comparaison publiques conservées.
- [x] Badges officiels ; les deux stores répondent 200. Confidentialité et assistance conservées.
- [ ] Présence utile de l’écran dans le premier viewport à 390 et 1440 px : non qualifiée, lancement navigateur bloqué.
- [ ] Test des cinq secondes sur capture mobile : capture navigateur indisponible.
- [ ] Envie de télécharger confirmée par inspection du rendu : non qualifiée.
- [ ] WebKit iPhone 375/390/430, zoom et texte à 120 %, aucun débordement : bloqué au lancement.
- [ ] Lighthouse mobile ≥ 95 dans les quatre catégories, FR et EN : bloqué au lancement Chrome, aucun score.
- [ ] Captures pleine page et premier écran regardées : indisponibles, ne pas publier avant qualification.

Ces cases restent volontairement ouvertes. Le lot est implémenté mais sa qualification visuelle n’est pas terminée.

## Relecture indépendante
Une relecture `studio_reviewer` puis une contre-relecture limitée aux corrections, selon le socle Studio : manifeste de preuve exclu des assets publics, alias d’assistance hors grille, ancres restaurées. Verdict des corrections : CORRECTIONS CONFORMES. La qualification navigateur reste à faire, sans réserve masquée. Les réponses intégrales sont conservées dans le reçu local.
