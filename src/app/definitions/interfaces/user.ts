import { RoleOptions } from '../enums/role-options.enum';

export interface User {
    email: string;
    name: string;
    organization_id: string;
    role_name: RoleOptions;
}
