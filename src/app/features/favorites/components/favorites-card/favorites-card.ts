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

  // Input property for favorite job data
  favorite = input<FavoriteJobRespModel>();

  // Popup state
  showDetails = signal(false);

  // Open job details popup
  openDetails() {
    this.showDetails.set(true);
  }

  // Close job details popup
  closeDetails() {
    this.showDetails.set(false);
  }

  // Remove job from favorites
  removeFromFavorites(offerId: string, event: Event) {
    event.stopPropagation(); // Prevent card click navigation
    this.store.dispatch(FavoritesOffersPage.removeFromFavorites({ offerId }));
  }
}
