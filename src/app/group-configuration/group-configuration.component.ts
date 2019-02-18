import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockGroupList } from '../utils/mocks';

@Component({
  selector: 'app-group-configuration',
  templateUrl: './group-configuration.component.html',
  styleUrls: ['./group-configuration.component.scss']
})
export class GroupConfigurationComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID, default connectivity and enabled or disbled option
   */
  organizationId: string;
  defaultConnectivity: boolean;
  enabled: boolean;
  name: string;

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
    const mock = localStorage.getItem(LocalStorageKeys.configGroupMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    // Default initialization
    // group is initialized by devices group component
    this.defaultConnectivity = false;
    this.enabled = false;
  }

  ngOnInit() {
  }

  /**
   *  Request to save the group data modifications
   */
  saveGroupChangesl() {
    const groupData = {
      name: this.name,
      enabled: this.enabled,
      default_device_connectivity: this.defaultConnectivity,
      organization_id: this.organizationId,
    };
    this.backend.updateGroup(this.organizationId, groupData)
    .subscribe(response => {
      this.notificationsService.add({
        message: 'The group ' + this.name + ' has been edited',
        timeout: 10000
      });
      this.bsModalRef.hide();
    }, error => {
      this.notificationsService.add({
        message: error.error.message,
        timeout: 10000
      });
      this.bsModalRef.hide();
    });
    this.bsModalRef.hide();
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}
