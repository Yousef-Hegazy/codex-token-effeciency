[CmdletBinding()]
param(
    [switch]$DryRun,
    [string]$Source = "Yousef-Hegazy/codex-token-effeciency"
)

$commandText = "codex plugin marketplace add $Source"

if ($DryRun) {
    Write-Output $commandText
    Write-Output "Then start Codex, open /plugins, select Codex Token Efficiency, and choose Install."
    exit 0
}

$codex = Get-Command codex -ErrorAction SilentlyContinue
if (-not $codex) {
    Write-Error "Codex CLI was not found on PATH. Install Codex, then run: $commandText"
    exit 1
}

& $codex.Source plugin marketplace add $Source
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Output "Marketplace registered. Start Codex, open /plugins, select Codex Token Efficiency, and choose Install."
Write-Output "Review and trust the SessionStart hook when Codex prompts you."

