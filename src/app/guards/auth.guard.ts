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
    if (jwtToken === null
      // || this.jwtHelper.isTokenExpired(jwtToken) unable to generate a mockup jwt with the right expiracy date
      ) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
