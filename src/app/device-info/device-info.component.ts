import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {

  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id, device group ID, device ID, created, labels and status
   */
  organizationId: string;
  deviceGroupId: string;
  deviceId: string;
  created: string;
  labels: any;
  status: string;
  enabled: boolean;
  groupName: string;

  /**
   * List of available devices groups
   */
  groups: any[];

  /**
   * Hold request error message or undefined
   */
  requestError: string;

  /**
   * Model that holds onclose method defined in Infrastructure component
   */
  onClose: any;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.deviceInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.loadedData = false;
   }

  ngOnInit() {
    this.backend.getGroups(this.organizationId)
    .subscribe(response => {
      if (response.groups) {
        this.groups = response.groups || [];
        this.groupName = this.getGroupName();
      }
    }, errorResponse => {
      this.loadedData = true;
    });
  }

  /**
   * Locate the name of a group through an id
   * @param deviceGroupId group id
   */
  getGroupName() {
    if (this.groups && this.groups.length > 0) {
      const index = this.groups.map(x => x.device_group_id).indexOf(this.deviceGroupId);
      if (index !== -1) {
        this.loadedData = true;
        return this.groups[index].name;
      }
    }
    return 'Not found';
  }

  /**
   * Transforms objects to arrays to be parsed to string and performed in the view
   * @param object Key-value map that contains the object
   */
  objectToString(object: any) {
    if (!object) {
      return ['--'];
    }
    return Object.entries(object);
  }

  /**
   * Create a new JavaScript Date object based on the timestamp 
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate(timestamp: any) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const formatedDate = month + '/' + day + '/' + year;

    return formatedDate;
  }

  /**
   * Go to devices group view
   */
 goToDevices() {
    const groupId = this.deviceGroupId;
    this.onClose(groupId);
    this.bsModalRef.hide();
  }
}

