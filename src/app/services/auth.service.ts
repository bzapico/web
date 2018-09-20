import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'access_token';
@Injectable()
export class AuthService {

  private isMocked: boolean = true;
  private url: string = 'api/auth';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token) as any;

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user): Promise<string> | boolean {

    if (!this.isMocked) { // auth service is not mocked
      if (user.email === 'test@test.com' && user.password === 'password') {
        return this.http
          .post(`${this.url}/login`, JSON.stringify(user), { headers: this.headers })
          .toPromise()
          .then(res => (res as any).text());
      } else {
        return false;
      }
    } else { // auth service is mocked
      if (user.email === 'test@test.com' && user.password === 'password') {
        localStorage.setItem('access_token', 'test_token');
        return true;
      } else {
        return false;
      }
    }
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
  }

  public get loggedIn(): boolean {
    return (this.getToken() !== null);
  }
}
