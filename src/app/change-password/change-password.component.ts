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
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { Backend } from '../definitions/interfaces/backend';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  /**
   * Models that holds forms info
   */
  changePasswordForm: FormGroup;
  submitted = false;
  loading: boolean;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization id, user id, and passwords
   */
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  organizationId: string;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.passwordMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [''],
    });
  }

  /**
   * Custom validator for checking the passwords,
   * @param group passwords group
   */
  samePasswords(group) {
    const newPassword = group.newPassword.value;
    const passwordConfirm = group.passwordConfirm.value;
    return newPassword === passwordConfirm ? true : false;
  }
  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.changePasswordForm.controls; }
  /**
   * Request to save changes in the user password
   * @param f Form containing the user input
   */
  saveNewPassword(f) {
    this.submitted = true;
    if (!this.loading
      && !f.passwordConfirm.invalid
      && !f.password.invalid
      && !f.newPassword.invalid
      && f.newPassword.value === f.passwordConfirm.value) {
      this.loading = true;
      const passwordChange = {
        passwordConfirm: f.passwordConfirm.value,
        password: f.password.value,
        new_password: f.newPassword.value,
        email: this.email
      };
      this.backend.resetPassword(this.organizationId, passwordChange)
        .subscribe(() => {
          this.loading = false;
          this.notificationsService.add({
            message: this.translateService.instant('changePass.passChanged'),
          });
          this.bsModalRef.hide();
        }, error => {
          this.loading = false;
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
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
