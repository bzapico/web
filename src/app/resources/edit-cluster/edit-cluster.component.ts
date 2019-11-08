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
import { Backend } from '../../definitions/interfaces/backend';
import { NotificationsService } from '../../services/notifications.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { BackendService } from '../../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.scss']
})
export class EditClusterComponent implements OnInit {

  /**
   * Models that holds forms info
   */
  editClusterForm: FormGroup;
  submitted = false;
  loading: boolean;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization id, cluster id, name
   */
  organizationId: string;
  clusterId: string;
  clusterName: string;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.clusterEditMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.clusterName = this.translateService.instant('organization.loading');
  }

  ngOnInit() {
    this.editClusterForm = this.formBuilder.group({
      clusterName: ['',  [Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9-]+$')]],
    });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.editClusterForm.controls; }
  /**
   * Request to save the cluster data modifications
   * @param f Form object reference
   */
  saveClusterChanges(f) {
    this.submitted = true;
    if (this.organizationId !== null && this.clusterId !== null && !f.clusterName.errors ) {
      this.loading = true;
      this.backend.saveClusterChanges(this.organizationId, this.clusterId, {
        name: f.clusterName.value,
      })
        .subscribe(response => {
          this.clusterName = f.clusterName.value;
          this.loading = false;
          this.notificationsService.add({
            message: this.translateService.instant('resources.saveChanges', {cluster: this.clusterName }),
          });
          this.bsModalRef.hide();
        }, error => {
          this.loading = false;
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
          this.bsModalRef.hide();
        });
    }
  }
  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm(this.translateService.instant('modals.discardChanges'));
      if (discard) {
        this.bsModalRef.hide();
      }
    } else {
      this.bsModalRef.hide();
    }
  }
}
