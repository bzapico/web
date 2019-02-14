import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  groupData: any;

  /**
   * Models that hold the active group
   */
  activeGroupId: string;

  /**
   * Models that keeps the displayed groups names length
   */
  displayedGroupsNamesLength: number;
  maxLabelsLength: number;

  /**
   * List of active displayed group
   */
  displayedGroups: any[];

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
    this.activeGroupId = 'ALL';
    this.labels = [];
    this.loadedData = false;
    this.devicesCount = 0;
    this.devicesChart = [{name: 'Running devices %', series: []}];
    this.requestError = '';
    this.maxLabelsLength = 35;
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
    this.updateDisplayedGroupsNamesLength();
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

  /**
   * Method that counts the number of devices
   */
  countDevices() {
    let temporalCount = 0;
    this.devices.forEach(group => {
      temporalCount = group.length + temporalCount;
    });
    this.devicesCount = temporalCount;
  }

  /**
   * Calculates the number of characters needed to hide the title of tabs
   * @param event to pass in onResize method
   */
  @HostListener('window:resize', ['$event'])
    onResize(event) {
      if (event.target.innerWidth < 1280) {
        this.maxLabelsLength = 15;
      } else if (event.target.innerWidth < 1440) {
        this.maxLabelsLength = 25;
      } else if (event.target.innerWidth < 1613) {
        this.maxLabelsLength = 35;
      } else if (event.target.innerWidth < 1920) {
        this.maxLabelsLength = 45;
      } else {
        this.maxLabelsLength = 50;
      }
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
        this.updateDisplayedGroupsNamesLength();
        if (!this.loadedData) {
          this.loadedData = true;
        }
      }, errorResponse => {
          this.loadedData = true;
          this.requestError = errorResponse.error.message;
        });
    }
  }

  groupListUpdateAfterAdd() {
    if (this.organizationId !== null) {
      // Requests an updated devices group list
      this.backend.getGroups(this.organizationId)
      .subscribe(response => {
        const outdatedGroups = this.groups.slice(0);
        this.groups = response || [];

        if (outdatedGroups.length === this.groups.length) {
          // do nothing
        } else {
          this.displayedGroups = [];
          let foundNewGroup = false;
          for (let indexGroups = 0; indexGroups < this.groups.length && !foundNewGroup; indexGroups++) {
            const index =
              outdatedGroups
                .map(group => group.device_group_id)
                .indexOf(this.groups[indexGroups].device_group_id);
              if (index === -1) {
                foundNewGroup  = true;
                this.displayedGroups.push(this.groups[indexGroups]);
                if (this.groups[indexGroups - 1]) {
                  this.displayedGroups.unshift(this.groups[indexGroups - 1]);
                }
                if (this.groups[indexGroups - 2]) {
                  this.displayedGroups.unshift(this.groups[indexGroups - 2]);
                }
                this.activeGroupId = this.groups[indexGroups].device_group_id;
              }
          }
        }
        this.updateDisplayedGroupsNamesLength();
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
      this.backend.getDevices(this.organizationId, this.activeGroupId)
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
   * @param groupId device group identifier
   */
  changeActiveGroup(groupId: string) {
    this.activeGroupId = groupId;
  }

  /**
   * Checks if the device group is active to show in the tabs
   * @param groupId device group identifier
   */
  amIactive(groupId) {
    if (groupId === this.activeGroupId) {
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
      this.updateDisplayedGroupsNamesLength();
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
    this.updateDisplayedGroupsNamesLength();
  }

  /**
   * Opens the modal view that holds add group component
   * @param group group object
   */
  addGroup() {
    let allowHide = true;
    const initialState = {
      organizationId: this.organizationId,
    };

    this.modalRef = this.modalService.show(AddDevicesGroupComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      if (allowHide) {
        this.groupListUpdateAfterAdd();
      }
      allowHide = false;
    });
  }


  /**
   *  Upon confirmation, deletes devices group
   */
  deleteGroup() {
    const deleteConfirm = confirm('Delete group?');
    if (deleteConfirm) {
      const indexActive = this.groups.map(x => x.device_group_id).indexOf(this.activeGroupId);
      if (indexActive !== -1) {
        this.backend.deleteGroup(this.organizationId, this.activeGroupId)
          .subscribe(response => {
            this.backend.getGroups(this.organizationId)
              .subscribe(getGroupsResponse => {
                this.groups = getGroupsResponse;
                if (this.displayedGroups.length > 0 ) {
                  const indexDisplayed = this.displayedGroups.map(x => x.device_group_id).indexOf(this.activeGroupId);
                  if (indexDisplayed !== -1) {
                    this.displayedGroups.splice(indexDisplayed, 1);
                    const lastElementId = this.displayedGroups[this.displayedGroups.length - 1].device_group_id;
                    const indexGroups = this.groups.map(x => x.device_group_id).indexOf(lastElementId);
                    if (indexGroups !== -1) {
                      if (this.groups[indexGroups + 1]) {
                        this.displayedGroups.push(this.groups[indexGroups + 1]);
                      } else {
                          const firstElementId = this.displayedGroups[0].device_group_id;
                          const indexGroupsFirst = this.groups.map(x => x.device_group_id).indexOf(firstElementId);
                          if (indexGroupsFirst !== -1) {
                            if (this.groups[indexGroupsFirst - 1]) {
                              this.displayedGroups.unshift(this.groups[indexGroupsFirst - 1]);
                            }
                          }
                      }
                    }
                  }
              }
              this.updateDisplayedGroupsNamesLength();
              });
          });
      }
      this.changeActiveGroup('ALL');
    }
  }

    // const deleteConfirm = confirm('Delete group?');
    // if (deleteConfirm) {
    //   if (this.organizationId !== null && this.groupId !== null) {
    //     this.backend.deleteGroup(this.organizationId, this.groupId)
    //       .subscribe(response => {
    //         this.notificationsService.add({
    //           message: 'Group ' + this.groupId + ' has been deleted',
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


  updateDisplayedGroupsNamesLength() {
    this.displayedGroupsNamesLength = 0;
    this.displayedGroups.forEach(group => {
      this.displayedGroupsNamesLength += group.name.length;
    });
    console.log(this.displayedGroupsNamesLength);
  }
}
