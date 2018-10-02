import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from './backend.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from './mockup-backend.service';



/**
 * Service that enables authentication in the platform
 */

@Injectable()
export class AuthService {
  backend: Backend;

  constructor(
    private http: HttpClient,
    private mockupBackend: MockupBackendService,
    private backendService: BackendService,
  ) {

    this.backend = mockupBackend;
  }

  login(email: string, password: string) {
    return this.backend.login(email, password);
  }

  logout() {
    // remove JWT token from local storage to log user out
    localStorage.removeItem(LocalStorageKeys.jwt);
  }

  isAuth(): boolean {
    return true;
  }


}
