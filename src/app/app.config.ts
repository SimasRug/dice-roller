import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { DiceEffects } from './dice/dice-template/store/dice.effects';
import { diceReducer } from './dice/dice-template/store/dice.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ dice: diceReducer }),
    provideEffects([DiceEffects]),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};
