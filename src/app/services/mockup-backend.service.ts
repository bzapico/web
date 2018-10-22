import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { of, Observable } from 'rxjs';
import { mockJwtToken, mockUserProfileInfo, mockUserList, mockOrganizationInfo, mockResetPasword, mockClusterId } from '../utils/mocks';


@Injectable({
  providedIn: 'root'
})
export class MockupBackendService implements Backend {

  constructor() {
  }

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
  getClustersList(clusterInfo: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockClusterList),
      status: 200
    })));
  }
  addUser(organizationId: string, user: any) {
    mockUserList.push(user);
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }
  deleteUser(organizationId: string, userId: string) {
    // const index = mockUserList.map(x => x.email).indexOf(userId);
    // if (index !== -1) {
    //   mockUserList.splice(index, 1);
    // }
    mockUserList.pop();
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }
  resetPassword(organizationId: string, userId: string) {
    return of (new Response(new ResponseOptions({
      body: mockResetPasword,
      status: 200
    })));
  }
   /**
   * Simulates save cluster changes
   * @param clusterId String containing the cluster identificator - used to replicate expected backend behavior
   */
  saveClusterChanges(clusterId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({
        name: mockClusterId,
        description: mockClusterId,
        tags: mockClusterId
      }),
      status: 200
    })));
  }

}
