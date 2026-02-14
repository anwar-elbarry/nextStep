import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../../features/auth/auth.service";
import { AuthApi, AuthPage } from "../actions/auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";

@Injectable()
export class AuthEffects {

    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);
    private alertService = inject(AlertService);

    // ── Check Auth on App Init ──
    checkAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthPage.checkAuth),
            map(() => {
                const userJson = localStorage.getItem('user');
                if (userJson) {
                    const user = JSON.parse(userJson);
                    return AuthApi.checkAuthSuccess({ user });
                }
                return AuthApi.checkAuthFailure();
            })
        )
    );

    // ── Login ──
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthPage.login),
            switchMap((action) =>
                this.authService.login(action.credentials).pipe(
                    map((user) => {
                        if (user) {
                            localStorage.setItem('user', JSON.stringify(user));
                            return AuthApi.loginSuccess({ user });
                        }
                        return AuthApi.loginFailure({ error: 'Invalid email or password' });
                    }),
                    catchError((error) => of(
                        AuthApi.loginFailure({ error: error.message || 'Login failed' })
                    ))
                )
            )
        )
    );

    // ── Login Success - Navigate ──
    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthApi.loginSuccess),
            tap(() => {
                this.alertService.success('Login successful');
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
    );

    // ── Register ──
    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthPage.register),
            switchMap((action) =>
                this.authService.register(action.userData).pipe(
                    map((user) => {
                        // Remove password from user object before storing
                        const { password, ...userWithoutPassword } = user;
                        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                        return AuthApi.registerSuccess({ user: userWithoutPassword });
                    }),
                    catchError((error) => of(
                        AuthApi.registerFailure({ error: error.message || 'Registration failed' })
                    ))
                )
            )
        )
    );

    // ── Register Success - Navigate ──
    registerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthApi.registerSuccess),
            tap(() => {
                this.alertService.success('Registration successful');
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
    );

    // ── Logout ──
    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthPage.logout),
            tap(() => {
                localStorage.removeItem('user');
                this.alertService.success('Logout successful');
                this.router.navigate(['/login']);
            }),
            map(() => AuthApi.logoutSuccess())
        )
    );
}
