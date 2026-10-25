# Codex Token Efficiency

A Codex-specific plugin that reduces total token use by delegating only when a cheaper worker is likely to save more context than it consumes.

It provides two narrowly defined worker routes:

- **Search worker:** low-reasoning, read-only codebase discovery that returns paths and evidence.
- **Edit worker:** low-reasoning changes limited to a clear, low-risk scope with an explicit verification check.

Trivial, dependent, ambiguous, sensitive, destructive, architectural, and final-verification work remains with the primary agent.

## Requirements

- Codex desktop or Codex CLI with plugin marketplace and lifecycle-hook support.
- A local execution environment on Windows, macOS, or Linux.
- No API key, MCP server, background service, or extra runtime dependency.

The plugin uses a small `SessionStart` hook. Codex requires you to review and trust plugin hooks before they run.

## Install

### Recommended: add the GitHub marketplace

Run:

```bash
codex plugin marketplace add Yousef-Hegazy/codex-token-effeciency
```

Then:

1. Start Codex.
2. Open `/plugins`.
3. Select **Codex Token Efficiency** and choose **Install**.
4. Open `/hooks`, review the `SessionStart` hook, and trust it.
5. Start a new chat.

The hook only emits a compact routing instruction. It performs no network calls, telemetry, credential access, or repository writes.

### Installer helpers

After cloning the repository, Windows users can run:

```powershell
.\install\install.ps1
```

macOS and Linux users can run:

```bash
sh ./install/install.sh
```

Both helpers register the same GitHub marketplace and print the remaining Codex steps. Preview the command without making changes with `-DryRun` on PowerShell or `--dry-run` on POSIX systems.

### Local development install

Register the repository checkout directly:

```bash
codex plugin marketplace add /absolute/path/to/codex-token-effeciency
```

Restart Codex, install the plugin from `/plugins`, and trust the hook from `/hooks`.

## Usage

Balanced mode is automatic after installation. You can override it in any prompt:

```text
Use economy mode for this task.
Use balanced token-efficiency routing.
Use maximum-quality mode.
Use no-agents mode.
```

Codex emits one compact routing note:

```text
route=primary mode=balanced reason=direct-cheaper
```

### Modes

| Mode | Behavior |
|---|---|
| `economy` | Delegates only when projected savings are high; smaller edit caps |
| `balanced` | Default; delegates bounded search and edits when savings are clear |
| `maximum-quality` | Allows delegation at a lower savings threshold but preserves all hard vetoes |
| `no-agents` | Keeps all work with the primary agent |

## Routing rules

| Route | Typical fit | Cases that stay primary |
|---|---|---|
| Search worker | Unknown implementation spread across directories; independent broad questions; likely more than four search calls | Exact file or symbol; one direct search; immediately dependent next step |
| Edit worker | Reversible low-risk change; at most five named files; roughly 250 changed lines or fewer; exact verification | Architecture, authentication, migrations, destructive work, ambiguity, missing verification |
| Primary agent | Short work, high-risk decisions, overlapping edits, worker failure, final verification | Only delegates when total-task savings are clear |

One worker is the default. Two are permitted only for genuinely independent broad searches. Edit workers may never touch overlapping files.

The preferred worker is the cheapest available code-capable model at low reasoning. `gpt-6-luna` is preferred when available; otherwise Codex selects the nearest lower-cost capable model exposed by the host. The plugin does not fail when a named model is unavailable.

## Why this saves tokens

The protocol counts the whole task rather than one model call:

```text
total = primary context + worker prompt + worker output + review + retries + cleanup
```

Delegation is rejected when transferring context and reviewing the result is likely to cost as much as direct work. A worker that fails verification once returns evidence to the primary agent instead of triggering recursive replacement workers.

## Safety and privacy

- No network service or MCP server is bundled.
- No secrets or credentials are requested.
- No telemetry is collected.
- Explicit user instructions and repository instructions override plugin defaults.
- Authentication, authorization, secrets, payments, privacy, schemas, migrations, destructive actions, and final verification remain with the primary agent.

## Remove

First uninstall or disable **Codex Token Efficiency** from `/plugins`. Then inspect registered marketplace names:

```bash
codex plugin marketplace list
```

Remove this marketplace source:

```bash
codex plugin marketplace remove codex-token-effeciency
```

If Codex displays a different resolved marketplace name, use the exact name reported by `marketplace list`.

## Development

The test suite uses only Node.js built-ins:

```bash
npm test
```

It validates the manifest, marketplace, hook configuration, hook output, routing scenario schema, installer dry-runs, and required documentation.

Repository layout:

```text
plugin.json                         Portable plugin manifest
.agents/plugins/marketplace.json   Git/local marketplace catalog
hooks/                              Minimal cross-platform SessionStart hook
skills/setup/                       Installation onboarding
skills/token-efficient-orchestration/  Routing skill and references
evals/                              Behavioral scenarios and scorecard
install/                            Optional installer helpers
test/                               Dependency-free Node.js tests
```

## Limitations

- Lifecycle hooks run only where Codex has local execution access.
- Users must explicitly trust the hook; installation alone does not enable it.
- Exact per-agent token accounting depends on what the current Codex host exposes. When unavailable, the scorecard uses prompt size, output size, duplicate reads, retries, and cleanup as proxies.
- This plugin guides Codex routing. It cannot override higher-priority system, administrator, user, or repository policies.

## License

MIT

