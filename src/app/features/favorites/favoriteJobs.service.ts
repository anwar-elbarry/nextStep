import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { FavoriteJobModel } from './models/favoriteJob.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteJobsService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.jsonServerUrl}/favoritesOffers`;

    getFavoritesJobs() :Observable<FavoriteJobModel[]>{
      return this.http.get<FavoriteJobModel[]>(`${this.apiUrl}`);
    }

     addFavoritesJobs(job:FavoriteJobModel){
      return this.http.post<FavoriteJobModel>(`${this.apiUrl}`,job);
    }
     removeFavoritesJobs(job:FavoriteJobModel){
      return this.http.delete<FavoriteJobModel>(`${this.apiUrl}`,{body:job});
    }
  
  }