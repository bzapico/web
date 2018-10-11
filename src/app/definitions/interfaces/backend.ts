import { Observable } from 'rxjs';

export interface Backend {
    login(email: string, password: string): Observable<any>;
    logout();
    getUserProfileInfo(userId: string);
    getUserInfo(userInfoMock: string);
    getOrganizationInfo(organizationId: string);
    getOrganizationUsers(organizationId: string);
}
