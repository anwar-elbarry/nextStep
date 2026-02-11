import {Component, input} from '@angular/core';
import {JobModel} from '../../models/job.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-job-card',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {
      job = input<JobModel>();
}
