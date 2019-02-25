import { Observable } from 'rxjs';

export interface Backend {
    // Login
    login(email: string, password: string): Observable<any>;
    logout();
    // Organization
    getUserProfileInfo(organizationId: string, userId: string);
    getOrganizationInfo(organizationId: string);
    getOrganizationUsers(organizationId: string);
    addUser(organizationId: string, user: any);
    deleteUser(organizationId: string, userId: string);
    resetPassword(organizationId: string, changePassword: any);
    saveUserChanges(organizationId: string, changes: any);
    listRoles(organizationId: string);
    changeRole(organizationId: string, userId: string, roleId: string);
    // Resources
    saveClusterChanges(organizationId: string, clusterId: string, changes: any);
    getClusters(organizationId: string);
    getNodes(organizationId: string, clusterId: string);
    getClusterDetail(organizationId: string, clusterId: string);
    getResourcesSummary(organizationId: string);
    // Applications
    getInstances(organizationId: string);
    getRegisteredApps(organizationId: string);
    getAppInstance(organizationId: string, instanceId: string);
    getAppDescriptor(organizationId: string, descriptorId: string);
    // Devices
    getDevices(organizationId: string, groupId: string);
    updateDevice(organizationId: string, deviceData: any);
    // Groups
    getGroups(organizationId: string);
    addGroup(organizationId: string, groupData: any);
    deleteGroup(organizationId: string, groupId: any);
    updateGroup(organizationId: string, groupData: any);
}
