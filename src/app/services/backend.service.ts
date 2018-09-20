import { Injectable } from '@angular/core';
import { Backend } from '../definitions/backend';

@Injectable({
  providedIn: 'root'
})

export class BackendService implements Backend {

  constructor() { }

  login() {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
}
