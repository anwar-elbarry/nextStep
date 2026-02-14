import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { favoriteJobsReducer } from './core/store/reducers/favoritesOffers.reducer';
import { provideEffects } from '@ngrx/effects';
import { FavoritesOffersEffects } from './core/store/effects/favoritesOffers.effect';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./features/auth/components/register/register').then(m => m.Register)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login').then(m => m.Login)
  },{
    path: 'jobs',
    loadChildren: () => import('./features/jobs/job.routers').then(m => m.jobRouter)
  },{
    path: 'favorites',
    loadComponent: () => import('./features/favorites/components/favorites-list/favorites-list').then(m => m.FavoritesList),

    // providers: [
    //   provideState('favoritesOffers',favoriteJobsReducer),
    //   provideEffects(FavoritesOffersEffects)
    // ]
  }
];
