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
import { AddLabelComponent } from '../add-label/add-label.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceGroupInfoComponent } from '../device-group-info/device-group-info.component';

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
   *  Models that hold group data
   */
  device_group_id: string;
  name: string;
  enabled: boolean;
  default_device_connectivity: boolean;
  device_group_api_key: string;

  /**
   * Models that hold the active group
   */
  activeGroupId: string;
  groupId: string;

  /**
   * Models that keeps the displayed groups names length
   */
  displayedGroupsNamesLength: number;

  /**
   * List of active displayed group
   */
  displayedGroups: any[];
  devicesOnTimeline: any[];

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
  REFRESH_RATIO = 2000; // 20 seconds

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
   * Active context menu groupID
   */
  activeContextMenuGroupId: string;

  /**
   * Line Chart options
   */
  gradient = true;
  colorScheme = {
    domain: ['#5800FF', '#828282']
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

  nalejAccordion = 'nalejAccordion';
  isFirstOpen = true;

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
   * List of selected labels from an entity
   */
  selectedLabels = [];

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.devicesMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.devices = [];
    this.groups = [];
    this.displayedGroups = [];
    this.activeGroupId = '';
    this.labels = [];
    this.loadedData = false;
    this.activeContextMenuGroupId = '';
    this.devicesCount = 0;
    this.devicesChart = [{
      name: 'Running devices %',
      series: []
    }];
    this.requestError = '';
    this.device_group_id = 'Loading ...';
    this.name = 'Loading ...';
    this.enabled = false;
    this.default_device_connectivity = false;
    this.device_group_api_key = 'Loading ...';
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
        if (this.route.snapshot.queryParamMap.get('groupId')) {
          this.activeGroupId = this.route.snapshot.queryParamMap.get('groupId');
          this.groupId = this.route.snapshot.queryParamMap.get('groupId');
          console.log('this.activeGroupId ', this.activeGroupId );
          console.log('this.groupId ', this.groupId );
        }
        console.log('this.activeGroupId2 ', this.activeGroupId );
        console.log('this.groupId2 ', this.groupId );
        this.refreshIntervalRef = setInterval(() => {
          this.updateGroupsList(this.organizationId);
        },
        this.REFRESH_RATIO); // Refresh each 60 seconds
    }
    this.updateDisplayedGroupsNamesLength();
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

  /**
   * Translates timestamps to the wish date
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate(timestamp: any) {
    return new Date(Number.parseInt(timestamp, 10) * 1000);
  }

  /**
   * Method that counts the number of devices
   */
  countDevices(): number {
    let temporalCount = 0;
    if (!this.loadedData) {
      return null;
    }
    this.devices.forEach(group => {
      temporalCount = group.length + temporalCount;
    });
    return temporalCount;
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
        this.groups = response.groups || [];
        console.log('this.groups', this.groups );
        this.updateDisplayedGroupsNamesLength();
        this.updateDevicesList(this.organizationId);
      }, errorResponse => {
          this.loadedData = true;
          this.requestError = errorResponse.error.message;
        });
    }
  }

  /**
   * Requests an updated list of available devices group when added a new group
   */
  // private groupListUpdateAfterAdd() {
  //   if (this.organizationId !== null) {
  //     // Requests an updated devices group list
  //     this.backend.getGroups(this.organizationId)
  //     .subscribe(response => {
  //       const outdatedGroups = this.groups.slice(0);
  //       this.groups = response.groups || [];
  //       if (outdatedGroups.length === this.groups.length) {
  //         // do nothing
  //       } else {
  //         // this.displayedGroups = [];
  //         // let foundNewGroup = false;
  //         // for (let indexGroups = 0; indexGroups < this.groups.length && !foundNewGroup; indexGroups++) {
  //         //   const index =
  //         //     outdatedGroups
  //         //       .map(x => x.device_group_id)
  //         //       .indexOf(this.groups[indexGroups].device_group_id);
  //         //     if (index === -1) {
  //         //       foundNewGroup  = true;
  //         //       this.displayedGroups.push(this.groups[indexGroups]);
  //         //         let refillIndexPush = 1;
  //         //         let refillIndexUnshift = 1;
  //         //         let stop = false;
  //         //         while ( stop === false && this.displayedGroups.length < this.DISPLAYED_GROUP_MAX) {
  //         //           if (this.groups[indexGroups + refillIndexPush]) {
  //         //             this.displayedGroups.push(this.groups[indexGroups + refillIndexPush]);
  //         //             refillIndexPush += 1;
  //         //           } else if (this.groups[indexGroups - refillIndexUnshift]) {
  //         //             this.displayedGroups.unshift(this.groups[indexGroups - refillIndexUnshift]);
  //         //             refillIndexUnshift += 1;
  //         //           } else {
  //         //             stop = true;
  //         //           }
  //         //       }
  //         //       this.activeGroupId = this.groups[indexGroups].device_group_id;
  //         //     }
  //         // }
  //       }
  //       this.updateDisplayedGroupsNamesLength();
  //       if (!this.loadedData) {
  //         this.loadedData = true;
  //       }
  //     }, errorResponse => {
  //         this.loadedData = true;
  //         this.requestError = errorResponse.error.message;
  //       });
  //   }
  // }

  /**
   * Requests an updated list of devices to update the current one
   * @param organizationId organization identifier
   */
  updateDevicesList(organizationId: string) {
    const tmpDevices = [];
    if (organizationId !== null) {
      // Request to get devices
      if (this.groups.length > 0) {
        this.groups.forEach((group, index) => {
          this.backend.getDevices(this.organizationId, group.device_group_id)
          .subscribe(response => {
              tmpDevices.push(response.devices || []);
              if (!this.loadedData && index === this.groups.length - 1) {
                this.loadedData = true;
              }
              if (tmpDevices.length === this.groups.length) {
                this.devices = tmpDevices;
              }
              this.updateDevicesOnTimeline();
              this.updateDevicesStatusLineChart();
            }, errorResponse => {
              this.loadedData = true;
              this.requestError = errorResponse.error.message;
            });
          });
      } else {
        this.loadedData = true;
      }
    }
  }

  /**
   * Updates timeline chart
   * @param devices devices array
   */
  private updateDevicesStatusLineChart() {
    let connectedDevicesCount = 0;
    let selectedGroupDevicesCountTotal = 0;

    if (this.devicesOnTimeline && this.devicesOnTimeline.length > 0) {
      this.devicesOnTimeline.forEach(device => {
          selectedGroupDevicesCountTotal += 1;
        if (device && device.device_status_name && device.device_status_name.toLowerCase() === 'online') {
          connectedDevicesCount += 1;
        }
      });
    }
    const now = new Date(Date.now());
    let minutes: any = now.getMinutes();
    let seconds: any = now.getSeconds();
    if (minutes < 10) {
      minutes = '0' + now.getMinutes();
    }
    if (seconds < 10) {
      seconds = '0' + now.getSeconds();
    }

    let value = 0;
    if (connectedDevicesCount > 0 && selectedGroupDevicesCountTotal !== 0) {
      value = connectedDevicesCount / selectedGroupDevicesCountTotal * 100;
    }
    const entry = {
      'value': value.toFixed(2),
      'name':  now.getHours() + ':' + minutes + ':' + seconds
    };

    if (this.devicesChart[0].series.length > 4) {
      // Removes first element
      this.devicesChart[0].series.shift();
    }
    this.devicesChart[0].series.push(entry);
    this.devicesChart = [...this.devicesChart];
  }

  /**
   * Checks if the devices status requires an special css class
   * @param status devices status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    if (status) {
      switch (status.toLowerCase()) {
        case 'online': {
          if (className.toLowerCase() === 'online') {
            return true;
          }
          break;
        }
        case 'offline': {
          if (className.toLowerCase() === 'offline') {
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
  }

  /**
   * Sortby pipe in the component
   * @param categoryName the name of the chosen category
   */
  setOrder(categoryName: string) {
    if (this.sortedBy === categoryName) {
      this.reverse = !this.reverse;
      this.filterField = true;
    } else {
      this.sortedBy = categoryName;
      this.filterField = true;
    }
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
   * @param categoryName the class for the header category
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
   * Checkbox switcher statement to select one of enabled device to be executed.
   * @param device device data to update
   */
  enableSwitcher(device: { enabled: boolean; device_group_id: any; device_id: any; }) {
   device.enabled = !device.enabled;
   // backend call
   this.backend.updateDevice(this.organizationId, {
      organizationId: this.organizationId,
      deviceGroupId: device.device_group_id,
      deviceId: device.device_id,
      enabled: device.enabled
   }).subscribe( updateDeviceResponse => {
     let notificationText = 'enabled';
     if (!device.enabled) {
      notificationText = 'disabled';
     }
    this.notificationsService.add({
      message: 'The device is now ' + notificationText,
      timeout: 3000
    });
   });
  }

  /**
   * Opens the modal view that holds add group component
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
        // this.groupListUpdateAfterAdd();
        this.updateGroupsList(this.organizationId);
      }
      allowHide = false;
    });
  }

  /**
   *  Upon confirmation, deletes a device group
   */
  private deleteGroup(group) {
    const deleteConfirm = confirm('Delete group?');
    if (deleteConfirm) {
      if (this.countDevices() === 0) {
      this.backend.deleteGroup(this.organizationId, this.groupId)
      .subscribe(response => {
        this.backend.getGroups(this.organizationId)
        .subscribe(getGroupsResponse => {
            this.groups = getGroupsResponse.groups;
            if (!this.groups) {
              this.groups = [];
            }
          //   if (this.groups.length === 0) {
          //     this.displayedGroups = [];
          //   } else if (this.displayedGroups.length > 0) {
          //     const indexDisplayed = this.displayedGroups.map(x => x.device_group_id).indexOf(this.activeGroupId);
          //     if (indexDisplayed !== -1) {
          //       this.displayedGroups.splice(indexDisplayed, 1);
          //       if (this.displayedGroups[this.displayedGroups.length - 1]) {
          //         const lastElementId = this.displayedGroups[this.displayedGroups.length - 1].device_group_id;
          //         if (this.groups && this.groups.length > 0) {
          //           const indexGroups = this.groups.map(x => x.device_group_id).indexOf(lastElementId);
          //           if (indexGroups !== -1) {
          //             if (this.groups[indexGroups + 1]) {
          //               this.displayedGroups.push(this.groups[indexGroups + 1]);
          //             } else {
          //                 const firstElementId = this.displayedGroups[0].device_group_id;
          //                 const indexGroupsFirst = this.groups.map(x => x.device_group_id).indexOf(firstElementId);
          //                 if (indexGroupsFirst !== -1) {
          //                   if (this.groups[indexGroupsFirst - 1]) {
          //                     this.displayedGroups.unshift(this.groups[indexGroupsFirst - 1]);
          //                   }
          //                 }
          //             }
          //           }
          //         }
          //       }
          //     }
          // }
          this.updateDisplayedGroupsNamesLength();
          });
          this.notificationsService.add({
            message: 'Group "' + group.name + '" has been deleted',
            timeout: 3000
          });
      },
      error => {
        this.notificationsService.add({
          message: error.error.message,
          timeout: 5000,
          type: 'warning'
        });
      });
      } else {
        this.notificationsService.add({
          message: 'It is not possible to delete a group with devices in it ',
          timeout: 5000,
          type: 'warning'
        });
      }
      }
    }

  /**
   * Opens the modal view that holds group configuration component
   */
  private openGroupConfiguration(group) {
    const initialState = {
      organizationId: this.organizationId,
      enabled: group.enabled || false,
      defaultConnectivity: group.default_device_connectivity || false,
      name: group.name,
      device_group_id: group.device_group_id
    };
    this.modalRef = this.modalService.show(GroupConfigurationComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateGroupsList(this.organizationId);
    });
  }

  /**
   * Updates the displayed groups chars length to calculate the number of letters displayed according to the size of the viewport
   */
  updateDisplayedGroupsNamesLength() {
    this.displayedGroupsNamesLength = 0;
    this.displayedGroups.forEach(group => {
      this.displayedGroupsNamesLength += group.name.length;
    });
  }

  /**
   * Gets the devices array list and traverse the group array list to show in table
   */
  getDevices() {
    const groupDevices = [];
    this.devices.forEach(group => {
      group.forEach(device => {
        groupDevices.push(device);
      });
    });

    // console.log('groupDevices ', groupDevices);
    return groupDevices;
  }

  /**
   * Updates devices values array for timeline
   */
  private updateDevicesOnTimeline() {
    this.devicesOnTimeline = [];
    // if (this.activeGroupId === 'ALL') {
      this.devices.forEach(devicesGroup => {
        if (devicesGroup && devicesGroup.length > 0) {
          devicesGroup.forEach(device => {
            this.devicesOnTimeline.push(device);
          });
        }
      });
    // } else {
      // this.devicesOnTimeline = this.getGroupDevices(this.activeGroupId);
    // }
  }

  /**
   * Search for an specific array of devices that are part of the same group
   * @param groupId Group identifier
   */
  getGroupDevices(groupId: string): any[] {
    let devicesGroup: any[] | { device_group_id: string; }[];
    for (let indexGroup = 0; indexGroup < this.devices.length; indexGroup++) {
      devicesGroup = this.devices[indexGroup];
      if (devicesGroup && devicesGroup[0] && devicesGroup[0].device_group_id) {
      }

      if (devicesGroup && devicesGroup.length > 0 && devicesGroup[0].device_group_id === groupId) {
        return devicesGroup;
      }
    }
    return [-1];
  }

  /**
   * Opens the modal view that holds add label component
   * @param device Device object
   */
  addLabel(device: { device_id: any; }) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: 'device',
      entity: device,
      modalTitle: device.device_id
    };

    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { });
  }

  /**
   * Deletes a selected label
   * @param entity selected label entity
   */
  deleteLabel(entity: { device_id: any; device_group_id: any; }) {
    const deleteConfirm = confirm('Delete labels?');
    if (deleteConfirm) {
      const index = this.selectedLabels.map(x => x.entityId).indexOf(entity.device_id);
      this.backend.removeLabelFromDevice(
        this.organizationId,
        {
          organizationId: this.organizationId,
          device_id: entity.device_id,
          device_group_id: entity.device_group_id,
          labels: this.selectedLabels[index].labels
        }).subscribe(deleteLabelResponse => {
          this.selectedLabels.splice(index, 1);
          this.updateDevicesList(this.organizationId);
        });
    } else {
      // Do nothing
    }
  }

  /**
   * Selects a label
   * @param entityId entity from selected label
   * @param labelKey label key from selected label
   * @param labelValue label value from selected label
   */
  onLabelClick(entityId: any, labelKey: string | number, labelValue: any) {
    const selectedIndex = this.indexOfLabelSelected(entityId, labelKey, labelValue);
    const newLabel = {
      entityId: entityId,
      labels: {}
    } ;
    if (selectedIndex === -1 ) {
      const selected = this.selectedLabels.map(x => x.entityId).indexOf(entityId);
      if (selected === -1) {
        newLabel.labels[labelKey] = labelValue;
        this.selectedLabels.push(newLabel);
      } else {
        this.selectedLabels[selected].labels[labelKey] = labelValue;
      }
    } else {
      if (Object.keys(this.selectedLabels[selectedIndex].labels).length > 1) {
        delete this.selectedLabels[selectedIndex].labels[labelKey];
      } else {
        this.selectedLabels.splice(selectedIndex, 1);
      }
    }
  }

 /**
  * Check if the label is selected. Returns index number in selected labels or -1 if the label is not found.
  * @param entityId entity from selected label
  * @param labelKey label key from selected label
  * @param labelValue label value from selected label
  */
  indexOfLabelSelected(entityId: any, labelKey: string | number, labelValue: any) {
    for (let index = 0; index < this.selectedLabels.length; index++) {
      if (this.selectedLabels[index].entityId === entityId &&
          this.selectedLabels[index].labels[labelKey] === labelValue
        ) {
          return index;
      }
    }
  return -1;
  }

  /**
   * Check if any label is selected to change the state of add/delete buttons and to change class when a new label is about to be selected
   * @param entityId entity from selected label
   */
  isAnyLabelSelected(entityId: any) {
    if (this.selectedLabels.length > 0) {
      const indexSelected = this.selectedLabels.map(x => x.entityId).indexOf(entityId);
      if (indexSelected >= 0) {
          return true;
      }
    }
    return false;
  }

  /**
   * Returns human-understandable category name
   * @param sortedByRawCategory Raw category name
   */
  getBeautyCategoryName(sortedByRawCategory: string): string {
    switch (sortedByRawCategory) {
      case 'device_status_name':
        return 'status';
      case 'register_since':
        return 'date';
      default:
        return sortedByRawCategory;
    }
  }

  /**
   * Requests to unlink the selected device
   * @param device device in inventory item
   */
  unlinkDevice(device: any) {
    const unlinkConfirm = confirm('Unlink ' + device.device_id + '?');
    if (unlinkConfirm) {
      this.backend.removeDevice(this.organizationId, device.device_group_id , device.device_id)
        .subscribe(unlinkResponse => {
        this.notificationsService.add({
          message: 'Unlinking ' + device.device_id,
          timeout: 3000
        });
        this.updateGroupsList(this.organizationId);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: 5000,
            type: 'warning'
          });
        });
    }
  }

  /**
  * Open device group info modal window
  *  @param group group object
  */
 private openDeviceGroupInfo(group: any) {
  const initialState = {
    organizationId: this.organizationId,
    name: group.name,
    deviceGroupApiKey: group.device_group_api_key,
    deviceGroupId: group.device_group_id,
    defaultDeviceConnectivity: group.default_device_connectivity,
    enabled: group.enabled
  };

  this.modalRef = this.modalService.show(DeviceGroupInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
  this.modalRef.content.closeBtnName = 'Close';
}

  /**
   * Opens context menu
   * @param group device group
   */
  openContextualMenu(event, group: any) {
    event.stopPropagation();
    if (group.device_group_id === this.activeContextMenuGroupId) {
      this.activeContextMenuGroupId = '';
    } else {
      this.activeContextMenuGroupId = group.device_group_id;
    }
  }
  onContextualMenuClose(group) {
    this.activeContextMenuGroupId = '';
  }

  /**
   * Get the item options to show in the context menu
   * @param Group device group
   */
  getDevicesGroupOptions(group: any) {
    const groupOptions = [];
    const groupOption1 = {
      name: this.translateService.instant('devices.contextMenu.moreInfo'),
      action: () => {
        this.openDeviceGroupInfo(group);
      },
      group: group
    };
    const groupOption2 = {
      name: this.translateService.instant('devices.contextMenu.configuration'),
      action: () => {
        this.openGroupConfiguration(group);
      },
      group: group
    };
    const groupOption3 = {
      name: this.translateService.instant('devices.contextMenu.deleteGroup'),
      action: () => {
        this.deleteGroup(group);
      },
      group: group
    };
    groupOptions.push(groupOption1);
    groupOptions.push(groupOption2);
    groupOptions.push(groupOption3);
    return groupOptions;
  }
}
