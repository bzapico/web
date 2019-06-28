import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { mockJwtToken, mockUserList, mockOrganizationInfo, mockClusterList, mockResourcesSummary, mockAppsInstancesList, mockNodeList, mockRegisteredAppsList, mockDevicesList, mockGroupList, mockInventoryList, mockInventorySummary, mockEICJoinToken, mockAgentJoinToken } from '../utils/mocks';
import { Group } from '../definitions/interfaces/group';
import { Asset } from '../definitions/interfaces/asset';

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
   * Infrastructure
   ********************/

  /**
   * Simulates to request infrastructure inventory list
   * @param organizationId Organization identifier
   */
  getInventory(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockInventoryList),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to request inventory summary data
   * @param organizationId Organization identifier
   */
  getInventorySummary(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockInventorySummary),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates install an agent
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge Controller identifier
   * @param agent Agent identifier
   */
  installAgent(organizationId: string, edgeControllerId: any, agent: any) {
    const asset: Asset = {
      organization_id: organizationId,
      edge_controller_id: edgeControllerId,
      asset_id: this.uuidv4(),
      agent_id: this.uuidv4(),
      eic_net_ip: agent.target_host,
      show: true,
      created: 1550746520,
      labels: {},
      os: {
        name: 'petra',
        version: 'v1',
        class: 'linux',
        architecture: 'chagal'
      },
      hardware: {
        cpus: {
          manufacturer: 'Apple',
          model: 'yes',
          architecture: 'Fanix',
          num_cores: 3
        },
        installed_ram: 2,
        net_interfaces: {
          type: 'capacity',
          link_capacity: 5
        }
      },
      storage: {
        type: 'ram',
        total_capacity: 7
      },
      last_op_summary: {
        operation_id: '54654asd-654654-qweqwe',
        timestamp:  '1550746669',
        status: 'scheduled',
        info: 'info'
      },
      last_alive_timestamp: '654654654',
      status : 'offline'
    };

    for (let index = 0; index < mockInventoryList.controllers.length; index++) {
      const controllersIds = mockInventoryList.controllers[index].edge_controller_id;

      if (controllersIds === asset.edge_controller_id) {
        mockInventoryList.controllers[index].assets.push({
          eic_net_ip: agent.target_host,
          status: 'online'
        });
      }
    }

    mockInventoryList.assets.push(asset);

    return of (new Response(new ResponseOptions({
      body: JSON.stringify(asset),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates uninstall an agent
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge Controller identifier
   * @param assetId Asset identifier
   */
  uninstallAgent(organizationId: string, edgeControllerId: string, assetId: any) {
    for (let indexEc = 0; indexEc < mockInventoryList.controllers.length; indexEc++) {
      const controllersIds = mockInventoryList.controllers[indexEc].edge_controller_id;

      if (controllersIds === edgeControllerId) {
        mockInventoryList.controllers[indexEc].assets.splice(indexEc, 1);
      }
    }
    const indexAsset = mockInventoryList.assets.map(x => x.asset_id).indexOf(assetId);
      if (indexAsset !== -1) {
        mockInventoryList.assets.splice(indexAsset, 1);
      }
      return of (new Response(new ResponseOptions({
        status: 200
      })));
  }

  /**
   * Creates a new token for an EIC to join the platform
   * @param organizationId Organization identifier
   */
  createEICToken(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockEICJoinToken),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Creates a new agent related operation to EIC 
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge controller id
   */
  createAgentJoinToken(organizationId: string,  edgeControllerId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockAgentJoinToken),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Operation to remove/uninstall an EIC
   * @param organizationId Organization identifier
   */
  unlinkEIC(organizationId: string, edgeControllerId: string) {
    for (let index = 0; index < mockInventoryList.controllers.length; index++) {
      if (mockInventoryList.controllers[index].edge_controller_id === edgeControllerId) {
        delete mockInventoryList.controllers[index];
      }
    }
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({ result: '' }),
      status: 200
    })));
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
      if (changes.remove_labels) {
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          delete mockClusterList[index].labels[key];
        });
      } else if (changes.add_labels) {
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          mockClusterList[index].labels[key] = changes.labels[key];
        });
      } else if (changes.name) {
        mockClusterList[index].name = changes.name;
      }
    }
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }

  /**
   * Simulates update nodes changes
   * @param organizationId organization identifier
   * @param nodeId node identifier
   * @param changes changes to address
   */
  updateNode(organizationId: string, nodeId: string, changes: any) {
    const index = mockNodeList.map(x => x.node_id).indexOf(nodeId);
    if (index !== -1) {
      if (changes.remove_labels) {
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          delete mockNodeList[index].labels[key];
        });
      } else if (changes.add_labels) {
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          mockNodeList[index].labels[key] = changes.labels[key];
        });
      }
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

  /**
   * Simulates to request an specific instance information
   * @param organizationId Organization identifier
   * @param instanceId Instance identifier
   */
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

  /**
   * Simulates to request an specific app descriptor information
   * @param organizationId Organization identifier
   * @param descriptorId Descriptor identifier
   */
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

  /**
   * Simulates to request registering an application descriptor
   * @param organizationId Organization identifiekr
   * @param descriptor Descriptor object
   */
  addAppDescriptor(organizationId: string, descriptor: any) {
    // Not validating the descriptor
    descriptor.app_descriptor_id = this.uuidv4();
    mockRegisteredAppsList.push(descriptor);
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(descriptor),
      status: 200
    })));
  }

  /**
   * Simulates update application descriptor (registered app) changes
   * @param organizationId organization identifier
   * @param descriptorId Descriptor identifier
   * @param changes changes to address
   */
  updateAppDescriptor(organizationId: string, descriptorId: string, changes: any) {
    const index = mockRegisteredAppsList.map(x => x.app_descriptor_id).indexOf(descriptorId);
    if (index !== -1) {
      if (changes.remove_labels) {
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          delete mockRegisteredAppsList[index].labels[key];
        });
      } else if (changes.add_labels) {
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          mockRegisteredAppsList[index].labels[key] = changes.labels[key];
        });
      }
    }
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }

  /**
   * Simulates deploying an app instance
   * @param organizationId organization identifier
   * @param descriptorId Descriptor identifier
   * @param name String with the instance name
   */
  deploy(organizationId: string, descriptorId: string, name: string) {

    const newInstance = JSON.parse(JSON.stringify(mockAppsInstancesList[0]));
    newInstance.organization_id = organizationId;
    newInstance.app_descriptor_id = descriptorId;
    newInstance.name = name;
    newInstance.app_instance_id = this.uuidv4();
    mockAppsInstancesList.push(newInstance);
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }

  /**
   * Simulates undeploying an app instance
   * @param organizationId organization identifier
   * @param instanceId Instance identifier
   */
  undeploy(organizationId: string, instanceId: string) {
    const indexInstance = mockAppsInstancesList.map(x => x.app_instance_id).indexOf(instanceId);
    mockAppsInstancesList.splice(indexInstance, 1);
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }

    /**
   * Simulates delete an app descriptor
   * @param organizationId organization identifier
   * @param descriptorId Descriptor identifier
   */
  deleteRegistered(organizationId: string, descriptorId: string) {
    const indexInstance = mockRegisteredAppsList.map(x => x.app_descriptor_id).indexOf(descriptorId);
    mockRegisteredAppsList.splice(indexInstance, 1);
    return of(new Response(new ResponseOptions({
      status: 200
    })));
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
   * Simulates to request the devices list
   * @param organizationId Organization identifier
   * @param groupId Group identifier
   */
  getDevices(organizationId: string, groupId: string) {
    let found = false;
    let devicesArray = [];
    for (let index = 0; index < mockDevicesList.length && !found; index++) {
      if (mockDevicesList[index] &&
          mockDevicesList[index].length > 0 &&
          mockDevicesList[index][0].device_group_id === groupId) {
            found = true;
            devicesArray = mockDevicesList[index];
      }
    }
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({devices: devicesArray}),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to update a device from a device array
   *  @param organizationId Organization identifier
   *  @param deviceData Device data
   */
  updateDevice(organizationId: string, deviceData: any) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({ result: '' }),
      status: 200
    })));
  }

  /**
   * Operation that allows to remove a device from the system
  * @param organizationId Organization identifier
  * @param deviceId device identifier
   */
  removeDevice(organizationId: string, groupId: string, deviceId: any) {
    for (let index = 0; index < mockDevicesList.length; index++) {
      for (let indexDevice = 0; indexDevice < mockDevicesList[index].length; indexDevice++) {
        if (mockDevicesList[index][indexDevice].device_id === deviceId) {
          delete mockDevicesList[index][indexDevice];
        }
      }
    }
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }

  /**
   * Operation that allows to remove a device from the system
  * @param organizationId Organization identifier
  * @param deviceId device identifier
   */
  removeDeviceFromInventoryMockup(organizationId: string, deviceId: any) {
    const index = mockInventoryList.devices.map(x => x.device_id).indexOf(deviceId);
      if (index !== -1) {
        mockInventoryList.devices.splice(index, 1);
      }
      return of (new Response(new ResponseOptions({
        status: 200
      })));
  }

  /**
   * Simulates to request the groups list
   * @param organizationId Organization identifier
   */
  getGroups(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({
      groups: mockGroupList}),
      status: 200,
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to create a new group
   *  @param organizationId Organization identifier
   *  @param groupData Group data
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
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(group),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates to delete a group
   *  @param organizationId Organization identifier
   *  @param groupId Group identifier
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

  /**
   * Simulates to update a group from a group array
   * @param organizationId Organization identifier
   * @param groupData Group data
   */
  updateGroup(organizationId: string, groupData: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({ result: '' }),
      status: 200
    })));
  }

  addLabelToDevice(organizationId: string, changes: any) {
    for (let index = 0; index < mockDevicesList.length; index++) {
      for (let indexDevice = 0; indexDevice < mockDevicesList[index].length; indexDevice++) {
        if (mockDevicesList[index][indexDevice].device_id === changes.device_id) {
          if (!mockDevicesList[index][indexDevice].labels) {
            mockDevicesList[index][indexDevice].labels = {};
          }
          mockDevicesList[index][indexDevice].labels[Object.keys(changes.labels)[0]] = changes.labels[Object.keys(changes.labels)[0]] ;
          return of (new Response(new ResponseOptions({
            status: 200
          })));
        }
      }
    }
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }
  removeLabelFromDevice(organizationId: string, changes: any) {
    for (let index = 0; index < mockDevicesList.length; index++) {
      for (let indexDevice = 0; indexDevice < mockDevicesList[index].length; indexDevice++) {
        if (mockDevicesList[index][indexDevice].device_id === changes.device_id) {
          delete mockDevicesList[index][indexDevice].labels[Object.keys(changes.labels)[0]];
        }
      }
    }
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }

    /**
   * Generates UUID v4
   * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
