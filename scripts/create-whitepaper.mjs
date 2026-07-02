import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const bundledPython = join(
  process.env.USERPROFILE ?? "",
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "python",
  "python.exe"
);

const python = existsSync(bundledPython) ? bundledPython : "python";
const script = join(root, "scripts", "build-whitepaper-v2.py");

const result = spawnSync(python, [script], {
  cwd: root,
  stdio: "inherit"
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
