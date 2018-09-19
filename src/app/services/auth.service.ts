import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { debug } from 'util';

@Injectable()
export class AuthService {

  private isMocked: boolean = true;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> | boolean {

    
    if (!this.isMocked) {
        console.log('not mocked auth service');
     return this.http.post<{token: string}>('/api/auth', {email: email, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
    } else {
      if (email === 'test@test.com' && password === 'password') {
        localStorage.setItem('acces_token', 'test_token');
        console.log('login ok');
        return true;
      } else {
        console.log('login failed');
        return false;
      }
    }
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
