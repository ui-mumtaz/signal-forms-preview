import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideSignalFormsConfig } from '@angular/forms/signals';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Automatically toggle status classes on every element bound via `[formField]`, based on its
    // reactive `FieldState` — no manual `[class.x]` bindings needed in the template.
    provideSignalFormsConfig({
      classes: {
        'sf-invalid': (binding) => binding.state().invalid() && binding.state().touched(),
        'sf-valid': (binding) => binding.state().valid() && binding.state().touched(),
        'sf-touched': (binding) => binding.state().touched(),
        'sf-disabled': (binding) => binding.state().disabled(),
      },
    }),
  ],
};
