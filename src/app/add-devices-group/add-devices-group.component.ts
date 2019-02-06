import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup } from '@angular/forms';
import { DeviceGroupCreatedComponent } from '../device-group-created/device-group-created.component';

@Component({
  selector: 'app-add-devices-group',
  templateUrl: './add-devices-group.component.html',
  styleUrls: ['./add-devices-group.component.scss']
})
export class AddDevicesGroupComponent implements OnInit {
  /**
   * Checkbox reference
   */
  checkBox = true;

  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id
   */
  organizationId: string;
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
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.addDevicesGroupMock) || null;
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
   * Requests to create a new device group
   * Create device group opens the device group created component modal  window confirmation
   * @param form Form object reference
   */
  addDevicesGroup(form) {
    if (this.errorMessages.length === 0) {
      const deviceGroupData = {
        name: form.value.name,
      };
      // this.backend.addDevicesGroup(this.organizationId, deviceGroupData)
      // .subscribe(response => {
      //   const initialState = {
      //     organizationId: this.organizationId,
      //   };
      //   this.bsModalRef =
      //     this.modalService.show(DeviceGroupCreatedComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
      //   this.bsModalRef.content.closeBtnName = 'Close';
      //   this.bsModalRef.hide();
      // }, error => {
      //   this.notificationsService.add({
      //     message: 'ERROR: ' + error.error.message,
      //     timeout: 10000
      //   });
      // });
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

  /**
   * Checkbox
   */
  enabled() {
    this.checkBox = !this.checkBox;
  }
}
