import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FavoriteJobRespModel } from "../../../features/favorites/models/favoriteJob-resp.model";
import { FavoriteJobReqModel } from "../../../features/favorites/models/favoriteJob-req.model";

export const FavoritesOffersPage = createActionGroup({
    source: 'favorites Page',
    events: {

        'Load Favorites': emptyProps(),
        'Add To Favorites': props<{ job: FavoriteJobReqModel }>(),
        'Remove From Favorites': props<{ offerId: string }>(),

    }
});

export const FavoritesOffersApi = createActionGroup({
    source: 'favorites API',
    events: {
        // ── Loading the list ──
        'Load Favorites Success': props<{ jobs: FavoriteJobRespModel[] }>(),
        'Load Favorites Failure': props<{ error: string }>(),

        // ── Add / Remove ──
        'Add To Favorites Success': props<{ job: FavoriteJobRespModel }>(),
        'Add To Favorites Failure': props<{ job: FavoriteJobReqModel; error: string }>(),

        'Remove From Favorites Success': props<{ job: FavoriteJobRespModel }>(),
        'Remove From Favorites Failure': props<{ offerId: string; error: string }>(),
    }
})