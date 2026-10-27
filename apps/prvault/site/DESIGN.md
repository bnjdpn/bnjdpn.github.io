# PRVault — Le résultat à battre

## Produit réel, en quatre lignes

- Qui : une personne qui pratique la force, l’haltérophilie, les WOD ou le cardio et garde ses performances.
- Quand : avant de charger la barre, puis juste après une série réussie.
- Problème : retrouver sa meilleure charge pour un nombre précis de répétitions, puis consigner le nouveau résultat.
- Preuve : Back Squat, 130 kg en 1 répétition, 115 kg en 3, 100 kg en 5 ; saisie du résultat et tableau des estimations dans les captures publiques.

## Trois directions contrastées

### Option A — Le résultat à battre (retenue)

Une lecture sportive, à grande échelle : le record réalisé devient le point d’entrée vers la prochaine série. Palette : encre #121C2A, surface #1E2B3A, or mat #D7B77B, papier #F2EFE7, ardoise #B7C0CB. Anton pour les titres et le record ; IBM Plex Sans Condensed 400/600 pour lire. Élément mémorable : « 130 kg », lié au Back Squat et au 1RM mesuré, en très grand texte près de la vraie fiche.

```text
PRVault                  Records / CSV / Pro / Aide / Langue
LE POIDS À BATTRE.        [vraie fiche Back Squat]
À CHAQUE NOMBRE DE REPS.  [meilleures charges]
[badges officiels]        [historique et objectif]
130 kg / Back Squat       [suite de la fiche]
```

### Option B — Le registre chronologique

Une page d’archive textuelle parcourue de haut en bas, suivie du nouveau résultat. Palette : papier #F2EFE7, encre #182337, cuivre #785E32, gris #54708B. Anton pour les dates de section, Plex pour le récit ; élément mémorable : une grande colonne d’historique réel. Moins adaptée : la fiche signature est sombre et les dates volent la place au nombre de répétitions.

```text
PRVault / Langue
HISTORIQUE + titre
[vraie capture de l’historique]
Texte du résultat suivant / [saisie]
```

### Option C — L’atelier des pourcentages

Une page de lecture à deux rythmes, estimations d’abord et saisie ensuite. Palette : bleu mouvement #54708B, encre #121C2A, or #D7B77B, blanc #F2EFE7. Anton pour les titres de calcul, Plex pour les explications ; élément mémorable : le tableau natif des RM, très grand. Écartée : elle donne la priorité à l’estimation alors que la valeur première du produit est le record réellement réalisé.

```text
PRVault / Calculs / Records
Titre + [grand écran estimations]
Explication 1RM / [saisie]
```

## Choix et test du template

La piste A correspond au moment où l’on cherche le poids à battre. Strong met en avant le carnet et la planification, Hevy le suivi et les amis, StrengthLog les entraînements et programmes ; PRVault ouvre ici sur le record par nombre exact de répétitions ([Strong](https://www.strong.app/), [Hevy](https://www.hevyapp.com/), [StrengthLog](https://www.strengthlog.com/), lus le 27/10/2026). La réalisation tient dans du texte et des écrans publics, sans inventer d’interface.

Test : avec une app de minuteur ou de calcul de disques, le grand record mesuré et les meilleures charges par répétitions n’auraient pas de sens. La suite suit l’usage : retrouver, noter, estimer, récupérer son CSV, choisir Pro. Pas de grille générique de fonctionnalités.

## Règles de réalisation

- Aucun dessin SVG/CSS/canvas. Visuels : captures publiques actuelles, icône fournie, badges officiels exclusivement. Les filets et aplats structurent le texte, sans imiter un objet.
- Palette prélevée dans les assets ThemeBackground/ThemePrimary/ThemeSecondary et les captures natives ; mode sombre conforme à l’app. Or en accent et papier pour les zones de lecture, pas de dégradé.
- Anton et IBM Plex Sans Condensed, familles attribuées conservées, OFL inclus, WOFF2 latin + latin-ext. Fallback japonais du système car ces deux familles n’ont pas de glyphes japonais. Préchargement du seul Anton latin, font-display swap.
- Échelle : lecture 20 px, auxiliaire 16 px, h2 38–64 px, h1 44–100 px, record 90–184 px. Lignes de prose limitées à 62 caractères. Titres en casse capitale par CSS, sans mot isolé coloré.
- Une colonne mobile ; grilles desktop exclusivement en min-width. Classes pv-, CSS versionnée par SHA-256. Pas d’animation décorative.
- Huit langues et URL conservées, es-MX hérite des textes espagnols avec sa description spécifique. Captures natives de chaque langue. Pas de prix figés ; renvoi à l’écran d’achat.
- Confidentialité, guides et formulaire d’assistance conservés. POST /api/contact, app, _subject, Turnstile et pot de miel identiques. Ancres historiques préservées.
- OG 1200×630 à partir des vraies captures seulement, sans composition illustrée. Poids de page visé sous 1 Mo.

## Grille finale

Contrôles statiques et relecture effectués le 27/10/2026 ; qualification visuelle bloquée au lancement WebKit/Chrome. Preuves dans `_studio/.local/site-prvault/`. Aucune case visuelle n’est présumée validée.

- [x] Aucun dessin ; vrais écrans, icône et badges officiels seulement.
- [ ] Nom masqué, bénéfice reconnaissable ; élément mémorable unique : record mesuré géant.
- [x] Polices attribuées uniques et palette produit ; contrastes textuels calculés AA. La vérification navigateur reste ouverte.
- [x] Pas de cartes répétées, emojis, slogan vague ou phrase bannie.
- [x] Classes distinctes : moins de 30 % partagées.
- [ ] Vrai écran au premier écran à 390 et 1440 px ; largeur desktop utilisée.
- [x] Chiffres et alts contrôlés sur les captures publiques ; aucune légende méta.
- [ ] Test des cinq secondes : quoi, pour qui, pourquoi maintenant.
- [ ] Première capture utile et envie de télécharger relue.
- [ ] WebKit 375/390/430, zoom et texte 120 %, aucun débordement ou image cassée.
- [ ] Lighthouse mobile fr/en ≥ 95 dans les quatre catégories.
- [x] Badges officiels et liens store HTTP 200 ; confidentialité et ancres d’assistance contrôlées statiquement. Le parcours navigateur reste à qualifier.
- [x] Captures publiques de la version 1.7.0, huit pays, provenance et SHA-256 documentés.

## Relecture indépendante

Une relecture `studio_reviewer` sur le diff et les fichiers non suivis a signalé deux défauts : ordre des captures Apple allemandes et second chargement Turnstile. Corrections appliquées : sélection par nom `01_reference` / `02_record` / `03_history`, régénération allemande ; retrait du loader inline, conservation du seul script existant. Réponse originale conservée sans modification dans le reçu `RELECTURE.md`. Aucun second avis ni validation visuelle présumés.
