import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

/**
 * URL of the public API
 */
const API_URL = environment.apiUrl + ':31404/v1/';

@Injectable({
  providedIn: 'root'
})

export class BackendService implements Backend {
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
  getApps(organizationId: string) {
    throw new Error('Method not implemented.');
  }
  getNodes(clusterId: string) {
    throw new Error('Method not implemented.');
  }
  getClusterDetail(clusterId: string) {
    throw new Error('Method not implemented.');
  }
}
