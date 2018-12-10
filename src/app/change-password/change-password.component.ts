import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { Backend } from '../definitions/interfaces/backend';
import { FormGroup } from '@angular/forms';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

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
   * Models that hold organization id, user id, and passwords
   */
  userId: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  organizationId: string;

  /**
   * Holds the error messages
   */
  errorMessages: string[];

  constructor(
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
    this.errorMessages = [];
  }

  /**
   * Request to save changes in the user password
   * @param form Form containing the user input
   */
  saveNewPassword(form: FormGroup) {
    const passwordChange = {
      email: this.userId,
      password: form.value.password,
      new_password: form.value.newPassword
    };
    this.backend.resetPassword(this.organizationId, passwordChange)
      .subscribe(response => {
        this.notificationsService.add({message: 'Password changed successfully'});
        this.bsModalRef.hide();
      }, error => {
        if (error && error.error && error.error.message) {
          this.errorMessages.push(error.error.message);
        }
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
    if (this.errorMessages.length === 0) {
      this.saveNewPassword(form);
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


