import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FavoriteJobRespModel } from './models/favoriteJob-resp.model';
import { FavoriteJobReqModel } from './models/favoriteJob-req.model';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../core/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class FavoriteJobsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.jsonServerUrl}/favoritesOffers`;
  private store = inject(Store);

  getFavoritesJobs(): Observable<FavoriteJobRespModel[]> {
    return this.store.select(selectUserId).pipe(
      take(1),
      switchMap(userId =>
        this.http.get<FavoriteJobRespModel[]>(`${this.apiUrl}?userId=${userId}`)
      )
    );
  }

  addFavoritesJobs(job: FavoriteJobReqModel): Observable<FavoriteJobRespModel> {
    return this.http.post<FavoriteJobRespModel>(`${this.apiUrl}`, job);
  }
  removeFavoritesJobs(id: string): Observable<FavoriteJobRespModel> {
    return this.http.delete<FavoriteJobRespModel>(`${this.apiUrl}/${id}`);
  }

}