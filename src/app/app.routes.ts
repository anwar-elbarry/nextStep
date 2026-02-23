import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/components/register/register').then(m => m.Register)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login').then(m => m.Login)
  }, {
    path: 'jobs',
    loadChildren: () => import('./features/jobs/job.routers').then(m => m.jobRouter)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/components/favorites-list/favorites-list').then(m => m.FavoritesList),
    canActivate: [authGuard]
  },{
    path: 'applications',
    loadComponent: () => import('./features/applications/components/application-list/application-list.component').then(m => m.ApplicationListComponent),
    canActivate: [authGuard]
  }
];
