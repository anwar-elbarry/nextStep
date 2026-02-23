import { Component, computed, inject, input } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { Store } from '@ngrx/store';
import { selectAllApplications } from '../../../../core/store/selectors/application.selectors';
import { ApplicationActions } from '../../../../core/store/actions/application.actions';
import { ApplicationReqModel } from '../../../applications/models/applicationReq.model';
import { selectIsAuthenticated, selectUserId } from '../../../../core/store/selectors/auth.selectors';
import { ApplicationStatus } from '../../../applications/models/applicationStatus.enum';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [TimeAgoPipe],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {
  private store = inject(Store);
  job = input<JobModel>();

  isAuthenticated = toSignal(this.store.select(selectIsAuthenticated), { initialValue: false });

  private userId = toSignal(this.store.select(selectUserId), { initialValue: '' });

  private applications = toSignal(this.store.select(selectAllApplications), { initialValue: [] });


  trackApplication() {
    if (this.isTracked()) {
      console.warn('Job already tracked');
      return;
    }
    const application = this.transformToApplication(this.job()!);
    this.store.dispatch(ApplicationActions.addApplication({ application }));
  }

  transformToApplication(job: JobModel): ApplicationReqModel {
    return {
      userId: this.userId(),
      offerId: job.id,
      apiSource: 'adzuna',
      title: job.jobTitle,
      company: job.companyName,
      location: job.location,
      url: job.fullOfferLink || '',
      status: ApplicationStatus.PENDING,
      notes: ''
    };

  }

  isTracked = computed(() => {
    const jobId = this.job()?.id;
    if (!jobId) return false;
    return this.applications().some(app => app.offerId === jobId);
  });
}
