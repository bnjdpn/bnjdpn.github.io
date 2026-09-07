import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const index = (await Promise.all(["index.html", "fr/index.html"].map(path => readFile(resolve(root, path), "utf8")))).join("\n");
const urls = [...new Set([...index.matchAll(/<a\b[^>]*href="(https:\/\/[^"#]+)"/g)].map((match) => match[1]))];

const pending = [...urls];
const failures = [];
let checked = 0;
let throttled = 0;

async function worker() {
  while (pending.length > 0) {
    const url = pending.shift();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "bnjdpn.github.io link check" },
      });
      if (response.status === 429) throttled += 1;
      else if (!response.ok) failures.push(`${response.status} ${url}`);
      checked += 1;
      console.log(`${response.status} ${url}`);
    } catch (error) {
      failures.push(`${error.name} ${url}`);
    } finally {
      clearTimeout(timeout);
    }
  }
}

await Promise.all(Array.from({ length: 5 }, worker));

if (failures.length > 0) {
  console.error(`\n${failures.length} lien(s) en échec :\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`\n${checked - throttled} liens confirmés ; ${throttled} liens non vérifiés (HTTP 429).`);
if (throttled) process.exitCode = 1;
