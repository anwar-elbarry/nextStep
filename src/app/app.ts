import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layouts/header/components/header/header';
import { Store } from '@ngrx/store';
import { AuthPage } from './core/store/actions/auth.actions';
import { FavoritesOffersPage } from './core/store/actions/favoritesOffers.actions';
import { AlertComponent } from './shared/components/alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('nextStep');
  private store = inject(Store);

  ngOnInit() {
    this.store.dispatch(AuthPage.checkAuth());
    this.store.dispatch(FavoritesOffersPage.loadFavorites());
  }
}
