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

  groupName: string;
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
   * List of available devices group
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
   * List of active devices group
   */
  activeDevicesGroup: any[];

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
   * Count of total devices groups for summary card
   */
  devicesGroupCount: number;

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
   * Reference for the service that allows the user info component
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
    this.devicesGroupCount = 0;
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
      this.loadedData = true;
      this.devicesCount = 5 ;
      this.devicesGroupCount = 6;
      this.groups = [
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'a1',
            update_enabled: '3',
            enabled: 'enabled',
            update_device_connectivity: '5',
            default_device_connectivity: '6',
            name: 'Group 1',
            device_group_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c77'
        },
        {
            organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
            device_group_id: 'b2',
            update_enabled: '3',
            enabled: 'disabled',
            update_device_connectivity: '5',
            default_device_connectivity: '6',
            name: 'Group 2',
            device_group_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c77'
        },
        {
          organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
          device_group_id: 'c3',
          update_enabled: '3',
          enabled: 'disabled',
          update_device_connectivity: '5',
          default_device_connectivity: '6',
          name: 'Group 3',
          device_group_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c77'
      },
      {
        organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
        device_group_id: 'd4',
        update_enabled: '3',
        enabled: 'disabled',
        update_device_connectivity: '5',
        default_device_connectivity: '6',
        name: 'Group 4',
        device_group_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c77'
    },
    {
      organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
      device_group_id: 'f5',
      update_enabled: '3',
      enabled: 'disabled',
      update_device_connectivity: '5',
      default_device_connectivity: '6',
      name: 'Group 5',
      device_group_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c77'
  },
      ];
      // Displayed groups initialization with the 3 first elements
      for (let index = 0; index < this.groups.length && index < this.DISPLAYED_GROUP_MAX; index++) {
        this.displayedGroups.push(this.groups[index]);
      }

      this.devices = [
      {
          organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
          device_group_id: 'a1',
          device_id: '3',
          register_since: '14/03/2018',
          labels: {
              type: 'phone',
              os: 'arm',
          },
          enabled: 'true',
          device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
          status_name: 'Connected'
      },
      {
          organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
          device_group_id: 'b2',
          device_id: '3',
          register_since: '08/02/2019',
          labels: {
              type: 'phone',
          },
          enabled: 'true',
          device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
          status_name: 'Connected'
      },
      {
          organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
          device_group_id: 'c3',
          device_id: '3',
          register_since: '20/10/2015',
          labels: {
              type: 'phone',
              os: 'arm',
          },
          enabled: 'false',
          device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
          status_name: 'Disonected'
      },
      {
          organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
          device_group_id: 'a1',
          device_id: '3',
          register_since: '15/08/2019',
          labels: {
              type: 'phone',
          },
          enabled: 'true',
          device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
          status_name: 'Connected'
      }
    ];

    // Get User data from localStorage
    // const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    // if (jwtData !== null) {
    //   this.organizationId = JSON.parse(jwtData).organizationID;
    //   if (this.organizationId !== null) {
    //     // Requests top card summary data
    //     this.backend.getResourcesSummary(this.organizationId)
    //     .subscribe(summary => {
    //         this.devicesCount = summary['total_devices'] || 0 ;
    //         this.devicesGroupCount = summary['total_devices_group'] || 0 ;
    //     });
    //     this.updateDevicesList(this.organizationId);
    //     this.updateService.changesOnGroupDevicesList.subscribe(
    //       result => {
    //       this.backend.getDevicesGroup(this.organizationId)
    //         .subscribe(response => {
    //           this.devicesGroup = response.devicesGroup;
    //         });
    //       }
    //     );
    //     this.refreshIntervalRef = setInterval(() => {
    //      //  Request devices list
    //       this.updateDevicesList(this.organizationId);
    //     }, this.REFRESH_RATIO); // Refresh each 60 seconds
    //   }
    // }
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

  /**
   *  Upon confirmation, deletes devices group
   * @param deviceGroupId A group to be deleted
   */
  deleteDevicesGroup() {
    const deleteConfirm = confirm('Delete group?');
    if (deleteConfirm) {
      if (this.organizationId !== null && this.deviceGroupId !== null) {
        this.backend.deleteUser(this.organizationId, this.deviceGroupId)
          .subscribe(response => {
            this.notificationsService.add({
              message: 'Group ' + this.deviceGroupId + ' has been deleted',
              timeout: 10000
            });
            this.modalRef.hide();
          }, error => {
            this.notificationsService.add({
              message: error.error.message,
              timeout: 10000
            });
          });
      }
    } else {
      // Do nothing
    }
  }

  /**
   * Splits the devices list into chunks (number of elements defined by the chunks parameter)
   * @param chunks Number of elements per chunk
   * @param devicesList Array containing the available devices
   * @returns chunked array
    */
   chunkDevicesList(chunks, devicesList) {
    let i, j, chunkedArray;
    const resultChunkArray = [];
    const chunk = chunks;
    for (i = 0, j = devicesList.length; i < j; i += chunk) {
      chunkedArray = devicesList.slice(i, i + chunk);
      resultChunkArray.push(chunkedArray);
    }
    return resultChunkArray;
  }

  /**
   * Requests an updated list of available devices group to update the current one
   */
  updateDevicesGroupList() {
    // Requests an updated devices group list
    this.backend.getDevicesGroup(this.organizationId)
    .subscribe(response => {
        if (response.users.length) {
          this.groups = response.devicesGroup;
        } else {
          this.groups = [];
        }
        if (!this.loadedData) {
          this.loadedData = true;
        }
    }, errorResponse => {
        this.loadedData = true;
        this.requestError = errorResponse.error.message;
      });
  }

  /**
   * Requests an updated list of devices to update the current one
   * @param organizationId Organization identifier
   */
  updateDevicesList(organizationId) {
    if (organizationId !== null) {
      // Request to get devices
      this.backend.getDevices(this.organizationId, 'this.groupId')
      .subscribe(response => {
          this.devices = response.devices || [];
          this.updateConnectedDevicesLineChart(this.devices);
          if (!this.loadedData) {
            this.loadedData = true;
          }
          this.chunckedDevices = this.chunkDevicesList(1, this.devices);
      }, errorResponse => {
        this.loadedData = true;
        this.requestError = errorResponse.error.message;
      });
    }

      // Requests an updated clusters list
      // this.backend.getDevices(this.organizationId)
      // .subscribe(response => {
      //   let devicesCount = 0;
      //   let devicesGroupCount = 0;
      //     if (response.devices && response.devices.length) {
      //       this.devices = response.clusters;
      //     } else {
      //       this.devices = [];
      //     }
      //     if (!this.loadedData) {
      //       this.loadedData = true;
      //     }
      //     this.devices => {
      //       this.preventEmptyFields(devices);
      //       devicesGroupCount += devices.total_devices_group;
      //       devicesCount += devices.total_devices;
      //     });
      //     this. updateConnectedDevicesLineChart(devices);
      // }, errorResponse => {
      //   this.loadedData = true;
      //   this.requestError = errorResponse.error.message;
      // });
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
    devices.forEach(device => {
      if (device && device.enabled.toLowerCase() === 'connected') {
        connectedDevicesCount += 1;
      }
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
  enabled() {
    this.checkBox = !this.checkBox;
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
        this.groups.push({name: randomGroupStringGenerator, device_group_id: randomGroupStringGenerator});
        allowHide = false;
      }
    });
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (100 - 1) + 1);
  }

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
    return '';
  }

  swipeLeft() {
    const index = this.groups.map(x => x.device_group_id).indexOf(this.displayedGroups[0].device_group_id);
    // If the element is found and it is not the first element
    if (index !== -1 && index !== 0) {
      // Pushes in the beginning of displaye groups array, the rquiered group elment
      this.displayedGroups.unshift(this.groups[index - 1]);
      this.displayedGroups.pop();
    }
  }

  swipeRight() {
    const index = this.groups.map(x => x.device_group_id).indexOf(this.displayedGroups[this.DISPLAYED_GROUP_MAX - 1].device_group_id);
    // If the element is found and if it is not the last element
    if (index !== -1 && index !== this.groups.length - 1) {
      this.displayedGroups.shift();
      this.displayedGroups.push(this.groups[index + 1]);
    }
  }
}
