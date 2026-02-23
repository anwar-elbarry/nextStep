import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../../core/models/user.model";
import { LoginModel } from "../../../features/auth/models/login.model";
import { RegisterModel } from "../../../features/auth/models/register.model";

export const AuthPage = createActionGroup({
    source: 'Auth Page',
    events: {
        'Login': props<{ credentials: LoginModel }>(),
        'Register': props<{ userData: RegisterModel }>(),
        'Logout': emptyProps(),
        'Check Auth': emptyProps(),
        'Update Profile': props<{ id: string; data: Partial<User> }>(),
        'Remove User': props<{ id: string }>()
    }
});

export const AuthApi = createActionGroup({
    source: 'Auth API',
    events: {
        // ── Login ──
        'Login Success': props<{ user: User }>(),
        'Login Failure': props<{ error: string }>(),

        // ── Register ──
        'Register Success': props<{ user: User }>(),
        'Register Failure': props<{ error: string }>(),

        // ── Logout ──
        'Logout Success': emptyProps(),

        // ── Check Auth ──
        'Check Auth Success': props<{ user: User }>(),
        'Check Auth Failure': emptyProps(),

        // ── Update Profile ──
        'Update Profile Success': props<{ user: User }>(),
        'Update Profile Failure': props<{ error: string }>(),

        // ── Remove User ──
        'Remove User Success': emptyProps(),
        'Remove User Failure': props<{ error: string }>(),
    }
});
