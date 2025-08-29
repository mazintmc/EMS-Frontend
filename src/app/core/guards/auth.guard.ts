import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as Array<string>;

  return authService.getUser().pipe(
    map((user) => {
      const role = user?.role;
      if (expectedRoles && !expectedRoles.includes(role)) {
        return router.createUrlTree(['/unauthorized']);
      }
      return true;
    }), 
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};

