import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    if (jwtData) {
      role = jwtData.role;
    }
    if (jwtToken === null
      // || this.jwtHelper.isTokenExpired(jwtToken) unable to generate a mockup jwt with the right expiracy date
      ) {
      this.router.navigate(['login']);
      return false;
    }

    if (
      role &&
      role === 'Developer' && !(
      next.routeConfig.path === 'applications' ||
      next.routeConfig.path === '')
    ) {
      alert('Unauthorized');
      return false;
    }
    // if (
    //   role === 'Operator' && !(
    //   next.routeConfig.path === 'resources' ||
    //   next.routeConfig.path === '')
    // ) {
    //   alert('Unauthorized');
    //   return false;
    // }

    return true;
  }
}
