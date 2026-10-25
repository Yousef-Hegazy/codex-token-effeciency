# Codex Token Efficiency

A small Codex-only plugin that discourages wasteful subagent spawning and uses cheaper, low-reasoning workers only when they are likely to reduce total task tokens.

This repository is the installation source. It is not intended for submission to the official plugin directory.

## Install from this Git repository

Register the repository as a Codex plugin source:

```bash
codex plugin marketplace add Yousef-Hegazy/codex-token-effeciency
```

Then:

1. Start Codex.
2. Open `/plugins`.
3. Select **Codex Token Efficiency** and install it.
4. Open `/hooks` and trust the plugin's `SessionStart` hook.
5. Start a new chat.

The repository catalog at `.agents/plugins/marketplace.json` is only the mechanism Codex uses to install the plugin from GitHub. It does not publish the plugin to an official marketplace.

## What it does

- Keeps trivial, dependent, ambiguous, sensitive, destructive, architectural, and final-verification work with the primary agent.
- Uses a low-reasoning search agent for genuinely broad, independent codebase discovery.
- Uses a low-reasoning edit agent for clear, low-risk changes limited to five files.
- Avoids delegation when transferring context and reviewing the answer would cost as much as doing the task directly.
- Escalates to the primary agent after one failed delegated verification instead of repeatedly spawning replacements.

The default mode is `balanced`. You can say `economy`, `maximum-quality`, or `no-agents` in your prompt to override it.

## Token-use expectation

The startup hook is intentionally short. The routing skill is considered only when Codex is deciding whether to delegate. Documentation and repository files are not added to every prompt.

Actual savings depend on the task and the models available to Codex. Small tasks may see little or no benefit; the plugin is most useful when it prevents unnecessary strong-agent exploration or editing.

## Remove

Uninstall or disable the plugin from `/plugins`, then remove the Git source if desired:

```bash
codex plugin marketplace remove codex-token-effeciency
```

Use the exact source name shown by `codex plugin marketplace list` if Codex assigns a different name.

## Privacy

The plugin has no MCP server, API key, telemetry, network service, or credential access. Its hook only adds a short routing instruction.

## Copyright

Copyright © 2026 Yousef Hegazy. All rights reserved. No open-source license is granted. Redistribution, resale, or commercial use requires the author's written permission.

