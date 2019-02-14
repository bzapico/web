import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockDevicesChart } from '../utils/mocks';
import { AddDevicesGroupComponent } from '../add-devices-group/add-devices-group.component';
import { GroupConfigurationComponent } from '../group-configuration/group-configuration.component';
import { Device } from '../definitions/interfaces/device';
import { Group } from '../definitions/interfaces/group';
import { UpdateEventsService } from '../services/update-events.service';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy  {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID and group ID
   */
  organizationId: string;

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * List of available devices
   */
  devices: any[];

  /**
   * List of available devices groups
   */
  groups: any[];

  /**
   * Object that holds add device group request
   */
  deviceGroupData: any;

  /**
   * Models that hold device group id
   */
  deviceGroupId: string;

  /**
   * Models that hold the active group
   */
  activeGroupId: string;

  /**
   * List of active displayed group
   */
  displayedGroups: any[];

  /**
   * Devices list chuncked in sub-lists
   */
  chunckedDevices: any[];

  /**
   * List of labels
   */
  labels: any[];

  /**
   * Count of total devices for summary card
   */
  devicesCount: number;

  /**
   * Interval reference
   */
  refreshIntervalRef: any;

  /**
   * Refresh ratio reference
   */
  REFRESH_RATIO = 20000; // 20 seconds

  /**
   * Count of num max for displayed groups
   */
  DISPLAYED_GROUP_MAX = 3;

  /**
   * Charts references
   */
  mockDevicesChart: any;
  devicesChart: any;

  /**
   * Reference for the service that allows the add group component
   */
  modalRef: BsModalRef;

  /**
   * Hold request error message or undefined
   */
  requestError: string;

  /**
   * Line Chart options
   */
  gradient = true;
  colorScheme = {
    domain: ['#0937FF', '#949494']
  };
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  showGridLines = true;
  showRefLines = true;
  showRefLabels = false;
  schemeType = 'ordinal';
  rangeFillOpacity = 0.0;
  referenceLines = [
    {
      name: 'xline',
      value: 0
    }
  ];

  /**
   * NGX-Charts object-assign required object references (for rendering)
   */
  devicesTimelineChart: any;

  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  reverse: boolean;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;

  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;

  /**
   * Checkbox reference
   */
  checkBox = true;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private updateService: UpdateEventsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.devicesMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    // Default initialization
    this.devices = [];
    this.groups = [];
    this.displayedGroups = [];
    this.chunckedDevices = [];
    this.activeGroupId = 'ALL';
    this.labels = [];
    this.loadedData = false;
    this.devicesCount = 0;
    this.devicesChart = [{name: 'Running devices %', series: []}];
    this.requestError = '';
    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.searchTerm = '';
    // Filter field
    this.filterField = false;

    /**
     * Charts reference init
     */
    Object.assign(this, { mockDevicesChart });
  }

  ngOnInit() {
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
        this.updateGroupsList(this.organizationId);
        this.updateDevicesList(this.organizationId);
        this.refreshIntervalRef = setInterval(() => {
          this.updateGroupsList(this.organizationId);
          this.updateDevicesList(this.organizationId);
        },
        this.REFRESH_RATIO); // Refresh each 60 seconds
    }
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }


  countDevices() {
    let temporalCount = 0;

    this.devices.forEach(group => {

      temporalCount = group.length + temporalCount;

    });

    this.devicesCount = temporalCount;
  }
  /**
   * Requests an updated list of available devices group to update the current one
   * @param organizationId Organization identifier
   */
  updateGroupsList(organizationId: string) {
    if (organizationId !== null) {
      // Requests an updated devices group list
      this.backend.getGroups(this.organizationId)
      .subscribe(response => {
        this.groups = response || [];
        if (this.displayedGroups.length === 0 && this.groups.length > 0) {
          for (let index = 0; index < this.groups.length && index < this.DISPLAYED_GROUP_MAX; index++) {
            this.displayedGroups.push(this.groups[index]);
          }
        }
        if (!this.loadedData) {
          this.loadedData = true;
        }
      }, errorResponse => {
          this.loadedData = true;
          this.requestError = errorResponse.error.message;
        });
    }
  }

  /**
   * Requests an updated list of devices to update the current one
   */
  updateDevicesList(organizationId: string) {
    if (organizationId !== null) {
      // Request to get devices
      this.backend.getDevices(this.organizationId, this.deviceGroupId)
      .subscribe(response => {
          this.devices = response.devices || [];
          this.updateConnectedDevicesLineChart(this.devices);
          this.countDevices();
          if (!this.loadedData) {
            this.loadedData = true;
          }
      }, errorResponse => {
          this.loadedData = true;
          this.requestError = errorResponse.error.message;
        });
    }
  }

  /**
   * Fulfill gaps in device object to avoid data binding failure
   * @param device Device object
   */
  preventEmptyFields(device: Device) {
    if (!device.register_since) {
      device.register_since = '-';
    }
    if (!device.labels) {
      device.labels = '-';
    }
    if (!device.register_since) {
      device.register_since = '-';
    }
    if (!device.enabled) {
      device.enabled = true;
    }
  }

  /**
   * Updates timeline chart
   * @param devices devices array
   */
  updateConnectedDevicesLineChart(devices) {
    let connectedDevicesCount = 0;
    devices.forEach(group => {
      group.forEach(device => {
        if (device && device.enabled.toLowerCase() === 'connected') {
          connectedDevicesCount += 1;
        }
      });
    });

    const now = new Date(Date.now());
    let minutes: any = now.getMinutes();
    let seconds: any = now.getSeconds();
    if (minutes < 10) {
      minutes = '0' + now.getMinutes();
    }
    if (seconds < 10) {
      seconds = '0' + now.getSeconds();
    }
    const entry = {
      'value': connectedDevicesCount / devices.length * 100,
      'name':  now.getHours() + ':' + minutes + ':' + seconds
    };

    if (this.devicesChart[0].series.length > 5) {
      // Removes first element
      this.devicesChart[0].series.shift();
    }
    this.devicesChart[0].series.push(entry);
    this.devicesChart = [...this.devicesChart];
  }

  /**
   * Parse to string labels map
   * @param labels Key-value map that contains the labels
   */
  labelsToString(labels: any) {
    if (!labels || labels === '-') {
      return ;
    }
    return Object.entries(labels);
  }

  /**
   * Checks if the cluster status requires an special css class
   * @param status Cluster status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case 'connected': {
        if (className.toLowerCase() === 'connected') {
          return true;
        }
        break;
      }
      case 'disconnected': {
        if (className.toLowerCase() === 'disconnected') {
          return true;
        }
        break;
      }
     default: {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        return false;
      }
    }
  }

  /**
   * Sortby pipe in the component
   */
  setOrder(categoryName: string) {
    if (this.sortedBy === categoryName) {
      this.reverse = !this.reverse;
      this.filterField = false;
    }
    this.sortedBy = categoryName;
    this.filterField = true;
  }

  /**
   * Reset all the filters fields
   */
  resetFilters() {
    this.filterField = false;
    this.searchTerm = '';
    this.sortedBy = '';
  }

  /**
   * Gets the category headers to add a class
   * @param categoryName class for the header category
   */
  getCategoryCSSClass(categoryName: string) {
    if (this.sortedBy === '') {
      return 'default';
    } else {
      if (this.sortedBy === categoryName) {
        return 'enabled';
      } else if (this.sortedBy !== categoryName) {
        return 'disabled';
      }
    }
  }

  /**
   * Checkbox
   */
  enableSwitcher(device) {
   device.enabled = !device.enabled;
   // backend call
  }

  /**
   * Changes active group
   * @param deviceGroupId device group identifier
   */
  changeActiveGroup(deviceGroupId: string) {
    this.activeGroupId = deviceGroupId;
  }

  /**
   * Checks if the device group is active to show in the tabs
   * @param deviceGroupId device group identifier
   */
  amIactive(deviceGroupId) {
    if (deviceGroupId === this.activeGroupId) {
      return 'active';
    }
    // Empty class when is not active
    return '';

  }

  /**
   * Checks if there are less than a maximum number groups in groups list
   * @param groups groups list identifier
   */
  haveIGroups(groups) {
    if (groups.length > this.DISPLAYED_GROUP_MAX) {
      return '';
    }
    // There are not enough groups
    return 'opacity';
  }

  /**
   * Devices tabs group list swipe left arrow button functionality
   */
  swipeLeft() {
    const index = this.groups.map(x => x.device_group_id).indexOf(this.displayedGroups[0].device_group_id);
    // If the element is found and it is not the first element
    if (index !== -1 && index !== 0) {
      // Pushes in the beginning of displaye groups array, the rquiered group elment
      this.displayedGroups.unshift(this.groups[index - 1]);
      this.displayedGroups.pop();
    }
  }

  /**
   * Devices tabs group list swipe right arrow button functionality
   */
  swipeRight() {
    const index = this.groups.map(x => x.device_group_id).indexOf(this.displayedGroups[this.DISPLAYED_GROUP_MAX - 1].device_group_id);
    // If the element is found and if it is not the last element
    if (index !== -1 && index !== this.groups.length - 1) {
      this.displayedGroups.shift();
      this.displayedGroups.push(this.groups[index + 1]);
    }
  }

  /**
   * Opens the modal view that holds add group component
   * @param group group object
   */
  addDevicesGroup(group: Group) {
    const initialState = {
      organizationId: this.organizationId,
    };
    let allowHide = true;
    const randomGroupStringGenerator = 'GROUP ' + this.generateRandomNumber();

    this.modalRef = this.modalService.show(AddDevicesGroupComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      if (allowHide === true) {
        this.groups.push({
          name: randomGroupStringGenerator, 
          device_group_id: randomGroupStringGenerator,
          organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
          update_enabled: '3',
          enabled: 'enabled',
          update_device_connectivity: '5',
          default_device_connectivity: '6',
          device_group_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c77'
          });
        if (this.displayedGroups.length < this.DISPLAYED_GROUP_MAX  ) {
          this.displayedGroups.push(this.groups[this.groups.length - 1]);
        }
        allowHide = false;
      }
    });
    this.changeActiveGroup('ALL');
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (100 - 1) + 1);
  }

  /**
   *  Upon confirmation, deletes devices group
   */
  deleteDevicesGroup() {
    const indexActive = this.groups.map(x => x.device_group_id).indexOf(this.activeGroupId);
    if (indexActive !== -1) {
      this.groups.splice(indexActive, 1);
    }
    if (this.displayedGroups.length > 0 ) {
      const indexDisplayed = this.displayedGroups.map(x => x.device_group_id).indexOf(this.activeGroupId);
      if (indexDisplayed !== -1) {
        // The last element of displayed groups id
        const lastElementId = this.displayedGroups[this.displayedGroups.length - 1].device_group_id;
        this.displayedGroups.splice(indexDisplayed, 1);

        // Index of the last displayed group element in groups
        const indexLastElement = this.groups.map(x => x.device_group_id).indexOf(lastElementId);
        if (indexLastElement !== -1) {
          if (this.groups[indexLastElement + 1]) {
            this.displayedGroups.push(this.groups[indexLastElement + 1]);
          } else {
            // The first element of displayed groups id
            const firstElementId = this.displayedGroups[0].device_group_id;
            // Index of the first displayed group element in groups
            const indexFirstElement = this.groups.map(x => x.device_group_id).indexOf(firstElementId);

            if (this.groups[indexFirstElement - 1]) {
              this.displayedGroups.unshift(this.groups[indexFirstElement - 1]);
            }
          }
        }
      }
    }
    this.changeActiveGroup('ALL');
  }

    // const deleteConfirm = confirm('Delete group?');
    // if (deleteConfirm) {
    //   if (this.organizationId !== null && this.deviceGroupId !== null) {
    //     this.backend.deleteDevicesGroup(this.organizationId, this.deviceGroupId)
    //       .subscribe(response => {
    //         this.notificationsService.add({
    //           message: 'Group ' + this.deviceGroupId + ' has been deleted',
    //           timeout: 10000
    //         });
    //         this.modalRef.hide();
    //       }, error => {
    //         this.notificationsService.add({
    //           message: error.error.message,
    //           timeout: 10000
    //         });
    //       });
    //   }
    // } else {
    //   // Do nothing
    // }

   /**
   * Opens the modal view that holds group configuration component
   */
  openGroupConfiguration() {
    const initialState = {
      organizationId: this.organizationId,
    };

    this.modalRef = this.modalService.show(GroupConfigurationComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { });
  }
}
