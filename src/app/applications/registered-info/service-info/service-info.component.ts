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
import { Backend } from '../../../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../../../services/backend.service';
import { MockupBackendService } from '../../../services/mockup-backend.service';
import { LocalStorageKeys } from '../../../definitions/const/local-storage-keys';
import { KeyValue } from '../../../definitions/interfaces/key-value';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent {
  /**
   * Backend reference
   */
  backend: Backend;
  name: string;
  image: string;
  serviceId: string;
  specs: any;
  exposedPorts: any;
  endpoints: any;
  groupId: string;
  appDescriptorId: string;
  labels: KeyValue;
  environmentVariables: string;
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
}
