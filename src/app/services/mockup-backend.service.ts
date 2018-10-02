import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockupBackendService implements Backend {

  constructor() { }

  login(email: string, password: string): Observable<any> {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({ jwt: 'fake-jwt-object' }),
      status: 200
    })));
  }
  logout() {
    throw new Error('Method not implemented.');
  }
}
