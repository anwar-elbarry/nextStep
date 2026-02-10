import {Component, input} from '@angular/core';
import {JobModel} from '../../models/job.model';

@Component({
  selector: 'app-job-card',
  imports: [],
  standalone:true,
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {
      job = input<JobModel>();
}
