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

/**
 * Node entity representing a single node of the architecture that executes application instances.
 */
import { KeyValue } from './key-value';

export interface Node {
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id: string;
    /**
     * ClusterId with the associated cluster identifier the node is assigned to.
     */
    cluster_id: string;
    /**
     * Id with the node identifier.
     */
    node_id: string;
    /**
     * Ip with the node IP.
     */
    ip: string;
    /**
     * Labels for the node.
     */
    labels: KeyValue;
    /**
     * StatusName of the node based on monitoring information.
     */
    status_name: string;
    /**
     * StateName of assignation of the node.
     */
    state_name: string;
}
