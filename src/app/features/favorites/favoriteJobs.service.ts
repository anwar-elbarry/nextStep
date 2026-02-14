import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { FavoriteJobRespModel } from './models/favoriteJob-resp.model';
import { FavoriteJobReqModel } from './models/favoriteJob-req.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteJobsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.jsonServerUrl}/favoritesOffers`;

  getFavoritesJobs(): Observable<FavoriteJobRespModel[]> {
    return this.http.get<FavoriteJobRespModel[]>(`${this.apiUrl}`);
  }

  addFavoritesJobs(job: FavoriteJobReqModel): Observable<FavoriteJobRespModel> {
    return this.http.post<FavoriteJobRespModel>(`${this.apiUrl}`, job);
  }
  removeFavoritesJobs(id: string): Observable<FavoriteJobRespModel> {
    return this.http.delete<FavoriteJobRespModel>(`${this.apiUrl}/${id}`);
  }

}