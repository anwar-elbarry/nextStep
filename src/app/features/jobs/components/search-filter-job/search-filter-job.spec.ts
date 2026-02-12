import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterJob } from './search-filter-job';

describe('SearchFilterJob', () => {
  let component: SearchFilterJob;
  let fixture: ComponentFixture<SearchFilterJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterJob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFilterJob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
