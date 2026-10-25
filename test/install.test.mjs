import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const marketplace = "Yousef-Hegazy/codex-token-effeciency";
const shell =
  process.platform === "win32" &&
  existsSync("C:\\Program Files\\Git\\bin\\sh.exe")
    ? "C:\\Program Files\\Git\\bin\\sh.exe"
    : "sh";
const shellRoot =
  process.platform === "win32"
    ? root
        .replace(/^([A-Za-z]):/, (_, drive) => `/${drive.toLowerCase()}`)
        .replaceAll("\\", "/")
    : root;

test(
  "PowerShell installer dry-run registers the GitHub marketplace",
  { skip: process.platform !== "win32" },
  () => {
  const output = execFileSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      `${root}\\install\\install.ps1`,
      "-DryRun",
    ],
    { encoding: "utf8" },
  );

  assert.match(output, new RegExp(`codex plugin marketplace add ${marketplace}`));
  assert.match(output, /\/plugins/);
  },
);

test(
  "POSIX installer dry-run registers the GitHub marketplace",
  {
    skip:
      process.platform === "win32" &&
      !existsSync("C:\\Program Files\\Git\\bin\\sh.exe"),
  },
  () => {
  const output = execFileSync(
    shell,
    [`${shellRoot}/install/install.sh`, "--dry-run"],
    { encoding: "utf8" },
  );

  assert.match(output, new RegExp(`codex plugin marketplace add ${marketplace}`));
  assert.match(output, /\/plugins/);
  },
);

