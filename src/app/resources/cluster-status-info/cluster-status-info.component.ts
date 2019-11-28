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

import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ClusterStatus } from '../../definitions/enums/cluster-status.enum';
import { ToolsComponent } from 'src/app/tools/tools.component';

@Component({
  selector: 'cluster-status-info',
  templateUrl: './cluster-status-info.component.html',
  styleUrls: ['./cluster-status-info.component.scss']
})
export class ClusterStatusInfoComponent {
  /**
   * Models that hold organization id, cluster id, name
   */
  organizationId: string;

  statusList = ClusterStatus;

  constructor(
    public bsModalRef: BsModalRef,
  ) { }


  getStatusDotColor(status: string): {'background-color': string, border?: string} {
    const basicColor = {
      'background-color': ToolsComponent.STATUS_COLORS[status.toUpperCase()]
    };
    const basicBorderColor = ToolsComponent.STATUS_BORDER_COLORS[status.toUpperCase()];
    if (basicBorderColor) {
      basicColor['border'] = '1px ' + basicBorderColor + ' solid';
    }
    return basicColor;
  }
}
