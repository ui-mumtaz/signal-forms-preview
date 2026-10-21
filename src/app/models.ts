/**
 * Data model for the demo application form.
 *
 * Signal Forms (`@angular/forms/signals`) works directly on top of a plain data model like this
 * one — there's no special "form value" shape to learn. A form is simply a `FieldTree` wrapped
 * around a `WritableSignal` of this interface.
 */
export interface ApplicationModel {
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
  password: string;
  confirmPassword: string;
  employment: EmploymentStatus | '';
  company: string;
  referralSource: ReferralSource | '';
  referralCode: string;
  bio: string;
  skills: string[];
  acceptTerms: boolean;
}

export type EmploymentStatus = 'employed' | 'student' | 'unemployed';

export const EMPLOYMENT_OPTIONS: ReadonlyArray<{ value: EmploymentStatus; label: string }> = [
  { value: 'employed', label: 'Employed' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Not currently working' },
];

export type ReferralSource = 'friend' | 'search' | 'social' | 'other';

export const REFERRAL_OPTIONS: ReadonlyArray<{ value: ReferralSource; label: string }> = [
  { value: 'friend', label: 'A friend referred me' },
  { value: 'search', label: 'Search engine' },
  { value: 'social', label: 'Social media' },
  { value: 'other', label: 'Other' },
];

/** Builds a fresh copy of the initial (empty) application so the form can be reset. */
export function createInitialApplication(): ApplicationModel {
  return {
    firstName: '',
    lastName: '',
    email: '',
    age: null,
    password: '',
    confirmPassword: '',
    employment: '',
    company: '',
    referralSource: '',
    referralCode: '',
    bio: '',
    skills: [''],
    acceptTerms: false,
  };
}

/** Small helper used to simulate network latency for the async submit demo. */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
