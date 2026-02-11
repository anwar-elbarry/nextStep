import { Component, inject, OnInit } from '@angular/core';
import { JobModel } from '../../models/job.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-details',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails implements OnInit{
  private route  = inject(ActivatedRoute);

  job :JobModel | undefined;

  ngOnInit(): void {
    this.route.data.subscribe(data => this.job = data['job']);
  }
}
