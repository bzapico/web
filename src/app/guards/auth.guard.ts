import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { JwtHelperService } from '@auth0/angular-jwt';
import { mockJwtToken } from '../utils/mocks';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelperService;
  constructor( private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const jwtToken = JSON.parse(localStorage.getItem(LocalStorageKeys.jwt)) || null;
    const jwtData = JSON.parse(localStorage.getItem(LocalStorageKeys.jwtData)) || null;
    let role;
    // Set role
    if (jwtData) {
      role = jwtData.role;
    }
    // Check jwtToken expiracy
    if (jwtToken === null
      || (jwtToken.token !== mockJwtToken
          && this.jwtHelper.isTokenExpired(jwtToken.token)
          )
      ) {
      this.router.navigate(['login']);
      return false;
    }
    // Check user role access
    if (
      role &&
      role === 'Developer' && !(
      next.routeConfig.path === 'applications' ||
      next.routeConfig.path === '')
    ) {
      alert('Unauthorized');
      return false;
    }
    // Check user role access
    if (
      role === 'Operator' && !(
      next.routeConfig.path === 'resources' ||
      next.routeConfig.path === '')
    ) {
      alert('Unauthorized');
      return false;
    }

    return true;
  }
}
