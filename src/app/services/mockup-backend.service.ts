/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  mockAgentJoinToken,
  mockAppsInboundsList,
  mockAppsOutboundsList,
  mockDevicesList,
  mockEICJoinToken,
  mockGroupList,
  mockJwtToken,
  mockNodeList,
  mockOrganizationInfo,
  mockUserList
} from './utils/mocks';
import { Group } from '../definitions/interfaces/group';
import { HttpResponse } from '@angular/common/http';
import { mockInventoryList, mockInventorySummary } from './utils/inventory.mock';
import { mockClusterList, mockResourcesSummary } from './utils/clusters.mock';
import { mockConnectionsList } from './utils/connections.mock';
import { mockRegisteredAppsList } from './utils/registered-apps.mock';
import { mockAppsInstancesList } from './utils/instances-apps.mock';
import { OperatingSystemClass } from '../definitions/enums/operating-system-class.enum';
import { OpStatus } from '../definitions/enums/op-status.enum';
import { AddUserRequest } from '../definitions/interfaces/add-user-request';
import { PasswordChange } from '../definitions/interfaces/password-change';
import { UserChanges } from '../definitions/interfaces/user-changes';
import { InstallAgentRequest } from '../definitions/interfaces/install-agent-request';
import { AddAppDescriptorRequest } from '../definitions/interfaces/add-app-descriptor-request';
import { ApplicationDescriptor } from '../definitions/models/application-descriptor';

@Injectable({
  providedIn: 'root'
})
export class MockupBackendService implements Backend {
  mockGroupList: Group;

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
    return of (new HttpResponse({
      body: JSON.stringify({
        token: mockJwtToken,
        refresh_token: '018e42cf-9acb-4b4c-8804-6c54334d6947'
      }),
      status: 200
    }));
  }
  /**
   * Simulates the logout request
   */
  logout() {
    return of (new HttpResponse({
      status: 200
    }));
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
    return of (new HttpResponse({
      body: JSON.stringify(mockUserList[index]),
      status: 200
    }));
  }
  /**
   * Simulates to request organization info
   * @param organizationId Organization identifier
   */
  getOrganizationInfo(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockOrganizationInfo),
      status: 200
    }));
  }
  /**
   * Simulates to get organization users list
   * @param organizationId Organization identifier
   */
  getOrganizationUsers(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({ users: mockUserList }),
      status: 200
    }));
  }
  /**
   * Simulates adding a user
   */
  addUser(organizationId: string, user: AddUserRequest) {
    const index = mockUserList.map(x => x.email).indexOf(user.email);
    if (index === -1) {
      mockUserList.push(user);
      return of (new HttpResponse({
        status: 200
      })).pipe(
          map(response => response)
      );
    } else {
      return of (new HttpResponse({
        status: 403,
        body: user.email + ' is already in use'
      }));
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
    return of (new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates reset password
   */
  resetPassword(organizationId: string, passwordChange: PasswordChange) {
    return of (new HttpResponse({
      body: passwordChange,
      status: 200
    }));
  }
  /**
   * Simulates save user changes
   * @param userId String containing the user identifier - used to replicate expected backend behavior
   */
  saveUserChanges(organizationId: string, user: UserChanges) {
    const index = mockUserList.map(x => x.email).indexOf(user.email);
    if (index !== -1) {
      mockUserList[index].name = user.name;
      mockUserList[index].email = user.email;
      mockUserList[index].role_name = user.role_name;
    }
    return of(new HttpResponse({
      status: 200
    }));
  }

  /********************
   * Infrastructure
   ********************/

  /**
   * Simulates to request infrastructure inventory list
   * @param organizationId Organization identifier
   */
  getInventory(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockInventoryList),
      status: 200
    })).pipe(map(inventory => JSON.parse(inventory.body)));
  }
  /**
   * Simulates to request inventory summary data
   * @param organizationId Organization identifier
   */
  getInventorySummary(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockInventorySummary),
      status: 200
    }));
  }
  /**
   * Simulates install an agent
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge Controller identifier
   * @param agent Agent identifier
   */
  installAgent(agent: InstallAgentRequest) {
    const asset = {
      organization_id: agent.organization_id,
      edge_controller_id: agent.edge_controller_id,
      asset_id: this.uuidv4(),
      agent_id: this.uuidv4(),
      eic_net_ip: agent.target_host,
      show: true,
      created: 1550746520,
      labels: null,
      os: {
        name: 'petra',
        version: 'v1',
        class: OperatingSystemClass.Linux,
        class_name: 'LINUX',
        architecture: 'chagal'
      },
      hardware: {
        cpus: [{
          manufacturer: 'GenuineIntel',
          model: 'Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz',
          architecture: 'amd64',
          num_cores: 3
        }],
        installed_ram: 2,
        net_interfaces: [{
          type: 'capacity',
          link_capacity: 5
        }]
      },
      storage: [{
        type: 'ram',
        total_capacity: 7
      }],
      last_op_result: {
        operation_id: '54654asd-654654-qweqwe',
        timestamp:  '1550746669',
        status: OpStatus.SCHEDULED,
        info: 'info'
      },
      last_alive_timestamp: '654654654'
    };
    /*for (let index = 0; index < mockInventoryList.controllers.length; index++) {
      const controllersIds = mockInventoryList.controllers[index].edge_controller_id;
      if (controllersIds === asset.edge_controller_id) {
        mockInventoryList.controllers[index].assets.push({
          eic_net_ip: agent.target_host,
          status: 'online'
        });
      }
    }*/
    mockInventoryList.assets.push(asset);
    return of (new HttpResponse({
      body: JSON.stringify(asset),
      status: 200
    }));
  }
  /**
   * Simulates to update asset in inventory list
   * @param organizationId Organization identifier
   * @param assetId Asset identifier
   * @param asset Asset updated object
   */
  updateAsset(organizationId: string, assetId: string, asset: any) {
    const index = mockInventoryList.assets.map(x => x.asset_id).indexOf(assetId);
    if (index !== -1) {
      if (asset.remove_labels) {
        const keys = Object.keys(asset.labels);
        keys.forEach(key => {
          delete mockInventoryList.assets[index].labels[key];
        });
      } else if (asset.add_labels) {
        const keys = Object.keys(asset.labels);
        keys.forEach(key => {
          mockInventoryList.assets[index].labels[key] = asset.labels[key];
        });
      }
    }
    return of(new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates to update Edge Controller in inventory list
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge Controller identifier
   * @param ec Edge controller updated object
   */
  updateEC(organizationId: string, ecId: string, ec: any) {
    const index = mockInventoryList.controllers.map(x => x.edge_controller_id).indexOf(ecId);
    if (index !== -1) {
      if (ec.remove_labels) {
        const keys = Object.keys(ec.labels);
        keys.forEach(key => {
          delete mockInventoryList.controllers[index].labels[key];
        });
      } else if (ec.add_labels) {
        const keys = Object.keys(ec.labels);
        keys.forEach(key => {
          mockInventoryList.controllers[index].labels[key] = ec.labels[key];
        });
      }
    }
    return of(new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates uninstall an agent
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge Controller identifier
   * @param assetId Asset identifier
   */
  uninstallAgent(organizationId: string, edgeControllerId: string, assetId: string) {
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
    return of (new HttpResponse({
      status: 200
    }));
  }
  /**
   * Creates a new token for an EIC to join the platform
   * @param organizationId Organization identifier
   */
  createEICToken(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockEICJoinToken),
      status: 200
    }));
  }
  /**
   * Creates a new agent related operation to EIC
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge controller id
   */
  createAgentJoinToken(organizationId: string,  edgeControllerId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockAgentJoinToken),
      status: 200
    }));
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
    return of (new HttpResponse({
      body: JSON.stringify({ result: '' }),
      status: 200
    }));
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
    return of(new HttpResponse({
      status: 200
    }));
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
    return of(new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates to request a list of user roles
   * @param organizationId Organization id
   */
  listRoles(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({roles: [
          {
            'organization_id': '2a95fe95-eade-4622-836f-e85d789024bf',
            'role_id': '268d7644-bb17-48f2-815b-19a8ab6c7e83',
            'name': 'NalejAdmin',
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
    }));
  }
  /**
   * Simulates user role change
   * @param organizationId Organization id
   * @param userId User email
   * @param roleId Role id
   */
  changeRole(organizationId: string, userId: string, roleId: string) {
    return of(new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates to request resources summary data
   * @param organizationId Organization identifier
   */
  getResourcesSummary(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockResourcesSummary),
      status: 200
    })).pipe(map(summary => JSON.parse(summary.body)));
  }

  /**
   * Simulates to request clusters list
   * @param organizationId Organization identifier
   */
  getClusters(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({clusters: mockClusterList}),
      status: 200
    })).pipe(map(clusters => JSON.parse(clusters.body)));
  }

  /********************
   * Applications
   ********************/

  /**
   * Simulates to request application instances
   * @param organizationId Organization identifier
   */
  getInstances(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({instances: mockAppsInstancesList}),
      status: 200
    })).pipe(map(instances => JSON.parse(instances.body)));
  }
  /**
   * Simulates to get registered apps list
   * @param organizationId Organization identifier
   */
  getRegisteredApps(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({descriptors: mockRegisteredAppsList}),
      status: 200
    })).pipe(map(response => JSON.parse(response.body)));
  }
  /**
   * Simulates to request an specific instance information
   * @param organizationId Organization identifier
   * @param instanceId Instance identifier
   */
  getAppInstance (organizationId: string, instanceId: string) {
    const index = mockAppsInstancesList.map(x => x.app_instance_id).indexOf(instanceId);
    return of (new HttpResponse({
      body: JSON.stringify(mockAppsInstancesList[index]),
      status: 200
    })).pipe(map(response => JSON.parse(response.body)));
  }
  /**
   * Simulates to request an specific app descriptor information
   * @param organizationId Organization identifier
   * @param descriptorId Descriptor identifier
   */
  getAppDescriptor (organizationId: string, descriptorId: string) {
    const index = mockRegisteredAppsList.map(x => x.app_descriptor_id).indexOf(descriptorId);
    return of (new HttpResponse({
      body: JSON.stringify(mockRegisteredAppsList[index]),
      status: 200
    })).pipe(map(response => JSON.parse(response.body)));
  }
  /**
   * Simulates to request registering an application descriptor
   * @param organizationId Organization identifier
   * @param descriptor Descriptor object
   */
  addAppDescriptor(organizationId: string, descriptor: AddAppDescriptorRequest) {
    // Not validating the descriptor
    const generatedDescriptor
      = new ApplicationDescriptor(
        descriptor.organization_id,
        this.uuidv4(),
        descriptor.name,
        descriptor.rules,
        descriptor.configuration_options,
        descriptor.environment_variables,
        descriptor.labels,
        descriptor.inbound_net_interfaces,
        descriptor.outbound_net_interfaces,
        descriptor.groups,
        descriptor.parameters
    );
    mockRegisteredAppsList.push(generatedDescriptor);
    return of (new HttpResponse({
      body: JSON.stringify(generatedDescriptor),
      status: 200
    }));
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
    return of(new HttpResponse({
      status: 200
    }));
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
    return of(new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates undeploying an app instance
   * @param organizationId organization identifier
   * @param instanceId Instance identifier
   */
  undeploy(organizationId: string, instanceId: string, confirmation?: {user_confirmation: boolean}) {
    const indexInstance = mockAppsInstancesList.map(x => x.app_instance_id).indexOf(instanceId);
    mockAppsInstancesList.splice(indexInstance, 1);
    return of(new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates delete an app descriptor
   * @param organizationId organization identifier
   * @param descriptorId Descriptor identifier
   */
  deleteRegistered(organizationId: string, descriptorId: string) {
    const indexInstance = mockRegisteredAppsList.map(x => x.app_descriptor_id).indexOf(descriptorId);
    mockRegisteredAppsList.splice(indexInstance, 1);
    return of(new HttpResponse({
      status: 200
    }));
  }

  /********************
   * Application Network
   ********************/

  /**
   * Simulates to request a list of available inbounds of an organization
   * @param organizationId Organization identifier
   */
  getListAvailableInstanceInbounds(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockAppsInboundsList),
      status: 200
    })).pipe(map(response => JSON.parse(response.body)));
  }
  /**
   * Simulates to request a list of available outbounds of an organization
   * @param organizationId Organization identifier
   */
  getListAvailableInstanceOutbounds(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify(mockAppsOutboundsList),
      status: 200
    })).pipe(map(response => JSON.parse(response.body)));
  }

  /**
   * Simulates to add a new connection between one outbound and one inbound
   * @param organizationId Organization identifier
   */
  addConnection(organizationId: string, connection: any) {
    const newConnection = {
      organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
      connection_id: '3bc6a816-6548-4b5f-a2b7-23921dd6548b',
      source_instance_id: '3bc6a816-6548-4b5f-a2b7-239121',
      source_instance_name: 'Wordpress1',
      target_instance_id: '3bc6a816-6548-4b5f-a2b7-239455',
      target_instance_name: 'Wordpress5',
      inbound_name: connection.inbound_name,
      outbound_name: connection.outbound_name,
      outbound_required: true
    };
    mockConnectionsList.push(newConnection);
    return of (new HttpResponse({
      status: 200
    }));
  }
  /**
   * Operation that allows to remove a connection
   * @param organizationId Organization identifier
   */
  removeConnection(organizationId: string, connection: any) {
    let found = false;
    for (let index = 0; index < mockConnectionsList.length && !found; index++) {
      const element = mockConnectionsList[index];
      if (element.source_instance_id === connection.source_instance_id &&
          element.target_instance_id === connection.target_instance_id &&
          element.outbound_name === connection.outbound_name &&
          element.inbound_name === connection.inbound_name) {
        found = true;
        mockConnectionsList.splice(index, 1);
      }
    }
    return of (new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates retrieves a list all the established connections of an organization
   * @param organizationId Organization identifier
   */
  getListConnections(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({connections: mockConnectionsList}),
      status: 200
    })).pipe(map(response => JSON.parse(response.body)));
  }
  /**
   * Retrieves a list of available parameters of an instance
   * @param organizationId Organization identifier
   * @param instanceId Instance identifier
   */
  getListAvailableInstanceParameters(organizationId: string, instanceId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({parameter: mockAppsInstancesList}),
      status: 200
    })).pipe(map(response => JSON.parse(response.body)));
  }

  /********************
   * Cluster
   ********************/

  /**
   * Simulates get nodes list
   */
  getNodes(organizationId: string, clusterId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({nodes: mockNodeList}),
      status: 200
    }));
  }
  /**
   * Simulates get cluster details
   */
  getClusterDetail(organizationId: string, clusterId: string) {
    const index = mockClusterList.map(x => x.cluster_id).indexOf(clusterId);
    return of (new HttpResponse({
      body: JSON.stringify(mockClusterList[index]),
      status: 200
    }));
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
    return of (new HttpResponse({
      body: JSON.stringify({devices: devicesArray}),
      status: 200
    })).pipe(map(device => JSON.parse(device.body)));
  }
  /**
   * Simulates to update a device from a device array
   *  @param organizationId Organization identifier
   *  @param deviceData Device data
   */
  updateDevice(organizationId: string, deviceData: any) {
    return of (new HttpResponse({
      body: JSON.stringify({ result: '' }),
      status: 200
    }));
  }
  /**
   * Operation that allows to remove a device from the system
   * @param organizationId Organization identifier
   * @param deviceId device identifier
   */
  removeDevice(organizationId: string, groupId: string, deviceId: string) {
    for (let index = 0; index < mockDevicesList.length; index++) {
      for (let indexDevice = 0; indexDevice < mockDevicesList[index].length; indexDevice++) {
        if (mockDevicesList[index][indexDevice].device_id === deviceId) {
          delete mockDevicesList[index][indexDevice];
        }
      }
    }
    return of (new HttpResponse({
      status: 200
    }));
  }
  /**
   * Operation that allows to remove a device from the system
   * @param organizationId Organization identifier
   * @param deviceId device identifier
   */
  removeDeviceFromInventoryMockup(organizationId: string, deviceId: string) {
    const index = mockInventoryList.devices.map(x => x.device_id).indexOf(deviceId);
    if (index !== -1) {
      mockInventoryList.devices.splice(index, 1);
    }
    return of (new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates to request the groups list
   * @param organizationId Organization identifier
   */
  getGroups(organizationId: string) {
    return of (new HttpResponse({
      body: JSON.stringify({
        groups: mockGroupList}),
      status: 200,
    })).pipe(map(response => JSON.parse(response.body)));
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
    return of (new HttpResponse({
      body: JSON.stringify(group),
      status: 200
    }));
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
    return of (new HttpResponse({
      status: 200
    }));
  }
  /**
   * Simulates to update a group from a group array
   * @param organizationId Organization identifier
   * @param groupData Group data
   */
  updateGroup(organizationId: string, groupData: string) {
    return of (new HttpResponse({
      body: JSON.stringify({ result: '' }),
      status: 200
    }));
  }
  /**
   * Simulates to add labels to devices
   * @param organizationId Organization identifier
   * @param changes changes to address
   */
  addLabelToDevice(organizationId: string, changes: any) {
    for (let index = 0; index < mockDevicesList.length; index++) {
      for (let indexDevice = 0; indexDevice < mockDevicesList[index].length; indexDevice++) {
        if (mockDevicesList[index][indexDevice].device_id === changes.device_id) {
          if (!mockDevicesList[index][indexDevice].labels) {
            mockDevicesList[index][indexDevice].labels = {};
          }
          mockDevicesList[index][indexDevice].labels[Object.keys(changes.labels)[0]] = changes.labels[Object.keys(changes.labels)[0]] ;
          return of (new HttpResponse({
            status: 200
          }));
        }
      }
    }
    for (let index = 0; index < mockInventoryList.devices.length; index++) {
      if (mockInventoryList.devices[index].device_id === changes.device_id) {
        if (!mockInventoryList.devices[index].labels) {
          mockInventoryList.devices[index].labels = null;
        }
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          mockInventoryList.devices[index].labels[key] = changes.labels[key];
        });
        return of (new HttpResponse({
          status: 200
        }));
      }
    }
  }
  /**
   * Simulates to remove labels from devices
   * @param organizationId Organization identifier
   * @param changes changes to address
   */
  removeLabelFromDevice(organizationId: string, changes: any) {
    for (let index = 0; index < mockDevicesList.length; index++) {
      for (let indexDevice = 0; indexDevice < mockDevicesList[index].length; indexDevice++) {
        if (mockDevicesList[index][indexDevice].device_id === changes.device_id) {
          delete mockDevicesList[index][indexDevice].labels[Object.keys(changes.labels)[0]];
        }
      }
    }
    for (let index = 0; index < mockInventoryList.devices.length; index++) {
      if (mockInventoryList.devices[index].device_id === changes.device_id) {
        const keys = Object.keys(changes.labels);
        keys.forEach(key => {
          delete mockInventoryList.devices[index].labels[key];
        });
      }
    }
    return of (new HttpResponse({
      status: 200
    }));
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
