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

// tslint:disable:no-any
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ServicesStatus } from '../../definitions/enums/services-status.enum';
import { KeyValue } from '../../definitions/interfaces/key-value';
import { SecurityRule } from '../../definitions/interfaces/security-rule';

@Component({
  selector: 'app-info-detailed',
  templateUrl: './app-info-detailed.component.html',
  styleUrls: ['./app-info-detailed.component.scss']
})
export class AppInfoDetailedComponent {
  /**
   * Data models for app related information
   */
  organizationId: string;
  appDescriptorId: string;
  appInstanceId: string;
  name: string;
  groups: any[];
  statusName: string;
  labels: KeyValue;
  rules: SecurityRule[];
  openFromInstance: boolean;
  openFromRegistered: boolean;
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(public bsModalRef: BsModalRef) {}

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
  /**
   * Checks if the service status requires an special css class
   * @param status Service status name
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
        return className.toLowerCase() === ServicesStatus.ServiceWaiting;
    }
  }
  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName (rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }
  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}
