---
description: Fetch a GitHub issue by number, implement a fix, and open a PR
argument-hint: <issue-number>
allowed-tools: Bash(gh issue view:*), Bash(gh pr create:*), Bash(git checkout:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(npx ng build:*), Bash(npx ng test:*), Read, Edit, Write, Grep, Glob
---

Fix GitHub issue #$1 in `ui-mumtaz/signal-forms-preview`.

1. Run `gh issue view $1` to read the issue (title, body, comments) and understand what's
   actually being asked — don't assume scope beyond what's described.
2. Create a branch off `main` named `fix/issue-$1-<short-slug>`.
3. Implement the fix, following `.claude/rules/code-style.md` and `.claude/rules/api-conventions.md`.
4. Add or update a test under the affected component's `*.spec.ts` that would have caught the bug.
5. Run `npx ng build` and `npx ng test --watch=false` — both must pass before proceeding.
6. Commit with a message that references the issue (`Fixes #$1: <summary>`), push the branch, and
   confirm with me before opening the PR (`gh pr create`) — pushing a branch and opening a PR are
   both visible, shared-state actions.
