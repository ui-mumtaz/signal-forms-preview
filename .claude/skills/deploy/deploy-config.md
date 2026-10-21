# Deploy configuration reference

| | |
|---|---|
| Repo | `ui-mumtaz/signal-forms-preview` |
| Deploy branch | `main` |
| Workflow file | `.github/workflows/deploy.yml` |
| Workflow name | `Deploy to GitHub Pages` |
| Pages build type | `workflow` (GitHub Actions source, not a legacy branch deploy) |
| Build output | `dist/signal-forms-preview/browser` |
| Base href used at build time | `/${{ github.event.repository.name }}/` (resolves to `/signal-forms-preview/`) |
| Live URL | https://ui-mumtaz.github.io/signal-forms-preview/ |

## Jobs in the workflow

1. `build` — checkout, Node 22, `npm ci --legacy-peer-deps`, `ng build --base-href ...`,
   `actions/configure-pages`, `actions/upload-pages-artifact`.
2. `deploy` — `actions/deploy-pages`, depends on `build`, runs in the `github-pages` environment.

## Known gotchas

- `npm ci` (and `npm install`) need `--legacy-peer-deps` on this dependency graph — without it,
  npm's arborist throws `Cannot read properties of null (reading 'edgesOut')`. This is a known
  npm bug, not something to "fix" by changing dependency versions.
- If `Setup Pages` fails with a 404 "Get Pages site failed", Pages has never been enabled on the
  repo — see `SKILL.md` step 5.
- The repo's remote has required re-authenticating `gh`/`git` to the correct account
  (`ui-mumtaz`) before pushes succeed — a 403 on push means the wrong account is active locally.
