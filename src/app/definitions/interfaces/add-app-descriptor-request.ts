/*
 * Copyright 2019 Nalej
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SecurityRule } from './security-rule';
import { KeyValue } from './key-value';
import { InboundNetworkInterface } from './inbound-network-interface';
import { OutboundNetworkInterface } from './outbound-network-interface';
import { ServiceGroup } from './service-group';
import { AppParameter } from './app-parameter';

export interface AddAppDescriptorRequest {
    request_id?: string;
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id?: string;
    /**
     * Name of the application.
     */
    name?: string;
    /**
     * Rules that define the connectivity between the elements of an application.
     */
    rules?: SecurityRule[];
    /**
     * ConfigurationOptions defines a key-value map of configuration options.
     */
    configuration_options?: KeyValue;
    /**
     * EnvironmentVariables defines a key-value map of environment variables and values that will be passed to all running services.
     */
    environment_variables?: KeyValue;
    /**
     * Labels defined by the user.
     */
    labels?: KeyValue;
    /**
     * InboundNetInterfaces with a list of inbounds.
     */
    inbound_net_interfaces?: InboundNetworkInterface[];
    /**
     * OutboundNetInterfaces with a list of outbounds.
     */
    outbound_net_interfaces?: OutboundNetworkInterface[];
    /**
     * Groups with the Service collocation strategies.
     */
    groups?: ServiceGroup[];
    /**
     * AppParameter with the parameters definition of an application
     */
    parameters?: AppParameter[];
}
