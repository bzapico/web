import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { DeviceGroupCreatedComponent } from '../device-group-created/device-group-created.component';

@Component({
  selector: 'app-add-devices-group',
  templateUrl: './add-devices-group.component.html',
  styleUrls: ['./add-devices-group.component.scss']
})
export class AddDevicesGroupComponent implements OnInit {
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
    this.defaultConnectivity = false;
    this.enabled = false;
    this.groupApiKey = 'Loading...';
    const mock = localStorage.getItem(LocalStorageKeys.addGroupMock) || null;
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
   * @param form Form with the group input data
   */
  addGroup(form) {
    if (this.errorMessages.length === 0) {
      const groupData = {
        name: form.value.name,
        enabled: this.enabled,
        default_device_connectivity: this.defaultConnectivity,
        organization_id: this.organizationId,
        device_group_api_key: this.groupApiKey
      };
      this.backend.addGroup(this.organizationId, groupData)
      .subscribe(response => {
        const initialState = {
          organizationId: this.organizationId,
          groupApiKey: this.groupApiKey
        };
        this.bsModalRef.hide();
        this.bsModalRef =
          this.modalService.show(DeviceGroupCreatedComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
        this.bsModalRef.content.closeBtnName = 'Close';
      }, error => {
        this.notificationsService.add({
          message: 'ERROR: ' + error.error.message,
          timeout: 10000
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
