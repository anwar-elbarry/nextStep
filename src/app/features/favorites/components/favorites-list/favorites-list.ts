import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoriteJobs, selectFavoritesError, selectFavoritesLoading } from '../../../../core/store/selectors/favoritesOffers.selector';
import { FavoritesOffersPage } from '../../../../core/store/actions/favoritesOffers.actions';

@Component({
  selector: 'app-favorites-list',
  imports: [],
  standalone:true,
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.css',
})
export class FavoritesList implements OnInit{
      private store = inject(Store);

        jobs$ = this.store.select(selectFavoriteJobs);
        loading$  = this.store.select(selectFavoritesLoading);
        error$ = this.store.select(selectFavoritesError);
    ngOnInit() {
        this.store.dispatch(FavoritesOffersPage.loadFavorites());
        console.log(this.jobs$);
    }
}
