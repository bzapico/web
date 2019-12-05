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

import { InstanceMetadata } from './instance-metadata';
import { ServiceInstance } from './service-instance';
import { ServiceGroupDeploymentSpecs } from './service-group-deployment-specs';
import { KeyValue } from './key-value';

// ServiceGroupInstance structure to represent a collection of services that must be deployed following a given collocation
// policy.
export interface ServiceGroupInstance {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // AppInstanceId with the application instance identifier.
    app_instance_id?: string;
    // ServiceGroupId with the group identifier.
    service_group_id?: string;
    // Unique identifier for this instance
    service_group_instance_id?: string;
    // Name of the service group.
    name?: string;
    // ServicesInstances with the list of instance objects for this group
    service_instances?: ServiceInstance[];
    // Policy indicating the deployment collocation policy.
    policy_name?: string;
    // The status for this service group instance will be the worst status of its services
    status_name?: string;
    // Metadata for this service group
    metadata?: InstanceMetadata[];
    // Particular deployment specs for this service
    specs?: ServiceGroupDeploymentSpecs;
    // Labels defined by the user.
    labels?: KeyValue;
    // all the global fqdn of the instances of the group
    global_fqdn?: string[];
}
