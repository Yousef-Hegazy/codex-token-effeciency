$context = @"
Apply the token-efficient-orchestration protocol before spawning any subagent. Default to balanced mode. Do trivial, dependent, ambiguous, high-risk, and final-verification work in the primary agent. Load the detailed routing policy only when delegation is genuinely under consideration. Explicit user and repository instructions override this protocol.
"@.Trim()

@{
    hookSpecificOutput = @{
        hookEventName = "SessionStart"
        additionalContext = $context
    }
} | ConvertTo-Json -Compress -Depth 3

