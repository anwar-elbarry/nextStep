import { Component, inject, signal, OnInit } from '@angular/core';
import { JobList } from '../job-list/job-list';
import { JobDetails } from '../job-details/job-details';
import { JobModel } from '../../models/job.model';
import { JobService } from '../../job.service';
import { SearchFilterJob } from '../search-filter-job/search-filter-job';

@Component({
  selector: 'app-job-container',
  imports: [
    JobList,
    JobDetails,
    SearchFilterJob
  ],
  standalone: true,
  templateUrl: './job-container.html',
  styleUrl: './job-container.css',
})
export class JobContainer implements OnInit {
  selectedJob = signal<JobModel | undefined>(undefined);

  // Search and pagination state
  countries = signal<{ code: string, name: string }[]>([]);
  country = signal('us');
  page = signal(1);
  searchQuery = signal<string>('');

  // Job list state (from child)
  totalPages = signal<number>(1);
  totalJobs = signal<number>(0);
  loading = signal(false);
  error = signal<string | null>(null);

  private jobService = inject(JobService);

  ngOnInit() {
    this.getCountries();
  }

  handleJobSelect(job: JobModel) {
    this.selectedJob.set(job);
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
  }

  handlePageChange(page: number) {
    this.page.set(page);
  }

  handleStateUpdate(state: { totalPages: number, totalJobs: number, loading: boolean, error: string | null }) {
    this.totalPages.set(state.totalPages);
    this.totalJobs.set(state.totalJobs);
    this.loading.set(state.loading);
    this.error.set(state.error);
  }
}
