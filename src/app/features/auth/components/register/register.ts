import {Component, inject} from '@angular/core';
import {AuthService} from '../../auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    registerForm:FormGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });



  onSubmit(){
      console.log('checked',this.registerForm.valid)
        if(this.registerForm.valid){

          this.authService.register(this.registerForm.value).subscribe({
            next: resp => {
              console.log('Utilisateur créé avec succès', resp);
              this.router.navigate(['/login']);
            },
            error: err => console.log('error',err)
          })
        }
  }

}
