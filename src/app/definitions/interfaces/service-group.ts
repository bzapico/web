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

import { ServiceGroupDeploymentSpecs } from './service-group-deployment-specs';
import { Service } from './service';
import { CollocationPolicy } from '../enums/collocation-policy.enum';
import { KeyValue } from '@angular/common';

export interface ServiceGroup {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // ServiceGroupId with the group identifier.
    service_group_id?: string;
    // Name of the service group.
    name?: string;
    // Services defining a list of service identifiers that belong to the group.
    services?: Service[];
    // Policy indicating the deployment collocation policy.
    policy?: CollocationPolicy;
    // Particular deployment specs for this service
    specs?: ServiceGroupDeploymentSpecs;
    // Labels defined by the user.
    labels?: KeyValue<string, string>;
}
