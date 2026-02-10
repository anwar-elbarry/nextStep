import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {map, Observable} from 'rxjs';
import {User} from '../../core/models/user.model';
import {HttpClient} from '@angular/common/http';
import {RegisterModel} from './models/register.model';
import {LoginModel} from './models/login.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private readonly apiUrl = `${environment.jsonServerUrl}/users`;
 private readonly http = inject(HttpClient);
 private router = inject(Router);
 currentUser = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

 getUsers():Observable<any>{
   return this.http.get<User[]>(`${this.apiUrl}`);
 }

 register(register:RegisterModel): Observable<User> {
   return this.http.post<User>(`${this.apiUrl}`, register);
 }

  login(request: LoginModel): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${request.email}`).pipe(
      map(users => {
        const user = users.length > 0 ? users[0] : null;

        if (user && user.password === request.password) {
          const { password, ...userWithoutPassword } = user;

          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          this.currentUser.set(userWithoutPassword);
          return userWithoutPassword as User;
        }

        return null;
      })
    );
  }

  logout(){
     localStorage.removeItem('user');
     this.router.navigate(['/login'])
  }

  isAuthenticate(){
   return !!this.currentUser();
  }
}
