import { Observable } from 'rxjs';

export interface Backend {
    login(email: string, password: string): Observable<any>;
    logout();
    getUserProfileInfo(userId: string);
    getOrganizationInfo(organizationId: string);
    getOrganizationUsers(organizationId: string);
    getClustersCharts(clusterId: string, cluster: any);
    addUser(organizationId: string, user: any);
    deleteUser(organizationId: string, userId: string);
    resetPassword(organizationId: string, userId: string);
}
