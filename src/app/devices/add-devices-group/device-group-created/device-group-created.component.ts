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

@Component({
  selector: 'app-device-group-created',
  templateUrl: './device-group-created.component.html',
  styleUrls: ['./device-group-created.component.scss']
})
export class DeviceGroupCreatedComponent {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Loaded Data status
   */
  loadedData: boolean;
  /**
   * Model that hold organization ID
   */
  organizationId: string;
  /**
   * List of available devices groups
   */
  group: any[];
  /**
   * Holds the api key for the created group
   */
  groupApiKey: string;
  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.createdGroupMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // group is initialized by initial state triggered in add devices group component
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}
