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
import { Backend } from '../../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { NotificationsService } from '../../services/notifications.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { DeviceGroupCreatedComponent } from './device-group-created/device-group-created.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * It sets the timeout for errors
 */
const TIMEOUT_ERROR = 5000;

@Component({
  selector: ' add-device-group',
  templateUrl: './add-devices-group.component.html',
  styleUrls: ['./add-devices-group.component.scss']
})
export class AddDevicesGroupComponent implements OnInit {
  /**
   * Models that holds forms info
   */
  addGroupForm: FormGroup;
  submitted = false;
  loading: boolean;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization id
   */
  organizationId: string;
  defaultConnectivity: boolean;
  groupApiKey: string;
  enabled: boolean;
  /**
   *  Models that hold group data
   */
  device_group_id: string;
  name: string;
  default_device_connectivity: boolean;
  device_group_api_key: string;
  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
    this.defaultConnectivity = true;
    this.enabled = true;
    this.groupApiKey = this.translateService.instant('organization.loading');
    const mock = localStorage.getItem(LocalStorageKeys.addGroupMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    this.device_group_id = this.translateService.instant(
      'organization.loading'
    );
    this.name = this.translateService.instant('organization.loading');
    this.device_group_api_key = this.translateService.instant(
      'organization.loading'
    );
  }

  ngOnInit() {
    this.addGroupForm = this.formBuilder.group({
      groupName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[A-Za-z0-9_]+$')
        ]
      ]
    });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() {
    return this.addGroupForm.controls;
  }
  /**
   * Requests to create a new device group
   * Create device group opens the device group created component modal  window confirmation
   * @param form Form with the group input data
   */
  addGroup(form) {
    this.submitted = true;
    if (!form.groupName.errors) {
      this.loading = true;
      const groupData = {
        name: form.groupName.value,
        enabled: this.enabled,
        default_device_connectivity: this.defaultConnectivity,
        organization_id: this.organizationId
      };
      this.backend.addGroup(this.organizationId, groupData).subscribe(
        response => {
          this.loading = false;
          const initialState = {
            groupApiKey: response.device_group_api_key
          };
          this.bsModalRef.hide();
          this.bsModalRef = this.modalService.show(
            DeviceGroupCreatedComponent,
            { initialState, backdrop: 'static', ignoreBackdropClick: false }
          );
          this.bsModalRef.content.closeBtnName = 'Close';
        },
        error => {
          this.loading = false;
          this.notificationsService.add({
            message: this.translateService.instant('infrastructure.error', {
              error: error.error.message
            }),
            timeout: TIMEOUT_ERROR,
            type: 'warning'
          });
        }
      );
    }
  }
  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm(
        this.translateService.instant('modals.discardChanges')
      );
      if (discard) {
        this.bsModalRef.hide();
      }
    } else {
      this.bsModalRef.hide();
    }
  }
}
