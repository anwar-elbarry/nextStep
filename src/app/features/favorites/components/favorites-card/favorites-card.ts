import { Component, computed, inject, input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { FavoriteJobRespModel } from '../../models/favoriteJob-resp.model';
import { FavoritesOffersPage } from '../../../../core/store/actions/favoritesOffers.actions';
import { FavjobDetails } from '../favjob-details/favjob-details';
import { selectAllApplications, selectApplicationById } from '../../../../core/store/selectors/application.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobModel } from '../../../jobs/models/job.model';
import { ApplicationReqModel } from '../../../applications/models/applicationReq.model';
import { selectUserId } from '../../../../core/store/selectors/auth.selectors';
import { ApplicationStatus } from '../../../applications/models/applicationStatus.enum';
import { ApplicationActions } from '../../../../core/store/actions/application.actions';

@Component({
  selector: 'app-favorites-card',
  imports: [FavjobDetails],
  templateUrl: './favorites-card.html',
  styleUrl: './favorites-card.css',
})
export class FavoritesCard {
  private store = inject(Store);

  favorite = input<FavoriteJobRespModel>();

  showDetails = signal(false);


  openDetails() {
    this.showDetails.set(true);
  }

  closeDetails() {
    this.showDetails.set(false);
  }

  // Remove job from favorites
  removeFromFavorites(offerId: string, event: Event) {
    event.stopPropagation();
    this.store.dispatch(FavoritesOffersPage.removeFromFavorites({ offerId }));
  }
}
