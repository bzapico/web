import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { TranslateService } from '@ngx-translate/core';

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
   * Model that hold organization ID, default connectivity and enabled or disabled option
   */
  organizationId: string;
  defaultConnectivity: boolean;
  enabled: boolean;
  name: string;
  device_group_id: string;

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
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.configGroupMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
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
  saveGroupChanges() {
    const groupData = {
      update_enabled: true,
      update_device_connectivity: true,
      enabled: this.enabled,
      default_device_connectivity: this.defaultConnectivity,
      name: this.name,
      device_group_id: this.device_group_id
    };
    this.backend.updateGroup(this.organizationId, groupData)
    .subscribe(response => {
      this.group = response;
      this.notificationsService.add({
        message: this.translateService.instant('devices.add.saveGroupMessage', { groupName: this.name })
      });
      this.bsModalRef.hide();
    }, error => {
      this.notificationsService.add({
        message: error.error.message,
        type: 'warning'
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
