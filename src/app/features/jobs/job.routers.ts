import { Routes } from "@angular/router";

export const jobRouter: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/job-container/job-container').then(m => m.JobContainer)
    }
];
