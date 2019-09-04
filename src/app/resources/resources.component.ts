import { Component, OnInit, OnDestroy } from '@angular/core';
import { mockClusterChart } from '../utils/mocks';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { EditClusterComponent } from '../edit-cluster/edit-cluster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Cluster } from '../definitions/interfaces/cluster';
import { AddLabelComponent } from '../add-label/add-label.component';
import * as shape from 'd3-shape';
import { Subscription, timer } from 'rxjs';

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
 * It sets a border color for found nodes by a term in the graph
 */
const FOUND_NODES_BORDER_COLOR = '#5800FF';
/**
 * It sets a border size for found nodes by a term in the graph
 */
const FOUND_NODES_BORDER_SIZE = 4;


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {
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
   * List of available clusters
   */
  clusters: Cluster[];

  /**
   * List of processed clusters list with its associated instances
   */
  clusterWhitInstancesList: any[];

  /**
   * List of available apps instances
   */
  instances: any[];

  /**
   * Array containing charts data in the required format for NGX-Charts library rendering
   */
  pieChartData: any[];

  /**
   * Number of running clusters
   */
  countRunning: number;

  /**
   * Count of total clusters
   */
  clustersCount: number;

  /**
   * Holds the reference of the interval that refreshes the lists
   */
  refreshIntervalRef: Subscription;

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
   * NGX-Charts object-assign required object references (for rendering)
   */
  mockClusterChart: any;

  /**
   * Graph options
   */
  graphReset: boolean;
  graphDataLoaded: boolean;
  graphData: any;
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
  STATUS_COLORS = {
    RUNNING: '#00E6A0',
    ERROR: '#F7478A',
    OTHER: '#FFEB6C'
  };
  STATUS_TEXT_COLORS = {
    RUNNING: '#FFFFFF',
    ERROR: '#FFFFFF',
    OTHER: '#444444'
  };

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  reverse: boolean;

  /**
   * Count of total occurrences in search graph
   */
  occurrencesCounter: number;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;
  searchTermGraph: string;

  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;
  filterFieldClusters: boolean;

  /**
   * List of selected labels from an entity
   */
  selectedLabels = [];
  entityId: boolean;

  /**
   * Boolean variable for indicate when it is searching in the graph
   */
  isSearchingInGraph: boolean;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService) {
    const mock = localStorage.getItem(LocalStorageKeys.resourcesMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.loadedData = false;
    this.clusters = [];
    this.instances = [];
    this.clustersCount = 0;
    this.pieChartData = [];
    this.requestError = '';

    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.searchTerm = '';
    this.searchTermGraph = '';
    this.isSearchingInGraph = false;

    // Filter field
    this.filterField = false;
    this.filterFieldClusters = false;

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
    this.graphData = {
      nodes: [],
      links: []
    };
    /**
     * Mocked Charts
     */
      Object.assign(this, {mockClusterChart});
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
   * Generates the NGX-Chart required JSON object for pie chart rendering
   * @param running Number of running nodes in a cluster
   * @param total Number of total nodes in a cluster
   * @returns anonym array with the required object structure for pie chart rendering
   */
  generateClusterChartData(running: number, total: number): any[] {
    return [
      {
        name: 'Running',
        value: running
      },
      {
        name: 'Stopped',
        value: total - running
      }
    ];
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
        this.loadedData = false;
        this.requestError = errorResponse.error.message;
      });
  }

  /**
   * Opens the modal view that holds the edit cluster component
   */
  openEditCluster(cluster) {
    const initialState = {
      organizationId: this.organizationId,
      clusterId: cluster.cluster_id,
      clusterName: cluster.name,
      clusterDescription: cluster.description
    };

    this.modalRef = this.modalService.show(EditClusterComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateClusterList();
    });
  }

  /**
   * Sortby pipe in the component
   */
  setOrder(list: string, categoryName: string) {
    if (list === 'clusters') {
      if (this.sortedBy === categoryName) {
        this.reverse = !this.reverse;
        this.filterField = false;
      }
      this.sortedBy = categoryName;
      this.filterField = true;
    } else if (list === 'graph') {
      this.filterFieldClusters = true;
    }
  }

  /**
   * Reset all the filters fields
   */
  resetFilters(list: string) {
    if (list === 'clusters') {
      this.filterField = false;
      this.searchTerm = '';
      this.sortedBy = '';
    } else if (list === 'graph') {
      this.searchTermGraph = '';
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
   * Opens the modal view that holds add label component
   */
  addLabel(entity) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: 'cluster',
      entity: entity,
      modalTitle: entity.name
    };

    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {this.updateClusterList(); });
  }

  /**
   * Deletes a selected label
   * @param entity selected label entity
   */
  deleteLabel(entity) {
    const deleteConfirm = confirm('Delete labels?');
    if (deleteConfirm) {
      const index = this.selectedLabels.map(x => x.entityId).indexOf(entity.cluster_id);
      this.backend.saveClusterChanges(
        this.organizationId,
        entity.cluster_id,
        {
          organizationId: this.organizationId,
          clusterId: entity.cluster_id,
          remove_labels: true,
          labels: this.selectedLabels[index].labels
        }).subscribe(updateClusterResponse => {
          this.selectedLabels.splice(index, 1);
          this.updateClusterList();
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
  * Check if the label is selected. Return index number in selected labels or -1 if the label is not found.
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
   * It modifies the graph, changing the border of the nodes that its labels contain the search term
   */
  searchInGraph() {
    this.isSearchingInGraph = true;
    this.toGraphData();
    this.occurrencesGraphCounter();
  }

  /**
   * Refresh all resources data as clusters list, instances, and cluster count and it updates it considering the REFRESH_INTERVAL
   */
  private refreshData() {
    this.refreshIntervalRef = timer(0, REFRESH_INTERVAL).subscribe(() => {
    if (!this.isSearchingInGraph) {
      Promise.all([this.backend.getClusters(this.organizationId).toPromise(),
        this.backend.getInstances(this.organizationId).toPromise(),
        this.backend.getResourcesSummary(this.organizationId).toPromise(),
      ])
          .then(([clusters, instances, summary]) => {
            this.clusters = clusters.clusters;
            this.instances = instances.instances;
            this.processedClusterList();
            this.clustersCount = summary['total_clusters'] || 0 ;
            if (!this.loadedData) {
              this.loadedData = true;
            }
            this.updatePieChartStats(this.clusters);
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
   * Updates the pieChartsData status
   * @param clusterList Array containing the cluster list that sources the chart values
   */
  private updatePieChartStats(clusters: any[]) {
    let running = 0;
    if (clusters) {
      clusters.forEach(cluster => {
        if (cluster.status_name === 'RUNNING') {
          running += 1;
        }
      });
      this.countRunning = running;
      this.pieChartData = this.generateClusterChartData(this.countRunning, clusters.length);
    }
  }

  /**
   * Process cluster list and adds each instances associated with each cluster
   */
  private processedClusterList() {
    this.clusterWhitInstancesList = [];

    if (this.clusters) {
      this.clusters.forEach(cluster => {
        cluster.instances = this.getAppsInCluster(cluster.cluster_id);
       this.clusterWhitInstancesList.push(cluster);
      });
    }
  }

  /**
   * Fulfill gaps in cluster object to avoid data binding failure
   * @param cluster Cluster object
   */
  private preventEmptyFields(cluster: Cluster) {
    if (!cluster.name) {
      cluster.name = '-';
    }
    if (!cluster.description) {
      cluster.description = '-';
    }
  }

  /**
   * Transforms the data needed to create the graph
   */
  private toGraphData() {
    this.graphData = {
      nodes: [],
      links: []
    };
    if (this.searchTermGraph) {
      this.searchTermGraph = this.searchTermGraph.toLowerCase();
    }
    this.clusters.forEach(cluster => {
      const clusterName = cluster.name.toLowerCase();
      const nodeGroup = {
        id: cluster.cluster_id,
        label: cluster.name,
        tooltip: 'CLUSTER ' + cluster.name + ': ' + this.getBeautyStatusName(cluster.status_name),
        color: this.getNodeColor(cluster.status_name),
        text: this.getNodeTextColor(cluster.status_name),
        group: cluster.cluster_id,
        customHeight: CUSTOM_HEIGHT_CLUSTERS,
        customBorderColor: (this.searchTermGraph && clusterName.includes(this.searchTermGraph)) ? FOUND_NODES_BORDER_COLOR : '',
        customBorderWidth: (this.searchTermGraph && clusterName.includes(this.searchTermGraph)) ? FOUND_NODES_BORDER_SIZE : ''
      };
      this.graphData.nodes.push(nodeGroup);

      const instancesInCluster = this.getAppsInCluster(cluster.cluster_id);
      instancesInCluster.forEach(instance => {
        const instanceName = instance['name'].toLowerCase();
        const nodeInstance = {
          id: instance['app_instance_id'],
          label: instance['name'],
          tooltip: 'INSTANCE ' + instance['name'] + ': ' + this.getBeautyStatusName(instance['status_name']),
          color: this.getNodeColor(cluster.status_name),
          text: this.getNodeTextColor(cluster.status_name),
          group: cluster.cluster_id,
          customHeight: CUSTOM_HEIGHT_INSTANCES,
          customBorderColor: (this.searchTermGraph && instanceName.includes(this.searchTermGraph)) ? FOUND_NODES_BORDER_COLOR : '',
          customBorderWidth: (this.searchTermGraph && instanceName.includes(this.searchTermGraph)) ? FOUND_NODES_BORDER_SIZE : ''
        };
        const index = this.graphData.nodes.map(x => x.id).indexOf(nodeInstance.id);
        if (index === -1) {
          this.graphData.nodes.push(nodeInstance);
        }
        this.graphData.links.push({
          source: cluster.cluster_id,
          target: instance['app_instance_id']
        });
      });
    });
    this.graphDataLoaded = true;
  }

  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  private getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'running':
        return this.STATUS_COLORS.RUNNING;
      case 'error':
        return this.STATUS_COLORS.ERROR;
      case 'deployment_error':
        return this.STATUS_COLORS.ERROR;
      default:
        return this.STATUS_COLORS.OTHER;
    }
  }

  /**
   * Return an specific text color depending on the node status
   * @param status Status name
   */
  private getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'running':
        return this.STATUS_TEXT_COLORS.RUNNING;
      case 'error':
        return this.STATUS_TEXT_COLORS.ERROR;
      default:
        return this.STATUS_TEXT_COLORS.OTHER;
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
            appsInCluster[this.instances[indexInstance].app_instance_id] = this.instances[indexInstance];
          }
        }
      }
    }
    return Object.values(appsInCluster);
  }

  /**
   * Return a counter for the amount of search terms in graph
   */
  private occurrencesGraphCounter() {
    this.occurrencesCounter = this.graphData.nodes.filter(node => node.label.toLowerCase().includes(this.searchTermGraph)).length;
  }
}
