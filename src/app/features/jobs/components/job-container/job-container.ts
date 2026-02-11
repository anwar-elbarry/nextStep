import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-job-container',
  imports: [
    RouterOutlet
],
  standalone: true,
  templateUrl: './job-container.html',
  styleUrl: './job-container.css',
})
export class JobContainer {

}
