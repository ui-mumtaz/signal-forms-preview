# signal-forms-preview

## Overview

A demo of Angular's experimental, signal-first forms API (`@angular/forms/signals`), built on
Angular 22. A single application form exercises most of the API: validators, cross-field
validation, conditional visibility/disabling, dynamic arrays, debounce, automatic status classes,
and async submission with server-error targeting. See `README.md` for the full feature list.

## Stack

- Angular 22 (standalone components, zoneless — no `zone.js` dependency)
- `@angular/forms/signals` ("Signal Forms", developer preview)
- Vitest for unit tests
- Plain CSS (no UI framework)
- Deployed to GitHub Pages via `.github/workflows/deploy.yml`

## Commands

```bash
npm install --legacy-peer-deps   # npm's arborist hits a bug on this repo's deps otherwise
ng serve                          # dev server, http://localhost:4200
ng build                          # production build -> dist/signal-forms-preview/browser
ng test                           # Vitest unit tests
```

## Key files

- `src/app/app.ts` — the Signal Forms schema (`form()` + validators) and component class.
- `src/app/app.html` — the form template and the live state inspector panel.
- `src/app/app.config.ts` — `provideSignalFormsConfig()` automatic status classes.
- `src/app/models.ts` — the `ApplicationModel` data shape and option lists.
- `src/app/field-errors.ts` — small reusable `<app-field-errors>` component.

## Conventions

See `.claude/rules/` for enforced conventions:
- `code-style.md` — Angular/TypeScript style rules.
- `testing.md` — how tests in this repo are structured.
- `api-conventions.md` — Signal Forms schema and component public-API conventions.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages at https://ui-mumtaz.github.io/signal-forms-preview/. See
`.claude/skills/deploy/SKILL.md` to drive a deploy from a session.

## Notes for Claude

- This repo's npm install requires `--legacy-peer-deps` (a known `npm`/arborist bug with this
  dependency graph, not a project misconfiguration) — don't try to "fix" the peer deps.
- Signal Forms is a brand-new, developer-preview API. Prefer checking the installed
  `node_modules/@angular/forms/types/signals*.d.ts` (or `.claude/rules/api-conventions.md`) over
  assuming behavior from reactive/template-driven forms.
- Don't commit real credentials, tokens, or personal data — see `.mcp.json` for how external
  tool credentials are expected to be supplied (env vars, never inline).
