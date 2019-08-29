import { Component, OnInit, OnDestroy } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { mockAppChart, mockAppPieChart } from '../utils/mocks';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { ApplicationInstance } from '../definitions/interfaces/application-instance';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddLabelComponent } from '../add-label/add-label.component';
import { RegisterApplicationComponent } from '../register-application/register-application.component';
import { DeployInstanceComponent } from '../deploy-instance/deploy-instance.component';
import { Router } from '@angular/router';

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
   * List of available clusters
   */
  clusters: any[];

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
   * Reference for the service that allows the modal component
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
    domain: ['#5800FF', '#828282']
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
   * Graph options
   */
  graphDataLoaded: boolean;

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
  searchTermGraph: string;

  /**
   * Model that hold the quick filter
   */
  quickFilter: string;

  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;
  filterFieldApplications: boolean;

  /**
   *  Active List reference
   */
  showInstances: boolean;

  /**
   * Active context menu item ID
   */
  activeContextMenuId: string;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private router: Router
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
    this.activeContextMenuId = '';

     // SortBy
     this.sortedBy = '';
     this.reverse = false;
     this.searchTerm = '';
     this.searchTermGraph = '';
     this.showInstances = true;
     this.quickFilter = '';

     // Filter field
     this.filterField = false;
     this.filterFieldApplications = false;

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
        this.updateClusterList();
        this.refreshIntervalRef = setInterval(() => {
          this.updateAppInstances(this.organizationId);
          this.updateRegisteredInstances(this.organizationId);
          this.updateClusterList();
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
        // Temporal workaround to avoid losing undeploying status on update,
        // until the backend updates the app status after triggering undeploy action
        // (https://daisho.atlassian.net/browse/NP-1679
          const instancesUndeploying = [];
          for (let index = 0; index < this.instances.length; index++) {
            if (this.instances[index].undeploying) {
              instancesUndeploying.push(this.instances[index].app_instance_id);
            }
          }
          instancesUndeploying.forEach(instanceUndeployingId => {
            const index = response.instances.map(x => x.app_instance_id).indexOf(instanceUndeployingId);
            if (index !== -1) {
              response.instances[index].undeploying = true;
            }
          });
          // End of temporal workaround
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
   * Requests an updated list of available clusters to update the current one
   */
  updateClusterList() {
    // Requests an updated clusters list
    this.backend.getClusters(this.organizationId)
    .subscribe(response => {
        if (response.clusters && response.clusters.length) {
          response.clusters.forEach(cluster => {
            cluster.total_nodes = parseInt(cluster.total_nodes, 10);
          });
          this.clusters = response.clusters;
        } else {
          this.clusters = [];
        }
        if (!this.loadedData) {
          this.loadedData = true;
        }
        this.clusters.forEach(cluster => {
          this.preventEmptyFields(cluster);
        });
    }, errorResponse => {
      this.loadedData = true;
      this.requestError = errorResponse.error.message;
    });
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
   * Checks if the app status requires an special css class
   * @param status app status name
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
      case 'planning_error': {
        if (className.toLowerCase() === 'error') {
          return true;
        }
        break;
      }
      case 'incomplete': {
        if (className.toLowerCase() === 'error') {
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
      case 'queued': {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        break;
      }
      case 'planning': {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        break;
      }
      case 'scheduled': {
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
   * Sortby pipe in the component
   */
  setOrder(list: string, categoryName: string) {
    if (list === 'apps') {
      if (this.sortedBy === categoryName) {
        this.reverse = !this.reverse;
        this.filterField = false;
      }
      this.sortedBy = categoryName;
      this.filterField = true;
    } else if (list === 'graph') {
      this.filterFieldApplications = true;
    }
  }

  /**
   * Adds a quick filter
   */
  addQuickFilter(quickFilter: string) {
    if (this.quickFilter === quickFilter) {
      this.quickFilter = '';
    } else {
      this.quickFilter = quickFilter;
    }
  }

  /**
   * Reset all the filters fields
   */
  resetFilters(list: string) {
    if (list === 'apps') {
      this.filterField = false;
      this.searchTerm = '';
      this.sortedBy = '';
    } else if (list === 'graph') {
      this.searchTermGraph = '';
      this.quickFilter = '';
    }
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
  changeActiveList(listToShow: string) {
    if (listToShow === 'instances') {
      this.showInstances = true;
    } else if (listToShow === 'registered') {
      this.showInstances = false;
    }
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

    let temporalCount = 0;
    app.groups.forEach(group => {
      temporalCount = group.services.length + temporalCount;
    });
    return temporalCount;
  }

  /**
   * Returns the length of the instances in registered list. Represents the number of available app instances
   * @param appId selected app
   */
  getInstancesCount(appId) {
    let counter = 0;

    for (let index = 0; index < this.instances.length; index++) {
      const element = this.instances[index];
      if (element.app_descriptor_id === appId) {

      }
    }

    this.instances.forEach(instance => {
      if (instance.app_descriptor_id === appId) {

        return counter++;
      }
    });
    return 0;
  }

  /**
   * Opens the modal view that holds the deploy instance component
   */
  deployInstance() {
    const initialState = {
      organizationId: this.organizationId,
      defaultAutofocus: false
    };

    this.modalRef = this.modalService.show(DeployInstanceComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.onClose = (cancelled: boolean) => {
      this.updateAppInstances(this.organizationId);
     };
  }

  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app) {
    const initialState = {
      organizationId: this.organizationId,
      registeredId: app.app_descriptor_id,
      registeredName: app.name,
      openFromRegistered: true,
      defaultAutofocus: true,
      appFromRegistered: app
    };

    this.modalRef = this.modalService.show(DeployInstanceComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.onClose = (cancelled: boolean) => {
      this.updateAppInstances(this.organizationId);
      if (!cancelled) {
        this.changeActiveList('instances');
      }
    };

  }
  /**
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app) {
    const undeployConfirm = confirm('Undeploy ' + app.name + '?');
    if (undeployConfirm) {
      this.backend.undeploy(this.organizationId, app.app_instance_id)
        .subscribe(undeployResponse => {
          app.undeploying = true;
          this.notificationsService.add({
            message: 'Undeploying ' + app.name,
            timeout: 3000
          });
          this.updateAppInstances(this.organizationId);
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
   * Opens the modal view that holds the register app component
   */
  registerApp() {
    const initialState = {
      organizationId: this.organizationId
    };
    this.modalRef = this.modalService.show(RegisterApplicationComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateRegisteredInstances(this.organizationId);
    });
  }

    /**
   * Requests to delete the selected app
   * @param app Application object
   */
  deleteApp(app) {
    const deleteConfirm = confirm('Delete ' + app.name + '?');
    if (deleteConfirm) {
      this.backend.deleteRegistered(this.organizationId, app.app_descriptor_id)
        .subscribe(deleteResponse => {
          this.notificationsService.add({
            message: 'Deleting ' + app.name,
            timeout: 3000
          });
          this.updateRegisteredInstances(this.organizationId);
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
   * Triggers the navigation to app instance detailed view if the app is not being undeployed
   * @param app App instance data
   */
  goToInstanceView(app): void {
    // This solution applies when the backend updates the app status after triggering undeploy action
    // (https://daisho.atlassian.net/browse/NP-1679)
    // if (app.status_name.toLocaleLowerCase() !== 'undeploying') {
    if (!app.undeploying) {
      this.router.navigate(['/applications/instance/' + app.app_instance_id]);
    }
  }
  /**
   * Triggers the navigation to registered app detailed view
   * @param app Registered app data
   */
  goToRegisteredView(app): void {
    this.router.navigate(['/applications/registered/' + app.app_descriptor_id]);
  }

  /**
   * Opens application instances context menu
   * @param instance application instances
   */
  openInstanceContextualMenu(event, instance: any) {
    event.stopPropagation();
    if (instance.app_instance_id === this.activeContextMenuId) {
      this.activeContextMenuId = '';
    } else {
      this.activeContextMenuId = instance.app_instance_id;
    }
  }

  /**
   * Get the application instances options to show in the context menu
   * @param instance application instances
   */
  getInstanceOptions(instance: any) {
    const instanceOptions = [];
    const instanceOption1 = {
      name: 'Undeploy',
      action: (applicationInstance: any) => {
        this.undeploy(instance);
      },
      instance: instance
    };
    const instanceOption2 = {
      name: 'More info',
      action: (applicationInstance: any) => {
        this.goToInstanceView(instance);
      },
      instance: instance
    };
    instanceOptions.push(instanceOption1);
    instanceOptions.push(instanceOption2);
    return instanceOptions;
  }

  /**
   * Opens registered apps context menu
   * @param registered registered app
   */
  openRegisteredContextualMenu(event, registered: any) {
    event.stopPropagation();
    if (registered.app_descriptor_id === this.activeContextMenuId) {
      this.activeContextMenuId = '';
    } else {
      this.activeContextMenuId = registered.app_descriptor_id;
    }
  }

  /**
   * Empties the active menu Id to close the contextual menu component
   */
  onContextualMenuClose() {
    this.activeContextMenuId = '';
  }

  /**
   * Get the registered app options to show in the context menu
   * @param registered registered app
   */
  getRegisteredOptions(registered: any) {
    const registeredOptions = [];
    const registeredOption1 = {
      name: 'Deploy registered',
      action: (registeredApp: any) => {
        this.deployRegistered(registered);
      },
      registered: registered
    };
    const registeredOption2 = {
      name: 'Delete app',
      action: (registeredApp: any) => {
        this.deleteApp(registered);
      },
      registered: registered
    };
    const registeredOption3 = {
      name: 'More info',
      action: (registeredApp: any) => {
        this.goToRegisteredView(registered);
      },
      registered: registered
    };
    registeredOptions.push(registeredOption1);
    registeredOptions.push(registeredOption2);
    registeredOptions.push(registeredOption3);
    return registeredOptions;
  }


  /**
   * Search a specific term in graph
   */
  searchInGraph() {
   // this.searchTermGraph = '';

  }
}
