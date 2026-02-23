import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FavoriteJobRespModel } from '../../models/favoriteJob-resp.model';
import { JobService } from '../../../jobs/job.service';
import { JobModel } from '../../../jobs/models/job.model';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

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

  private jobService = inject(JobService);
  jobDetails = signal<JobModel | null>(null);

  ngOnInit(): void {
    this.getJob();
  }

  getJob() {
    const fav = this.job();
    const pathVariables: any = {
      country: fav.country || 'us',
      page: 1
    };
    this.jobService.getJob(fav.offerId, pathVariables, { what: fav.title }).subscribe(job => {
      this.jobDetails.set(job);
    });
  }
}
