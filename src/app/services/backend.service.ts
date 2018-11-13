import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Backend } from '../definitions/interfaces/backend';

const API_URL = environment.apiUrl + 'v1/';

@Injectable({
  providedIn: 'root'
})

export class BackendService implements Backend {

  constructor(
    private http: Http) {
      console.log(API_URL);
  }

  // POST '/login'
  login(email: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'login', {username: email, password: password}).pipe(map(response => response.json()));
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
  getNodes(clusterId: string) {
    throw new Error('Method not implemented.');
  }
  getClusterDetail(clusterId: string) {
    throw new Error('Method not implemented.');
  }
}
