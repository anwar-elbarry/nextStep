import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { JobModel } from '../models/job.model';
import { JobService } from '../job.service';
import { of } from 'rxjs';

Injectable({
  providedIn: 'root'
})
export const jobDetailsResolver: ResolveFn<JobModel> = (route: ActivatedRouteSnapshot) => {

  const id = route.paramMap.get('id')!;
  const state = history.state;

  // If job data is passed through navigation state, use it directly
  if (state?.job) {
    console.log('Using job from navigation state');
    return of(state.job);
  }

  // Otherwise, fetch from API (fallback)
  const country = state?.country || 'us';
  const page = state?.page || 1;

  const jobService = inject(JobService);
  console.log('Fetching job from API:', id, country, page);
  return jobService.getJob(id, { country, page });

};
