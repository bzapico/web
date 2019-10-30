import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { mockAppChart, mockAppPieChart } from '../services/utils/mocks';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddLabelComponent } from '../add-label/add-label.component';
import { RegisterApplicationComponent } from '../register-application/register-application.component';
import { DeployInstanceComponent } from '../deploy-instance/deploy-instance.component';
import { Router } from '@angular/router';
import { ManageConnectionsComponent } from '../manage-connections/manage-connections.component';
import { Subscription, timer } from 'rxjs';
import { NodeType } from '../definitions/enums/node-type.enum';
import { GraphData } from '../definitions/models/graph-data';
import { KeyValue } from '../definitions/interfaces/key-value';
import { AdvancedFilterOptionsComponent } from '../advanced-filter-options/advanced-filter-options.component';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationsService } from './applications.service';
import { AppStatus } from '../definitions/enums/app-status.enum';
import { ToolsComponent } from '../tools/tools.component';
import { Cluster } from '../definitions/interfaces/cluster';
import { AppDescriptor } from '../definitions/models/app-descriptor';

@Component({
  selector: 'applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent extends ToolsComponent implements OnInit, OnDestroy {
  /**
   * It sets a height for registered nodes in the graph
   */
  private static readonly CUSTOM_HEIGHT_REGISTERED = 32;
  /**
   * It sets a color for registered nodes
   */
  private static readonly REGISTERED_NODES_COLOR = '#444444';
  /**
   * It sets a color for registered nodes
   */
  private static readonly REGISTERED_NODES_TEXT_COLOR = '#FFFFFF';
  /**
   * Loaded Data status
   */
  loadedData: boolean;
  /**
   * List of registered apps
   */
  registered: AppDescriptor[];
  /**
   * List of available clusters
   */
  clusters: Cluster[];
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
   * Graph options
   */
  graphDataLoaded: boolean;
  searchGraphData: GraphData<KeyValue>;
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
   * Boolean variables for indicate different flags to search/filter in the graph
   */
  isSearchingInGraph = false;
  foundOccurrenceInCluster: boolean;
  foundOccurrenceInInstance: boolean;
  foundOccurrenceInRegistered: boolean;
  initialState = {
    showOnlyNodes: false,
    showRelatedNodes: false,
    defaultFilter: true
  };
  filters = {
    registered: true,
    instances: true,
    clusters: true
  };
  /**
   * Subscription for showing/hiding process for the manage subscription dialog
   */
  showManageSubscription: Subscription;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private applicationsService: ApplicationsService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private router: Router) {
    super();
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
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
    this.searchTermRegistered = '';
    this.showInstances = true;
    this.quickFilter = '';
    // Filter field
    this.filterField = false;
    this.filterFieldRegistered = false;
    // Graph initialization
    this.graphDataLoaded = false;
    this.searchGraphData = new GraphData({}, {});
    this.foundOccurrenceInCluster = false;
    this.foundOccurrenceInInstance = false;
    this.foundOccurrenceInRegistered = false;
    /**
     * Charts reference init
     */
    Object.assign(this, {mockAppChart, mockAppPieChart});
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.organizationId !== null) {
      this.refreshData();
    }
    this.showManageSubscription = this.applicationsService.showManageConnections.subscribe(show => {
      if (show) {
        this.manageConnections();
      }
    });
  }

  ngOnDestroy() {
    this.refreshIntervalRef.unsubscribe();
    this.showManageSubscription.unsubscribe();
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
          if (this.instances) {
            for (let index = 0; index < this.instances.length; index++) {
              if (this.instances[index].undeploying) {
                instancesUndeploying.push(this.instances[index].app_instance_id);
              }
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
        if (app.status_name === AppStatus.Running.toUpperCase()) {
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
    return [{name: 'Running', value: running}, {name: 'Stopped', value: total - running}];
  }
  /**
   * Checks if the app status requires an special css class
   * @param status app status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    return this.applicationsService.classStatusCheck(status, className);
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
    if (this.isSearchingInGraph) {
      alert(this.translateService.instant('apps.filters.notAppliedSearching'));
    } else {
      let canApply = false;
      const auxFilters = { ...this.filters };
      auxFilters[quickFilter] = !auxFilters[quickFilter];
      for (const filter in auxFilters) {
        if (!!!auxFilters[filter]) {
          continue;
        }
        if (auxFilters[filter]) {
          canApply = true;
          continue;
        }
      }
      if (canApply) {
        this.filters[quickFilter] = !this.filters[quickFilter];
        this.toGraphData();
      } else {
        alert(this.translateService.instant('apps.filters.atLeastOne'));
      }
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
      this.modalService.config.initialState['defaultFilter'] = true;
      this.modalService.config.initialState['showOnlyNodes'] = false;
      this.modalService.config.initialState['showRelatedNodes'] = false;
      this.initialState['defaultFilter'] = true;
      this.initialState['showOnlyNodes'] = false;
      this.initialState['showRelatedNodes'] = false;
      this.filters.registered = true;
      this.filters.instances = true;
      this.filters.clusters = true;
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
    const deleteConfirm = confirm(this.translateService.instant('label.deleteLabels'));
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
        }).subscribe(() => {
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
      if (this.selectedLabels[index].entityId === entityId && this.selectedLabels[index].labels[labelKey] === labelValue) {
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
  getServicesCount(app): number {
    return this.applicationsService.getServicesCount(app);
  }
  /**
   * Opens the modal view that holds the deploy instance component
   */
  deployInstance() {
    const initialState = {
      organizationId: this.organizationId,
      instances: this.instances,
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
    const undeployConfirm = confirm(this.translateService.instant('apps.instance.undeployConfirm', { appName: app.name }));
    if (undeployConfirm) {
      this.backend.undeploy(this.organizationId, app.app_instance_id)
        .subscribe(() => {
          app.undeploying = true;
          this.notificationsService.add({
            message:  this.translateService.instant('apps.instance.undeployMessage', { appName: app.name })
          });
          this.updateAppInstances(this.organizationId);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
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
    const deleteConfirm = confirm(this.translateService.instant('apps.registered.deleteApp', { appName: app.name }));
    if (deleteConfirm) {
      this.backend.deleteRegistered(this.organizationId, app.app_descriptor_id)
        .subscribe(deleteResponse => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.registered.deleting', { appName: app.name })
          });
          this.updateRegisteredInstances(this.organizationId);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
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
   * It modifies the graph, changing the border of the nodes that its labels contain the search term
   */
  searchInGraph() {
    if (this.searchTermGraph) {
      this.isSearchingInGraph = true;
      if (Object.values(this.searchGraphData.nodes)
          .filter(node => node.label.toLowerCase().includes(this.searchTermGraph.toLowerCase())).length > 0) {
        this.toGraphData();
      }
      this.occurrencesGraphCounter();
    }
  }
  /**
   * Transforms the data needed to create the graph
   */
  toGraphData() {
    this.graphData.reset([], []);
    this.searchGraphData.reset({}, {});
    this.foundOccurrenceInCluster = false;
    this.foundOccurrenceInInstance = false;
    this.foundOccurrenceInRegistered = false;
    if (this.searchTermGraph) {
      this.searchTermGraph = this.searchTermGraph.toLowerCase();
    }
    this.clusters.forEach(cluster => {
      if (this.filters.clusters) {
        this.setClusters(cluster);
      }
      this.setRegisteredAndInstances(cluster);
    });
    if ((!this.foundOccurrenceInRegistered && !this.foundOccurrenceInInstance && !this.foundOccurrenceInCluster)
        || ((this.foundOccurrenceInRegistered || this.foundOccurrenceInInstance || this.foundOccurrenceInCluster)
            && !this.initialState.showOnlyNodes)) {
      this.setLinksBetweenApps();
    }
    this.setRelatedNodes();
    this.graphDataLoaded = true;
  }
  /**
   * Opens the modal view that holds advanced filter options component
   */
  openAdvancedFilterOptions() {
    if (this.modalService.config.initialState
        && typeof this.modalService.config.initialState['showOnlyNodes'] === 'undefined'
        && typeof this.modalService.config.initialState['showRelatedNodes'] === 'undefined'
        && typeof this.modalService.config.initialState['defaultFilter'] === 'undefined') {
      this.modalService.config.initialState['showOnlyNodes'] = this.initialState.showOnlyNodes;
      this.modalService.config.initialState['showRelatedNodes'] = this.initialState.showRelatedNodes;
      this.modalService.config.initialState['defaultFilter'] = this.initialState.defaultFilter;
    }
    this.modalRef = this.modalService.show(AdvancedFilterOptionsComponent, { backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(() => {
      this.initialState = {
        showOnlyNodes: this.modalService.config.initialState['showOnlyNodes'],
        showRelatedNodes: this.modalService.config.initialState['showRelatedNodes'],
        defaultFilter: this.modalService.config.initialState['defaultFilter']
      };
      if (this.initialState.showRelatedNodes) {
        this.initialState.showOnlyNodes = true;
      }
      this.toGraphData();
      this.occurrencesGraphCounter();
      if (this.searchTermGraph) {
        this.isSearchingInGraph = true;
      }
    });
  }
  /**
   * Opens the modal view that holds the manage connections component
   */
  manageConnections() {
    const initialState = {
      organizationId: this.organizationId,
      defaultAutofocus: false,
    };
    this.modalRef = this.modalService.show(ManageConnectionsComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.onClose = (cancelled: boolean) => {
      this.updateAppInstances(this.organizationId);
    };
  }
  /**
   * It sets clusters nodes to add them in the graph
   * @param cluster current cluster to generate related data to this.
   */
  private setClusters(cluster: any) {
    const clusterName = cluster.name.toLowerCase();
    const nodeGroup = this.generateClusterNode(
      cluster,
      this.translateService.instant('resources.cluster') + cluster.name + ': ' + this.getBeautyStatusName(cluster.status_name));
    if (!this.foundOccurrenceInCluster) {
      this.foundOccurrenceInCluster = this.searchTermGraph && clusterName.includes(this.searchTermGraph);
    }
    this.searchGraphData.nodes[nodeGroup.id] = nodeGroup;
    this.addNode(clusterName, nodeGroup);
  }
  /**
   * It sets registered apps, instances and its relations
   * @param cluster current cluster to generate related data to this.
   */
  private setRegisteredAndInstances(cluster: any) {
    const instancesInCluster = this.getAppsInCluster(cluster.cluster_id);
    instancesInCluster.forEach(instance => {
      const registeredApp = this.getRegisteredApp(this.addNodeInstance(instance, cluster));
      if (registeredApp.length > 0) {
        this.addNodeRegistered(cluster, registeredApp);
        if (this.filters.instances && this.filters.registered) {
          this.setLinksInGraph(
              registeredApp[0]['app_descriptor_id'],
              instance['app_instance_id']);
        }
      }
      if (this.filters.clusters && this.filters.instances) {
        if ((this.areIncludedInstancesWithError
            && instance.status_name.toLowerCase() !== AppStatus.Error
            && instance.status_name.toLowerCase() !== AppStatus.DeploymentError)
            || !this.areIncludedInstancesWithError) {
          this.setLinksInGraph(
              instance['app_instance_id'],
              cluster.cluster_id);
        }
      }
    });
    this.hideLinks();
  }
  /**
   * It adds node registered
   * @param cluster Cluster for relate with our node registered
   * @param registeredApp Registered app for generate node registered
   */
  private addNodeRegistered(cluster, registeredApp) {
    const registeredName = registeredApp[0]['name'].toLowerCase();
    const nodeRegistered = {
      ...{
        id: registeredApp[0]['app_descriptor_id'],
        label: registeredApp[0]['name'],
        type: NodeType.Registered,
        tooltip: this.translateService.instant('apps.registeredTitle') + registeredApp[0]['name'],
        group: cluster.cluster_id
      },
      ...this.getStyledNode(
          ApplicationsComponent.REGISTERED_NODES_COLOR,
          ApplicationsComponent.REGISTERED_NODES_TEXT_COLOR,
          (this.searchTermGraph && registeredName.includes(this.searchTermGraph)) ?
                            ToolsComponent.FOUND_NODES_BORDER_COLOR : '',
          (this.searchTermGraph && registeredName.includes(this.searchTermGraph)) ?
                            ToolsComponent.FOUND_NODES_BORDER_SIZE : 0,
          ApplicationsComponent.CUSTOM_HEIGHT_REGISTERED)
    };
    if (!this.graphData.nodes.filter(node => node.id === nodeRegistered.id).length) {
      this.searchGraphData.nodes[nodeRegistered.id] = nodeRegistered;
      if (!this.foundOccurrenceInRegistered) {
        this.foundOccurrenceInRegistered = this.searchTermGraph && registeredName.includes(this.searchTermGraph);
      }
      if (this.filters.registered) {
        this.addNode(registeredName, nodeRegistered);
      }
    }
  }
  /**
   * It adds node instance to the graph and get node instance
   * @param instance Instance to generate the node instance
   * @param cluster Cluster for relate with our node instance
   */
  private addNodeInstance(instance, cluster): any {
    const instanceName = instance['name'].toLowerCase();
    const nodeInstance = this.generateInstanceNode(
      instance,
      cluster,
      this.translateService.instant('apps.instance.idInstance')
      + instance['name'] + ': ' + this.getBeautyStatusName(instance['status_name']));
    this.searchGraphData.nodes[nodeInstance.id] = nodeInstance;
    if (!this.foundOccurrenceInInstance) {
      this.foundOccurrenceInInstance = this.searchTermGraph && instanceName.includes(this.searchTermGraph);
    }
    if (this.filters.instances) {
      this.addNode(instanceName, nodeInstance);
    }
    return nodeInstance;
  }
  /**
   * It adds nodes to the graph if it's necessary
   * @param nodeName Node name to compare with the search term
   * @param node Node to add to our graph
   */
  private addNode(nodeName: string, node) {
    if (!this.searchTermGraph
        || (this.searchTermGraph && !nodeName.includes(this.searchTermGraph) && !this.initialState.showOnlyNodes)
        || (this.searchTermGraph && nodeName.includes(this.searchTermGraph))) {
      this.graphData.nodes.push(node);
    }
  }
  /**
   * It set the related nodes when we apply the show related nodes filter
   */
  private setRelatedNodes() {
    const relatedNodes = {};
    if ((this.foundOccurrenceInCluster || this.foundOccurrenceInInstance || this.foundOccurrenceInRegistered)
        && this.initialState.showRelatedNodes) {
      this.graphData.nodes
        .map(node => {
          this.searchGraphData.links[node.id].forEach(searchNode => {
            relatedNodes[node.id] = this.graphData.nodes[searchNode];
          });
        });
      const uniqueNodes = {};
      this.graphData.nodes.concat(Object.values(relatedNodes)).map(item => {
        uniqueNodes[item.id] = item;
      });
      this.graphData.nodes = Object.values(uniqueNodes);
    }
  }
  /**
   * It hides the links if it's there any occurrence
   */
  private hideLinks() {
    if ((this.foundOccurrenceInCluster || this.foundOccurrenceInRegistered || this.foundOccurrenceInInstance)
        && this.initialState.showOnlyNodes) {
      this.graphData.links = [];
    }
  }
  /**
   * It generates the graph and it updates considering the REFRESH_INTERVAL
   */
  private refreshData() {
    this.refreshIntervalRef = timer(0, ToolsComponent.REFRESH_INTERVAL).subscribe(() => {
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
              if (this.instances) {
                this.processedRegisteredList();
              }
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
  private setLinksInGraph(source: string, target: string) {
    if ((!this.foundOccurrenceInRegistered && !this.foundOccurrenceInInstance && !this.foundOccurrenceInCluster)
        || ((this.foundOccurrenceInRegistered || this.foundOccurrenceInInstance || this.foundOccurrenceInCluster)
            && !this.initialState.showOnlyNodes)) {
      this.graphData.links.push({source: source, target: target, is_between_apps: false});
    }
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
    if (this.initialState['showRelatedNodes']) {
      this.occurrencesCounter = this.graphData.nodes.length;
    } else {
      this.occurrencesCounter = this.graphData.nodes.filter(node => node.label.toLowerCase().includes(this.searchTermGraph)).length;
    }
  }
}
