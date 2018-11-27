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
    resetPassword(organizationId: string, userId: string);
    saveUserChanges(organizationId: string, changes: any);
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
}
