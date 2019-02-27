import { Component, OnInit, OnDestroy } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { mockAppChart, mockAppPieChart } from '../utils/mocks';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { ApplicationInstance } from '../definitions/interfaces/application-instance';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppsInfoComponent } from '../apps-info/apps-info.component';
import { AddLabelComponent } from '../add-label/add-label.component';
import { DeployInstanceComponent } from '../deploy-instance/deploy-instance.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
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
   * List of available apps instances
   */
  instances: any[];

  /**
   * List of registered apps
   */
  registered: any[];

  /**
   * List of labels
   */
  labels: any[];

  /**
   * List of selected labels from an entity
   */
  selectedLabels = [];
  entityId: boolean;

  /**
   * Number of running instances
   */
  countRunning: number;

  /**
   * Number of registered apps
   */
  countRegistered: number;

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
  mockAppChart: any;
  mockAppPieChart: any;
  appsChart: any;

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  /**
   * Hold request error message or undefined
   */
  requestError: string;

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
   * Line Chart options
   */
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
  instancesTimelineChart: any;
  instancesPieChart: any;

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
   *  Active List reference
   */
  activeList: boolean;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
    ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.instances = [];
    this.registered = [];
    this.labels = [];
    this.countRegistered = 0;
    this.loadedData = false;
    this.appsChart = [{name: 'Running apps %', series: []}];
    this.requestError = '';

     // SortBy
     this.sortedBy = '';
     this.reverse = false;
     this.searchTerm = '';
     this.activeList = true;

     // Filter field
     this.filterField = false;

    /**
     * Charts reference init
     */
    Object.assign(this, {mockAppChart, mockAppPieChart});
  }

  ngOnInit() {
      // Get User data from localStorage
      const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
      if (jwtData !== null) {
        this.organizationId = JSON.parse(jwtData).organizationID;
          this.updateAppInstances(this.organizationId);
          this.updateRegisteredInstances(this.organizationId);
          this.refreshIntervalRef = setInterval(() => {
            this.updateAppInstances(this.organizationId);
            this.updateRegisteredInstances(this.organizationId);

          }, this.REFRESH_RATIO); // Refresh each 60 seconds
      }
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

  /**
   * Updates instances array
   * @param organizationId Organization identifier
   */
  updateAppInstances(organizationId: string) {
    if (organizationId !== null) {
      // Request to get apps instances
      this.backend.getInstances(this.organizationId)
      .subscribe(response => {
          this.instances = response.instances || [];
          this.updatePieChartStats(this.instances);
          this.updateRunningAppsLineChart(this.instances);
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
   * Updates registered apps array
   * @param organizationId Organization identifier
   */
  updateRegisteredInstances(organizationId: string) {
    if (organizationId !== null) {
      // Request to get registered apps
      this.backend.getRegisteredApps(this.organizationId)
      .subscribe(response => {
          this.registered = response.descriptors || [];
      });
    }
  }

  /**
   * Opens the modal view that holds the apps info component
   */
  openAppsInfo(app) {
    const initialState = {
      organizationId: this.organizationId,
      instanceId: app.app_instance_id
    };

    this.modalRef = this.modalService.show(AppsInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    // this.modalService.onHide.subscribe((reason: string) => { this.updateUserList(); });
  }

  /**
   * Updates pie chart status
   * @param instances Array of instance objects
   */
  updatePieChartStats(instances: any[]) {
    let running = 0;
    if (instances) {
      instances.forEach(app => {
        if (app.status_name === 'RUNNING') {
          running += 1;
        }
      });
      this.countRunning = running;
      this.instancesPieChart = this.generateSummaryChartData(this.countRunning, instances.length);
    }
  }

  /**
   * Updates timeline chart
   * @param instances Instances array
   */
  updateRunningAppsLineChart(instances) {
    let runningAppsCount = 0;
    instances.forEach(instance => {
      if (instance && instance.status_name.toLowerCase() === 'running') {
        runningAppsCount += 1;
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
      'value': runningAppsCount / instances.length * 100,
      'name':  now.getHours() + ':' + minutes + ':' + seconds
    };

    if (this.appsChart[0].series.length > 5) {
      // Removes first element
      this.appsChart[0].series.shift();
    }
    this.appsChart[0].series.push(entry);
    this.appsChart = [...this.appsChart];
  }

  /**
   * Generates the NGX-Chart required JSON object for pie chart rendering
   * @param running Number of running nodes in a cluster
   * @param total Number of total nodes in a cluster
   * @returns anonym array with the required object structure for pie chart rendering
   */
  generateSummaryChartData(running: number, total: number): any[] {
    return [
      {
        name: 'Running',
        value: running
      },
      {
        name: 'Stopped',
        value: total - running
      }];
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
   * @param instance Application instance
   */
  preventEmptyFields(instance: ApplicationInstance) {
    if (!instance.description) {
      instance.description = '-';
    }
    if (!instance.labels) {
      instance.labels = '-';
    }
    if (!instance.status_name) {
      instance.status_name = '-';
    }
  }

  /**
   * Checks if the cluster status requires an special css class
   * @param status Cluster status name
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
   * Changes to active list
   */
  changeActiveList() {
    this.activeList = !this.activeList;
  }

   /**
   * Opens the modal view that holds add label component
   */
  addLabel(entity) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: 'app',
      entity: entity,
      modalTitle: entity.name
    };

    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateRegisteredInstances(this.organizationId);
    } );

  }

  /**
   * Deletes a selected label
   * @param entity selected label entity
   */
  deleteLabel(entity) {
    const deleteConfirm = confirm('Delete labels?');
    if (deleteConfirm) {
      const index = this.selectedLabels.map(x => x.entityId).indexOf(entity.app_descriptor_id);
      this.backend.updateAppDescriptor(
        this.organizationId,
        entity.app_descriptor_id,
        {
          organizationId: this.organizationId,
          descriptorId: entity.app_descriptor_id,
          remove_labels: true,
          labels: this.selectedLabels[index].labels
        }).subscribe(updateAppResponse => {
          this.selectedLabels.splice(index, 1);
          this.updateRegisteredInstances(this.organizationId);
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

  /**
   * Returns the length of the services in registered list. Represents the number of available services
   * @param app selected app
   */
  getServicesCount(app) {
    for (let index = 0; index < app.groups.length; index++) {
      const element = app.groups[index];
      return element.services.length;
    }
  }

  /**
   * Opens the modal view that holds the deploy instance component
   */
  deployInstance() {
    const initialState = {
      organizationId: this.organizationId,
    };

    this.modalRef = this.modalService.show(DeployInstanceComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    // this.modalService.onHide.subscribe((reason: string) => {  });
  }

}

