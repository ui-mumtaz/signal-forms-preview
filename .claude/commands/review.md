---
description: Review the current diff against this repo's build, tests, and conventions
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(npx ng build:*), Bash(npx ng test:*), Read, Grep, Glob
---

Review the pending changes in this repo (`git diff` against the last commit, plus any untracked
files from `git status`) against:

1. **Correctness** — does it build (`npx ng build`) and do the tests pass
   (`npx ng test --watch=false`)?
2. **`.claude/rules/code-style.md`** — standalone components, signals, `input()`/`output()`,
   `OnPush`, native control flow, no `ngClass`/`ngStyle`.
3. **`.claude/rules/api-conventions.md`** — Signal Forms schema conventions (validator messages,
   `ctx.valueOf()` for cross-field logic, targeted submission errors) and shared-component input
   conventions.
4. **`.claude/rules/testing.md`** — new schema rules or conditional-field logic should come with
   (or extend) a spec.

Report findings grouped by severity (bug > convention violation > nit), each with a file:line
reference and a one-line fix suggestion. Don't restate the diff — only call out what's wrong or
worth reconsidering.
