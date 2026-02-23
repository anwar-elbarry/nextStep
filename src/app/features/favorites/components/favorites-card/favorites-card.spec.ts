import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCard } from './favorites-card';

describe('FavoritesCard', () => {
  let component: FavoritesCard;
  let fixture: ComponentFixture<FavoritesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
