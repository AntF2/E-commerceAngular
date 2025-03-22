import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserStorageService } from '../../auth-services/storage-service/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (UserStorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl('/admin/dashboard');
      this.snackBar.open(`¡No tienes acceso a esta página!`, 'ERROR', {
        duration: 5000
      });
      return false;
    } else if (!UserStorageService.hasToken()) {
      UserStorageService.signOut();
      this.router.navigateByUrl('/login');
      this.snackBar.open('No has iniciado sesión. ¡Inicia sesión primero!', 'ERROR', {
        duration: 5000
      });
      return false;
    }

    return true;
  }
}