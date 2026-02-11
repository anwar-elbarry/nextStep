import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {catchError, filter, find, map, Observable, throwError} from 'rxjs';
import {JobModel} from './models/job.model';

interface ArbetNowResponse {
  data: any[];
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly http = inject(HttpClient);
  private usaJobs = `${environment.usaJobs}`;
  private arbitNow = `${environment.arbetNow}`;
  private themuse = `${environment.themuse}`;

  getArbetNowJobs(): Observable<JobModel[]> {
    return this.http.get<ArbetNowResponse>(this.arbitNow).pipe(
      map((response: ArbetNowResponse) => response.data.map(job => this.transformToModel(job)))
    );
  }
  private transformToModel(job: any): JobModel {
    const plainText = job.description.replace(/<[^>]*>/g, '');
    return {
      id:job.slug,
      jobTitle: job.title,
      companyName: job.company_name,
      location: job.location,
      publicationDate: new Date(job.created_at * 1000).toLocaleDateString(),
      description: job.description,
      descriptionPreview:plainText,
      fullOfferLink: job.url,
      salary: job.salary || 'Not specified'
    };
}

  getJob(id:string): Observable<JobModel> {
   return this.http.get<ArbetNowResponse>(this.arbitNow).pipe(
     map(respose => {
      const found = respose.data.find(job => job.slug === id);
        console.log(id);
      return this.transformToModel(found);
     }),
     catchError(err => {
        console.error('Error fetching job:', err);
        return throwError(() => new Error('Failed to load job details'));
      })
   )
  }
}
