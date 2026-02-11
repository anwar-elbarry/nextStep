import { Component, inject, OnInit, signal } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { JobService } from '../../job.service';
import { JobCard } from "../job-card/job-card";

@Component({
  selector: 'app-job-list',
  standalone:true,
  imports: [JobCard],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList implements OnInit{
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
