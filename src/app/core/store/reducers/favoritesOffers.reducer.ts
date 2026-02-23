import { createReducer, on } from "@ngrx/store";
import { FavoritesOffersApi, FavoritesOffersPage } from "../actions/favoritesOffers.actions";
import { FavoriteJobRespModel } from "../../../features/favorites/models/favoriteJob-resp.model";

export interface FavoritesJobsState {
    isLoading: boolean;
    jobs: FavoriteJobRespModel[];
    error: string | null;
}

export const initialState: FavoritesJobsState = {
    isLoading: false,
    jobs: [],
    error: '',
};

export const favoriteJobsReducer = createReducer(
    initialState,
    // ── Load Favorites ──
    on(FavoritesOffersPage.loadFavorites, (state) => ({
        ...state,
        isLoading: true,
        error: '',
    })),
    on(FavoritesOffersApi.loadFavoritesSuccess, (state, action) => ({
        ...state,
        jobs: action.jobs,
        isLoading: false,
        error: '',
    })),
    on(FavoritesOffersApi.loadFavoritesFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error,
    })),

    // ── Add To Favorites ──
    on(FavoritesOffersPage.addToFavorites, (state, action) => ({
        ...state,
        isLoading: true,
        error: '',
    })),
    on(FavoritesOffersApi.addToFavoritesSuccess, (state, action) => ({
        ...state,
        jobs: [...state.jobs, action.job],
        isLoading: false,
        error: '',
    })),
    on(FavoritesOffersApi.addToFavoritesFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error,
    })),

    // ── Remove From Favorites ──
    on(FavoritesOffersPage.removeFromFavorites, (state, action) => ({
        ...state,
        isLoading: true,
        error: '',
    })),
    on(FavoritesOffersApi.removeFromFavoritesSuccess, (state, action) => ({
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.job.id),
        isLoading: false,
        error: '',
    })),
    on(FavoritesOffersApi.removeFromFavoritesFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error,
    })),

    //     on(loading, (state, action) => ({
    //         ...state,
    //         isLoading: action.isLoading
    //     })),
    //     on(error, (state, action) => ({
    //         ...state,
    //         error: action.error
    //     }))
);

