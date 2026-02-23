import { createReducer, on } from "@ngrx/store";
import { AuthApi, AuthPage } from "../actions/auth.actions";
import { User } from "../../../core/models/user.model";

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

export const authReducer = createReducer(
    initialState,

    // ── Check Auth ──
    on(AuthPage.checkAuth, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(AuthApi.checkAuthSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
    })),
    on(AuthApi.checkAuthFailure, (state) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
    })),

    // ── Login ──
    on(AuthPage.login, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(AuthApi.loginSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
    })),
    on(AuthApi.loginFailure, (state, action) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.error,
    })),

    // ── Register ──
    on(AuthPage.register, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(AuthApi.registerSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
    })),
    on(AuthApi.registerFailure, (state, action) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.error,
    })),

    // ── Logout ──
    on(AuthPage.logout, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(AuthApi.logoutSuccess, () => ({
        ...initialState,
    })),

    // ── Update Profile ──
    on(AuthPage.updateProfile, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(AuthApi.updateProfileSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isLoading: false,
        error: null,
    })),
    on(AuthApi.updateProfileFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error,
    })),

    // ── Remove User ──
    on(AuthPage.removeUser, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(AuthApi.removeUserSuccess, () => ({
        ...initialState,
    })),
    on(AuthApi.removeUserFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error,
    }))
);
