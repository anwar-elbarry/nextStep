import { Routes } from "@angular/router";
import { jobDetailsResolver } from "./resolvers/job-details-resolver";

export const jobRouter :Routes = [
{
    path:'',
    loadComponent: () => import('./components/job-container/job-container').then(m => m.JobContainer),
    children : [
      {
        path:'',
        loadComponent: () => import('./components/job-list/job-list').then(m => m.JobList)
      }
      ,
        {
            path: ':id',
            loadComponent: () => import('./components/job-details/job-details').then(m => m.JobDetails),
            title:'job details',
            resolve: {
                job:jobDetailsResolver
            }
        },
        {
            path:'**',
            redirectTo:'/',
            pathMatch:'full'
        }
    ]
}
];
