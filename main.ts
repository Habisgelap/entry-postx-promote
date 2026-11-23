import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The entry is the X post itself; this program only hands its address over.
// It copies POST.json from the repository into the grader's output directory.
const repoDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

mkdirSync(outDir, { recursive: true });
const source = join(repoDir, "POST.json");
const parsed = JSON.parse(readFileSync(source, "utf8")) as { url?: unknown };
if (typeof parsed.url !== "string" || parsed.url.length === 0) {
  throw new Error("POST.json must hold a post url string");
}
copyFileSync(source, join(outDir, "POST.json"));
