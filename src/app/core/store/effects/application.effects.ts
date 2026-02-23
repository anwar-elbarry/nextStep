import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ApplicationService } from '../../../features/applications/service/application.service';
import { ApplicationActions } from '../actions/application.actions';
import { AlertActions } from '../actions/alert.actions';

@Injectable()
export class ApplicationEffects {
    private actions$ = inject(Actions);
    private applicationService = inject(ApplicationService);

    loadApplications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApplicationActions.loadApplications),
            mergeMap(() =>
                this.applicationService.getApplications().pipe(
                    map((applications) =>
                        ApplicationActions.loadApplicationsSuccess({ applications })
                    ),
                    catchError((error) =>
                        of(
                            ApplicationActions.loadApplicationsFailure({
                                error: error.message || 'Failed to load applications',
                            })
                        )
                    )
                )
            )
        )
    );

    addApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApplicationActions.addApplication),
            mergeMap(({ application }) =>
                this.applicationService.addApplication(application).pipe(
                    map((newApplication) =>
                        ApplicationActions.addApplicationSuccess({
                            application: newApplication,
                        })
                    ),
                    catchError((error) =>
                        of(
                            ApplicationActions.addApplicationFailure({
                                error: error.message || 'Failed to add application',
                            })
                        )
                    )
                )
            )
        )
    );

    addApplicationSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApplicationActions.addApplicationSuccess),
            map(() =>
                AlertActions.showAlert({
                    alert: {
                        id: crypto.randomUUID(),
                        message: 'Application tracked successfully!',
                        type: 'success',
                        duration: 3000
                    }
                })
            )
        )
    );

    updateApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApplicationActions.updateApplication),
            mergeMap(({ applicationId, application }) =>
                this.applicationService.updateApplication(applicationId, application).pipe(
                    map((updatedApplication) =>
                        ApplicationActions.updateApplicationSuccess({
                            application: updatedApplication,
                        })
                    ),
                    catchError((error) =>
                        of(
                            ApplicationActions.updateApplicationFailure({
                                error: error.message || 'Failed to update application',
                            })
                        )
                    )
                )
            )
        )
    );

    updateApplicationSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApplicationActions.updateApplicationSuccess),
            map(() =>
                AlertActions.showAlert({
                    alert: {
                        id: crypto.randomUUID(),
                        message: 'Application updated successfully!',
                        type: 'success',
                        duration: 3000
                    }
                })
            )
        )
    );

    deleteApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApplicationActions.deleteApplication),
            mergeMap(({ applicationId }) =>
                this.applicationService.deleteApplication(applicationId).pipe(
                    map(() =>
                        ApplicationActions.deleteApplicationSuccess({ applicationId })
                    ),
                    catchError((error) =>
                        of(
                            ApplicationActions.deleteApplicationFailure({
                                error: error.message || 'Failed to delete application',
                            })
                        )
                    )
                )
            )
        )
    );

    deleteApplicationSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApplicationActions.deleteApplicationSuccess),
            map(() =>
                AlertActions.showAlert({
                    alert: {
                        id: crypto.randomUUID(),
                        message: 'Application deleted successfully!',
                        type: 'success',
                        duration: 3000
                    }
                })
            )
        )
    );

    // Error handling effects
    handleError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ApplicationActions.loadApplicationsFailure,
                ApplicationActions.addApplicationFailure,
                ApplicationActions.updateApplicationFailure,
                ApplicationActions.deleteApplicationFailure
            ),
            map(({ error }) =>
                AlertActions.showAlert({
                    alert: {
                        id: crypto.randomUUID(),
                        message: error,
                        type: 'error',
                        duration: 3000
                    }
                })
            )
        )
    );
}
