import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { FavoriteJobRespModel } from '../../models/favoriteJob-resp.model';
import { JobService } from '../../../jobs/job.service';
import { JobModel } from '../../../jobs/models/job.model';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectAllApplications } from '../../../../core/store/selectors/application.selectors';
import { selectUserId } from '../../../../core/store/selectors/auth.selectors';
import { ApplicationReqModel } from '../../../applications/models/applicationReq.model';
import { ApplicationStatus } from '../../../applications/models/applicationStatus.enum';
import { ApplicationActions } from '../../../../core/store/actions/application.actions';

@Component({
  selector: 'app-favjob-details',
  standalone: true,
  imports: [TimeAgoPipe],
  templateUrl: './favjob-details.html',
  styleUrl: './favjob-details.css',
})
export class FavjobDetails implements OnInit {
  job = input.required<FavoriteJobRespModel>();
  close = output<void>();

  private store = inject(Store);

  private jobService = inject(JobService);
  jobDetails = signal<JobModel | null>(null);

  applications = toSignal(this.store.select(selectAllApplications), {initialValue:[]});
  userId = toSignal(this.store.select(selectUserId),{initialValue:''});

  ngOnInit(): void {
    this.getJob();
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


    trackApplication(){
      if (this.isTracked()) {
        console.warn('Job already tracked');
        return;
      }
      const application = this.transformToApplication(this.jobDetails()!);
      this.store.dispatch(ApplicationActions.addApplication({ application }));
    }


    isTracked = computed(() => {
        
        const jobId = this.job()?.offerId;
        if (!jobId) return false;
        return this.applications().some(app => app.offerId === jobId);
  });

  getJob() {
    const fav = this.job();
    const pathVariables: any = {
      country: fav.country || 'us',
      page: 1
    };
    console.log(pathVariables);
    
    this.jobService.getJob(fav.offerId, pathVariables, { what: fav.title }).subscribe(job => {
      this.jobDetails.set(job);
    });
  }
}
