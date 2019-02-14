import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { mockJwtToken, mockUserList, mockOrganizationInfo, mockResetPasword, mockClusterList, mockResourcesSummary, mockAppsInstancesList, mockNodeList, mockRegisteredAppsList, mockDevicesList, mockGroupList } from '../utils/mocks';
import { Group } from '../definitions/interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class MockupBackendService implements Backend {
  mockGroupList: any;

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
        token: mockJwtToken,
        refresh_token: '018e42cf-9acb-4b4c-8804-6c54334d6947'
      }),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
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
   * @param userId String containing the user identifier - used to replicate expected backend behavior
   */
  getUserProfileInfo(organizationId: string, userId: string) {
    const index = mockUserList.map(x => x.email).indexOf(userId);
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockUserList[index]),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to request organization info
   * @param organizationId Organization identifier
   */
  getOrganizationInfo(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockOrganizationInfo),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to get organization users list
   * @param organizationId Organization identifier
   */
  getOrganizationUsers(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({ users: mockUserList }),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
  * Simulates adding a user
  */
  addUser(organizationId: string, user: any) {
    const index = mockUserList.map(x => x.email).indexOf(user.email);
    if (index === -1) {
      mockUserList.push(user);
      return of (new Response(new ResponseOptions({
        status: 200
      }))).pipe(
        map(response => response.json())
      );
    } else {
      return of (new Response(new ResponseOptions({
        status: 403,
        body: user.email + ' is already in use'
      }))).pipe(
        map(response => response.json())
      );
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
  resetPassword(organizationId: string, passwordChange: any) {
    return of (new Response(new ResponseOptions({
      body: passwordChange,
      status: 200
    })));
  }

  /**
   * Simulates save user changes
   * @param userId String containing the user identifier - used to replicate expected backend behavior
   */
  saveUserChanges(organizationId: string, user: any) {
    const index = mockUserList.map(x => x.email).indexOf(user.email);
    if (index !== -1) {
      mockUserList[index].name = user.name;
      mockUserList[index].email = user.email;
      mockUserList[index].role_name = user.role_name;
    }
    return of(new Response(new ResponseOptions({
      status: 200
    }))).pipe(
      map(response => response.json())
    );
  }


  /********************
   * Resources
   ********************/

  /**
   * Simulates save cluster changes
   * @param clusterId String containing the cluster identifier - used to replicate expected backend behavior
   */
  saveClusterChanges(organizationId: string, clusterId: string, changes: any) {
    const index = mockClusterList.map(x => x.cluster_id).indexOf(clusterId);
    if (index !== -1) {
      mockClusterList[index].name = changes.name;
      mockClusterList[index].description = changes.description;
    }
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }
  /**
   * Simulates to request a list of user roles
   * @param organizationId Organization id
   */
  listRoles(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({roles: [
        {
          'organization_id': '2a95fe95-eade-4622-836f-e85d789024bf',
          'role_id': '268d7644-bb17-48f2-815b-19a8ab6c7e83',
          'name': 'Owner',
          'primitives': ['ORG']
        },
        {
          'organization_id': '2a95fe95-eade-4622-836f-e85d789024bf',
          'role_id': 'a354bf26-2fb4-4d9e-bef0-427e25b52ba7',
          'name': 'Developer', 'primitives': ['PROFILE', 'APPS']
        },
        {
          'organization_id': '2a95fe95-eade-4622-836f-e85d789024bf',
          'role_id': 'df00f420-8658-4c2e-8941-0e947aaeffe7',
          'name': 'Operator',
          'primitives': ['PROFILE', 'RESOURCES']
        }]
      }),
      status: 200
    })));
  }
  /**
   * Simulates user role change
   * @param organizationId Organization id
   * @param userId User email
   * @param roleId Role id
   */
  changeRole(organizationId: string, userId: string, roleId: string) {
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }

  /**
   * Simulates to request resources summary data
   * @param organizationId Organization identifier
   */
  getResourcesSummary(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockResourcesSummary),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to requrest clusters list
   * @param organizationId Organization identifier
   */
  getClusters(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({clusters: mockClusterList}),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /********************
   * Applications
   ********************/

  /**
   * Simulates to request application instances
   * @param organizationId Organization identifier
   */
  getInstances(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({instances: mockAppsInstancesList}),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to get registered apps list
   * @param organizationId Organization identifier
   */
  getRegisteredApps(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({descriptors: mockRegisteredAppsList}),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  getAppInstance (organizationId: string, instanceId: string) {
    const index = mockAppsInstancesList.map(x => x.app_instance_id).indexOf(instanceId);
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockAppsInstancesList[index]),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  getAppDescriptor (organizationId: string, descriptorId: string) {
    const index = mockRegisteredAppsList.map(x => x.app_descriptor_id).indexOf(descriptorId);
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockRegisteredAppsList[index]),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /********************
   * Cluster
   ********************/

  /**
   * Simulates get nodes list
   */
  getNodes(organizationId: string, clusterId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({nodes: mockNodeList}),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates get cluster details
   */
  getClusterDetail(organizationId: string, clusterId: string) {
    const index = mockClusterList.map(x => x.cluster_id).indexOf(clusterId);
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockClusterList[index]),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }


  /********************
   * Devices
   ********************/

  /**
   * Simulates to request devices list
   * @param organizationId Organization identifier
   * @param groupId group identifier
   */
  getDevices(organizationId: string, groupId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({devices: mockDevicesList}),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to request devices group list
   * @param organizationId Organization identifier
   */
  getGroups(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockGroupList),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
  * Simulates creating a new device group
  *  @param organizationId Organization identifier
  *  @param groupData Device Group data
  */
  addGroup(organizationId: string, groupData: Group) {
    function generateRandomString() {
      return Math.floor(Math.random() * Math.floor(1000000)).toString();
    }
    const group: Group = {
        name: groupData.name,
        device_group_id: generateRandomString(),
        organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
        enabled: groupData.enabled,
        default_device_connectivity: groupData.default_device_connectivity,
        device_group_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c77'
    };
    mockGroupList.push(group);
    console.log('desde el mock ', mockGroupList);
    return of (new Response(new ResponseOptions({
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
  * Simulates delete a devices group
  *  @param organizationId Organization identifier
  *  @param groupId Device Group data
  */
  deleteGroup(organizationId: string, groupId: string) {
    const index = mockGroupList.map(x => x.device_group_id).indexOf(groupId);
    if (index !== -1) {
      mockGroupList.splice(index, 1);
    }
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }
}
