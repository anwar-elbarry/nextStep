import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { JobService } from '../../job.service';
import { JobCard } from "../job-card/job-card";
import { Pagination } from "../../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobCard, Pagination],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList implements OnInit {
  private jobService = inject(JobService);

  // Input signals from parent
  country = input<string>('us');
  searchQuery = input<string>('');
  page = input<number>(1);

  // Output events
  jobSelected = output<JobModel>();
  pageChange = output<number>();
  stateUpdate = output<{ totalPages: number, totalJobs: number, loading: boolean, error: string | null }>();

  // State signals
  totalPages = signal<number>(1);
  totalJobs = signal<number>(0);
  jobsList = signal<JobModel[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    // Watch for input changes and refetch jobs
    effect(() => {
      const country = this.country();
      const searchQuery = this.searchQuery();
      const page = this.page();
      // Trigger getJobs when inputs change
      this.getJobs();
    });
  }

  ngOnInit() {
    this.getJobs();
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

        // Emit state update to parent
        this.stateUpdate.emit({
          totalPages: response.TotalPages,
          totalJobs: response.count,
          loading: false,
          error: null
        });

        console.log(`Loaded ${response.results.length} jobs for ${this.country()}, page ${this.page()}`);
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.error.set('Failed to load jobs. Please try again.');
        this.loading.set(false);
        this.jobsList.set([]);

        // Emit error state to parent
        this.stateUpdate.emit({
          totalPages: 1,
          totalJobs: 0,
          loading: false,
          error: 'Failed to load jobs. Please try again.'
        });
      }
    });
  }


  handleJobClick(job: JobModel) {
    this.jobSelected.emit(job);
  }
}
