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
import { Backend } from '../../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { NotificationsService } from '../../services/notifications.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-configuration',
  templateUrl: './group-configuration.component.html',
  styleUrls: ['./group-configuration.component.scss']
})
export class GroupConfigurationComponent {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold organization ID, default connectivity and enabled or disabled option
   */
  organizationId: string;
  defaultConnectivity: boolean;
  enabled: boolean;
  name: string;
  device_group_id: string;
  /**
   * List of available groups
   */
  group: any;
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
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.configGroupMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    // group is initialized by devices group component
    this.defaultConnectivity = false;
    this.enabled = false;
  }

  /**
   *  Request to save the group data modifications
   */
  saveGroupChanges() {
    const groupData = {
      update_enabled: true,
      update_device_connectivity: true,
      enabled: this.enabled,
      default_device_connectivity: this.defaultConnectivity,
      name: this.name,
      device_group_id: this.device_group_id
    };
    this.backend.updateGroup(this.organizationId, groupData)
    .subscribe(response => {
      this.group = response;
      this.notificationsService.add({
        message: this.translateService.instant('devices.add.saveGroupMessage', { groupName: this.name })
      });
      this.bsModalRef.hide();
    }, error => {
      this.notificationsService.add({
        message: error.error.message,
        type: 'warning'
      });
      this.bsModalRef.hide();
    });
    this.bsModalRef.hide();
  }
  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}
