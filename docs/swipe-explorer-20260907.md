# Exploration par swipe — 7 septembre 2026

Le portfolio ouvre désormais sur une pile de cartes. Un geste vers la gauche passe
à une autre app ; un geste vers la droite garde l’app dans « Ma sélection ». Les
boutons et le clavier offrent les mêmes actions. L’annulation restaure la carte
précédente et retire seulement le favori ajouté par le swipe annulé.

La présentation utilise un fond graphite, un accent lié à l’app, une typographie
ample, des lignes génératives et des captures réelles cadrées en détail. Titres
masqués à l’entrée, ressort des cartes, ruban d’apps, apparition progressive du
catalogue et ouverture du panneau complètent les chapitres animés au défilement.
L’ouverture reste différente à chaque visite, avec un cycle des 17 apps.

Les favoris restent dans le navigateur, avec repli pour la visite si le stockage
est indisponible. Les deux langues partagent cette sélection. Le panneau conserve
le focus lors de sa mise à jour. Les animations respectent la réduction des
mouvements et le bouton de pause ; le défilement vertical reste natif sur mobile.
Sans JavaScript, l’app initiale et les 17 liens du catalogue restent accessibles.

Le périmètre est uniquement ce dépôt. Les captures et les informations produit
existantes sont réutilisées. Aucun site voisin, app native, prix, disponibilité,
lien de boutique ou endpoint d’assistance ne change. La vignette de partage est
régénérée depuis sa source HTML pour reprendre la nouvelle ouverture.

## Vérification reproductible

`npm run check` couvre les sorties FR/EN, les 17 apps, les références publiques,
les métadonnées, les sitemaps, la rotation et les gestes. Les tests du geste incluent
le transfert de capture tactile implicite vers la surface, l’annulation, les gestes
courts, les mouvements verticaux, le stylet, le multitouch et la réduction des mouvements.

`scripts/check-swipe-browser.mjs` utilise Playwright comme outil de QA facultatif,
sans dépendance envoyée aux visiteurs. Il accepte `PLAYWRIGHT_MODULE`,
`PLAYWRIGHT_CHANNEL`, `PORTFOLIO_QA_URL` et `PORTFOLIO_QA_OUT`. Il vérifie les gestes
souris et tactiles natifs dans Chrome, les annulations, les boutons, le clavier,
les favoris, les images en échec, les stockages corrompus ou indisponibles, les
17 apps en deux langues à trois largeurs, la pause et le repli sans JavaScript.
Les requêtes autres que GET/HEAD sont interceptées. Les captures et le rapport
local sont conservés dans `output/playwright/swipe/`, ignoré par Git.

Contrôles exécutés avec succès sur la version finale :

- génération et cohérence FR/EN, 27 tests Node et sept scénarios du skill portable ;
- six parcours Chrome couvrant souris, tactile natif, clavier, stockage, erreurs
  d’image, réduction des mouvements et repli sans JavaScript ;
- 102 présentations : 17 apps × deux langues × 320, 768 et 1440 px, sans
  débordement ni zone média vide inattendue ;
- revue visuelle des captures du swipe, du panneau et des cadrages détaillés.

Les contrôles locaux ne prouvent pas la publication. Le workflow Pages et les
fichiers servis sont vérifiés séparément après le push autorisé.
