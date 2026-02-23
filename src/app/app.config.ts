import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { favoriteJobsReducer } from './core/store/reducers/favoritesOffers.reducer';
import { FavoritesOffersEffects } from './core/store/effects/favoritesOffers.effect';
import { authReducer } from './core/store/reducers/auth.reducer';
import { AuthEffects } from './core/store/effects/auth.effect';
import { alertReducer } from './core/store/reducers/alert.reducer';
import { applicationReducer } from './core/store/reducers/application.reducer';
import { ApplicationEffects } from './core/store/effects/application.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore({
      favoritesOffers: favoriteJobsReducer,
      auth: authReducer,
      alerts: alertReducer,
      applications: applicationReducer
    }),
    provideEffects(FavoritesOffersEffects, AuthEffects, ApplicationEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ]
};
