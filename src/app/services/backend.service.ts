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
  getResourcesSummary(organizationId: string) {
    throw new Error('Method not implemented.');
  }
  getClusters(organizationId: string) {
    throw new Error('Method not implemented.');
  }
}
