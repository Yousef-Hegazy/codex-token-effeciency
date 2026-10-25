#!/bin/sh

set -eu

source_ref="Yousef-Hegazy/codex-token-effeciency"

if [ "${1:-}" = "--source" ]; then
  if [ -z "${2:-}" ]; then
    echo "--source requires a marketplace source" >&2
    exit 2
  fi
  source_ref="$2"
  shift 2
fi

command_text="codex plugin marketplace add $source_ref"

if [ "${1:-}" = "--dry-run" ]; then
  printf '%s\n' "$command_text"
  printf '%s\n' "Then start Codex, open /plugins, select Codex Token Efficiency, and choose Install."
  exit 0
fi

if ! command -v codex >/dev/null 2>&1; then
  printf '%s\n' "Codex CLI was not found on PATH. Install Codex, then run: $command_text" >&2
  exit 1
fi

codex plugin marketplace add "$source_ref"
printf '%s\n' "Marketplace registered. Start Codex, open /plugins, select Codex Token Efficiency, and choose Install."
printf '%s\n' "Review and trust the SessionStart hook when Codex prompts you."

