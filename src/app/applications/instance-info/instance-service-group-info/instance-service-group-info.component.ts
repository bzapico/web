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

import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ServicesStatus } from '../../../definitions/enums/services-status.enum';

@Component({
  selector: 'instance-service-group-info',
  templateUrl: './instance-service-group-info.component.html',
  styleUrls: ['./instance-service-group-info.component.scss']
})
export class InstanceServiceGroupInfoComponent implements OnInit {
  /**
   * Data models for instance service group related information
   */
  name: string;
  organizationId: string;
  appDescriptorId: string;
  appInstanceId: string;
  policyName: string;
  serviceGroupId: string;
  serviceGroupInstanceId: string;
  serviceInstances: any;
  status: any;
  globalFqdn: string;
  metadata: any;
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    ) {
    // Default initialization
    this.loadedData = false;
  }

  ngOnInit() {
    this.status = this.status || '';
  }

  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName(rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }
  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case ServicesStatus.ServiceRunning:
        return className.toLowerCase() === ServicesStatus.ServiceRunning;
      case ServicesStatus.ServiceError:
        return className.toLowerCase() === ServicesStatus.ServiceError;
      case ServicesStatus.ServiceWaiting:
        return className.toLowerCase() === ServicesStatus.ServiceWaiting;
      default:
        return (className.toLowerCase() === ServicesStatus.ServiceWaiting);
    }
  }
  /**
   * Adds https in case of being required
   * @param endpoint String containing the endpoint
   */
  getEndpointHref(endpoint: string) {
    let URL = '';
    if (!endpoint.startsWith('http') && !endpoint.startsWith('https')) {
      URL = 'http://' + endpoint;
    } else {
      URL = endpoint;
    }
    return URL;
  }
}
