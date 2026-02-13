import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FavoriteJobModel } from "../../../features/favorites/models/favoriteJob.model";

export const FavoritesOffersPage = createActionGroup({
    source: 'favorites Page',
    events: {
    
    'Load Favorites': emptyProps(),
    'Add To Favorites': props<{ job: FavoriteJobModel }>(),
    'Remove From Favorites': props<{ job: FavoriteJobModel }>(),

    }
});

export const FavoritesOffersApi = createActionGroup({
    source: 'favorites API',
    events: {
        // ── Loading the list ──
    'Load Favorites Success': props<{ jobs: FavoriteJobModel[] }>(),
    'Load Favorites Failure': props<{ error: string }>(),

    // ── Add / Remove ──
    'Add To Favorites Success': props<{ job: FavoriteJobModel }>(),
    'Add To Favorites Failure': props<{ job: FavoriteJobModel; error: string }>(),

    'Remove From Favorites Success': props<{ job: FavoriteJobModel }>(),
    'Remove From Favorites Failure': props<{ job: FavoriteJobModel; error: string }>(),
    }
})