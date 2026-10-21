---
description: Signal Forms schema and component public-API conventions (this project has no backend REST API)
paths:
  - "src/app/**/*.ts"
---

This project has no backend/REST API. "API" here means two things: the **Signal Forms schema**
(the contract between the data model and its validation/behavior rules) and the **public inputs
of shared components**.

## Signal Forms schema (`src/app/app.ts`)

- One `form(model, schemaFn, options)` call per page/feature — don't split a single form's rules
  across multiple schema functions; it makes the validation graph hard to follow.
- Always pass a `message` to validators (`required`, `min`, `minLength`, `pattern`, …) instead of
  relying on the default `kind`-based message — the UI renders `error.message || error.kind`, so
  an unset message degrades to a raw kind string like `"required"`.
- Custom errors from `validate()`/`validateTree()` must include both `kind` (a stable, unique
  identifier) and `message` (user-facing text), e.g.
  `{ kind: 'mismatch', message: 'Passwords do not match.' }`.
- Conditional field logic (`hidden`, `disabled`, `readonly`, and `required`'s `when` option) reads
  sibling state via the `ctx.valueOf(path)` field context, not by closing over an outside signal —
  this keeps the rule reactive to the actual field tree instead of a stale snapshot.
- Prefer `applyEach()` for per-item rules on array fields over manually indexing into the array
  in the schema function.
- Submission errors returned from `submission.action` must target a field via `fieldTree:` so they
  render inline (see the `taken@example.com` example in `app.ts`) rather than only in the error
  summary.

## Shared component inputs (e.g. `field-errors.ts`)

- Use `input()`/`input.required()` — never `@Input()`.
- Name a required array input in the plural (`errors`, not `error`) and always type it as
  `readonly T[]`.
- Keep presentational components free of `@angular/forms/signals` imports beyond the types they
  render (`ValidationError`); they should accept plain signals/values, not a `FieldTree` or
  `FieldState`, so they stay reusable and easy to test in isolation.
