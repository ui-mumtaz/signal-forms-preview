import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  applyEach,
  debounce,
  disabled,
  email,
  form,
  hidden,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';

import { FieldErrors } from './field-errors';
import {
  ApplicationModel,
  EMPLOYMENT_OPTIONS,
  REFERRAL_OPTIONS,
  createInitialApplication,
  wait,
} from './models';

/**
 * A guided tour of `@angular/forms/signals` ("Signal Forms") — the experimental, signal-first
 * replacement for Angular's template-driven and reactive forms.
 *
 * The whole form is just a plain signal (`model`) plus a `FieldTree` (`appForm`) built around it
 * with `form(...)`. There is no `FormGroup`, no `FormControl`, and no module to import — the
 * schema function below is the single source of truth for every validation and behavior rule.
 */
@Component({
  selector: 'app-root',
  imports: [FormField, FormRoot, FieldErrors, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly employmentOptions = EMPLOYMENT_OPTIONS;
  protected readonly referralOptions = REFERRAL_OPTIONS;

  /** The one and only source of truth for the form's data. */
  protected readonly model = signal<ApplicationModel>(createInitialApplication());

  /** Tracks the outcome of the last submit attempt, purely for the demo's status banner. */
  protected readonly submitState = signal<'idle' | 'success' | 'error'>('idle');

  /**
   * `form()` wraps the model signal in a `FieldTree`. The second argument is a schema function
   * that receives that same tree and attaches logic (validation, visibility, disabling, …) to
   * any path within it. Nothing here mutates the model directly — it only describes rules that
   * are evaluated reactively whenever the relevant values change.
   */
  protected readonly appForm = form(
    this.model,
    (f) => {
      required(f.firstName, { message: 'First name is required.' });
      minLength(f.firstName, 2, { message: 'Use at least 2 characters.' });

      required(f.lastName, { message: 'Last name is required.' });

      required(f.email, { message: 'Email is required.' });
      email(f.email, { message: 'Enter a valid email address.' });

      required(f.age, { message: 'Age is required.' });
      min(f.age, 18, { message: 'You must be at least 18 years old.' });
      max(f.age, 100, { message: 'Enter a realistic age.' });

      required(f.password, { message: 'Password is required.' });
      minLength(f.password, 8, { message: 'Use at least 8 characters.' });
      pattern(f.password, /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Mix uppercase, lowercase and a number.',
      });

      required(f.confirmPassword, { message: 'Please confirm your password.' });
      // Cross-field validation: read a sibling field's value through the field context.
      validate(f.confirmPassword, (ctx) => {
        const confirmed = ctx.value();
        const original = ctx.valueOf(f.password);
        return confirmed.length > 0 && confirmed !== original
          ? { kind: 'mismatch', message: 'Passwords do not match.' }
          : undefined;
      });

      required(f.employment, { message: 'Select your employment status.' });

      // `company` only exists, visually and logically, when the applicant is employed.
      hidden(f.company, { when: (ctx) => ctx.valueOf(f.employment) !== 'employed' });
      required(f.company, {
        message: 'Company name is required when employed.',
        when: (ctx) => ctx.valueOf(f.employment) === 'employed',
      });

      required(f.referralSource, { message: 'Let us know how you heard about us.' });

      // `referralCode` stays visible but is disabled (with a reason) unless it's relevant.
      disabled(f.referralCode, {
        when: (ctx) =>
          ctx.valueOf(f.referralSource) !== 'friend' && 'Only needed when a friend referred you',
      });

      maxLength(f.bio, 280, { message: 'Keep your bio under 280 characters.' });
      // Delay applying UI updates to the model until 400ms after the user stops typing.
      debounce(f.bio, 400);

      minLength(f.skills, 1, { message: 'Add at least one skill.' });
      maxLength(f.skills, 5, { message: 'You can list at most 5 skills.' });
      applyEach(f.skills, (skill) => {
        required(skill, { message: 'Skill cannot be empty.' });
        minLength(skill, 2, { message: 'Use at least 2 characters.' });
      });

      required(f.acceptTerms, { message: 'You must accept the terms to continue.' });
    },
    {
      name: 'application',
      submission: {
        // `submit()` only calls this once every synchronous validator is passing. Any errors it
        // returns are merged back onto the targeted field, just like a real server response.
        action: async (field) => {
          this.submitState.set('idle');
          await wait(1000);

          const value = field().value();
          if (value.email.trim().toLowerCase() === 'taken@example.com') {
            this.submitState.set('error');
            return [
              {
                fieldTree: field.email,
                kind: 'server',
                message: 'This email is already registered.',
              },
            ];
          }

          this.submitState.set('success');
          return undefined;
        },
      },
    },
  );

  protected addSkill(): void {
    this.appForm.skills().value.update((skills) => [...skills, '']);
  }

  protected removeSkill(index: number): void {
    this.appForm.skills().value.update((skills) => skills.filter((_, i) => i !== index));
  }

  protected resetForm(): void {
    this.model.set(createInitialApplication());
    this.submitState.set('idle');
  }
}
