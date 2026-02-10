import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router, RouterLink} from '@angular/router';
import {CurrentUser} from '../../../../core/models/currentUser.model';
import {map} from 'rxjs';
import {User} from '../../../../core/models/user.model';

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
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  currentUser= signal<CurrentUser>({
    id:'',
    firstName:'',
    lastName:'',
    email:''
  });

  loginForm:FormGroup = this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: user => {
              if (user) {
                this.router.navigate(['/jobs']);
              }else {
          alert("Email ou mot de passe incorrect.");
    }
        },
        error: (err) => {
          console.error('Erreur technique lors du login:', err);
        }
      });
    }
  }

}
