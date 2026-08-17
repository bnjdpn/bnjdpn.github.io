import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [index, styles, sitemapIndex, sitemapPages, robots, manifest, notFound, pagesWorkflow] = await Promise.all([
  readFile(resolve(root, "index.html"), "utf8"),
  readFile(resolve(root, "styles.css"), "utf8"),
  readFile(resolve(root, "sitemap.xml"), "utf8"),
  readFile(resolve(root, "sitemap-pages.xml"), "utf8"),
  readFile(resolve(root, "robots.txt"), "utf8"),
  readFile(resolve(root, "site.webmanifest"), "utf8"),
  readFile(resolve(root, "404.html"), "utf8"),
  readFile(resolve(root, ".github/workflows/pages.yml"), "utf8"),
]);
const failures = [];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const id of ["main", "products", "deliveries", "building", "open-source", "profile"]) {
  expect(index.includes('id="' + id + '"'), "Missing section: #" + id);
}

expect(index.includes('<html lang="en">'), "The hub must declare English as its language.");
expect(index.includes("Here’s what<br>I’ve shipped."), "The editorial promise on the first screen disappeared.");
expect(index.includes("Built and tested.<br>Not released yet."), "Échappée’s honest release status disappeared.");
expect(index.includes("Technical Leader &amp; Independent Product Builder"), "The SEO positioning is missing.");
expect(!/\b16 apps\b/i.test(index), "A fixed app count was reintroduced into permanent copy.");
expect(!index.includes("mailto:"), "A direct email address was introduced.");
expect(!index.includes('target="_blank"'), "Links must not force a new tab.");

const appIds = new Set([...index.matchAll(/apps\.apple\.com\/app\/id(\d+)/g)].map((match) => match[1]));
expect(appIds.size === 16, "Expected 16 unique public App Store apps, found " + appIds.size + ".");

const projectPaths = [
  "BrewMeter", "ColdLoad", "Echappee", "FastZen", "GrooveLog", "LoadSense", "MoveAtlas",
  "NeatShift", "NoBuyCart", "NovaStationPinball", "PRVault", "PasDuJour", "TempoReps",
  "VesperDrift", "petites-bouchees", "petites-dents", "petites-gouttes", "petites-nuits",
];
for (const path of projectPaths) {
  expect(index.includes("https://bnjdpn.github.io/" + path + "/"), "Missing visible project link: /" + path + "/");
}

const jsonLdMatch = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
expect(Boolean(jsonLdMatch), "JSON-LD graph is missing.");
if (jsonLdMatch) {
  try {
    const data = JSON.parse(jsonLdMatch[1]);
    const graph = data["@graph"] ?? [];
    const types = new Set(graph.map((entry) => entry["@type"]));
    for (const type of ["Person", "WebSite", "ProfilePage", "ItemList"]) {
      expect(types.has(type), "JSON-LD type is missing: " + type);
    }
    const itemList = graph.find((entry) => entry["@type"] === "ItemList");
    expect(itemList?.itemListElement?.length === 18, "JSON-LD ItemList must contain the 18 visible product sites.");
    expect(!JSON.stringify(data).includes('"offers"'), "Unverified offers must not appear in JSON-LD.");
  } catch (error) {
    failures.push("Invalid JSON-LD: " + error.message);
  }
}

const expectedSitemaps = [
  "https://bnjdpn.github.io/sitemap-pages.xml",
  ...projectPaths.map((path) => "https://bnjdpn.github.io/" + path + "/sitemap.xml"),
];
const indexedSitemaps = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
expect(sitemapIndex.includes("<sitemapindex"), "sitemap.xml must be a sitemap index.");
expect(indexedSitemaps.length === expectedSitemaps.length, "Expected " + expectedSitemaps.length + " indexed sitemaps, found " + indexedSitemaps.length + ".");
expect(expectedSitemaps.every((url) => indexedSitemaps.includes(url)), "The sitemap index does not cover the complete portfolio.");
expect(sitemapPages.includes("<loc>https://bnjdpn.github.io/</loc>"), "The hub URL is missing from sitemap-pages.xml.");
expect(robots.includes("Sitemap: https://bnjdpn.github.io/sitemap.xml"), "robots.txt must expose the root sitemap index.");
expect(JSON.parse(manifest).description.startsWith("Production software"), "The web manifest is not aligned with the English hub.");
expect(notFound.includes('<html lang="en">') && notFound.includes("noindex"), "The 404 page must be English and noindex.");
expect(!pagesWorkflow.includes("rsync"), "GitHub Pages must use an exact public-file allowlist.");
expect(pagesWorkflow.includes("cp 404.html index.html robots.txt sitemap.xml sitemap-pages.xml site.webmanifest styles.css _site/"), "The Pages allowlist is missing a root public artifact.");
expect(pagesWorkflow.includes("cp -R assets _site/assets"), "The Pages allowlist must include the public asset tree.");
const actionUses = [...pagesWorkflow.matchAll(/uses:\s+([^@\s]+)@([^\s]+)/g)];
expect(actionUses.length === 5, "The Pages workflow must keep its five expected third-party actions.");
expect(actionUses.every(([, , revision]) => /^[0-9a-f]{40}$/.test(revision)), "Every GitHub Action must be pinned to an immutable commit.");

const localReferences = [...index.matchAll(/(?:href|src)="([^"#]+)"/g)]
  .map((match) => match[1])
  .filter((value) => !/^(?:https?:|data:|\/)/.test(value));

for (const reference of new Set(localReferences)) {
  try {
    await access(resolve(root, reference.split("?")[0]));
  } catch {
    failures.push("Missing local file: " + reference);
  }
}

for (const [pattern, label] of [
  [/linear-gradient|radial-gradient/i, "decorative gradient"],
  [/backdrop-filter/i, "frosted glass"],
  [/\banimation\s*:/i, "cosmetic animation"],
  [/fonts\.(?:googleapis|gstatic)\.com/i, "remote font"],
]) {
  expect(!pattern.test(index + "\n" + styles), "Forbidden anti-slop pattern: " + label + ".");
}

if (failures.length > 0) {
  console.error(failures.map((failure) => "✗ " + failure).join("\n"));
  process.exit(1);
}

console.log("✓ English editorial structure and SEO graph verified");
console.log("✓ " + appIds.size + " public App Store apps and " + projectPaths.length + " product sites linked");
console.log("✓ " + indexedSitemaps.length + " sitemaps covered by the root index");
console.log("✓ " + new Set(localReferences).size + " local references present");
console.log("✓ Accessibility and anti-slop guardrails respected");
