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

import { InboundNetworkInterface } from '../interfaces/inbound-network-interface';
import { OutboundNetworkInterface } from '../interfaces/outbound-network-interface';
import { KeyValue } from '../interfaces/key-value';
import { SecurityRule } from '../interfaces/security-rule';

export abstract class Application {
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id?: string;
    /**
     * AppDescriptorId with the application descriptor identifier.
     */
    app_descriptor_id?: string;
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

    abstract getId(): string;
}
