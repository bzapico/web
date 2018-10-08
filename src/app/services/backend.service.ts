import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BackendService implements Backend {

  constructor() { }

  login(email: string, password: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  getUserProfileInfo(userId: string) {
    throw new Error('Method not implemented.');
  }
}
