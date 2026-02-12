import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {JobModel} from '../models/job.model';
import { JobService } from '../job.service';

Injectable({
  providedIn: 'root'
})
export const jobDetailsResolver: ResolveFn<JobModel> = (route:ActivatedRouteSnapshot) => {

  const id  = route.paramMap.get('id')!;
  const state = history.state;
  const country = state?.country || 'us';
  const page = state?.page || 1;
  
  const jobService = inject(JobService);
  console.log(id,country,page);
  return jobService.getJob(id,{country,page});

};
