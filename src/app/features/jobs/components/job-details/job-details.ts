import { Component, input } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [TimeAgoPipe],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {
  job = input<JobModel>();
}
