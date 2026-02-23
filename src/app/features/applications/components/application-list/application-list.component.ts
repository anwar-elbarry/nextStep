import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationActions } from '../../../../core/store/actions/application.actions';
import { selectAllApplications, selectApplicationsLoading, selectApplicationStats, selectPendingApplications, selectAcceptedApplications, selectRejectedApplications } from '../../../../core/store/selectors/application.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApplicationCardComponent } from '../application-card/application-card.component';
import { CommonModule } from '@angular/common';
import { ApplicationStatus } from '../../models/applicationStatus.enum';
import { ApplicationReqModel } from '../../models/applicationReq.model';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-application-list',
    standalone: true,
    imports: [CommonModule, ApplicationCardComponent, RouterModule],
    templateUrl: './application-list.component.html',
    styleUrl: './application-list.component.css'
})
export class ApplicationListComponent implements OnInit {
    private store = inject(Store);

    applications = toSignal(this.store.select(selectAllApplications), { initialValue: [] });
    loading = toSignal(this.store.select(selectApplicationsLoading), { initialValue: false });
    stats = toSignal(this.store.select(selectApplicationStats), { initialValue: { total: 0, pending: 0, accepted: 0, rejected: 0 } });

    pendingApplications = toSignal(this.store.select(selectPendingApplications), { initialValue: [] });
    acceptedApplications = toSignal(this.store.select(selectAcceptedApplications), { initialValue: [] });
    rejectedApplications = toSignal(this.store.select(selectRejectedApplications), { initialValue: [] });

    selectedFilter = signal<'all' | ApplicationStatus>('all');
    ApplicationStatus = ApplicationStatus;


    ngOnInit() {
        this.store.dispatch(ApplicationActions.loadApplications());
    }

    get filteredApplications() {
        const filter = this.selectedFilter();
        switch (filter) {
            case ApplicationStatus.PENDING:
                return this.pendingApplications();
            case ApplicationStatus.ACCEPTED:
                return this.acceptedApplications();
            case ApplicationStatus.REJECTED:
                return this.rejectedApplications();
            default:
                return this.applications();
        }
    }

    setFilter(filter: 'all' | ApplicationStatus) {
        this.selectedFilter.set(filter);
    }

    onStatusChange(event: { id: string; status: ApplicationStatus }) {
        const application = this.applications().find(app => app.id === event.id);
        if (application) {
            const updatedApp: ApplicationReqModel = {
                userId: application.userId,
                offerId: application.offerId,
                apiSource: application.apiSource,
                title: application.title,
                company: application.company,
                location: application.location,
                url: application.url,
                status: event.status,
                notes: application.notes,
            };
            this.store.dispatch(ApplicationActions.updateApplication({
                applicationId: event.id,
                application: updatedApp
            }));
        }
    }

    onNotesChange(event: { id: string; notes: string }) {
        const application = this.applications().find(app => app.id === event.id);
        if (application) {
            const updatedApp: ApplicationReqModel = {
                userId: application.userId,
                offerId: application.offerId,
                apiSource: application.apiSource,
                title: application.title,
                company: application.company,
                location: application.location,
                url: application.url,
                status: application.status,
                notes: event.notes,
            };
            this.store.dispatch(ApplicationActions.updateApplication({
                applicationId: event.id,
                application: updatedApp
            }));
        }
    }

    onDelete(id: string) {
        this.store.dispatch(ApplicationActions.deleteApplication({ applicationId: id }));
    }
}
