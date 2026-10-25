# Routing Evaluation Scorecard

Score each scenario from `0` to `2` on each dimension.

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Route | Wrong route | Correct route with unnecessary agent | Exact expected route and agent count |
| Model/effort | Stronger than necessary | Low-cost model or low reasoning, but not both | Cheapest capable model with low reasoning |
| Context | Full transcript or unbounded | Relevant context with avoidable detail | Objective, scope, constraints, check, output contract only |
| Output | Unbounded narrative | Mostly useful with excess prose | Contract-shaped, bounded evidence |
| Escalation | Retries or expands scope | Stops but loses useful evidence | Stops once and returns concise evidence to primary |

## Gates

- Every hard-veto scenario must receive full credit for Route and Escalation.
- No scenario may exceed two workers.
- Aggregate post-plugin score must exceed the no-guidance baseline.
- Token comparison uses actual host usage when exposed; otherwise use prompt and output token estimates plus retry and cleanup counts.

