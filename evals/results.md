# Behavioral Evaluation Results

## Baseline

Three fresh low-reasoning contexts evaluated eighteen routing scenarios without the plugin. The baseline produced four material routing failures:

- Over-delegated a one-line named edit.
- Over-delegated an exact-symbol lookup.
- Under-delegated two independent broad searches.
- Used primary reasoning for routine broad search and bounded editing.

## Post-plugin

Three fresh contexts loaded the finished skill and evaluated the same eighteen scenarios. All hard vetoes, trivial-work cases, bounded edit cases, independent broad-search cases, failure escalation, and final-verification ownership routed as intended.

The unavailable-model case was clarified during evaluation because the original phrase “bounded search” did not establish that delegation itself was worthwhile. The final scenario specifies a broad multi-directory search requiring more than four likely tool calls and an available worker cheaper than the primary.

Five fresh strong-primary routing samples evaluated that clarified case. All five selected one `SEARCH_AGENT` using low reasoning and the next available lower-cost code-capable model.

## Result

- Hard-veto route regressions: 0
- Recursive worker retries: 0
- Workers assigned to trivial edits or direct symbol lookups: 0 after the skill
- Clarified model-fallback micro-test: 5/5 expected routes

Exact account token totals were not exposed to the evaluator. Results therefore use routing decisions, context-transfer constraints, retry count, output limits, and cleanup risk as the documented proxies from `scorecard.md`.

