import { Routes } from '@angular/router';

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
    loadComponent: () => import('./features/jobs/components/job-container/job-container').then(m => m.JobContainer)
  }

];
