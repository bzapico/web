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
import { Backend } from '../../../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../../../services/backend.service';
import { MockupBackendService } from '../../../services/mockup-backend.service';
import { LocalStorageKeys } from '../../../definitions/const/local-storage-keys';
import { ServicesStatus } from '../../../definitions/enums/services-status.enum';
import { KeyValue } from '../../../definitions/interfaces/key-value';
import {ServiceGroupDeploymentSpecs} from '../../../definitions/interfaces/service-group-deployment-specs';

@Component({
  selector: 'app-service-instances-info',
  templateUrl: './service-instances-info.component.html',
  styleUrls: ['./service-instances-info.component.scss']
})
export class ServiceInstancesInfoComponent {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Data models for instances related information
   */
  name: string;
  image: string;
  serviceId: string;
  statusName: string;
  specs: ServiceGroupDeploymentSpecs;
  endpoints: any;
  exposedPorts: any;
  typeName: string;
  credentials: any;
  environmentVariables: any;
  labels: KeyValue;
  groupId: string;
  appDescriptorId: string;
  instanceId: string;
  deployAfter: string;
  deployedOnCluster: string;
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.serviceInstancesInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.loadedData = true;
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
        return (className.toLowerCase() === ServicesStatus.ServiceWaiting);
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
}
