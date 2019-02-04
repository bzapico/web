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
   * Model that hold organization ID
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
   * List of labels
   */
  labels: any[];

  /**
   * Number of conected devices
   */
  countConected: number;

  /**
   * Count of total devices
   */
  devicesCount: number;

  /**
   * Count of total devices groups
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

  /**
   * Group one references
   */
  groupOne = false;

  /**
   * Tabs reference
   */
  tabs: any[];

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
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
    // Tabs
    this.tabs = [];

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
      if (this.organizationId !== null) {
        // Requests top card summary data
        this.backend.getResourcesSummary(this.organizationId)
        .subscribe(summary => {
            this.devicesCount = summary['total_devices'] || 0 ;
            this.devicesGroupCount = summary['total_devices_group'] || 0 ;
        });
        this.updateDevices(this.organizationId);
        this.refreshIntervalRef = setInterval(() => {
          this.updateDevices(this.organizationId);
        }, this.REFRESH_RATIO); // Refresh each 60 seconds
    }
  }
}
  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

  /**
   * Updates devices array
   * @param organizationId Organization identifier
   */
  updateDevices(organizationId: string) {
    if (organizationId !== null) {
      // Request to get devices
      this.backend.getDevices(this.organizationId)
      .subscribe(response => {
          this.devices = response.devices || [];
          this.updateConectedDevicesLineChart(this.devices);
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
   * Updates timeline chart
   * @param devices devices array
   */
  updateConectedDevicesLineChart(devices) {
    let conectedDevicesCount = 0;
    devices.forEach(device => {
      if (device && device.status_name.toLowerCase() === 'conected') {
        conectedDevicesCount += 1;
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
      'value': conectedDevicesCount / devices.length * 100,
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
      case 'conected': {
        if (className.toLowerCase() === 'conected') {
          return true;
        }
        break;
      }
      case 'error': {
        if (className.toLowerCase() === 'error') {
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
   * Add tabs functionality
   */
  addNewTab(): void {
  }

  /**
   * Checkbox
   */
  enabled() {
    this.checkBox = !this.checkBox;
  }

  /**
   * Open the first group created
   */
  openGroup() {
    this.groupOne = !this.groupOne;
  }
   /**
   * Opens the modal view that holds add group component
   */
  addGroup() {
    const initialState = {
      organizationId: this.organizationId,
    };

    this.modalRef = this.modalService.show(AddDevicesGroupComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {  });
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
}
