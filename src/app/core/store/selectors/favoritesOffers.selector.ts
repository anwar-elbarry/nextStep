import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesJobsState } from '../reducers/favoritesOffers.reducer';

export const selectFavoritesJobsState = createFeatureSelector<FavoritesJobsState>('favoriteJobs');

export const selectFavoriteJobs = createSelector(
  selectFavoritesJobsState,
  (state) => state.jobs
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesJobsState,
  (state) => state.isLoading
);

export const selectFavoritesError = createSelector(
  selectFavoritesJobsState,
  (state) => state.error
);