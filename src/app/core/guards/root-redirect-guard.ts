import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const rootRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getUser().pipe(
    map(user => {
      console.log('rootRedirectGuard → getUser() response:', user);

      if (user) {
        console.log('User found → redirecting to /dashboard');
        return router.createUrlTree(['/dashboard']);
      } else {
        console.log('No user found → redirecting to /login');
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(err => {
      console.error('Error in getUser():', err);
      return of(router.createUrlTree(['/login']));
    })
  );
};
