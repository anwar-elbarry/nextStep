import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobContainer } from './job-container';

describe('JobContainer', () => {
  let component: JobContainer;
  let fixture: ComponentFixture<JobContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
