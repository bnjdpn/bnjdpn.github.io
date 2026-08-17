import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const index = await readFile(resolve(root, "index.html"), "utf8");
const styles = await readFile(resolve(root, "styles.css"), "utf8");
const failures = [];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const id of ["main", "produits", "livraisons", "construction", "public", "profil"]) {
  expect(index.includes(`id="${id}"`), `Section manquante : #${id}`);
}

expect(index.includes("Voici ce que<br>j’ai livré."), "La promesse éditoriale du premier écran a disparu.");
expect(index.includes("Ce produit n’est pas<br>encore disponible."), "Le statut honnête d’Échappée a disparu.");
expect(!index.includes("mailto:"), "Une adresse e-mail directe a été introduite.");
expect(!index.includes("target=\"_blank\""), "Les liens ne doivent pas forcer un nouvel onglet.");

const appIds = new Set([...index.matchAll(/apps\.apple\.com\/app\/id(\d+)/g)].map((match) => match[1]));
expect(appIds.size === 16, `16 apps App Store uniques attendues, ${appIds.size} trouvée(s).`);

const localReferences = [...index.matchAll(/(?:href|src)="([^"#]+)"/g)]
  .map((match) => match[1])
  .filter((value) => !/^(?:https?:|data:|\/)/.test(value));

for (const reference of new Set(localReferences)) {
  try {
    await access(resolve(root, reference.split("?")[0]));
  } catch {
    failures.push(`Fichier local introuvable : ${reference}`);
  }
}

for (const [pattern, label] of [
  [/linear-gradient|radial-gradient/i, "dégradé décoratif"],
  [/backdrop-filter/i, "verre dépoli"],
  [/\banimation\s*:/i, "animation cosmétique"],
  [/fonts\.(?:googleapis|gstatic)\.com/i, "police distante"],
]) {
  expect(!pattern.test(`${index}\n${styles}`), `Motif anti-slop interdit : ${label}.`);
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `✗ ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`✓ Structure éditoriale vérifiée`);
console.log(`✓ ${appIds.size} apps App Store uniques`);
console.log(`✓ ${new Set(localReferences).size} références locales présentes`);
console.log("✓ Garde-fous anti-slop respectés");
