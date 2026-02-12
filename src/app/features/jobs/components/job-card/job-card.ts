import {Component, inject, input} from '@angular/core';
import {JobModel} from '../../models/job.model';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-job-card',
  standalone:true,
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {

      private router = inject(Router);
      job = input<JobModel>();
      country = input<string>();
      page = input<number>();

      getJobDetails(id:string){
          this.router.navigate(['/jobs',id],{
            state: {
              country : this.country(),
              page : this.page()
            }
          });
      }
}
