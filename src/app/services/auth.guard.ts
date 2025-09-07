import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth().pipe(
    tap((estado) => {
      if (!estado) {
        router.navigate(['/login']);
      }
    })
  );
};

export const authCanMatch: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuth().pipe(
    map(isAuthed => (isAuthed ? true : router.createUrlTree(['/login'])))
  );
};