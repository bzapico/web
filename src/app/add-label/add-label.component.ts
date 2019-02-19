import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id
   */
  organizationId: string;
  labelName: string;
  labelValue: string;

  errorMessages: string[];

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
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.addLabelMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.errorMessages = [];
    }

  ngOnInit() {
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
   * Validates user data
   * @param form Form with user data
   */
  checkFormFields(form: FormGroup) {
    this.errorMessages = [];
    if (form.controls.name.invalid) {
      if (form.controls.name.errors.required) {
        this.errorMessages.push('Label name is required');
      }
      if (form.controls.name.errors.pattern) {
        this.errorMessages.push('Invalid format: cannot contain special characers as _*/.`');
      }
    }
    if (form.controls.value.invalid) {
      if (form.controls.value.errors.required) {
        this.errorMessages.push('Label value is required');
      }
      if (form.controls.value.errors.pattern) {
        this.errorMessages.push('Invalid format: cannot contain special characers as _*/.`');
      }
    }
    if (this.errorMessages.length === 0) {
      this.addLabel(form);
    }
  }

  /**
   * Request to add a new label
   * @param form Form object reference
   */
  addLabel(form) {
    if (this.errorMessages.length === 0) {
      const user = {
        name: form.value.name,
        value: form.value.value,
      };
    //   this.backend.addLabel(this.organizationId, label)
    //   .subscribe(response => {
    //     this.notificationsService.add({
    //       message: 'Added new label to Cluster 1'
    //     });
    //     this.bsModalRef.hide();
    //   }, error => {
    //     this.notificationsService.add({
    //       message: 'ERROR: ' + error.error.message,
    //       timeout: 10000
    //     });
    //   });
    }
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
