import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockGroupList, mockGroupApiKey } from '../utils/mocks';

@Component({
  selector: 'app-device-group-created',
  templateUrl: './device-group-created.component.html',
  styleUrls: ['./device-group-created.component.scss']
})
export class DeviceGroupCreatedComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * List of available groups
   */
  group: any;

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
    const mock = localStorage.getItem(LocalStorageKeys.createdGroupMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.group = mockGroupList;
    // this.group.device_group_api_key = mockGroupApiKey;
    // Initialization to avoid null in view
    // Default initialization
    this.loadedData = false;
  }

  ngOnInit() {
    if (this.organizationId !== null) {
      this.backend.getGroups(this.organizationId)
      .subscribe(group => {
          this.group = group;
          if (!this.loadedData) {
            this.loadedData = true;
          }
      });
    }
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

}
