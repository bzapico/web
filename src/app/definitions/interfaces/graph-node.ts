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

import { NodeType } from '../enums/node-type.enum';
import { ConnectionInstance } from './connection-instance';

export interface GraphNode {
    id: string;
    app_descriptor_id?: string;
    label: string;
    type: NodeType.Clusters | NodeType.Instances;
    tooltip: string;
    group: string;
    inbound_connections?: ConnectionInstance[];
    outbound_connections?: ConnectionInstance[];
}
