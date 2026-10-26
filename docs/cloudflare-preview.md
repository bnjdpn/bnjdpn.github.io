# Préparer un artefact Cloudflare local

Choix de préparation pour [#15](https://github.com/bnjdpn/bnjdpn.github.io/issues/15) :
un seul arbre statique contenant la racine, les 17 sites indépendants aux
préfixes de `content/catalog.json` et les cinq sites historiques préservés.
Ces derniers ne sont pas réintroduits dans le catalogue commercial.
Les pages centrales EN/FR ne remplacent
aucune langue, politique archivée, ancre ou page produit indépendante.
Petits Pots et Petits Besoins conservent leurs documents centraux et leur
formulaire `/contact/?app=petits-pots|petits-besoins`, sans nouvelle chaîne email.
La préparation ne touche aucun compte, DNS, Worker, workflow ou réglage Pages.

`scripts/assemble-cloudflare-preview.py` accepte un manifeste explicite local :
une entrée par site du catalogue et par préfixe historique avec `site`, `repo`, `stage`, `sha` complet et
`kind`. Les chemins `stage` doivent être des sorties existantes `docs`, `_site`
ou `_pages` sous leur dépôt, ou des sorties `local-generator-stage` sous
le `.local/` de ce dépôt (voir ci-dessous). La racine est sélectionnée par l’allowlist du
vérificateur d’écosystème, alignée sur `pages.yml` (dont apps/guides/contact).
Le script refuse un catalogue incomplet, un SHA modifié, une destination déjà
existante, les liens symboliques et les types de fichier non autorisés.

Préférer les artefacts exacts `_site`/`_pages` déjà qualifiés, avec
`kind: "existing-staged-output"`. Une sortie Ruby `docs` est une source candidate,
pas un artefact Pages équivalent : son staging applique aussi des transformations
SEO aux politiques. Pour cette source, `kind: "local-generated-docs-not-staged"`
exige `files`, la liste des chemins rendue par le générateur existant
`PortfolioMarketingSite::Generator#seo_stage_files`, et `extensions`, sa constante
`PortfolioMarketingSeo::SAFE_STAGE_EXTENSIONS`. On peut lire ces valeurs en
chargeant `scripts/marketing_site.rb` sans exécuter son CLI. Ne pas copier `docs/`
récursivement : plusieurs dépôts y conservent des preuves et notes internes.
Aucun générateur n’est copié ni modifié par l’assembleur.

Pour obtenir les transformations exactes sans écrire dans les apps, utiliser
`scripts/stage-product-preview.rb` avec une version Ruby compatible avec leurs
générateurs. Il appelle le même `seo_stage_files` et le même contrôle des chemins
que `stage!`, puis écrit uniquement dans une nouvelle sortie sous `.local/` ici :

```sh
ruby scripts/stage-product-preview.rb /path/to/App .local/exact-stages/App
```

La sortie JSON décrit les extensions autorisées par ce générateur et les hachages
produits. Une entrée `local-generator-stage` référence cette sortie avec le vrai
`repo`, son SHA actuel et ces extensions. Conserver le rapport JSON en dehors de
l’arbre public ; comparer l’état source avant/après et les routes/hachages avec le
candidat précédent. Cette préparation ne lance ni build natif ni commande de
publication et ne modifie pas le `.local/` ou les proofs des apps.

```sh
python3 scripts/assemble-cloudflare-preview.py --spec /path/to/sources.json --out .local/cloudflare-candidate
python3 scripts/preview-ecosystem.py check --artifact .local/cloudflare-candidate/public --out .local/cloudflare-candidate/links.json
python3 scripts/check-cloudflare-preview.py
python3 scripts/preview-ecosystem.py serve --artifact .local/cloudflare-candidate/public --port 4174
```

Le dossier choisi contient `public/` et un manifeste privé `manifest.json` à côté,
jamais dans l’arbre public. Ce manifeste décrit les SHA source, l’état des fichiers
suivis, les langues HTML, les hachages de chaque fichier et `publishable: false`.
Une copie locale réussie ne qualifie ni l’équivalence au site servi ni la dernière
version disponible dans les stores. Les liens et sitemaps reconnaissent les deux
origines historiques `bnjdpn.github.io` et `bnjdpn.com` pour contrôler leurs cibles
et ancres dans l’artefact. Aucune réécriture des URL historiques n’est ajoutée.

La liste contient exactement 18 entrées : les 17 du catalogue, puis `RealmBox`.
`TaskLane`, `NovaStationPinball`, `onigiri-exit-calculator` et
`poop-price-calculator` sont retirés (décision du 26/10/2026) : aucune sortie
publique, `functions/_middleware.js` répond 410 Gone sur ces préfixes et
l’assembleur refuse une entrée pour eux. L’entrée historique utilise obligatoirement
`kind: "local-generator-stage"`, avec le dépôt source isolé et son vrai SHA
complet ; `stage` pointe vers sa sortie publique vérifiée sous le `.local/`
central, jamais vers la racine du dépôt ou un `docs/` contenant des notes.
Les sorties préparées se trouvent sous
`.local/cloudflare-final-20261023/{catalogue,legacy}/<préfixe>`.
Les seules exceptions JSON publiques sont `RealmBox/release-manifest.json`
et `VesperDrift/press/media/manifest.json` ; une extension `.json` déclarée
dans le manifeste n’autorise aucun autre document. Les sources `_src`, `src`,
scripts, outils et preuves restent exclues. Le checker et le serveur de preview
lisent les cinq préfixes depuis le manifeste voisin et vérifient aussi leurs
langues, liens, ancres et assets.

L’assemblage ajoute uniquement `public/_routes.json` comme contrôle Pages :
les fonctions sont limitées à `/api/contact` et `/api/contact/config` ;
`/_asc-hooks/*` et `/_funnel/*` sont explicitement exclus. Les routes Workers
de zone existantes restent configurées séparément, sans écrasement par ce lot.
À côté de `public/`, l’assembleur conserve `functions/api/contact.js`,
`functions/api/contact/config.js`, leurs imports `content/catalog.json` et
`content/app-documents.mjs`, et `wrangler.toml` issu de
`cloudflare/pages-upload.toml`. Leurs hachages entrent dans le manifeste privé.
Ni ces sources, ni le Worker email, ni les secrets ne sont copiés dans `public/`.

Le direct upload doit partir du répertoire candidat, car Wrangler y cherche
`functions/` et sa configuration ; téléverser `public/` depuis un autre cwd
peut perdre les fonctions. Le SDK local Wrangler 4.152.0 confirme ce comportement
et refuse un chemin `--config` personnalisé pour `pages deploy`. Root choisit
explicitement la branche après revue :

```sh
cd /chemin/du/candidat
wrangler pages deploy public --project-name bnjdpn-site-506 --branch <branche-revue>
```

Cette commande est documentaire, jamais exécutée par l’assembleur. Le projet,
le binding `EMAIL_SERVICE`, la date `2026-10-19` et la clé Turnstile publique
existants sont conservés ; les valeurs secrètes restent dans le compte. Root
doit vérifier leurs bindings et les deux routes `www` après déploiement.

Avant toute bascule : qualifier chaque staging exact et chaque URL store/langue,
relire les octets servis, décider du maintien des sites historiques hors catalogue
(RealmBox, TaskLane, NovaStationPinball et calculatrices cités dans #12) et vérifier
les routes Workers de `www` (`/_asc-hooks/*`, `/_funnel/*`). La couverture du
catalogue ne prouve pas la couverture entière du domaine. Les formulaires des
sites indépendants et leurs mentions Formspree exigent aussi une décision de
migration explicite ; cet assemblage les conserve tels quels. Le formulaire
central conserve le Worker existant ; aucun envoi réel n’est exécuté.

La PR #12 n’est pas reprise : ses redirections génériques supprimeraient des
langues, des ancres de support et les sitemaps enfants. Les fichiers originaux
restent présents ici. Ce constat de préparation précède la bascule Cloudflare.
GitHub Pages n’est plus l’hébergement actif ; la procédure actuelle est dans
[cloudflare/DEPLOY.md](../cloudflare/DEPLOY.md). Un push conserve les sources
mais ne vaut pas déploiement.

## Contact local : réutilisation de la chaîne Cloudflare existante

`functions/api/contact.js` reprend uniquement l’API de la branche
`feat/506-cloudflare`, avec ses protections et le binding `EMAIL_SERVICE` vers
le Worker existant `bnjdpn-contact-email`. Aucun build ni fichier `_redirects`
de cette branche n’est repris. Les stages conservés ci-dessus ne sont pas modifiés.
Les fonctions Pages et `email-worker/` sont des sources serveur, jamais des fichiers
à copier dans l’arbre public statique. Leur déploiement reste séparé et non effectué.

Le contrat est `POST /api/contact`, de même origine, en JSON, multipart ou
URL-encoded, limité à 32 Kio sur le flux réellement lu. Les champs sont `app`,
`email`, `message` (2–5000 caractères), `_gotcha` et `cf-turnstile-response`.
Les 19 identités existantes sont acceptées par chemin ou nom d’app normalisé.
Le support historique Nova Station Pinball est accepté séparément, sans ajout
au catalogue commercial.
`category` est bornée à 80 caractères ; `app_version`, `os_version`, `platform`,
`device_model`, `ui_language` et `trainer_model` à 64, sans caractères de contrôle.
Le pays fourni par Cloudflare et la page référente sans query ni fragment sont
ajoutés côté serveur ; un champ client ne peut pas remplacer ces deux valeurs.
`_subject`, `_next` et les destinataires fournis par un client ne commandent
jamais un en-tête, une destination ou une redirection. Turnstile doit confirmer
le hostname de la requête et l’action `contact` ; le honeypot n’envoie aucun mail.

Avec `Accept: application/json`, succès signifie HTTP 200 avec `{ "ok": true }`,
et les refus sont des statuts 4xx/5xx avec `{ "ok": false, "error": "…" }`.
Les erreurs ne redirigent pas un `fetch` vers une page HTML 200. Le Worker email
accuse l’acceptation avec un HTTP 204 vide : aucun `messageId` n’est inventé ni
attendu. Cette acceptation ne prouve pas une réception dans la boîte finale.
Le contact central reste limité à ses deux apps actuelles ; l’API ne réécrit pas
les formulaires des sites indépendants. Ils forment un lot distinct.

`GET /api/contact/config` ne renvoie que la clé publique Turnstile, sans cache.
Le navigateur utilise cette clé et l’action `contact`, renouvelle les tokens
et conserve le texte en cas d’erreur. Les bindings serveur sont
`TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` et `EMAIL_SERVICE` côté Pages ;
`CONTACT_EMAIL`, `CONTACT_FROM` et `CONTACT_DESTINATION_ADDRESS` côté Worker.
La destination de l’enveloppe et la restriction du binding email restent
alignées dans `email-worker/wrangler.toml`, sur la boîte Formulaires décidée
pour le service existant. Aucun destinataire ou secret n’est renvoyé au client.
Root doit encore vérifier la destination autorisée et les bindings de production.
Les valeurs masquées par l’API de configuration ne prouvent pas leur absence.

Tests locaux sans Cloudflare, Turnstile réel ni envoi email :

```sh
node scripts/contact-api-test.mjs
node scripts/check-contact.mjs
```

Ces contrôles utilisent uniquement des doublures de requêtes, service binding
et email. Aucun résultat local ne constitue une preuve de réception ou de réponse
Grok. Le projet Pages existant, ses domaines et les routes `/_asc-hooks/*` et
`/_funnel/*` restent sous vérification séparée avant toute bascule.
