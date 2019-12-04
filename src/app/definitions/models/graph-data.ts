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

import { GraphNode } from '../interfaces/graph-node';
import { GraphLink } from '../interfaces/graph-link';

export class GraphData {

    private _nodes: GraphNode[];
    private _links: GraphLink[];

    constructor(nodes: GraphNode[], links: GraphLink[]) {
        this._nodes = nodes;
        this._links = links;
    }

    get nodes(): GraphNode[] {
        return this._nodes;
    }

    set nodes(value: GraphNode[]) {
        this._nodes = value;
    }

    get links(): GraphLink[] {
        return this._links;
    }

    set links(value: GraphLink[]) {
        this._links = value;
    }

    reset(nodes: GraphNode[], links: GraphLink[]) {
        this._nodes = nodes;
        this._links = links;
    }
}
