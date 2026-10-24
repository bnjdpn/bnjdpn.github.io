# Cloudflare site deployment

This is the current web publishing procedure for `bnjdpn.com`. The existing
Cloudflare Pages project is `bnjdpn-site-506`; Wrangler direct upload version
4.152.0 deploys its public artifact. The assembled site contains the central
catalogue, 17 catalogue apps and five preserved historical prefixes: 23 public
site roots from 22 explicit product-site stages plus the central root.

GitHub Pages is no longer the web publisher. The former `bnjdpn.github.io`
URLs remain HTTP 301 compatibility redirects to matching `bnjdpn.com` paths,
including links already distributed with installed apps. No GitHub Actions
workflow publishes web sites; Échappée’s Windows build workflow remains a
separate native release path.

## Preparing a site change

Edit the owning app repository and run its existing generator and checks. Keep
the app’s actual public output and full source commit SHA together. Generate an
explicit, allowlisted stage under the portfolio’s `.local/` directory, then
update the relevant entry in a new source spec with the repository path, stage
path, full SHA, and the generator’s public file extensions. Do not point a spec
at a repository root or copy private notes and build tooling into a stage.

Assemble a new candidate directory; the assembler refuses to replace an
existing candidate and verifies each source HEAD against the recorded SHA:

```sh
python3 scripts/assemble-cloudflare-preview.py \
  --spec /path/to/sources.json \
  --out .local/cloudflare-candidates/candidate-N
python3 scripts/preview-ecosystem.py check \
  --artifact .local/cloudflare-candidates/candidate-N/public \
  --out .local/cloudflare-candidates/candidate-N/links.json
python3 scripts/check-cloudflare-preview.py
python3 scripts/preview-ecosystem.py serve \
  --artifact .local/cloudflare-candidates/candidate-N/public --port 4174
```

Review the local preview and link report before release.
`scripts/assemble-cloudflare-preview.py` uses the catalogue allowlist and
preserves explicit historical prefixes; `scripts/preview-ecosystem.py` checks
local links, anchors, languages and assets.
The server-binding files and private manifest stay beside `public/`, never in
the public tree. The Pages routes are limited to `/api/contact` and
`/api/contact/config`; `/_asc-hooks/*` and `/_funnel/*` are excluded. The
existing `bnjdpn-contact-email` Worker is reached through the Pages service
binding. Its configuration and secrets remain in the Cloudflare account and
are never committed or copied into `public/`.

## Deploy and verify

Commit and push preserve the reviewed sources; they do not deploy the site.
For website changes covered by AGENTS.md, deploy during the work without waiting
for app-store approval. After validating the candidate, use Wrangler 4.152.0 from its directory so it
can read both `public/` and the adjacent Pages functions/configuration. Select
the reviewed Cloudflare branch explicitly:

```sh
cd /path/to/candidate-N
wrangler --version
wrangler pages deploy public \
  --project-name bnjdpn-site-506 \
  --branch <reviewed-branch>
```

For production, use the project’s configured production branch. A successful
upload confirms a deployment, not the bytes served to visitors. Read back the
explicit site stages and compare served files with their local hashes using
`scripts/check-published-artifacts.py`; then inspect the public routes and form
behavior. Keep the readback spec and report outside `public/`. Neither a source
push nor a green local checker proves production delivery.

The readback spec is an explicit JSON list of `site`, `stage`, `base_url` and
full `sha` values. Each `base_url` is the public HTTPS prefix ending in `/`;
each `stage` is the matching local public directory. For example:

```sh
python3 scripts/check-published-artifacts.py \
  --spec /path/to/readback-sites.json \
  --out output/cloudflare/production-readback.json
```
