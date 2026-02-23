import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavjobDetails } from './favjob-details';

describe('FavjobDetails', () => {
  let component: FavjobDetails;
  let fixture: ComponentFixture<FavjobDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavjobDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavjobDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
