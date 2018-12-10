import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { Backend } from '../definitions/interfaces/backend';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id, user role, name and email
   */
  password: string;
  passwordConfirm: string;

  errorMessages: string[];

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    // const mock = localStorage.getItem(LocalStorageKeys.passwordMock) || null;
    // check which backend is required (fake or real)
    // if (mock && mock === 'true') {
    //   this.backend = mockupBackendService;
    // } else {
    //   this.backend = backendService;
    // }
  }

  ngOnInit() {
    this.errorMessages = [];
  }

  /**
   * Request to save the password data modifications
   */
  saveNewPassword() {

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

    /**
   * Validates user data
   * @param form Form with user data
   */
  checkFormFields(form: FormGroup) {
    this.errorMessages = [];

    if (form.controls.password.invalid) {
      if (form.controls.password.errors.required) {
        this.errorMessages.push('Password is required');
      }
      if (form.controls.password.errors.minlength) {
        this.errorMessages.push('Password must have more than 6 characters');
      }
    }
    if (form.controls.newPassword.invalid) {
      if (form.controls.newPassword.errors.required) {
        this.errorMessages.push('A new password is required');
      }
      if (form.controls.newPassword.errors.minlength) {
        this.errorMessages.push('The new password must have more than 6 characters');
      }
    }
    if (form.controls.newPassword.value !== form.controls.confirmNewPassword.value) {
      this.errorMessages.push('New password and confirm password are not the same one');
    }
  }


  /**
   * Outputs the error messages in the required format, showing the first one
   * @param errors String containing the errors
   */
  formatValidationOutput(errors: string[]) {
    if (this.errorMessages.length === 1) {
      return {
        msg: this.errorMessages[0],
        errors: this.errorMessages
      };
    } else if (this.errorMessages.length > 0) {
      return {
        msg: this.errorMessages[0] + ' +' + (this.errorMessages.length - 1) + ' errors',
        errors: this.errorMessages
      };
    } else {
      return {
        msg: '',
        errors: this.errorMessages
      };
    }
  }

  /**
   * Another string definition of an array
   * @param array Array of elements
   */
  arrayToString(array: any[]): string {
    let msg = '';
    array.forEach(element => {
      msg = msg + element.toLowerCase() + ', ';
    });
    msg = msg.slice(0, msg.length - 2);
    return msg;
  }

}


