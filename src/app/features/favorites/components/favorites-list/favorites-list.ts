import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoriteJobs, selectFavoritesError, selectFavoritesLoading } from '../../../../core/store/selectors/favoritesOffers.selector';
import { FavoritesOffersPage } from '../../../../core/store/actions/favoritesOffers.actions';
import { AsyncPipe } from '@angular/common';
import { FavoritesCard } from "../favorites-card/favorites-card";

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [AsyncPipe, FavoritesCard],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.css',
})
export class FavoritesList implements OnInit {
  private store = inject(Store);

  jobs$ = this.store.select(selectFavoriteJobs);
  loading$ = this.store.select(selectFavoritesLoading);
  error$ = this.store.select(selectFavoritesError);

  ngOnInit() {
    this.store.dispatch(FavoritesOffersPage.loadFavorites());
  }
}
