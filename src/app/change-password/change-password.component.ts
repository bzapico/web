import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { Backend } from '../definitions/interfaces/backend';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
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
  userId: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  organizationId: string;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.passwordMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [''],
      role: ['', [Validators.required]],
    });
  }

  /**
   * Custom validator for checking the passwords,
   * @param group passwords group
   */
  samePasswords(group: FormGroup) {
    const newPassword = group.controls.newPassword.value;
    const passwordConfirm = group.controls.passwordConfirm.value;
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
    const passwordChange = {
      email: f.email.value,
      password: f.password.value,
      new_password: f.newPassword.value,
    };
    this.loading = true;
    this.backend.resetPassword(this.organizationId, passwordChange)
      .subscribe(response => {
        this.notificationsService.add({message: 'Password changed successfully'});
        this.bsModalRef.hide();
      });
  }

  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm('Discard changes?');
      if (discard) {
        this.bsModalRef.hide();
      } else {
        // Do nothing
      }
    } else {
      this.bsModalRef.hide();
    }
  }

}


