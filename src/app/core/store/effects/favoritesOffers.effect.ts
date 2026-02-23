import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FavoriteJobsService } from "../../../features/favorites/favoriteJobs.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { FavoriteJobRespModel } from "../../../features/favorites/models/favoriteJob-resp.model";
import { FavoritesOffersApi, FavoritesOffersPage } from "../actions/favoritesOffers.actions";
import { inject, Injectable } from "@angular/core";
import { AlertService } from "../../services/alert.service";

@Injectable()
export class FavoritesOffersEffects {

    private actions$ = inject(Actions);
    private favoriteJobService = inject(FavoriteJobsService);
    private alertService = inject(AlertService);

    addToFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersPage.addToFavorites),
            switchMap((action) =>
                this.favoriteJobService.addFavoritesJobs(action.job).pipe(
                    map((job: FavoriteJobRespModel) => FavoritesOffersApi.addToFavoritesSuccess({ job })),
                    catchError((err) => of(
                        FavoritesOffersApi.addToFavoritesFailure({ job: action.job, error: err.message })
                    ))
                )
            )
        )
    )

    // Show success alert after adding to favorites
    addToFavoritesSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersApi.addToFavoritesSuccess),
            tap(() => {
                this.alertService.success('Added to favorites');
            })
        ),
        { dispatch: false }
    );

    removeFromFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersPage.removeFromFavorites),
            switchMap((action) =>
                this.favoriteJobService.getFavoritesJobs().pipe(
                    switchMap((favorites) => {
                        const favoriteToRemove = favorites.find(fav => fav.offerId === action.offerId);
                        if (!favoriteToRemove) {
                            return of(FavoritesOffersApi.removeFromFavoritesFailure({
                                offerId: action.offerId,
                                error: 'Favorite not found'
                            }));
                        }
                        return this.favoriteJobService.removeFavoritesJobs(favoriteToRemove.id).pipe(
                            map((job: FavoriteJobRespModel) => FavoritesOffersApi.removeFromFavoritesSuccess({ job })),
                            catchError((error) => of(
                                FavoritesOffersApi.removeFromFavoritesFailure({ offerId: action.offerId, error: error.message })
                            ))
                        );
                    })
                )
            )
        )
    );

    // Show success alert after removing from favorites
    removeFromFavoritesSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersApi.removeFromFavoritesSuccess),
            tap(() => {
                this.alertService.success('Removed from favorites');
            })
        ),
        { dispatch: false }
    );

    loadFromFavories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersPage.loadFavorites),
            switchMap(() =>
                this.favoriteJobService.getFavoritesJobs().pipe(
                    map((jobs: FavoriteJobRespModel[]) => FavoritesOffersApi.loadFavoritesSuccess({ jobs })),
                    catchError((err) => of(
                        FavoritesOffersApi.loadFavoritesFailure({ error: err.message })
                    ))
                ))
        )
    )


}