import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectIsAuthenticated } from '../../core/store/selectors/auth.selectors';
import { AuthPage } from '../../core/store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.jsonServerUrl}/users`;
  private readonly http = inject(HttpClient);
  private store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  getUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  register(register: RegisterModel): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, register);
  }

  login(request: LoginModel): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${request.email}`).pipe(
      map(users => {
        const user = users.length > 0 ? users[0] : null;

        if (user && user.password === request.password) {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword as User;
        }

        return null;
      })
    );
  }

  logout() {
    this.store.dispatch(AuthPage.logout());
  }

  currentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, data);
  }
}
