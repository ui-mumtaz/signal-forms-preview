---
name: deploy
description: Deploy signal-forms-preview to GitHub Pages and verify it went live. Use when the user asks to deploy, publish, or push-and-deploy this app.
---

# Deploying signal-forms-preview

The app deploys to GitHub Pages via `.github/workflows/deploy.yml`, which runs automatically on
every push to `main` (or can be triggered manually). See `deploy-config.md` in this folder for
the exact URLs, repo, and workflow name.

## Steps

1. **Check auth** — `gh auth status`. The deploy requires an account with write access to the
   repo (pushing) and Pages write access (the workflow itself runs under `GITHUB_TOKEN`, so this
   is only about getting the commit pushed). If the wrong account is active or the token is
   invalid, stop and ask the user to run `gh auth login` themselves — this tool cannot complete
   an interactive OAuth/device-code flow.
2. **Confirm there's something to deploy** — `git status` / `git log --oneline -3` vs
   `origin/main`. If the working tree is clean and local `main` already matches `origin/main`,
   there's nothing new to push; a redeploy still needs an explicit trigger (step 4).
3. **Push** — `git push origin main`. A 403 here almost always means the authenticated `gh`
   account lacks write access — see step 1, don't retry blindly.
4. **Watch the run** — pushing to `main` triggers the workflow automatically. Confirm it started
   and watch it to completion rather than assuming success:
   ```bash
   gh run list --limit 3
   gh run watch <run-id> --exit-status
   ```
   To redeploy without a new commit (e.g. after fixing a Pages setting), trigger it manually:
   `gh workflow run deploy.yml`.
5. **If the `Setup Pages` step fails with "Get Pages site failed" / 404** — GitHub Pages isn't
   enabled on the repo yet. This is a repo settings change (makes the site publicly reachable),
   so confirm with the user before enabling it, then:
   ```bash
   gh api -X POST repos/<owner>/<repo>/pages -f "build_type=workflow"
   ```
   If that 409s with "GitHub Pages is already enabled", it likely just hadn't propagated yet —
   re-run the workflow (step 4).
6. **Verify it's actually live** — don't just trust a green checkmark:
   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" "<pages-url>"
   ```
   Expect `200`. Report the final URL back to the user.
