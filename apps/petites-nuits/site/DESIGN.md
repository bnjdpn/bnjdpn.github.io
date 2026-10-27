# Petites Nuits — de midi à midi

## Produit réel
Qui : les parents d’un bébé dont ils notent les nuits et les siestes.
Moment : au coucher, à un réveil, puis lorsqu’ils reprennent le carnet le lendemain.
Problème : retrouver les heures, réveils et observations quand les jours se mélangent.
Preuve : le vrai écran « Sommeil en cours », son bouton « Bébé se réveille », puis le journal et le bilan.

Sources : `content/product-sites/petites-nuits.mjs` entier ; métadonnées iOS fr-FR description et release notes ; `SaisieView.swift`, `Colors.swift`, `marketing/site.json` en lecture seule. Captures directement téléchargées depuis les fiches publiques App Store 1.2.5 le 27/10/2026, sans retouche de contenu. Les fichiers marketing 1.2.2 proposés dans l’issue étaient différents et ont donc été remplacés ; voir `ASSETS.md`. Aucun écran de widget ajouté. Liens Apple et Play relus le 27/10/2026 : HTTP 200.

Concurrents ouverts le 27/10 : [Huckleberry](https://huckleberrycare.com/product/tracking) centre son récit sur le suivi et les offres d’accompagnement ; [Nara](https://nara.com/pages/nara-baby-tracker-app) sur plusieurs activités et les aidants ; [Baby Daybook](https://babydaybook.app/) sur le suivi quotidien (page obtenue par curl, HTTP 200). Choix éditorial : rester sur les observations de sommeil, le regroupement midi à midi et le carnet exportable. Aucun avis ni chiffre concurrent repris.

### Option A — La nuit en cours
Concept : une présence discrète dans la nuit, avec l’écran actif en premier et de grands titres éditoriaux.
Palette : velours #0A0E1F, surface lune #1A1F3A, indigo #5C6FAB, ivoire #F0EBE0, or #F5C76F.
Young Serif pour les titres, Karla pour les actions et la lecture.
Élément mémorable : le titre et le journal organisés autour de « midi à midi ».
```
[icône nom]                  [langues]
[De midi à midi, gardez] [vrai sommeil actif]
[le fil du sommeil]     [                  ]
[badges officiels]      [                  ]
```

### Option B — Le carnet ouvert
Concept : une page claire de lecture avec un titre centré, suivi de deux écrans réels.
Palette : ivoire #F0EBE0, blanc #FFFFFF, indigo #3D4F8E, nuit #0A0E1F.
Young Serif en titre centré, Karla pour le journal.
Élément mémorable : la juxtaposition de la saisie et de la relecture.
```
[nom]                  [langues]
[       titre centré          ]
[  saisie réelle | bilan réel ]
[       badges officiels      ]
```

### Option C — Le geste d’abord
Concept : une composition compacte avec l’écran de saisie dominant, puis des légendes latérales.
Palette : lune #1A1F3A, indigo #5C6FAB, ivoire #F0EBE0, or #F5C76F.
Young Serif pour de courts intertitres ; Karla pour la majorité du premier écran.
Élément mémorable : une seule capture très large avant le récit.
```
[nom] [langues]
[titre court]
[ immense saisie réelle ] [notes]
[badges]                 [notes]
```

## Piste retenue : A
Le fond sombre prolonge l’interface réelle et le moment où un parent note un réveil. Le récit de midi à midi précise le bénéfice propre à ce carnet plutôt qu’un tableau de suivi généraliste. La réalisation ne nécessite que typographie, aplats et captures déjà vérifiées dans la source de l’issue.

Test du template : un titre générique « Gardez une trace » aurait convenu à toutes les petites apps. Remplacé par le repère midi à midi ; la progression devient sommeil actif, relecture et export, avec des compositions différentes. Aucun objet dessiné, aucun cadre de téléphone simulé.

## Règles
- Young Serif 400 et Karla variable 400–700, sous-ensemble latin (accents français inclus), WOFF2 auto-hébergés et OFL. Seule Young Serif préchargée ; `font-display: swap`. Aucun changement de famille.
- Échelle 1,25 : lecture 18 px, intertitres 22/28, titres 36–70 px ; corps à 1,6 et lignes sous 75 caractères.
- Couleurs directement issues de `Theme` et contrôlées sur les vraies captures et l’icône. Texte secondaire clair, jamais l’indigo comme petit texte sur nuit.
- Une colonne par défaut ; compositions côte à côte seulement à partir de 900 px.
- Aucun mouvement décoratif ; focus visible et navigation native, menu des langues avec `details`.
- Captures complètes AVIF/WebP 440/880 px, dimensions 880×1912, première capture prioritaire, autres différées. Pas de données ajoutées dans les captures.
- PDF explicitement sur iPhone ; widget explicitement sur iPhone. Aucun prix figé : le store affiche le montant.
- Pages légales et routes conservées. Formulaire conservé avec Turnstile, pot de miel, champs et messages existants ; action `/api/contact` conformément à l’issue (l’ancien site public utilisait `petites-forms.bnjdpn.com/contact`). Livraison réelle non testée.

## Grille finale
Les vérifications acquises et les réserves bloquantes figurent ci-dessous.

Adaptation nécessaire du formulaire : la clé du widget historique vise l’ancien service. Pour le même formulaire envoyé à `/api/contact`, le widget prend la clé publique de `/api/contact/config` et l’action `contact`, comme `assets/contact.js`. Les champs, le pot de miel, les messages et le gestionnaire de soumission restent identiques. Aucun secret lu. Livraison de messages non testée.

Cache : les CSS du préfixe Petites Nuits sont déjà servies par Pages avec `Cache-Control: public, max-age=14400, must-revalidate` (HEAD public de `assets/theme.css`, 27/10/2026 ; preuve `cache-production.txt`). Le nouveau CSS reprend cette voie statique et porte son propre hash ; aucun changement d’infrastructure. Readback du nouveau CSS à faire après un éventuel déploiement Studio.

### Grille finale après relecture

Les cases visuelles restent ouvertes : WebKit fourni (`webkit-2359`) s’arrête avec SIGABRT dans `_RegisterApplication` / AppKit ; Chrome ne fournit pas son port de debug à Lighthouse. Aucun contournement du sandbox. La relecture `studio_reviewer` est conservée telle quelle dans `RELECTURE.md` ; JSON-LD et ancres signalés ont été corrigés.

Anti-slop :
- [x] Aucun dessin SVG, CSS ou canvas : seules captures réelles, icône fournie et badges officiels.
- [ ] En masquant le nom, on devine l’app : jugement visuel à confirmer sur capture navigateur.
- [x] Aucune police ni palette interdite ; Young Serif et Karla conservées.
- [x] Pas deux sections avec la même structure de cartes ; aucune rangée d’emojis.
- [x] Zéro phrase bannie : contrôle anti-template passé.
- [x] Moins de 30 % de classes communes : contrôle anti-template passé, classes propres préfixées `pn-` (hors classes fonctionnelles préexistantes).
- [x] Un élément mémorable : le repère typographique « de midi à midi ».
- [x] Aucune illustration dessinée ajoutée ; les icônes de l’interface appartiennent aux vraies captures.
- [ ] Vrai écran visible au premier écran 390/1440 : présent dans le HTML, position à qualifier dans un navigateur.
- [x] Aucune donnée ajoutée qui contredise une capture, aucune légende méta.

Envie :
- [ ] Test visuel des 5 secondes sur mobile : navigateur bloqué.
- [x] Première image choisie : le sommeil actif et le bouton « Bébé se réveille », pas des réglages.
- [ ] Jugement « donne envie de télécharger » : à confirmer par Studio sur les captures après levée du blocage.

Technique :
- [ ] Lighthouse mobile ≥ 95 sur fr et en dans les quatre catégories : aucun score disponible, Chrome bloqué.
- [x] Références locales sans erreur, badges officiels ; fiches stores, confidentialité et assistance joignables. Aucune livraison de message revendiquée.
- [x] Captures conformes à la fiche actuellement en vente : téléchargement direct des neuf captures App Store 1.2.5 (FR, US, UK) le 27/10/2026, sources dans `ASSETS.md`. Écrans actif et grille examinés. Aucune nouvelle recapture native revendiquée.

Captures pleine page desktop/mobile, zoom et texte à 120 %, images cassées et débordements : non qualifiés, scripts prêts dans le reçu local. Aucune publication autorisée par cette grille incomplète.
