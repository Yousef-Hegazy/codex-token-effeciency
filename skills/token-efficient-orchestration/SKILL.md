---
name: token-efficient-orchestration
description: Use when Codex is deciding whether to delegate codebase search or a small or medium code edit, especially when minimizing total token use matters.
---

# Token-Efficient Orchestration

Minimize total tokens required for a successful task, including worker prompts, worker outputs, review, retries, and cleanup. A cheaper turn that causes rework is not efficient.

## Route work

1. Honor explicit user and repository instructions.
2. Apply the hard vetoes in [routing-policy.md](references/routing-policy.md).
3. If no veto applies, compare direct work with the search and edit thresholds.
4. Delegate only when the saved primary-agent work clearly exceeds spawn, context-transfer, output, and review overhead.
5. Emit one routing note: `route=<primary|search|edit> mode=<mode> reason=<short-code>`.

Use `balanced` unless the user selected another mode. Read [tuning.md](references/tuning.md) only when a mode or threshold must be changed.

Before spawning, use the minimal prompt and output contract in [delegation-contracts.md](references/delegation-contracts.md). Do not pass the full conversation by default.

The primary agent owns architecture, sensitive work, conflict resolution, final verification, and the final answer. One failed delegated verification escalates to the primary agent; do not recursively replace the worker unless materially new evidence changes the task.

