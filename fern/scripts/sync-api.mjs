// Refreshes the committed API snapshots in fern/snapshots/ from a running backend,
// then regenerates the Markdown snippets that depend on them.
//
//   node fern/scripts/sync-api.mjs                        # BACKEND_URL defaults to a local backend
//   BACKEND_URL=https://api.example.test node fern/scripts/sync-api.mjs
//
// Review the resulting diff before committing — this is the moment a new
// endpoint becomes public.

import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = (process.env.BACKEND_URL ?? "http://localhost:5005").replace(/\/$/, "");
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOTS = join(ROOT, "snapshots");

/** Endpoint -> snapshot file. openapi.json stays at fern/ root: generators.yml points there. */
const SOURCES = [
  ["/api/v1/openapi.json", join(ROOT, "openapi.json")],
  ["/api/v1/errors", join(SNAPSHOTS, "errors.json")],
  ["/api/v1/models", join(SNAPSHOTS, "models.json")],
  ["/api/v1/models?use_case=flow", join(SNAPSHOTS, "models-flow.json")],
  ["/api/v1/pricing", join(SNAPSHOTS, "pricing.json")],
];

await mkdir(SNAPSHOTS, { recursive: true });
for (const [path, file] of SOURCES) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${BASE}${path} -> HTTP ${res.status}`);
  // Pretty-print so review diffs are line-oriented.
  await writeFile(file, JSON.stringify(await res.json(), null, 2) + "\n");
  console.log(`synced ${path} -> ${file.replace(ROOT + "/", "fern/")}`);
}

execFileSync(process.execPath, [join(ROOT, "scripts", "generate-snippets.mjs")], { stdio: "inherit" });
