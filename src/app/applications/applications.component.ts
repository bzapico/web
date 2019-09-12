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
import * as shape from 'd3-shape';
import { Subscription, timer } from 'rxjs';
import { NodeType } from '../definitions/enums/node-type.enum';
import { GraphData } from '../definitions/models/graph-data';
import { KeyValue } from '../definitions/interfaces/key-value';
import { AdvancedFilterOptionsComponent } from '../advanced-filter-options/advanced-filter-options.component';

/**
 * Refresh ratio
 */
const REFRESH_INTERVAL = 20000;
/**
 * It sets a height for clusters nodes in the graph
 */
const CUSTOM_HEIGHT_CLUSTERS = 58;
/**
 * It sets a height for instances nodes in the graph
 */
const CUSTOM_HEIGHT_INSTANCES = 32;
/**
 * It sets a height for registered nodes in the graph
 */
const CUSTOM_HEIGHT_REGISTERED = 32;
/**
 * It sets a border color for found nodes by a term in the graph
 */
const FOUND_NODES_BORDER_COLOR = '#5800FF';
/**
 * It sets a border size for found nodes by a term in the graph
 */
const FOUND_NODES_BORDER_SIZE = 4;
/**
 * It sets a color for registered nodes
 */
const REGISTERED_NODES_COLOR = '#444444';
/**
 * It sets the status colors for nodes
 */
const STATUS_COLORS = {
  RUNNING: '#00E6A0',
  ERROR: '#F7478A',
  OTHER: '#FFEB6C'
};
/**
 * It sets the status colors for nodes
 */
const STATUS_TEXT_COLORS = {
  RUNNING: '#FFFFFF',
  ERROR: '#FFFFFF',
  OTHER: '#444444'
};
/**
 * It sets the timeout in actions like undeploying or deleting
 */
const TIMEOUT_ACTION = 3000;
/**
 * It sets the timeout for errors
 */
const TIMEOUT_ERROR = 5000;

@Component({
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
   * Count of total occurrences in search graph
   */
  occurrencesCounter: number;

  /**
   * Number of running instances
   */
  countRunning: number;

  /**
   * Number of registered apps
   */
  countRegistered: number;

  /**
   * Holds the reference of the interval that refreshes the lists
   */
  refreshIntervalRef: Subscription;

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
   * Graph options
   */
  graphReset: boolean;
  graphDataLoaded: boolean;
  graphData: GraphData<any[]>;
  searchGraphData: GraphData<KeyValue>;
  orientation: string;
  curve: any;
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  colorSchemeGraph: any;
  view: any[];
  width: number;
  height: string;
  draggingEnabled: boolean;

  /**
   * NGX-Charts object-assign required object references (for rendering)
   */
  instancesPieChart: any;

  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  sortedByRegistered: string;
  reverse: boolean;
  reverseRegistered: boolean;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;
  searchTermGraph: string;
  searchTermRegistered: string;

  /**
   * Model that hold the quick filter
   */
  quickFilter: string;

  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;
  filterFieldRegistered: boolean;

  /**
   *  Active List reference
   */
  showInstances: boolean;

  /**
   * Active context menu item ID
   */
  activeContextMenuId: string;

  /**
   * Boolean variable for indicate when it is searching in the graph
   */
  isSearchingInGraph = false;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private router: Router) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (!!mock) {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
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
     this.sortedByRegistered = '';
     this.reverse = false;
     this.reverseRegistered = false;
     this.searchTerm = '';
     this.searchTermGraph = '';
     this.searchTermRegistered = '';
     this.showInstances = true;
     this.quickFilter = '';

     // Filter field
     this.filterField = false;
     this.filterFieldRegistered = false;

    // Graph initialization
    this.graphReset = false;
    this.orientation = 'TB';
    this.curve = shape.curveBasis;
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = true;
    this.draggingEnabled = false;
    this.colorSchemeGraph = {
      domain: ['#6C86F7']
    };
    this.graphDataLoaded = false;
    this.graphData = new GraphData([], []);
    this.searchGraphData = new GraphData({}, {});
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
      if (this.organizationId !== null) {
        this.refreshData();
      }
    }
  }

  ngOnDestroy() {
    this.refreshIntervalRef.unsubscribe();
  }

  /**
   * Updates instances array
   * @param organizationId Organization identifier
   */
  private updateAppInstances(organizationId: string) {
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
  private updateRegisteredInstances(organizationId: string) {
    if (organizationId !== null) {
      // Request to get registered apps
      this.backend.getRegisteredApps(this.organizationId)
      .subscribe(response => {
        this.registered = response.descriptors || [];
      });
    }
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
   * Generates the NGX-Chart required JSON object for pie chart rendering
   * @param running Number of running nodes in a cluster
   * @param total Number of total nodes in a cluster
   * @returns anonym array with the required object structure for pie chart rendering
   */
  private generateSummaryChartData(running: number, total: number): any[] {
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
   * Fulfill nulls to avoid data binding failure
   * @param instance Application instance
   */
  private preventEmptyFields(instance: ApplicationInstance) {
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
    if (list === 'instances') {
      if (this.sortedBy === categoryName) {
        this.reverse = !this.reverse;
        this.filterField = false;
      }
      this.sortedBy = categoryName;
      this.filterField = true;
    } else if (list === 'registered') {
      if (this.sortedByRegistered === categoryName) {
        this.reverseRegistered = !this.reverseRegistered;
        this.filterFieldRegistered = false;
      }
      this.sortedByRegistered = categoryName;
      this.filterFieldRegistered = true;
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
    if (list === 'instances') {
      this.filterField = false;
      this.searchTerm = '';
      this.sortedBy = '';
    } else if (list === 'registered') {
      this.filterFieldRegistered = false;
      this.searchTermRegistered = '';
      this.sortedByRegistered = '';
    } else if (list === 'graph') {
      this.searchTermGraph = '';
      this.quickFilter = '';
      this.isSearchingInGraph = false;
      this.toGraphData();
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
  * Check if the label is selected. Returns index number in selected labels or -1 if the label is not found.
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
    if (this.selectedLabels.length) {
      const indexSelected = this.selectedLabels.map(x => x.entityId).indexOf(entityId);
      return indexSelected >= 0;
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
            timeout: TIMEOUT_ACTION
          });
          this.updateAppInstances(this.organizationId);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: TIMEOUT_ERROR,
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
            timeout: TIMEOUT_ACTION
          });
          this.updateRegisteredInstances(this.organizationId);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: TIMEOUT_ERROR,
            type: 'warning'
          });
        });
    }
  }

  /**
   * Triggers the navigation to app instance detailed view if the app is not being undeploy
   * yed
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
      name: 'More info',
      action: () => {
        this.goToInstanceView(instance);
      },
      instance: instance
    };
    const instanceOption2 = {
      name: 'Undeploy',
      action: () => {
        this.undeploy(instance);
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
      name: 'More info',
      action: () => {
        this.goToRegisteredView(registered);
      },
      registered: registered
    };
    const registeredOption2 = {
      name: 'Deploy',
      action: () => {
        this.deployRegistered(registered);
      },
      registered: registered
    };
    const registeredOption3 = {
      name: 'Delete',
      action: () => {
        this.deleteApp(registered);
      },
      registered: registered
    };
    registeredOptions.push(registeredOption1);
    registeredOptions.push(registeredOption2);
    registeredOptions.push(registeredOption3);
    return registeredOptions;
  }


  /**
   * It modifies the graph, changing the border of the nodes that its labels contain the search term
   */
  searchInGraph() {
    this.isSearchingInGraph = true;
    this.toGraphData(this.searchTermGraph);
    this.occurrencesGraphCounter();
  }

  /**
   * It returns filtered app instances avoiding duplicated instances by cluster ID
   * @param clusterId Identifier for the cluster
   */
  private getAppsInCluster(clusterId: string) {
    const appsInCluster = {};
    for (let indexInstance = 0, instancesLength = this.instances.length; indexInstance < instancesLength; indexInstance++) {
      const groups = this.instances[indexInstance].groups || [];
      for (let indexGroup = 0, groupsLength = groups.length; indexGroup < groupsLength; indexGroup++) {
        const serviceInstances = groups[indexGroup].service_instances || [];
        for (let indexService = 0; indexService < serviceInstances.length; indexService++) {
          if (serviceInstances[indexService].deployed_on_cluster_id === clusterId) {
            appsInCluster[serviceInstances[indexService].app_instance_id] = this.instances[indexInstance];
          }
        }
      }
    }
    return Object.values(appsInCluster);
  }
  /**
   * Transforms the data needed to create the graph
   */
  toGraphData(searchTermGraph?: string) {
    this.graphData.reset([], []);
    this.searchGraphData.reset({}, {});
    if (searchTermGraph) {
      searchTermGraph = searchTermGraph.toLowerCase();
    }
    this.clusters.forEach(cluster => {
      this.setClusters(cluster, searchTermGraph);
      this.setRegisteredAndInstances(cluster, searchTermGraph);
    });
    this.graphDataLoaded = true;
  }

  /**
   * It sets clusters nodes to add them in the graph
   * @param cluster current cluster to generate related data to this.
   * @param searchTermGraph term to search if it's necessary
   */
  private setClusters(cluster: any, searchTermGraph?: string) {
    const clusterName = cluster.name.toLowerCase();
    const nodeGroup = {
      id: cluster.cluster_id,
      label: cluster.name,
      type: NodeType.Clusters,
      tooltip: 'CLUSTER ' + cluster.name + ': ' + this.getBeautyStatusName(cluster.status_name),
      color: this.getNodeColor(cluster.status_name),
      text: this.getNodeTextColor(cluster.status_name),
      group: cluster.cluster_id,
      customHeight: CUSTOM_HEIGHT_CLUSTERS,
      customBorderColor: (searchTermGraph && clusterName.includes(searchTermGraph)) ? FOUND_NODES_BORDER_COLOR : '',
      customBorderWidth: (searchTermGraph && clusterName.includes(searchTermGraph)) ? FOUND_NODES_BORDER_SIZE : ''
    };
    this.searchGraphData.nodes[nodeGroup.id] = nodeGroup;
    this.graphData.nodes.push(nodeGroup);
  }

  /**
   * It sets registered apps, instances and its relations
   * @param cluster current cluster to generate related data to this.
   * @param searchTermGraph term to search if it's necessary
   */
  private setRegisteredAndInstances(cluster: any, searchTermGraph?: string) {
    const instancesInCluster = this.getAppsInCluster(cluster.cluster_id);
    instancesInCluster.forEach(instance => {
      const instanceName = instance['name'].toLowerCase();
      const nodeInstance = {
        id: cluster.cluster_id + '-s-' + instance['app_instance_id'],
        label: instance['name'],
        type: NodeType.Instances,
        tooltip: 'INSTANCE ' + instance['name'] + ': ' + this.getBeautyStatusName(instance['status_name']),
        color: this.getNodeColor(instance['status_name']),
        text: this.getNodeTextColor(cluster.status_name),
        group: cluster.cluster_id,
        customHeight: CUSTOM_HEIGHT_INSTANCES,
        customBorderColor: (searchTermGraph && instanceName.includes(searchTermGraph)) ? FOUND_NODES_BORDER_COLOR : '',
        customBorderWidth: (searchTermGraph && instanceName.includes(searchTermGraph)) ? FOUND_NODES_BORDER_SIZE : '',
        app_descriptor_id: instance['app_descriptor_id']
      };
      this.searchGraphData.nodes[nodeInstance.id] = nodeInstance;
      this.graphData.nodes.push(nodeInstance);
      const registeredApp = this.getRegisteredApp(nodeInstance);
      if (registeredApp.length > 0) {
        const registeredName = registeredApp[0]['name'].toLowerCase();
        const nodeRegistered = {
          id: registeredApp[0]['app_descriptor_id'],
          label: registeredApp[0]['name'],
          type: NodeType.Registered,
          tooltip: 'REGISTERED ' + registeredApp[0]['name'],
          color: REGISTERED_NODES_COLOR,
          text: this.getNodeTextColor(cluster.status_name),
          group: cluster.cluster_id,
          customHeight: CUSTOM_HEIGHT_REGISTERED,
          customBorderColor: (searchTermGraph && registeredName.includes(searchTermGraph)) ? FOUND_NODES_BORDER_COLOR : '',
          customBorderWidth: (searchTermGraph && registeredName.includes(searchTermGraph)) ? FOUND_NODES_BORDER_SIZE : ''
        };
        if (!this.graphData.nodes.filter(node => node.id === nodeRegistered.id).length) {
          this.searchGraphData.nodes[nodeRegistered.id] = nodeRegistered;
          this.graphData.nodes.push(nodeRegistered);
        }
        this.setLinksInGraph(
            registeredApp[0]['app_descriptor_id'],
            cluster.cluster_id + '-s-' + instance['app_instance_id']);
      }
      this.setLinksInGraph(
          cluster.cluster_id + '-s-' + instance['app_instance_id'],
          cluster.cluster_id);
    });
  }

  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  private getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'running':
        return STATUS_COLORS.RUNNING;
      case 'error':
        return STATUS_COLORS.ERROR;
      case 'deployment_error':
        return STATUS_COLORS.ERROR;
      default:
        return STATUS_COLORS.OTHER;
    }
  }

  /**
   * Return an specific text color depending on the node status
   * @param status Status name
   */
  private getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'running':
        return STATUS_TEXT_COLORS.RUNNING;
      case 'error':
        return STATUS_TEXT_COLORS.ERROR;
      default:
        return STATUS_TEXT_COLORS.OTHER;
    }
  }

  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  private getBeautyStatusName(rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }

  /**
   * It generates the graph and it updates considering the REFRESH_INTERVAL
   */
  private refreshData() {
    this.refreshIntervalRef = timer(0, REFRESH_INTERVAL).subscribe(() => {
      if (!this.isSearchingInGraph) {
        Promise.all([
          this.backend.getClusters(this.organizationId).toPromise(),
          this.backend.getInstances(this.organizationId).toPromise(),
          this.backend.getRegisteredApps(this.organizationId).toPromise()])
            .then(([clusters, instances, registered]) => {
              clusters.clusters.forEach(cluster => {
                cluster.total_nodes = parseInt(cluster.total_nodes, 10);
              });
              this.clusters = clusters.clusters;
              this.instances = instances.instances;
              this.registered = registered.descriptors || [];
              this.processedRegisteredList();
              this.clusters.forEach(cluster => {
                this.preventEmptyFields(cluster);
              });
              this.updatePieChartStats(this.instances);
              if (!this.loadedData) {
                this.loadedData = true;
              }
              this.toGraphData();
            })
            .catch(errorResponse => {
              this.loadedData = false;
              this.requestError = errorResponse.error.message;
            });
          }
    });
  }

  /**
   * Return an specific color depending on the node status
   * @param source Origin node
   * @param target Final node
   */
  private setLinksInGraph(source, target) {
    this.graphData.links.push({
      source: source,
      target: target
    });
    if (!this.searchGraphData.links[source]) {
      this.searchGraphData.links[source] = [];
    }
    this.searchGraphData.links[source].push(target);
  }

  /**
   * Returns the registered app from any concrete instance
   * @param instance Selected app instance
   */
  private getRegisteredApp(instance) {
    return this.registered.filter(registered => registered.app_descriptor_id === instance.app_descriptor_id);
  }

  /**
   * Process registered list that adds each instances associated with each registered
   */
  private processedRegisteredList() {
    if (this.registered) {
      for (let indexRegistered = 0; indexRegistered < this.registered.length; indexRegistered++) {
        const registeredId = this.registered[indexRegistered].app_descriptor_id;
        this.registered[indexRegistered]['instances'] = this.instances.filter(instance => registeredId === instance.app_descriptor_id);
      }
    }
  }

  /**
   * Return a counter for the amount of search terms in graph
   */
  private occurrencesGraphCounter() {
    this.occurrencesCounter = this.graphData.nodes.filter(node => node.label.toLowerCase().includes(this.searchTermGraph)).length;
  }

  /**
   * Opens the modal view that holds advanced filter options component
   */
  openAdvancedFilterOptions() {
    const initialState = {
      organizationId: this.organizationId,
    };
    this.modalRef = this.modalService.show(AdvancedFilterOptionsComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
    });
  }
}
