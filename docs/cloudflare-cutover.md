# bnjdpn.com Cloudflare Pages cutover

Run this after PR #12 is merged and the Pages project has a successful production deployment. The production Pages project is `bnjdpn-site-506`; its default hostname is `bnjdpn-site-506.pages.dev`.

## Prepare the Pages domain

1. Record the current website records for rollback: `dig +short A bnjdpn.com`, `dig +short AAAA bnjdpn.com`, and `dig +short CNAME www.bnjdpn.com`. Keep this output with the change record; do not copy MX or TXT records into the rollback set.
2. In Cloudflare Dashboard, open **Workers & Pages → bnjdpn-site-506 → Custom domains** and add `bnjdpn.com` and `www.bnjdpn.com`. Wait until each domain and its TLS certificate show active. This attaches both hostnames to Pages before DNS is changed.
3. In the `bnjdpn.com` zone, replace only the website records. Remove the GitHub Pages apex records (`A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and any GitHub Pages `AAAA` records) and the `www` CNAME to `bnjdpn.github.io`. Preserve MX, DKIM, SPF, DMARC, and all other mail records.
4. Add the apex and `www` records shown by the Pages **Custom domains** panel. For the Pages project above, the target is `bnjdpn-site-506.pages.dev`; use Cloudflare's apex flattening and keep the Pages-recommended proxy setting. Do not copy records from another project.

## Verify HTTP and TLS

Run from a shell with `curl`:

```sh
set -eu
for url in https://bnjdpn.com/ https://www.bnjdpn.com/ https://bnjdpn.com/contact/ https://bnjdpn.com/fr/contact/; do
  code=$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' "$url")
  test "$code" = 200 || { printf 'Unexpected HTTP %s for %s\n' "$code" "$url" >&2; exit 1; }
  printf '%s %s\n' "$code" "$url"
done
curl --silent --show-error --fail https://bnjdpn.com/api/contact/config | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const x=JSON.parse(s);if(typeof x.sitekey!=="string"||!x.sitekey)process.exit(1);console.log("contact config: sitekey present")})'
```

Check the TLS certificate for both hostnames with `curl --fail --verbose` and confirm the certificate covers the requested hostname. Verify all sitemap URLs with `node scripts/check-preview-pages.mjs --base https://bnjdpn.com`.

## Roll back

If HTTP, TLS, or Pages health checks fail, restore the previous website records: the four GitHub Pages apex `A` addresses listed above, the prior GitHub Pages `AAAA` records captured before cutover, and `www CNAME bnjdpn.github.io`. Leave mail records untouched. Keep the Pages custom domain attached while investigating; remove it only if Cloudflare reports a domain conflict. Repeat the HTTP/TLS checks against `https://bnjdpn.github.io` and `https://www.bnjdpn.com` after DNS has converged.
