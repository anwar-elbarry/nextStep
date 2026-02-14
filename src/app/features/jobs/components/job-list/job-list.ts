import { Component, inject, OnInit, signal } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { JobService } from '../../job.service';
import { JobCard } from "../job-card/job-card";
import { SearchFilterJob } from "../search-filter-job/search-filter-job";
import { Pagination } from "../../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobCard, SearchFilterJob, Pagination],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList implements OnInit {
  private jobService = inject(JobService);

  // State signals
  totalPages = signal<number>(1);
  totalJobs = signal<number>(0);
  jobsList = signal<JobModel[]>([]);
  
  countries = signal<{ code: string, name: string }[]>([]);
  country = signal('us');
  page = signal(1);
  searchQuery = signal<string>('');
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.getJobs();
    this.getCountries();
  }

  getJobs() {
    const pathVariables: any = {
      country: this.country(),
      page: this.page()
    };

    const params: any = {};

    if (this.searchQuery() !== '') {
      params.what = this.searchQuery();
    }

    this.loading.set(true);
    this.error.set(null);

    this.jobService.getJobs(pathVariables, params).subscribe({
      next: (response) => {
        console.log(response);

        this.jobsList.set(response.results);
        this.totalJobs.set(response.count);
        this.totalPages.set(response.TotalPages);

        this.loading.set(false);

        console.log(`Loaded ${response.results.length} jobs for ${this.country()}, page ${this.page()}`);
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.error.set('Failed to load jobs. Please try again.');
        this.loading.set(false);
        this.jobsList.set([]);
      }
    });
  }

  getCountries() {
    this.jobService.getCountries().subscribe({
      next: (countriesList) => {
        this.countries.set(countriesList);
        console.log(`Loaded ${countriesList.length} countries`);
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      }
    });
  }

  handleSearch(criteria: { query: string, country: string }) {
    this.country.set(criteria.country);
    this.searchQuery.set(criteria.query);
    this.page.set(1); // Reset to page 1 on new search
    this.getJobs();
  }

  handlePageChange(page: number) {
    this.page.set(page);
    this.getJobs();
  }
}
