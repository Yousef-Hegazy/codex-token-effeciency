import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));

test("portable manifest declares the Codex interface, onboarding, and hooks", () => {
  const manifest = readJson("plugin.json");

  assert.equal(
    manifest.$schema,
    "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  );
  assert.equal(manifest.name, "codex-token-effeciency");
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.equal(
    manifest.extensions["com.openai"].onboardingSkill,
    "./skills/setup/SKILL.md",
  );
  assert.equal(
    manifest.extensions["com.openai"].hooks,
    "./hooks/hooks.json",
  );
  assert.equal(
    manifest.extensions["com.openai"].interface.displayName,
    "Codex Token Efficiency",
  );
});

test("session hook covers every root-session entry point with bounded context", () => {
  const config = readJson("hooks/hooks.json");
  const entries = config.hooks.SessionStart;

  assert.equal(entries.length, 1);
  assert.equal(entries[0].matcher, "startup|resume|clear|compact|fork");
  assert.equal(entries[0].hooks.length, 1);
  assert.ok(entries[0].hooks[0].additionalContextLimit <= 200);
  assert.match(entries[0].hooks[0].command, /session-start\.sh/);
  assert.match(entries[0].hooks[0].commandWindows, /session-start\.ps1/);
});

test("platform activation hook emits compact valid JSON", () => {
  const output =
    process.platform === "win32"
      ? execFileSync(
          "powershell.exe",
          [
            "-NoProfile",
            "-ExecutionPolicy",
            "Bypass",
            "-File",
            join(root, "hooks", "session-start.ps1"),
          ],
          { encoding: "utf8" },
        )
      : execFileSync("sh", [join(root, "hooks", "session-start.sh")], {
          encoding: "utf8",
        });
  const payload = JSON.parse(output);
  const context = payload.hookSpecificOutput.additionalContext;

  assert.equal(payload.hookSpecificOutput.hookEventName, "SessionStart");
  assert.match(context, /balanced/i);
  assert.match(context, /delegat/i);
  assert.ok(context.split(/\s+/).length <= 120);
});

test(
  "configured Windows hook command works when the plugin path contains spaces",
  { skip: process.platform !== "win32" },
  () => {
    const temporaryRoot = mkdtempSync(join(tmpdir(), "codex plugin "));
    const temporaryHooks = join(temporaryRoot, "hooks");
    mkdirSync(temporaryHooks);
    for (const file of ["session-start.ps1"]) {
      copyFileSync(join(root, "hooks", file), join(temporaryHooks, file));
    }

    try {
      const config = readJson("hooks/hooks.json");
      const command = config.hooks.SessionStart[0].hooks[0].commandWindows;
      const output = execFileSync(
        "powershell.exe",
        ["-NoProfile", "-Command", command],
        {
          encoding: "utf8",
          env: { ...process.env, PLUGIN_ROOT: temporaryRoot },
        },
      );
      const payload = JSON.parse(output);
      assert.equal(payload.hookSpecificOutput.hookEventName, "SessionStart");
    } finally {
      rmSync(temporaryRoot, { recursive: true, force: true });
    }
  },
);

test("plugin contains both skills and every routed reference", () => {
  const required = [
    "skills/setup/SKILL.md",
    "skills/token-efficient-orchestration/SKILL.md",
    "skills/token-efficient-orchestration/references/routing-policy.md",
    "skills/token-efficient-orchestration/references/delegation-contracts.md",
    "skills/token-efficient-orchestration/references/tuning.md",
  ];

  for (const path of required) {
    assert.equal(existsSync(join(root, path)), true, `${path} must exist`);
  }
});

test("evaluation suite covers at least eighteen routing scenarios", () => {
  const scenarios = readJson("evals/scenarios.yaml");

  assert.ok(scenarios.length >= 18);
  for (const scenario of scenarios) {
    assert.match(scenario.id, /^[a-z0-9-]+$/);
    assert.ok(["primary", "search", "edit"].includes(scenario.expectedRoute));
    assert.ok(["low", "primary"].includes(scenario.reasoning));
    assert.ok(Number.isInteger(scenario.maxAgents));
    assert.ok(scenario.maxAgents >= 0 && scenario.maxAgents <= 2);
    assert.ok(scenario.expectedReason.length > 0);
  }
});

test("marketplace exposes the plugin without authentication", () => {
  const marketplace = readJson(".agents/plugins/marketplace.json");
  const entry = marketplace.plugins.find(
    (plugin) => plugin.name === "codex-token-effeciency",
  );

  assert.ok(entry);
  assert.equal(entry.source.source, "local");
  assert.equal(entry.source.path, "./");
  assert.equal(entry.policy.installation, "AVAILABLE");
  assert.equal(entry.policy.authentication, "ON_INSTALL");
  assert.equal(entry.category, "Productivity");
});

test("README documents installation, hook trust, modes, and removal", () => {
  const readme = readFileSync(join(root, "README.md"), "utf8");

  assert.match(
    readme,
    /codex plugin marketplace add Yousef-Hegazy\/codex-token-effeciency/,
  );
  assert.match(readme, /SessionStart/i);
  assert.match(readme, /economy/i);
  assert.match(readme, /balanced/i);
  assert.match(readme, /maximum-quality/i);
  assert.match(readme, /no-agents/i);
  assert.match(readme, /uninstall|remove/i);
});

test("evaluation report labels measured token savings as unverified", () => {
  const report = readFileSync(join(root, "evals", "results.md"), "utf8");

  assert.match(report, /token savings[^\n]*unverified/i);
});

