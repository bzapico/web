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
import { AppStatus } from 'src/app/definitions/enums/app-status.enum';
import { ToolsService } from 'src/app/tools/tools.service';

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
  /**
   * Models that hold the cluster and instances enums
   */
  clusterStatusList = ClusterStatus;
  appStatusList = AppStatus;
  /**
   * Method that returns an array of a given object's cluster and instances enums property
   */
  keys = Object.keys;
  constructor(
    public bsModalRef: BsModalRef,
    private toolsService: ToolsService,
  ) { }

  /**
   * Return an specific dot color depending on the node status
   * @param status Status name
   */
  getStatusDotColor(status: string): {'background-color': string, border?: string} {
    return this.toolsService.getStatusDotColor(status);
  }
}
