import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FavoriteJobRespModel } from '../../models/favoriteJob-resp.model';
import { FavoritesOffersPage } from '../../../../core/store/actions/favoritesOffers.actions';

@Component({
  selector: 'app-favorites-card',
  imports: [],
  templateUrl: './favorites-card.html',
  styleUrl: './favorites-card.css',
})
export class FavoritesCard {
  private store = inject(Store);
  private router = inject(Router);

  // Input property for favorite job data
  favorite = input<FavoriteJobRespModel>();

  // Navigate to job details page using the offerId
  getJobDetails(offerId: string) {
    const fav = this.favorite();
    if (!fav) return;

    const country = fav.location;

    this.router.navigate(['/jobs',country, offerId], {
      state: {
        country: country,
        page: 1
      }
    });
  }

  // Remove job from favorites
  removeFromFavorites(offerId: string, event: Event) {
    event.stopPropagation(); // Prevent card click navigation
    this.store.dispatch(FavoritesOffersPage.removeFromFavorites({ offerId }));
  }
}
