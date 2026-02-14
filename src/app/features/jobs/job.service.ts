import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JobModel } from './models/job.model';
import { countryModel } from './models/country.model';

interface adzounaResponse {
  results: JobModel[];
  count: number;
  TotalPages: number;
}


@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly http = inject(HttpClient);
  private adzouna = `${environment.adzouna}`;
  private adzunaCountries = `${environment.jsonServerUrl}/countries`;

  getJobs(pathVariables: { country: string, page: number }, params: any = {}): Observable<adzounaResponse> {


    params.app_id = '95749ce0';
    params.app_key = 'a515d9f2db46ed9ad7144f18164a9ea1';


    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      httpParams = httpParams.set(key, params[key]);
    });

    const url = `${this.adzouna}/jobs/${pathVariables.country}/search/${pathVariables.page}`;

    return this.http.get<adzounaResponse>(url, { params }).pipe(
      map((response: any) => {
        const totalPages = Math.ceil(response.count / 10);
        const jobs = response.results.map((job: any) => this.transformToModel(job));
        return {
          TotalPages: totalPages,
          results: jobs,
          count: response.count
        };
      }),
    );
  }
  private transformToModel(job: any): JobModel {
    if (!job) {
      throw new Error('Job data is undefined - job may not exist in the specified page/country');
    }

    return {
      id: job.id,
      jobTitle: job.title,
      companyName: job.company.display_name,
      location: job.location.display_name,
      publicationDate: job.created,
      description: job.description,
      descriptionPreview: job.description,
      fullOfferLink: job.redirect_url,
      salary: job.salary_min || 'Not specified'
    };
  }

  getJob(id: string, pathVariables: { country: string, page: number }, params: any = {}): Observable<JobModel> {
    params.app_id = '95749ce0';
    params.app_key = 'a515d9f2db46ed9ad7144f18164a9ea1';


    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      httpParams = httpParams.set(key, params[key]);
    });
    const url = `${this.adzouna}/jobs/${pathVariables.country}/search/${pathVariables.page}`;

    return this.http.get<adzounaResponse>(url, { params }).pipe(
      map(respose => {
        const found = respose.results.find(job => job.id === id);
        return this.transformToModel(found);
      }),
      catchError(err => {
        console.error('Error fetching job:', err);
        return throwError(() => new Error('Failed to load job details'));
      })
    )
  }

  getCountries(): Observable<countryModel[]> {
    return this.http.get<countryModel[]>(this.adzunaCountries);
  }
}
