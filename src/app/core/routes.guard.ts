import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, map, tap } from 'rxjs';

export const routesGuardisLogin: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const AService = inject(AuthService);

  return AService.checkSession().pipe(
    map((response: any) => {
     
      if (response.success) {
        console.log('Respuesta del servidorGGG:' + response.success);
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return [false];
    })
  );
};

export const routesGuardRol: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const AService = inject(AuthService);

  return AService.checkSession().pipe(
    map((response: any) => {
      if (response.usuario.rol === 'organizador') {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return [false];
    })
  );
};