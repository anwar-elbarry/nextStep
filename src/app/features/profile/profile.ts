import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCurrentUser, selectAuthLoading } from '../../core/store/selectors/auth.selectors';
import { AuthPage } from '../../core/store/actions/auth.actions';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private store = inject(Store);

  user = toSignal(this.store.select(selectCurrentUser));
  loading = toSignal(this.store.select(selectAuthLoading), { initialValue: false });

  isEditing = signal(false);

  // Form fields
  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');
  showPassword = signal(false);

  ngOnInit() {
    const u = this.user();
    if (u) {
      this.populateForm(u);
    }
  }

  populateForm(u: User) {
    this.firstName.set(u.firstName || '');
    this.lastName.set(u.lastName || '');
    this.email.set(u.email || '');
    this.password.set('');
  }

  startEditing() {
    const u = this.user();
    if (u) this.populateForm(u);
    this.isEditing.set(true);
  }

  cancelEditing() {
    this.isEditing.set(false);
    const u = this.user();
    if (u) this.populateForm(u);
  }

  saveProfile() {
    const u = this.user();
    if (!u) return;

    const data: Partial<User> = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
    };

    if (this.password().trim()) {
      data.password = this.password();
    }

    this.store.dispatch(AuthPage.updateProfile({ id: u.id, data }));
    this.isEditing.set(false);
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  getInitials(): string {
    const u = this.user();
    if (!u) return '?';
    return (u.firstName?.charAt(0) || '') + (u.lastName?.charAt(0) || '');
  }

  deleteAccount() {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmed) return;

    const u = this.user();
    if (!u) return;

    this.store.dispatch(AuthPage.removeUser({ id: u.id }));
  }
}
