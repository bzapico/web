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

import { Component, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { GraphLink } from '../../definitions/models/graph-link';
import { GraphNode } from '../../definitions/interfaces/graph-node';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {

  @Input() links: GraphLink[];
  @Input() nodes: GraphNode[];
  @Input() orientation: string;
  @Input() autoZoom: boolean;
  @Input() autoCenter: boolean;
  @Input() enableZoom: boolean;

  curve = shape.curveBasis;

  constructor() {
    this.links = [];
    this.nodes = [];
  }

  /**
   * Return if the marker is required
   * @param link Link object
   */
  getMarker(link): string {
    if (!link.notMarker) {
      const index = this.nodes.map(x => x.id).indexOf(link.source);
      if (index !== -1) {
        if (this.nodes[index].id === this.nodes[index].group) {
          return '';
        } else {
          return 'url(#arrow)';
        }
      }
      return 'url(#arrow)';
    }
  }
}
