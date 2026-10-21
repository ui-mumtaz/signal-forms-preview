---
description: Testing conventions for this project
paths:
  - "**/*.spec.ts"
---

## Runner

Tests run on Vitest via Angular's build system (`ng test`, no separate config file to maintain).
There is no e2e framework configured — keep coverage at the unit/component level with
`TestBed`.

## Conventions

- Co-locate specs next to the file under test (`app.ts` → `app.spec.ts`).
- Prefer `TestBed.configureTestingModule({ imports: [Component] })` + `createComponent()` for
  standalone components — this project has no `NgModule`s to declare against.
- When asserting on Signal Forms state, read it the same way the template does:
  `fixture.componentInstance['appForm']().valid()`, not internal/private state. Call
  `await fixture.whenStable()` after creating the component (and after any signal update that
  should settle async validators or debounced fields) before asserting.
- Don't mock `@angular/forms/signals` — it's pure signal computation, cheap to exercise for real.
- When adding a new validator or conditional-field rule to `app.ts`'s schema, add (or extend) a
  spec that drives it through `appForm` rather than only checking it manually in the browser.
- Keep specs fast and synchronous where possible; only `await` when a real microtask/async
  boundary is involved (e.g. the simulated `submission.action` delay).

## Running

```bash
ng test --watch=false   # single run — use this one in a Claude Code session
ng test                 # watch mode while iterating locally
```
