import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from '../definitions/backend';
import { BackendService } from './backend.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';



/**
 * Service that enables authentication in the platform
 */

@Injectable()
export class AuthService {
  backend: Backend;

  constructor(
    private http: HttpClient,
    private backendService: BackendService,
    ) {
     }

     login(email: string, password: string) {
      return this.http.post<any>(`/users/authenticate`, { email: email, password: password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }


}
