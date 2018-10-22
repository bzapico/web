import { Observable } from 'rxjs';

export interface Backend {
    login(email: string, password: string): Observable<any>;
    logout();
    getUserProfileInfo(userId: string);
    getOrganizationInfo(organizationId: string);
    getOrganizationUsers(organizationId: string);
    getClustersList(clusterInfo: string);
    addUser(organizationId: string, user: any);
    deleteUser(organizationId: string, userId: string);
    resetPassword(organizationId: string, userId: string);
    saveClusterChanges(clusterId: string);
}
