import {Component, inject, OnInit, signal} from '@angular/core';
import {JobCard} from '../job-card/job-card';
import {JobService} from '../../job.service';
import {JobModel} from '../../models/job.model';

@Component({
  selector: 'app-job-container',
  imports: [
    JobCard
  ],
  standalone: true,
  templateUrl: './job-container.html',
  styleUrl: './job-container.css',
})
export class JobContainer implements OnInit {
    private  jobService =  inject(JobService);
    jobsList = signal<JobModel[]>([]);

    ngOnInit() {
      this.getJobs();
    }

    getJobs(){
      this.jobService.getArbetNowJobs().subscribe({
        next: (jobs) => {
          this.jobsList.set(jobs);
          console.log(this.jobsList());
        }
      })
    }
}
