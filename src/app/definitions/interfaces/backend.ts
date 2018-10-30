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
    saveUserChanges(userId: string, changes: any);
    // Resources
    saveClusterChanges(organizationId: string, clusterId: string, changes: any);
    getClusters(organizationId: string);
    getResourcesSummary(organizationId: string);
}
