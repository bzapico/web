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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Backend } from '../../definitions/interfaces/backend';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { NotificationsService } from '../../services/notifications.service';
import { ChangePasswordComponent } from '../../change-password/change-password.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  /**
   * Models that holds forms info
   */
  userInfoForm: FormGroup;
  loading: boolean;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Dialog title
   */
  title: string;
  /**
   * Text for the change password action button
   */
  buttonChangePassword: string;
  /**
   * Text for the delete user action button
   */
  buttonDeleteUser: string;
  /**
   * Models that hold user name, organization id, name, user email/ID and role selection
   */
  userName: string;
  organizationId: string;
  organizationName: string;
  email: string;
  role: string;
  userId: string;
  /**
   * Change password modal window reference
   */
  bsPasswordModalRef: BsModalRef;
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
    private translateService: TranslateService,
    private auth: AuthService,
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.userInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.title = this.translateService.instant('organization.userInfo');
    this.userName = this.translateService.instant('organization.loading');
    this.email = this.translateService.instant('organization.loading');
    this.buttonDeleteUser = this.translateService.instant('buttons.deleteUser');
    this.buttonChangePassword = this.translateService.instant('buttons.changePassword');
  }

  ngOnInit() {
    this.userInfoForm = this.formBuilder.group({
      userName: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      role: [{value: '', disabled: true}],
    });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.userInfoForm.controls; }
  /**
   *  Upon confirmation, deletes user
   * @param email A user to be deleted
   */
  deleteUser() {
    const deleteConfirm = confirm(this.translateService.instant('organization.deleteUser'));
    if (deleteConfirm) {
      if (this.organizationId !== null && this.email !== null) {
        this.backend.deleteUser(this.organizationId, this.email)
          .subscribe(response => {
            if (this.email === this.userId) {
              this.auth.logout();
            }
            this.notificationsService.add({
              message: this.translateService.instant('organization.userDeleted', { userMail: this.email })
            });
            this.bsModalRef.hide();
          }, error => {
            this.notificationsService.add({
              message: error.error.message,
              type: 'warning'
            });
          });
      }
    }
  }
  /**
   * Opens the modal view that holds change password editable component
   */
  openChangePassword() {
    const initialState = {
      organizationId: this.organizationId,
      email: this.email
    };
    this.bsPasswordModalRef =
      this.modalService.show(ChangePasswordComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsPasswordModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
}
