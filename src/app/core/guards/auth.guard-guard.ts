import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../features/auth/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticate()){
    return true;
  }else {
     return router.parseUrl('/login');
  }
};
