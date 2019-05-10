import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { mockInfrastructurePieChart } from '../utils/mocks';
import { Asset } from '../definitions/interfaces/asset';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss']
})
export class InfrastructureComponent implements OnInit, OnDestroy {
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
   * List of available assets
   */
  assets: any[];

  /**
   * NGX-Charts object-assign required object references (for rendering)
   */
  infrastructurePieChart: any;

  /**
   * Pie Chart options
   */
  gradient = true;
  doughnut = true;
  colorScheme = {
    domain: ['#0937FF', '#949494']
  };
  customColors = [
    {
      name: 'Running',
      value: '#0000ff'
    },
    {
      name: 'error',
      value: '#00ff00'
    }
  ];

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

  /**
   * List of labels
   */
  labels: any[];

  /**
   * Number of online assets
   */
  countOnline: number;

  /**
   * Interval reference
   */
  refreshIntervalRef: any;

  /**
   * Refresh ratio reference
   */
  REFRESH_RATIO = 20000; // 20 seconds

  /**
   * Hold request error message or undefined
   */
  requestError: string;


  constructor(
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {

    const mock = localStorage.getItem(LocalStorageKeys.infrastructureMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

   // Default initialization
   this.labels = [];
   this.loadedData = false;
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
    Object.assign(this, { mockInfrastructurePieChart });
  }

  ngOnInit() {
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
        this.updateAssets(this.organizationId);
        this.refreshIntervalRef = setInterval(() => {
          this.updateAssets(this.organizationId);
        }, this.REFRESH_RATIO); // Refresh each 60 seconds
    }

    this.infrastructurePieChart = mockInfrastructurePieChart;
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

    /**
   * Updates asset array
   * @param organizationId Organization identifier
   */
  updateAssets(organizationId: string) {
    if (organizationId !== null) {
      // Request to get apps asset
      this.backend.getInventory(this.organizationId)
      .subscribe(response => {
          this.assets = response.assets || [];
          this.updatePieChartStats(this.assets);

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
   * Updates pie chart status
   * @param assets Array of instance objects
   */
  updatePieChartStats(asset: any[]) {
    // let online = 0;
    // if (assets) {
    //   assets.forEach(asset => {
    //     if (asset.status === 'ONLINE') {
    //       online += 1;
    //     }
    //   });
    //   this.countOnline = online;
    //   this.infrastructurePieChart = this.generateSummaryChartData(this.countOnline, this.assets.length);
    // }
  }

  /**
   * Generates the NGX-Chart required JSON object for pie chart rendering
   * @param online Number of online assets
   * @param total Number of total 
   * @returns anonym array with the required object structure for pie chart rendering
   */
  generateSummaryChartData(online: number, total: number): any[] {
    return [
      {
        name: 'Online',
        value: online
      },
      {
        name: 'Offline',
        value: total - online
      }];
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
   * Fulfill nulls to avoid data binding failure
   * @param asset Asset interface
   */
  preventEmptyFields(asset: Asset) {
    if (!asset.labels) {
      asset.labels = '-';
    }
    if (!asset.status) {
      asset.status = '-';
    }
  }

  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case 'running': {
        if (className.toLowerCase() === 'running') {
          return true;
        }
        break;
      }
      case 'deployment_error': {
        if (className.toLowerCase() === 'error') {
          return true;
        }
        break;
      }
      case 'queued': {
        if (className.toLowerCase() === 'process') {
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
   * Opens the modal view that holds add label component
   */
  addLabel() {

  }

  /**
   * Deletes a selected label
   * @param entity selected label entity
   */
  deleteLabel(entity) {
  }

  /**
   * Selects a label
   * @param entityId entity from selected label
   * @param labelKey label key from selected label
   * @param labelValue label value from selected label
   */
  onLabelClick(entityId, labelKey, labelValue) {
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
  * Check if the label is selected. Returs index number in selected labels or -1 if the label is not found.
  * @param entityId entity from selected label
  * @param labelKey label key from selected label
  * @param labelValue label value from selected label
  */
  indexOfLabelSelected(entityId, labelKey, labelValue) {
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
  isAnyLabelSelected(entityId) {
    if (this.selectedLabels.length > 0) {
      const indexSelected = this.selectedLabels.map(x => x.entityId).indexOf(entityId);
      if (indexSelected >= 0) {
          return true;
      }
    }
    return false;
  }

}