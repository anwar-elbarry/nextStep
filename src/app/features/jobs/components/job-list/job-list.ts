import { Component, inject, OnInit, signal } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { JobService } from '../../job.service';
import { JobCard } from "../job-card/job-card";
import { SearchFilterJob } from "../search-filter-job/search-filter-job";

@Component({
  selector: 'app-job-list',
  standalone:true,
  imports: [JobCard, SearchFilterJob],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList implements OnInit{
  private  jobService =  inject(JobService);
    jobsList = signal<JobModel[]>([]);
    countries = signal<{code: string, name: string}[]>([]);
    country = signal('us');
    page = signal(1);
    searchQuery = signal<string>('');
    

    ngOnInit() {
      this.getJobs();
      this.getCountries();
    }

    getJobs(){
       const pathVariables :any = {
          country:this.country(),
          page: this.page()
       };
      
       const params :any = {}


       if(this.searchQuery() !== ''){
        params.what = this.searchQuery();
       }

      this.jobService.getJobs(pathVariables,params).subscribe({
        next: (jobs) => {
          this.jobsList.set(jobs);
          console.log(this.jobsList());
        }
      })
    }
    
    getCountries(){
      this.jobService.getCountries().subscribe({
        next: (countiesList) => {
          this.countries.set(countiesList);
          console.log(this.countries());
        }
      })
    }

    handleSearch( cretirea :{query:string,country:string}){
      this.country.set(cretirea.country);
      this.searchQuery.set(cretirea.query);
      this.getJobs();
    }

    handlePageChange(page:number){
      this.page.set(page);
    }

}
