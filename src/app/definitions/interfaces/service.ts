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

// Service structure that represents a microservice of a given application and that can be deployed on its own.
import { ImageCredentials } from './image-credentials';
import { Port } from './port';
import { ConfigFile } from './config-file';
import { ServiceType } from '../enums/service-type.enum';
import { KeyValue } from '@angular/common';
import { DeploySpecs } from './deploy-specs';

export interface Service {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // Service group id this service belongs to.
    service_group_id?: string;
    // Service id
    service_id?: string;
    // Name of the service.
    name?: string;
    // ServiceType represents the underlying technology of the service to be launched.
    type?: ServiceType;
    // Image contains the URL/name of the image to be executed.
    image?: string;
    // ImageCredentials with the data required to access the repository the image is available at.
    credentials?: ImageCredentials;
    // DeploySpecs with the resource specs required by the service.
    specs?: DeploySpecs;
    // Storage restrictions
    storage?: Storage[];
    // ExposedPorts contains the list of ports exposed by the current service.
    exposed_ports?: Port[];
    // EnvironmentVariables defines a key-value map of environment variables and values that will be passed to all
    // running services.
    environment_variables?: KeyValue<string, string>;
    // Configs contains the configuration files required by the service.
    configs?: ConfigFile[];
    // Labels with the user defined labels.
    labels?: KeyValue<string, string>;
    // DeployAfter contains the list of service names that must be running before launching this service.
    deploy_after?: string[];
    // Run arguments
    run_arguments?: string[];
}
