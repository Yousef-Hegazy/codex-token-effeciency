---
name: setup
description: Use when installing or configuring the Codex Token Efficiency plugin.
---

# Token Efficiency Setup

Confirm that the user has reviewed and trusted the plugin's `SessionStart` hook. Explain that the hook adds a compact routing reminder and performs no network calls, telemetry, or credential access.

Use these defaults unless the user asks to change them:

- Mode: `balanced`
- Maximum delegated workers: one
- Two workers only for genuinely independent broad searches
- Worker reasoning: low
- Worker model: cheapest available code-capable model
- `gpt-6-luna` is preferred when the host offers it
- A failed delegated verification escalates once to the primary agent

Available overrides are `economy`, `balanced`, `maximum-quality`, and `no-agents`. An explicit user override always wins.

Tell the user that disabling the plugin or declining hook trust returns Codex to its normal routing behavior.

