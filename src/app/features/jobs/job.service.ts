import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {map, Observable} from 'rxjs';
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

    const preview = plainText.length > 150
      ? plainText.substring(0, 150) + '...'
      : plainText;
    return {
      jobTitle: job.title,
      companyName: job.company_name,
      location: job.location,
      publicationDate: new Date(job.created_at * 1000).toLocaleDateString(),
      description: job.description,
      descriptionPreview:preview,
      fullOfferLink: job.url,
      salary: job.salary || 'Not specified'
    };
}
}
