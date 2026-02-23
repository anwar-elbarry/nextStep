import { Component, inject, input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { FavoriteJobRespModel } from '../../models/favoriteJob-resp.model';
import { FavoritesOffersPage } from '../../../../core/store/actions/favoritesOffers.actions';
import { FavjobDetails } from '../favjob-details/favjob-details';

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
