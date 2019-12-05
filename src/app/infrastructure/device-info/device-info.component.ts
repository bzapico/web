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
import { Component, OnInit } from '@angular/core';
import { Backend } from '../../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { TranslateService } from '@ngx-translate/core';
import { KeyValue } from '../../definitions/interfaces/key-value';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html'
})
export class DeviceInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization id, device group ID, device ID, created, labels and status
   */
  organizationId: string;
  deviceGroupId: string;
  deviceId: string;
  created: number;
  labels: KeyValue;
  status: string;
  enabled: boolean;
  groupName: string;
  /**
   * List of available devices groups
   */
  groups: any[];
  /**
   * Hold request error message or undefined
   */
  requestError: string;
  /**
   * Model that holds onclose method defined in Infrastructure component
   */
  onClose: any;
  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.deviceInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.loadedData = false;
  }

  ngOnInit() {
    this.backend.getGroups(this.organizationId)
    .subscribe(response => {
      if (response.groups) {
        this.groups = response.groups || [];
        this.groupName = this.getGroupName();
      }
    }, errorResponse => {
      this.loadedData = true;
    });
  }

  /**
   * Locate the name of a group through an id
   * @param deviceGroupId group id
   */
  getGroupName() {
    if (this.groups && this.groups.length > 0) {
      const index = this.groups.map(x => x.device_group_id).indexOf(this.deviceGroupId);
      if (index !== -1) {
        this.loadedData = true;
        return this.groups[index].name;
      }
    }
    return this.translateService.instant('infrastructure.device.notFound');
  }
  /**
   * Create a new JavaScript Date object based on the timestamp
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate(timestamp: number) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const formatedDate = month + '/' + day + '/' + year;
    return formatedDate;
  }
  /**
   * Go to devices group view
   */
  goToDevices() {
    const groupId = this.deviceGroupId;
    this.onClose(groupId);
    this.bsModalRef.hide();
  }
}
