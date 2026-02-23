import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthPage } from '../../../../core/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  loginForm:FormGroup = this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  });
  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthPage.login({ credentials: this.loginForm.value }));
    }
  }

}
