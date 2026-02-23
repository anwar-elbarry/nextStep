import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ApplicationModel } from '../models/applicationResp.model';
import { ApplicationReqModel } from '../models/applicationReq.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
       private readonly http = inject(HttpClient);
       private readonly baseUrl = `${environment.jsonServerUrl}/applications`;

       public getApplications() {
        return this.http.get<ApplicationModel[]>(this.baseUrl);
       }

       public addApplication(applicationReq: ApplicationReqModel) {
        return this.http.post<ApplicationModel>(this.baseUrl, applicationReq);
       }

       public updateApplication(applicationId: string, applicationReq: ApplicationReqModel) {
        return this.http.put<ApplicationModel>(`${this.baseUrl}/${applicationId}`, applicationReq);
       }

       public deleteApplication(applicationId: string) {
        return this.http.delete<ApplicationModel>(`${this.baseUrl}/${applicationId}`);
       }
}
