#!/usr/bin/env bash
# PreToolUse hook for the Bash tool. Reads the tool-call JSON from stdin and blocks a small
# denylist of destructive patterns specific to this repo, on top of (not instead of) the
# model's own judgment and the user's own confirmation prompts.
#
# Wired up in .claude/settings.json under hooks.PreToolUse (matcher: "Bash").
# Exit 0 = allow. Exit 2 = block (stderr message is surfaced back to the model).

set -euo pipefail

input="$(cat)"

command="$(printf '%s' "$input" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(.*\)".*/\1/p' | head -n1)"

if [ -z "$command" ]; then
  exit 0
fi

deny_patterns=(
  'rm[[:space:]]+-rf[[:space:]]+/[[:space:]]*$'
  'git[[:space:]]+push[[:space:]]+.*--force'
  'git[[:space:]]+reset[[:space:]]+--hard'
  'git[[:space:]]+clean[[:space:]]+-[a-zA-Z]*f'
  '>[[:space:]]*\.env($|[^a-zA-Z0-9_])'
  'gh[[:space:]]+auth[[:space:]]+logout'
)

for pattern in "${deny_patterns[@]}"; do
  if printf '%s' "$command" | grep -Eq "$pattern"; then
    echo "Blocked by .claude/hooks/validate-bash.sh: command matches denylist pattern '$pattern'. If this is genuinely intended, ask the user to run it themselves." >&2
    exit 2
  fi
done

exit 0
