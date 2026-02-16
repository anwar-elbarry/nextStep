import { Component, computed, inject, input } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { Store } from '@ngrx/store';
import { FavoritesOffersPage } from '../../../../core/store/actions/favoritesOffers.actions';
import { FavoriteJobReqModel } from '../../../favorites/models/favoriteJob-req.model';
import { selectIsAuthenticated, selectUserId } from '../../../../core/store/selectors/auth.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectFavoriteJobs } from '../../../../core/store/selectors/favoritesOffers.selector';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [TimeAgoPipe],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {

  private store = inject(Store);

  isauthenticated = toSignal(this.store.select(selectIsAuthenticated), { initialValue: false });

  // Reactive favorites list
  favoriteJobs = toSignal(this.store.select(selectFavoriteJobs), { initialValue: [] });

  // Computed signal to check if current job is in favorites (reactive)
  isFavorite = computed(() => {
    const favorites = this.favoriteJobs();
    const jobId = this.job()?.id;
    return favorites?.some(fav => fav.offerId === jobId) ?? false;
  });

  // Get user ID directly as a signal
  private userId = toSignal(this.store.select(selectUserId), { initialValue: '' });

  job = input<JobModel>();
  country = input<string>();
  page = input<number>();

  addToFavorites(job: JobModel) {
    // Prevent duplicate favorites
    if (this.isFavorite()) {
      console.warn('Job already in favorites');
      return;
    }
    const favoriteJob = this.transformToFavoriteJob(job);
    this.store.dispatch(FavoritesOffersPage.addToFavorites({ job: favoriteJob }));
  }

  removeFromFavorites(job: JobModel) {
    this.store.dispatch(FavoritesOffersPage.removeFromFavorites({ offerId: job.id }));
  }

  transformToFavoriteJob(job: JobModel): FavoriteJobReqModel {
    return {
      userId: this.userId(),
      offerId: job.id,
      title: job.jobTitle,
      company: job.companyName,
      location: job.location
    };
  }
}
