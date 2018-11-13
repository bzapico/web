import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { of, Observable } from 'rxjs';
// tslint:disable-next-line:max-line-length
import { mockJwtToken, mockUserProfileInfo, mockUserList, mockOrganizationInfo, mockResetPasword, mockClusterList, mockResourcesSummary, mockAppsList, mockNodeList  } from '../utils/mocks';

@Injectable({
  providedIn: 'root'
})
export class MockupBackendService implements Backend {

  constructor() {
  }

  /********************
   * Login
   ********************/

  /**
   * Simulates the login request
   * @param email String containing the user email
   * @param password String that holds the user password
   */
  login(email: string, password: string): Observable<any> {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({
        jwt: mockJwtToken
      }),
      status: 200
    })));
  }
  /**
   * Simulates the logout request
   */
  logout() {
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }

  /********************
   * Organization
   ********************/

  /**
   * Simulates get profile info
   * @param userId String containing the user identificator - used to replicate expected backend behavior
   */
  getUserProfileInfo(userId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({
        name: mockUserProfileInfo.name,
        email: mockUserProfileInfo.email,
        role: mockUserProfileInfo.role
      }),
      status: 200
    })));
  }

  getOrganizationInfo(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockOrganizationInfo),
      status: 200
    })));
  }

  getOrganizationUsers(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockUserList),
      status: 200
    })));
  }

  /**
  * Simulates add user
  */
  addUser(organizationId: string, user: any) {
    const index = mockUserList.map(x => x.email).indexOf(user.email);
    if (index === -1) {
      mockUserList.push(user);
      return of (new Response(new ResponseOptions({
        status: 200
      })));
    } else {
      return of (new Response(new ResponseOptions({
        status: 403,
        body: user.email + ' is already in use'
      })));
    }
  }

  /**
  * Simulates delete user
  */
  deleteUser(organizationId: string, userId: string) {
    const index = mockUserList.map(x => x.email).indexOf(userId);
    if (index !== -1) {
      mockUserList.splice(index, 1);
    }
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }

  /**
  * Simulates reset password
  */
  resetPassword(organizationId: string, userId: string) {
    return of (new Response(new ResponseOptions({
      body: mockResetPasword,
      status: 200
    })));
  }

  /**
   * Simulates save user changes
   * @param userId String containing the user identificator - used to replicate expected backend behavior
   */
  saveUserChanges(organizationId: string, userId: string, changes: any) {
    const index = mockUserList.map(x => x.email).indexOf(userId);
    if (index !== -1) {
      mockUserList[index].name = changes.newUserName;
      mockUserList[index].email = changes.newUserEmail;
      mockUserList[index].role = changes.newUserRole;
    }
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }


  /********************
   * Resources
   ********************/

  /**
   * Simulates save cluster changes
   * @param clusterId String containing the cluster identificator - used to replicate expected backend behavior
   */
  saveClusterChanges(organizationId: string, clusterId: string, changes: any) {
    const index = mockClusterList.map(x => x.id).indexOf(clusterId);
    if (index !== -1) {
      mockClusterList[index].name = changes.newClusterName;
      mockClusterList[index].description = changes.newClusterDescription;
      mockClusterList[index].tags = changes.newClusterTags;
    }
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }

  getResourcesSummary(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockResourcesSummary),
      status: 200
    })));
  }

  getClusters(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockClusterList),
      status: 200
    })));
  }



  /********************
   * Appications
   ********************/

  /**
   * Simulates get apps list
   */
  getApps(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockAppsList),
      status: 200
    })));
  }

  /**
   * Simulates get nodes list
   */
  getNodes(clusterId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockNodeList),
      status: 200
    })));
  }

  /**
   * Simulates get cluster details
   */
  getClusterDetail(clusterId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockClusterList),
      status: 200
    })));
  }
}