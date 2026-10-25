$context = "Apply token-efficient-orchestration before spawning subagents. Default to balanced. Keep trivial, dependent, ambiguous, sensitive, destructive, architectural, and final-verification work primary. User and repository instructions override."

@{
    hookSpecificOutput = @{
        hookEventName = "SessionStart"
        additionalContext = $context
    }
} | ConvertTo-Json -Compress -Depth 3

