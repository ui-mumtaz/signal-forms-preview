import { Component, input } from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';

/**
 * Renders the list of validation errors for a single field.
 *
 * Signal Forms reports errors as plain `ValidationError` objects (`{ kind, message, ... }`), so
 * any UI — this tiny component included — can decide how to present them.
 */
@Component({
  selector: 'app-field-errors',
  template: `
    @if (shouldShow()) {
      <ul class="field-errors">
        @for (error of errors(); track error.kind) {
          <li>{{ error.message || error.kind }}</li>
        }
      </ul>
    }
  `,
  styles: `
    .field-errors {
      margin: 0.25rem 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .field-errors li {
      color: var(--color-danger);
      font-size: 0.8rem;
      line-height: 1.3;
    }
  `,
})
export class FieldErrors {
  readonly errors = input.required<readonly ValidationError[]>();
  readonly touchedOnly = input(true);
  readonly touched = input(false);

  protected shouldShow(): boolean {
    if (this.errors().length === 0) {
      return false;
    }
    return !this.touchedOnly() || this.touched();
  }
}
