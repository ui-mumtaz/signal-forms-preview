---
description: Angular and TypeScript code style for this project
paths:
  - "**/*.ts"
  - "**/*.html"
---

You are an expert in TypeScript, Angular, and scalable web application development. Write
maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid `any`; use `unknown` when a type is genuinely uncertain.

## Angular

- Always use standalone components over NgModules.
- Do NOT set `standalone: true` inside `@Component`/`@Directive` decorators — it's the default.
- Use signals for state management.
- Do NOT use `@HostBinding`/`@HostListener`; put host bindings in the `host` object of the
  `@Component`/`@Directive` decorator instead.
- Use `NgOptimizedImage` for static images (it does not work for inline base64 images).

## Components

- Keep components small and focused on a single responsibility.
- Use `input()` / `output()` / `model()` functions instead of `@Input()`/`@Output()` decorators.
- Use `computed()` for derived state.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on every `@Component`.
- Prefer inline templates only for genuinely small components; this project's main form uses a
  separate `templateUrl` because the template is substantial.
- This project uses **Signal Forms** (`@angular/forms/signals`), not classic Reactive Forms
  (`@angular/forms` `FormGroup`/`FormControl`) or template-driven forms — see
  `api-conventions.md` for the schema conventions. Don't introduce `ReactiveFormsModule` or
  `FormsModule`.
- Do NOT use `ngClass`; use `class` bindings instead (note: `provideSignalFormsConfig()`'s
  `classes` option is the one sanctioned exception — it drives classes from field state, see
  `src/app/app.config.ts`).
- Do NOT use `ngStyle`; use `style` bindings instead.

## State management

- Use signals for local component state.
- Use `computed()` for derived state.
- Keep state transformations pure and predictable.
- Do NOT call `.mutate()` on signals; use `.update()` or `.set()` instead.

## Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the async pipe to handle observables.

## Services

- Design services around a single responsibility.
- Use `providedIn: 'root'` for singleton services.
- Use the `inject()` function instead of constructor injection.
