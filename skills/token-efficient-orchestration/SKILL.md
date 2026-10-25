---
name: token-efficient-orchestration
description: Use when Codex is deciding whether to delegate codebase search or a small or medium code edit and total token use matters.
---

# Token-Efficient Orchestration

Minimize total successful-task tokens, including worker prompts, transferred context, worker output, review, retries, and cleanup.

## Stay with the primary agent

Do the work directly when any of these apply:

- One obvious edit, one direct lookup, or about three tool calls or fewer.
- The next step depends immediately on this result.
- The primary already has the relevant files and context.
- Requirements are ambiguous or the worker would need most of the conversation.
- The task involves architecture, public APIs, authentication, authorization, secrets, payments, privacy, schemas, migrations, destructive actions, or final verification.
- A delegated attempt already failed or expanded scope.

## Use a search agent

Spawn one cheap code-capable agent with low reasoning when discovery is read-only and broad across several directories, or will likely require more than four searches. Two search agents are allowed only for genuinely independent questions.

Ask for file paths, symbols, dependency edges, and evidence only. Do not ask the search agent to design or edit.

## Use an edit agent

Spawn one cheap code-capable agent with low reasoning only when the change is low-risk, reversible, independently verifiable, limited to five named files, and roughly 250 changed lines or fewer.

Give it only the objective, allowed files, constraints, exact verification check, and required output. Stop and return to the primary agent if scope expands, sensitive code appears, requirements conflict, or verification fails once.

Prefer `gpt-6-luna` when available; otherwise use the cheapest available capable model. If no meaningfully cheaper capable model exists, stay primary unless broad parallel search still clearly saves work.

Default to `balanced`. Honor explicit `economy`, `maximum-quality`, and `no-agents` requests. User and repository instructions always override this skill.

When useful, report the decision in one line: `route=<primary|search|edit> mode=<mode> reason=<short-code>`.

