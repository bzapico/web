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
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Backend } from '../definitions/interfaces/backend';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { AddUserRequest } from '../definitions/interfaces/add-user-request';
import { UserChanges } from '../definitions/interfaces/user-changes';
import { InstallAgentRequest } from '../definitions/interfaces/install-agent-request';
import {AddAppDescriptorRequest} from '../definitions/interfaces/add-app-descriptor-request';

/**
 * URL of the public API
 */
// const API_URL = environment.apiUrl + ':31404/v1/';
const API_URL = environment.apiUrl + '/v1/';

@Injectable({
  providedIn: 'root'
})

export class BackendService implements Backend {
  /**
   * String that holds the authorization token
   */
  authToken: string;
  constructor(
    private http: HttpClient) {
  }

  /********************
   * Login
   ********************/

  // POST '/login'
  /**
   * Request to log into the app
   * @param email User Id / email
   * @param password string containing the user password
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      // URL
      // environment.apiUrl + ':30210/v1/login',
      API_URL + 'login',
      // LOAD
      {
        username: email,
        password: password
      }
    );
  }

  /********************
   * Logout
   ********************/

  /**
   * Emulates a request to log out
   */
  logout() {
    return of (new HttpResponse({status: 200}));
  }

  /********************
   * Sidebar
   ********************/
  /**
   * Request to change the user password
   * @param organizationId Organization identifier
   * @param passwordChange Object containing the old password, the email and the new password
   */
  resetPassword(organizationId: string, passwordChange: any) {
    return this.post(
      API_URL + 'users/' + organizationId + '/change',
      passwordChange
    );
  }

  /********************
   * Organization
   ********************/

  // GET 'users/{organization_id}/{email}/info
  /**
   * Requests to get an specific user information
   * @param organizationId Organization identifier
   * @param userId User identifier (email)
   */
  getUserProfileInfo(organizationId: string, userId: string) {
    return this.get(
      API_URL + 'users/' + organizationId + '/' + userId + '/info'
    );
  }
  // GET '/organization/{organization_id}'
  /**
   * Requests to get an specific organization information
   * @param organizationId Organization identifier
   */
  getOrganizationInfo(organizationId: string) {
    return this.get(
      API_URL + 'organization/' + organizationId
    );
  }
  // GET 'users/{organization_id}/list
  /**
   * Requests a list of the users that belong to a specific organization
   * @param organizationId Organization identifier
   */
  getOrganizationUsers(organizationId: string) {
    return this.get(
      API_URL + 'users/' + organizationId + '/list'
    );
  }
  // POST 'users/{organizationId}/add'
  /**
   * Requests to add a new user
   * @param organizationId Organization identifier
   * @param user New user data
   */
  addUser(organizationId: string, user: AddUserRequest) {
    return this.post(
      API_URL + 'users/' + organizationId + '/add',
      user
    );
  }
  // POST 'users/{organizationId}/delete'
  /**
   * Requests to delete the provided userId user
   * @param organizationId Organization identifier
   * @param userId User identifier
   */
  deleteUser(organizationId: string, userId: string) {
    return this.post(
      API_URL + 'users/' + organizationId + '/delete',
      {
        organization_id: organizationId,
        email: userId
      }
    );
  }
  // POST 'users/{organization_id}/update
  /**
   * Requests to update an specific user
   * @param organizationId Organization identifier
   * @param user Object containing user data
   */
  saveUserChanges(organizationId: string, user: UserChanges) {
    return this.post(
      API_URL + 'users/' + organizationId + '/update',
      user
    );
  }
  // GET '/v1/roles/{organization_id}/list'
  /**
   * Requests to get the user roles list
   * @param organizationId Organization identifier
   */
  listRoles(organizationId: string) {
    return this.get(
      API_URL + 'roles/' + organizationId + '/list'
    );
  }
  // GET '/v1/roles/{organization_id}/assign'
  /**
   * Change role
   * @param organizationId Organization identifier
   * @param userId Object containing user ID data
   *  @param  roleId Object containing  role ID data
   */
  changeRole(organizationId: string, userId: string, roleId: string) {
    return this.post(
      API_URL + 'roles/' + organizationId + '/assign',
      {
        organization_id: organizationId,
        email: userId,
        role_id: roleId
      }
    );
  }

  /********************
   * Infrastructure
   ********************/

  // GET '/v1/inventory/{organization_id}/list'
  /**
   * Requests the inventory list
   * @param organizationId Organization identifier
   */
  getInventory(organizationId: string) {
    return this.get(
      API_URL + 'inventory/' + organizationId + '/list'
    );
  }
  // GET '/v1/inventory/{organization_id}/summary'
  /**
   * Requests to get the infrastructure inventory summary
   * @param organizationId Organization identifier
   */
  getInventorySummary(organizationId: string) {
    return this.get(
      API_URL + 'inventory/' + organizationId + '/summary'
    );
  }

  /********************
   * Infrastructure - Agent
   ********************/

  // POST '/v1/agent/{organization_id}/{edge_controller_id}/install'
  /**
   * Requests to install an agent
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge controller id
   * @param agent Agent installer
   */
  installAgent(agent: InstallAgentRequest) {
    const installAgentRequestObj = {
      organization_id: agent.organization_id,
      edge_controller_id: agent.edge_controller_id,
      agent_type: agent.agent_type,
      credentials: {username: agent.credentials.username, password: agent.credentials.credentials, is_sudoer: agent.credentials.is_sudoer},
      target_host: agent.target_host
    };
    return this.post(
      API_URL + 'ec/' + agent.organization_id + '/agent/install', installAgentRequestObj
    );
  }
  // POST '/v1/agent/{organization_id}/{edge_controller_id}/uninstall'
  /**
   * Requests to uninstall an agent
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge controller id
   * @param assetId Asset identifier
   */
  uninstallAgent(organizationId: string, edgeControllerId: string, assetId: string) {
    return this.post(
      API_URL + 'agent/' + organizationId + '/' + assetId + '/uninstall',
      {
        organization_id: organizationId,
        asset_id: assetId,
      }
    );
  }
  // POST '/v1/agent/{organization_id}/{edge_controller_id}/token/create'
  /**
   * Agent related operation to EIC token creation
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge controller id
   */
  createAgentJoinToken(organizationId: string,  edgeControllerId: string) {
    return this.post(
      API_URL + 'agent/' + organizationId + '/' + edgeControllerId + '/token/create'
    );
  }

  /********************
   * Infrastructure - Edge Controller
   ********************/

  // POST '/v1/ec/{organization_id}/token/create'
  /**
   * Creates a new token for an EIC to join the platform
   * @param organizationId Organization identifier
   */
  createEICToken(organizationId: string) {
    return this.post(
      API_URL + 'ec/' + organizationId + '/token/create'
    );
  }
  // POST '/v1/inventory/{organization_id}/ec/{ec_id}/update'
  /**
   * Requests to uninstall an agent
   * @param organizationId Organization identifier
   * @param ecId Edge controller id
   * @param ec Edge controller updated object
   */
  updateEC(organizationId: string, ecId: string, ec: any) {
    return this.post(
      API_URL + 'inventory/' + organizationId + '/ec/' + ecId + '/update',
      ec
    );
  }
  // POST '/v1/ec/{organization_id}/unlink'
  /**
   * Operation to remove/uninstall an EIC
   * @param organizationId Organization identifier
   * @param edgeControllerId  Edge controller id
   */
  unlinkEIC(organizationId: string, edgeControllerId: string) {
    return this.post(
      API_URL + 'ec/' + organizationId + '/unlink',
      {edge_controller_id: edgeControllerId}
    );
  }

    /********************
   * Infrastructure - Asset
   ********************/
    // POST '/v1/inventory/{organization_id}/asset/{asset_id}/update'
  /**
   * Requests to uninstall an agent
   * @param organizationId Organization identifier
   * @param assetId Edge controller id
   * @param asset Asset object updated
   */
  updateAsset(organizationId: string, assetId: string, asset: any) {
    return this.post(
      API_URL + 'inventory/' + organizationId + '/asset/' + assetId + '/update',
      asset
    );
  }

  /********************
   * Resources
   ********************/

  // GET 'resources/{organization_id}/summary'
  /**
   * Requests to get the resources summary for an specific organization
   * @param organizationId Organization identifier
   */
  getResourcesSummary(organizationId: string) {
    return this.get(
      API_URL + 'resources/' + organizationId + '/summary'
    );
  }
  // GET 'clusters/{organization_id}/list'
  /**
   * Requests to get the cluster list for an specific organization
   * @param organizationId Organization identifier
   */
  getClusters(organizationId: string) {
    return this.get(
      API_URL + 'clusters/' + organizationId + '/list'
    );
  }

  // POST '/v1/clusters/{organization_id}/{cluster_id}/update'
  /**
   * Request to modify cluster data
   * @param organizationId Organization identifier
   * @param clusterId Cluster identifier
   * @param changes Object holding cluster changes
   */
  saveClusterChanges(organizationId: string, clusterId: string, changes: any) {
    return this.post(
      API_URL + 'clusters/' + organizationId + '/' + clusterId + '/update',
      changes
    );
  }

    // POST '/v1/nodes/{organization_id}/{node_id}/update'
  /**
   * Request to modify cluster data
   * @param organizationId Organization identifier
   * @param nodeId Node identifier
   * @param changes Object holding cluster changes
   */
  updateNode(organizationId: string, nodeId: string, changes: any) {
    return this.post(
      API_URL + 'nodes/' + organizationId + '/' + nodeId + '/update',
      changes
    );
  }

  /********************
   * Applications
   ********************/

  // GET 'apps/inst/{organization_id}/list'
  /**
   * Requests application instances list
   * @param organizationId Organization identifier
   */
  getInstances(organizationId: string) {
    return this.get(
      API_URL + 'apps/inst/' + organizationId + '/list'
    );
  }
  // GET 'apps/desc/{organization_id}/list'
  /**
   * Requests registered applications list (descriptors)
   * @param organizationId Organization identifier
   */
  getRegisteredApps(organizationId: string) {
    return this.get(
      API_URL + 'apps/desc/' + organizationId + '/list'
    );
  }
  // GET 'apps/inst/{organization_id}/{app_instance_id}/get'
  /**
   * Requests application instance info
   * @param organizationId Organization identifier
   * @param instanceId Instance identifier
   */
  getAppInstance(organizationId: string, instanceId: string) {
    return this.get(
      API_URL + 'apps/inst/' + organizationId + '/' + instanceId + '/get'
    );
  }
  // GET 'apps/inst/{organization_id}/{app_descriptor_id}/get'
  /**
   * Requests application descriptor (registered app) info
   * @param organizationId Organization identifier
   * @param descriptorId Descriptor identifier
   */
  getAppDescriptor(organizationId: string, descriptorId: string) {
    return this.get(
      API_URL + 'apps/desc/' + organizationId + '/' + descriptorId + '/get'
    );
  }
  // POST '/v1/apps/desc/{organization_id}/add'
  /**
   * Request to register an application descriptor
   * @param organizationId Organization identifier
   * @param descriptor Descriptor object
   */
  addAppDescriptor(organizationId: string, descriptor: AddAppDescriptorRequest) {
    return this.post(
      API_URL + 'apps/desc/' + organizationId + '/add',
      descriptor
    );
  }
  // POST '/v1/apps/desc/{organization_id}/{app_descriptor_id}/update'
  /**
   * Request to modify application descriptor (registered app) data
   * @param organizationId Organization identifier
   * @param descriptorId Descriptor identifier
   * @param changes Object holding apps changes
   */
  updateAppDescriptor(organizationId: string, descriptorId: string, changes: any) {
    return this.post(
      API_URL + 'apps/desc/' + organizationId + '/' + descriptorId + '/update',
      changes
    );
  }
  // POST '/v1/apps/inst/{organization_id}/{app_descriptor_id}/deploy'
  /**
   * Request to deploy an application instance
   * @param organizationId Organization identifier
   * @param descriptorId Descriptor identifier
   * @param name Instance name
   * @param params? optional parameters that may be included for deploying an instance
   */
  deploy(organizationId: string, descriptorId: string, name: string, params?: any, connections?: any[]) {
    const postObject = {
      organization_id: organizationId,
      app_descriptor_id: descriptorId,
      name: name
    };
    if (params && params.length > 0) {
      postObject['parameters'] = { parameters: params };
    }
    if (connections && connections.length > 0) {
      postObject['outbound_connections'] = connections;
    }
    return this.post(
      API_URL + 'apps/inst/' + organizationId + '/' + descriptorId + '/deploy',
      postObject
    );
  }
  // POST '/v1/apps/inst/{organization_id}/{app_instance_id}/deploy'
  /**
   * Request to undeploy an specific application instance
   * @param organizationId Organization identifier
   * @param instanceId Instance identifier
   */
  undeploy(organizationId: string, instanceId: string, confirmation?: {user_confirmation: boolean}) {
    const undeployData = {
      organization_id: organizationId,
      app_instance_id: instanceId
    };
    if (confirmation) {
      undeployData['user_confirmation'] = confirmation.user_confirmation;
    }
    return this.post(
      API_URL + 'apps/inst/' + organizationId + '/' + instanceId + '/undeploy', undeployData
    );
  }
  // POST '/v1/apps/desc/{organization_id}/{app_descriptor_id}/delete'
  /**
   * Request to delete an specific registered app
   * @param organizationId Organization identifier
   * @param descriptorId Descriptor identifier
   */
  deleteRegistered(organizationId: string, descriptorId: string) {
    return this.post(
      API_URL + 'apps/desc/' + organizationId + '/' + descriptorId + '/delete',
      {
        organization_id: organizationId,
        app_descriptor_id: descriptorId
      }
    );
  }

  /********************
   * Application network
   ********************/

  // GET '/appnet/inbound/{organization_id}/available'
  /**
   * Retrieves a list of available inbounds of an organization
   * @param organizationId Organization identifier
   */
  getListAvailableInstanceInbounds(organizationId: string) {
    return this.get(
      API_URL + 'appnet/inbound/' + organizationId + '/available'
    );
  }
  // GET '/appnet/outbound/{organization_id}/available'
  /**
   * Retrieves a list of available outbounds of an organization
   * @param organizationId Organization identifier
   */
  getListAvailableInstanceOutbounds(organizationId: string) {
    return this.get(
      API_URL + 'appnet/outbound/' + organizationId + '/available'
    );
  }
  // POST '/appnet/connection/{organization_id}/add'
  /**
   * Adds a new connection between one outbound and one inbound
   * @param organizationId Organization identifier
   */
  addConnection(organizationId: string, connection: any) {
    return this.post(
      API_URL + 'appnet/connection/' + organizationId + '/add',
      connection
    );
  }
  // POST 'appnet/connection/{organization_id}/remove'
  /**
   * Operation that removes a connection
   * @param organizationId Organization identifier
   */
  removeConnection(organizationId: string, connection: any) {
    return this.post(
      API_URL + 'appnet/connection/' + organizationId + '/remove',
      connection
    );
  }
  // GET '/appnet/connection/{organization_id}/list'
  /**
   * Retrieves a list all the established connections of an organization
   * @param organizationId Organization identifier
   */
  getListConnections(organizationId: string) {
    return this.get(
      API_URL + 'appnet/connection/' + organizationId + '/list'
    );
  }
  // GET /v1/apps/desc/{organization_id}/{app_instance_id}/parameters
  /**
   * Retrieves a list of available parameters of an instance
   * @param organizationId Organization identifier
   * @param instanceId Instance identifier
   */
  getListAvailableInstanceParameters(organizationId: string, instanceId: string) {
    return this.get(
        API_URL + 'apps/inst/' + organizationId + '/' + instanceId + '/parameters'
    );
  }

  /********************
   * Cluster
   ********************/

  // GET 'nodes/{organization_id}/{cluster_id}/list'
  /**
   * Requests to get the list of nodes for an specific cluster
   * @param organizationId Organization identifier
   * @param clusterId Cluster identifier
   */
  getNodes(organizationId: string, clusterId: string) {
    return this.get(
      API_URL + 'nodes/' + organizationId + '/' + clusterId + '/list'
    );
  }
  // GET 'clusters/{organization_id}/{cluster_id}/info'
  /**
   * Requests to get the detail of an specific cluster
   * @param organizationId Organization identifier
   * @param clusterId Cluster identifier
   */
  getClusterDetail(organizationId: string, clusterId: string) {
    return this.get(
      API_URL + 'clusters/' + organizationId + '/' + clusterId + '/info'
    );
  }
  /**
   * GET request with custom authorization headers
   * @param url URL address
   */
  get(url: string) {
    const jwt = localStorage.getItem(LocalStorageKeys.jwt) || null;
    if (jwt !== null) {
      this.authToken = JSON.parse(jwt).token;
    }
    // Set Authorization headers
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);
    return this.http.get(
      url,
      {
        headers: headers
      });
  }
  /**
   * POST request with custom authorization headers
   * @param url URL address
   * @param load Post load
   */
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

  /********************
   * Devices
   ********************/

  // GET: '/v1/device/{organization_id}/{group_id}/list'
  /**
   * Requests the devices list
   * @param organizationId Organization identifier
   * @param groupId group identifier
   */
  getDevices(organizationId: string, groupId: string) {
    return this.get(
      API_URL + 'device/' + organizationId + '/' + groupId + '/list'
    );
  }
  // POST: '/v1/device/{organization_id}/update'
  /**
  * Request to modify device data
  * @param organizationId Organization identifier
  * @param deviceData device data
  */
  updateDevice(organizationId: string, deviceData: any) {
    return this.post(
      API_URL + 'device/' + organizationId + '/update',
      deviceData
    );
  }
  // POST '/v1/device/{organization_id}/remove'
  /**
   * Operation that allows to remove a device from the system
   * @param organizationId Organization identifier
   * @param groupId Device Group identifier
   * @param deviceId device identifier
   */
  removeDevice(organizationId: string, groupId: string, deviceId: string) {
    return this.post(
      API_URL + 'device/' + organizationId + '/remove',
      {
        organization_id: organizationId,
        device_group_id: groupId,
        device_id: deviceId
      }
    );
  }
  // POST '/v1/device/{organization_id}/remove'
  /**
   * Operation that allows to remove a device from the system (Temporary mock response)
   * @param organizationId Organization identifier
   * @param deviceId device identifier
   */
    removeDeviceFromInventoryMockup(organizationId: string, deviceId: string) {
      return this.post(
        API_URL + 'device/' + organizationId + '/remove',
        {
          organization_id: organizationId,
          device_id: deviceId
        }
      );
    }
  // GET: '/v1/device/group/{organization_id}/list'
  /**
   * Requests the groups list
   * @param organizationId Organization identifier
   */
  getGroups(organizationId: string) {
    return this.get(
      API_URL + 'device/group/' + organizationId + '/list'
    );
  }
  // POST: '/v1/device/group/{organization_id}/add'
  /**
   * Requests to add a new group
   * @param organizationId Organization identifier
   * @param groupData New device group data
   */
  addGroup(organizationId: string, groupData: any) {
    return this.post(
      API_URL + 'device/group/' + organizationId + '/add',
      groupData
    );
  }
  // POST: '/v1/device/group/{organization_id}/remove'
  /**
   * Requests to delete the provided group
   * @param organizationId Organization identifier
   * @param groupId devices group identifier
   */
  deleteGroup(organizationId: string, groupId: string) {
    return this.post(
      API_URL + 'device/group/' + organizationId + '/remove',
      {
        organization_id: organizationId,
        device_group_id: groupId
      }
    );
  }
  // POST: '/v1/device/group/{organization_id}/update'
  /**
  * Request to modify group data
  * @param organizationId Organization identifier
  * @param groupDta group data
  */
  updateGroup(organizationId: string, groupData: string) {
    return this.post(
      API_URL + 'device/group/' + organizationId + '/update',
      groupData
    );
  }
  // POST: '/v1/device/group/{organization_id}/label/add'
  /**
  * Adds label to device
  * @param organizationId Organization identifier
  * @param changes changes data
  */
  addLabelToDevice(organizationId: string, changes: any) {
    return this.post(
      API_URL + 'device/' + organizationId + '/label/add',
      changes
    );
  }
  // POST: '/v1/device/group/{organization_id}/label/remove'
  /**
  * Remove labels from device
  * @param organizationId Organization identifier
  * @param changes changes data
  */
  removeLabelFromDevice(organizationId: string, changes: any) {
    return this.post(
      API_URL + 'device/' + organizationId + '/label/remove',
      changes
    );
  }
}
