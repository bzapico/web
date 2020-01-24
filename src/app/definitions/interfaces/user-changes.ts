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

import { RoleOptions } from '../enums/role-options.enum';

export interface UserChanges {
    /**
     * Email address of the user
     */
    email: string;
    /**
     * Name of the user
     */
    name: string;
    /**
     * PhotoBase64 with the base64 encoded photo of the user
     */
    photo_base64?: string;
    /**
     * MemberSince with the date in which the user was registered in the organization
     */
    member_since?: number;
    /**
     * RoleId with the id of the role of the user
     */
    role_id?: string;
    /**
     * RoleName with the name of the role of the user
     */
    role_name: RoleOptions;
    /**
     * LastName of the user
     */
    last_name?: string;
    /**
     * Title of the user
     */
    title?: string;
    /**
     * LastLogin with the timestamp of the last time the user logged in
     */
    last_login?: number;
    /**
     * Phone number of the user
     */
    phone?: string;
    /**
     * Location of the user
     */
    location?: string;

}
