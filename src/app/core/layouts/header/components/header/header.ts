import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectIsAuthenticated, selectUserFullName } from '../../../../store/selectors/auth.selectors';
import { AuthPage } from '../../../../store/actions/auth.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  store = inject(Store);
  currentUser = this.store.select(selectCurrentUser);
  isAuthenticated = this.store.select(selectIsAuthenticated);
  userFullName = this.store.select(selectUserFullName);

  // Mobile menu state
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  logout() {
    this.store.dispatch(AuthPage.logout());
    this.mobileMenuOpen.set(false);
  }
}
