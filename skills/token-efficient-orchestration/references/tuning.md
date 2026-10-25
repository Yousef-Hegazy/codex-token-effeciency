# Modes and Tuning

| Setting | Economy | Balanced (default) | Maximum quality | No agents |
|---|---:|---:|---:|---:|
| Clear savings required | High | Moderate | Low | Delegation disabled |
| Edit file cap | 3 | 5 | 5 | 0 |
| Approximate changed-line cap | 120 | 250 | 250 | 0 |
| Default workers | 1 | 1 | 1 | 0 |
| Maximum search workers | 1 | 2 | 2 | 0 |
| Worker reasoning | Low | Low | Low or primary when justified | N/A |
| Decision logging | One line | One line | One line | One line |

## Changing defaults

An explicit user instruction changes the mode for the current task unless the user says it should persist. Repository instructions override plugin defaults. Higher-priority safety and authorization constraints always remain in force.

Tune thresholds only after observing repeated misrouting. Count total task tokens when the host exposes them. Otherwise compare prompt size, worker output size, duplicate file reads, retries, verification failures, and primary cleanup.

Do not optimize a single worker's token count while ignoring rework. The target is successful-task tokens.

