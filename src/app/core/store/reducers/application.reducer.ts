import { createReducer, on } from '@ngrx/store';
import { ApplicationModel } from '../../../features/applications/models/applicationResp.model';
import { ApplicationActions } from '../actions/application.actions';

export interface ApplicationState {
    applications: ApplicationModel[];
    loading: boolean;
    error: string | null;
}

export const initialState: ApplicationState = {
    applications: [],
    loading: false,
    error: null,
};

export const applicationReducer = createReducer(
    initialState,

    // Load Applications
    on(ApplicationActions.loadApplications, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(ApplicationActions.loadApplicationsSuccess, (state, { applications }) => ({
        ...state,
        applications,
        loading: false,
        error: null,
    })),
    on(ApplicationActions.loadApplicationsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Add Application
    on(ApplicationActions.addApplication, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(ApplicationActions.addApplicationSuccess, (state, { application }) => ({
        ...state,
        applications: [...state.applications, application],
        loading: false,
        error: null,
    })),
    on(ApplicationActions.addApplicationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Update Application
    on(ApplicationActions.updateApplication, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(ApplicationActions.updateApplicationSuccess, (state, { application }) => ({
        ...state,
        applications: state.applications.map((app) =>
            app.id === application.id ? application : app
        ),
        loading: false,
        error: null,
    })),
    on(ApplicationActions.updateApplicationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Delete Application
    on(ApplicationActions.deleteApplication, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(ApplicationActions.deleteApplicationSuccess, (state, { applicationId }) => ({
        ...state,
        applications: state.applications.filter((app) => app.id !== applicationId),
        loading: false,
        error: null,
    })),
    on(ApplicationActions.deleteApplicationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
