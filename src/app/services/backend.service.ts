import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

/**
 * URL of the public API
 */
const API_URL = environment.apiUrl + ':31404/v1/';

@Injectable({
  providedIn: 'root'
})

export class BackendService implements Backend {

  authToken: string;
  constructor(
    private http: HttpClient) {

  }

  // POST '/login'
  /**
   * Request to log into the app
   * @param email User Id / email
   * @param password string containing the user password
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      // URL
      environment.apiUrl + ':30210/v1/login',
      // LOAD
      {
        username: email,
        password: password
      }
    );
  }

  /**
   * Emulates a request to log out
   */
  logout() {
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }

  // GET 'users/{organization_id}/{email}/info
  getUserProfileInfo(organizationId: string, userId: string) {
    return this.get(
      API_URL + 'users/' + organizationId + '/' + userId + '/info'
    );
  }
  // GET '/organization/{organization_id}'
  getOrganizationInfo(organizationId: string) {
    return this.get(
      API_URL + 'organization/' + organizationId
    );
  }
  // GET 'users/{organization_id}/list
  getOrganizationUsers(organizationId: string) {
    return this.get(
      API_URL + 'users/' + organizationId + '/list'
    );
  }

  addUser(organizationId: string, user: any) {
    return this.post(
      API_URL + 'users/' + organizationId + '/add',
      user
    );
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
  getApps(organizationId: string) {
    throw new Error('Method not implemented.');
  }
  getNodes(clusterId: string) {
    throw new Error('Method not implemented.');
  }
  getClusterDetail(clusterId: string) {
    throw new Error('Method not implemented.');
  }

  get(url: string) {
    const jwt = localStorage.getItem(LocalStorageKeys.jwt) || null;
    if (jwt !== null) {
      this.authToken = JSON.parse(jwt).token;
    }
    // Set Authorization headers
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url: string, load?: any) {
    const jwt = localStorage.getItem(LocalStorageKeys.jwt) || null;
    if (jwt !== null) {
      this.authToken = JSON.parse(jwt).token;
    }
    // Set Authorization headers
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);
    return this.http.post(
      url,
      load,
      {
        headers: headers
      }
      );
  }
}
