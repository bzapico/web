/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from './backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from './mockup-backend.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Service that enables authentication in the platform
 */
@Injectable()
export class AuthService {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Jwt Helper service reference
   */
  jwtHelper: JwtHelperService;

  constructor(
    private mockupBackend: MockupBackendService,
    private backendService: BackendService,
    private router: Router
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.loginMock) || null;
    // check which backend is required (fake or real)
    if (mock === 'true') {
      this.backend = this.mockupBackend;
    } else {
      this.backend = this.backendService;
    }
    this.jwtHelper = new JwtHelperService();
  }

  /**
   * Request to login into the platform
   * @param email String containing user email
   * @param password String that holds the user password
   */
  login (email: string, password: string): Observable<any> {
    return this.backend.login(email, password).pipe(map(response => {
      if (response.status === 404 || response.status === 500) {
        return response;
      }
      const jwtTokenData =  this.jwtHelper.decodeToken(response.token);
      localStorage.setItem(LocalStorageKeys.jwt, JSON.stringify(response));
      localStorage.setItem(LocalStorageKeys.jwtData, JSON.stringify(jwtTokenData));
      localStorage.setItem(LocalStorageKeys.refreshToken, JSON.stringify(response.refresh_token));
      return response;
    }));
  }
  /**
   * Request to logout the platform
   */
  logout() {
    this.backend.logout()
      .subscribe(() => {
        // remove JWT token from local storage to log user out
        localStorage.removeItem(LocalStorageKeys.jwt);
        localStorage.removeItem(LocalStorageKeys.jwtData);
        localStorage.removeItem(LocalStorageKeys.refreshToken);
        this.router.navigate(['login']);
      });
  }
  /**
   * Helper function that checks if the user is authenticated assenting if JWT Token is valid
   */
  isAuth(): boolean {
    const jwtToken = JSON.parse(localStorage.getItem(LocalStorageKeys.jwt)) || null;
    if (jwtToken !== null) {
      return !this.jwtHelper.isTokenExpired(jwtToken);
    }
    return false;
  }
}
