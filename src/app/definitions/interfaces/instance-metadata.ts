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

// This is a common metadata entity that collects information for a deployed instance. This instance can be a
// service instance or a service group instance.

import { KeyValue } from './key-value';

export interface InstanceMetadata {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // AppInstanceId with the application instance identifier.
    app_instance_id?: string;
    // Identifier of the monitored entity. This generic id can be used to monitor different kinds of objects.
    monitored_instance_id?: string;
    // Type of instance this metadata refers to
    type_name?: string;
    // List of instances supervised by this metadata structure
    instances_id?: string[];
    // Number of desired replicas specified in the descriptor
    desired_replicas?: number;
    // Number of available replicas for this instance
    available_replicas?: number;
    // Number of unavailable replicas for this descriptor
    unavailable_replicas?: number;
    // Status of every item monitored by this metadata entry
    status_name?: KeyValue;
    // Relevant information for every monitored instance
    info?: KeyValue;
}
