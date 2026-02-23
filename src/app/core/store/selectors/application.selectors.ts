import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from '../reducers/application.reducer';
import { ApplicationStatus } from '../../../features/applications/models/applicationStatus.enum';

export const selectApplicationState =
    createFeatureSelector<ApplicationState>('applications');

export const selectAllApplications = createSelector(
    selectApplicationState,
    (state) => state.applications
);

export const selectApplicationsLoading = createSelector(
    selectApplicationState,
    (state) => state.loading
);

export const selectApplicationsError = createSelector(
    selectApplicationState,
    (state) => state.error
);

export const selectApplicationCount = createSelector(
    selectAllApplications,
    (applications) => applications.length
);

export const selectApplicationsByStatus = (status: ApplicationStatus) =>
    createSelector(selectAllApplications, (applications) =>
        applications.filter((app) => app.status === status)
    );

export const selectPendingApplications = createSelector(
    selectAllApplications,
    (applications) =>
        applications.filter((app) => app.status === ApplicationStatus.PENDING)
);

export const selectAcceptedApplications = createSelector(
    selectAllApplications,
    (applications) =>
        applications.filter((app) => app.status === ApplicationStatus.ACCEPTED)
);

export const selectRejectedApplications = createSelector(
    selectAllApplications,
    (applications) =>
        applications.filter((app) => app.status === ApplicationStatus.REJECTED)
);

export const selectApplicationByOfferId = (offerId: string) =>
    createSelector(selectAllApplications, (applications) =>
        applications.find((app) => app.offerId === offerId)
    );

export const selectIsJobTracked = (offerId: string) =>
    createSelector(
        selectAllApplications,
        (applications) => applications.some((app) => app.offerId === offerId)
    );

export const selectApplicationById = (id: string) =>
    createSelector(selectAllApplications, (applications) =>
        applications.find((app) => app.id === id)
    );

// Statistics selectors
export const selectApplicationStats = createSelector(
    selectAllApplications,
    (applications) => ({
        total: applications.length,
        pending: applications.filter((app) => app.status === ApplicationStatus.PENDING)
            .length,
        accepted: applications.filter(
            (app) => app.status === ApplicationStatus.ACCEPTED
        ).length,
        rejected: applications.filter(
            (app) => app.status === ApplicationStatus.REJECTED
        ).length,
    })
);
