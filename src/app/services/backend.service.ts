import { Injectable, Inject } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Injectable({
  providedIn: 'root'
})

export class BackendService implements Backend {

  urlBase: string;
  urlAPI: string;
  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpBasicAuthService) {
    let portAPI: number;
    if (environment.production) {
      this.urlBase = this.replaceUrlPort(this.document.location.href, portAPI);
      this.urlAPI = this.urlBase + 'api/v0/';
    } else {
      let tmpUrl = localStorage.getItem(LocalStorageKeys.urlBase);
      if (tmpUrl != null && tmpUrl.indexOf('https') >= 0) {
        this.urlBase = tmpUrl;
        this.urlAPI = this.urlBase + 'api/v0/';
      } else {
        this.urlBase = 'https://172.31.3.99:30000/'; // connected to FMX (required vpn)
        this.urlAPI = this.urlBase + 'api/v0/';
        localStorage.setItem(LocalStorageKeys.urlBase, this.urlBase);
      }
   }
  }

  login(email: string, password: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  getUserProfileInfo(userId: string) {
    throw new Error('Method not implemented.');
  }
  getOrganizationInfo(organizationId: string) {
    throw new Error('Method not implemented.');
  }
  getOrganizationUsers(organizationId: string) {
    throw new Error('Method not implemented.');
  }
  addUser(organizationId: string, user: any) {
    throw new Error('Method not implemented.');
  }
  deleteUser(organizationId: string, userId: string) {
    throw new Error('Method not implemented.');
  }
  resetPassword(organizationId: string, userId: string) {
    throw new Error('Method not implemented.');
  }
  saveClusterChanges(organizationId: string, clusterId: string, changes: any) {
    throw new Error('Method not implemented.');
  }
  saveUserChanges(organizationId: string, userId: string, changes: any) {
    throw new Error('Method not implemented.');
  }
  getResourcesSummary(organizationId: string) {
    throw new Error('Method not implemented.');
  }
  getClusters(organizationId: string) {
    throw new Error('Method not implemented.');
  }
}
