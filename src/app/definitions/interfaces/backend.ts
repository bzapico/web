import { Observable } from 'rxjs';

export interface Backend {
    login(email: string, password: string): Observable<any>;
    logout();
    getUserProfileInfo(userId: string);
    getOrganizationInfo(organizationId: string);
}
