# Routing Policy

## Core decision

Stay primary unless delegation has a clear positive token return after counting the worker prompt, duplicated context, worker response, review, retries, and cleanup.

Apply hard vetoes first. If none apply, use the routing table.

| Route | Use when | Do not use when |
|---|---|---|
| Primary | The work is trivial, dependent, ambiguous, sensitive, cross-cutting, destructive, already loaded, or final verification | A genuinely broad independent search or bounded edit clearly saves primary context |
| Search worker | The search surface is unknown across several directories, two independent code questions exist, or discovery will likely take more than four tool calls | The exact file or symbol is known, one direct search is enough, or the result is immediately required for a short next step |
| Edit worker | The change is low-risk, reversible, independently verifiable, at most five named files, and roughly 250 changed lines or fewer | Scope is unclear, files overlap another worker, verification is unavailable, or a hard veto applies |

## Hard vetoes

Keep the task with the strongest primary agent if any condition is true:

- Security, authentication, authorization, secrets, payments, privacy, or destructive behavior is involved.
- The task determines architecture, public APIs, schemas, migrations, or broad state behavior.
- Requirements are materially ambiguous.
- The worker would need most of the conversation or more than about 2,000 words of transferred context.
- The next action depends on an unresolved result.
- The primary agent already has the exact files and relevant context loaded.
- The work is one obvious edit, one direct lookup, or about three tool calls or fewer.
- Verification cost or cleanup risk would erase expected savings.
- A delegated attempt already failed, expanded scope, or returned uncertain evidence.

## Concurrency

Use one worker by default. Use two only for independent broad searches whose results can be combined without either worker seeing the other's output. Never let edit workers touch overlapping files.

## Worker selection

Choose the cheapest available code-capable model and low reasoning. Prefer `gpt-6-luna` when present. If it is unavailable, select the nearest lower-cost capable model exposed by the host. If no meaningfully cheaper capable model exists, stay primary unless parallel search savings still clearly exceed orchestration overhead.

## Escalation

The worker stops and returns evidence when it reaches sensitive code, exceeds five files or roughly 250 changed lines, lacks a verification check, encounters conflicting requirements, or fails verification once. The primary agent resumes from that evidence. Do not spawn an identical replacement without materially new evidence.

