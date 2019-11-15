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

import { Observable } from 'rxjs';
import { PasswordChange } from './password-change';
import { AddUserRequest } from './add-user-request';
import { UserChanges } from './user-changes';
import { InstallAgentRequest } from './install-agent-request';
import { AddAppDescriptorRequest } from './add-app-descriptor-request';
import { RemoveConnectionRequest } from './remove-connection-request';
import { AddConnectionRequest } from './add-connection-request';
import { LoginResponse } from '../models/login-response';
import { HttpResponse } from '@angular/common/http';
import { AssetInfo } from './asset-info';
import { KeyValue } from './key-value';

export interface Backend {
    // Login
    login(email: string, password: string): Observable<LoginResponse | HttpResponse<LoginResponse>>;
    logout();
    // Organization
    getUserProfileInfo(organizationId: string, userId: string);
    getOrganizationInfo(organizationId: string);
    getOrganizationUsers(organizationId: string);
    addUser(organizationId: string, user: AddUserRequest);
    deleteUser(organizationId: string, userId: string);
    resetPassword(organizationId: string, changePassword: PasswordChange);
    saveUserChanges(organizationId: string, changes: UserChanges);
    listRoles(organizationId: string);
    changeRole(organizationId: string, userId: string, roleId: string);
    // Infrastructure
    getInventory(organizationId: string);
    getInventorySummary(organizationId: string);
    installAgent(agent: InstallAgentRequest);
    uninstallAgent(organizationId: string, edgeControllerId: string, assetId: string);
    createEICToken(organizationId: string);
    createAgentJoinToken(organizationId: string,  edgeControllerId: string);
    unlinkEIC(organizationId: string, edgeControllerId: string);
    removeDeviceFromInventoryMockup(organizationId: string, deviceId: string);
    updateAsset(organizationId: string, assetId: string, asset: AssetInfo);
    updateEC(organizationId: string, ecId: string, ec: any);
    // Resources
    saveClusterChanges(organizationId: string, clusterId: string, changes: any);
    getClusters(organizationId: string);
    getNodes(organizationId: string, clusterId: string);
    updateNode(organizationId: string, nodeId: string, changes: any);
    getClusterDetail(organizationId: string, clusterId: string);
    getResourcesSummary(organizationId: string);
    // Applications
    getInstances(organizationId: string);
    getRegisteredApps(organizationId: string);
    getAppInstance(organizationId: string, instanceId: string);
    getAppDescriptor(organizationId: string, descriptorId: string);
    addAppDescriptor(organizationId: string, descriptor: AddAppDescriptorRequest);
    updateAppDescriptor(organizationId: string, descriptorId: string, changes: any);
    deploy(organizationId: string, descriptorId: string, name: string, params?: any, connections?: any[]);
    undeploy(organizationId: string, instanceId: string,  confirmation?: {user_confirmation: boolean});
    deleteRegistered(organizationId: string, descriptorId: string);
    // Application network
    getListAvailableInstanceInbounds(organizationId: string);
    getListAvailableInstanceOutbounds(organizationId: string);
    addConnection(organizationId: string, addConnectionRequest: AddConnectionRequest);
    removeConnection(organizationId: string, removeConnectionRequest: RemoveConnectionRequest);
    getListConnections(organizationId: string);
    getListAvailableInstanceParameters(organizationId: string, instanceId: string);
    // Devices
    getDevices(organizationId: string, groupId: string);
    updateDevice(organizationId: string, deviceData: any);
    addLabelToDevice(organizationId: string, label: KeyValue);
    removeLabelFromDevice(organizationId: string, label: KeyValue);
    removeDevice(organizationId: string, groupId: string, deviceId: string);
    // Groups
    getGroups(organizationId: string);
    addGroup(organizationId: string, groupData: any);
    deleteGroup(organizationId: string, groupId: string);
    updateGroup(organizationId: string, groupData: any);
}
