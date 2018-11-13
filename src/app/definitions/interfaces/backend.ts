import { Observable } from 'rxjs';

export interface Backend {
    // Login
    login(email: string, password: string): Observable<any>;
    logout();
    // Organization
    getUserProfileInfo(userId: string);
    getOrganizationInfo(organizationId: string);
    getOrganizationUsers(organizationId: string);
    addUser(organizationId: string, user: any);
    deleteUser(organizationId: string, userId: string);
    resetPassword(organizationId: string, userId: string);
    saveUserChanges(organizationId: string, userId: string, changes: any);
    // Resources
    saveClusterChanges(organizationId: string, clusterId: string, changes: any);
    getClusters(organizationId: string);
    getNodes(clusterId: string);
    getResourcesSummary(organizationId: string);
    //Applications
    getApps(organizationId: string);
    getClusterDetail(clusterId: string);
}