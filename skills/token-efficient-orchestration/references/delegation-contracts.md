# Delegation Contracts

Send only what the worker needs. Omit greetings, the full transcript, repeated rationale, and unrelated repository history.

## Search worker prompt

```text
Objective: <one concrete question>
Scope: <directories, file types, or symbols>
Constraints: read-only; do not design or edit
Evidence required: file paths, symbols, relevant line spans, dependency edges
Stop when: the question is answered or ambiguity blocks a reliable answer
Output: at most 8 bullets; no narrative preamble
```

The primary agent verifies cited locations before relying on them.

## Edit worker prompt

```text
Objective: <one bounded change>
Allowed files: <at most five named files>
Acceptance check: <exact command or observable assertion>
Constraints: no architecture, dependencies, migrations, sensitive code, or scope expansion
Stop when: scope expands, requirements conflict, or verification fails once
Output: changed files, verification command, result, and any blocker; at most 10 bullets
```

The primary agent reviews the diff and owns final verification.

## Model and reasoning

Use the least-expensive available code-capable worker at low reasoning. Do not spend another model call merely to discover a marginally cheaper model; use the host's available model metadata when already exposed.

## Context budget

Prefer direct file paths and short excerpts over copied conversation history. If the necessary transfer approaches 2,000 words, keep the task primary.

