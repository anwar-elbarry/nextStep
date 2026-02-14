import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FavoriteJobsService } from "../../../features/favorites/favoriteJobs.service";
import { catchError, map, of, switchMap } from "rxjs";
import { FavoriteJobModel } from "../../../features/favorites/models/favoriteJob.model";
import { FavoritesOffersApi, FavoritesOffersPage } from "../actions/favoritesOffers.actions";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class FavoritesOffersEffects {

    private actions$ = inject(Actions);
    private favoriteJobService = inject(FavoriteJobsService);

    addToFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersPage.addToFavorites),
            switchMap((action) =>
                this.favoriteJobService.addFavoritesJobs(action.job).pipe(
                    map((job: FavoriteJobModel) => FavoritesOffersApi.addToFavoritesSuccess({ job })),
                    catchError((err) => of(
                        FavoritesOffersApi.addToFavoritesFailure({ job: action.job, error: err.message })
                    ))
                )
            )
        )
    )

    removeFromFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersPage.removeFromFavorites),
            switchMap((action) =>
                this.favoriteJobService.removeFavoritesJobs(action.job).pipe(
                    map((job: FavoriteJobModel) => FavoritesOffersApi.removeFromFavoritesSuccess({ job })),
                    catchError((error) => of(
                        FavoritesOffersApi.removeFromFavoritesFailure({ job: action.job, error: error.message })
                    ))
                )
            )
        )
    );

    loadFromFavories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesOffersPage.loadFavorites),
            switchMap(() =>
                this.favoriteJobService.getFavoritesJobs().pipe(
                    map((jobs: FavoriteJobModel[]) => FavoritesOffersApi.loadFavoritesSuccess({ jobs })),
                    catchError((err) => of(
                        FavoritesOffersApi.loadFavoritesFailure({ error: err.message })
                    ))
                ))
        )
    )


}