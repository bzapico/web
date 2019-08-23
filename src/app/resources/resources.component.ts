import { Component, OnInit, OnDestroy } from '@angular/core';
import { mockClusterChart } from '../utils/mocks';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { EditClusterComponent } from '../edit-cluster/edit-cluster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Cluster } from '../definitions/interfaces/cluster';
import { AddLabelComponent } from '../add-label/add-label.component';
import * as shape from 'd3-shape';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
   providers: [
    { provide:
      CarouselConfig,
      useValue: {
        interval: 0,
        noPause: false,
        showIndicators: true
      }
    }
  ]
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
  clusters: any[];

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
  refreshIntervalRef: any;

  /**
   * Refresh ratio
   */
  REFRESH_INTERVAL = 200000000;

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
  showlegend: boolean;
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
  nalejColorScheme: string[];
  nextColorIndex: number;
  STATUS_COLORS = {
    RUNNING: '#5800FF',
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
  entityId: boolean;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
  ) {
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

    // Filter field
    this.filterField = false;

    // Graph initialization
    this.graphReset = false;
    this.showlegend = false;
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

    this.nalejColorScheme = [
      '#4900d4',
      '#4000ba',
      '#3902a3',
      '#2e0480',
    ];
    this.nextColorIndex = 0;

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
        // Requests top card summary data
        this.backend.getResourcesSummary(this.organizationId)
        .subscribe(summary => {
            this.clustersCount = summary['total_clusters'] || 0 ;
        });
        this.updateClusterList();
        this.updateAppInstances(this.organizationId);
        this.refreshIntervalRef = setInterval(() => {
          //  Request cluster list
          this.updateClusterList();
          this.updateAppInstances(this.organizationId);
        }, this.REFRESH_INTERVAL);
      }
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
   * Updates the pieChartsData status
   * @param clusterList Array containing the cluster list that sources the chart values
   */
  updatePieChartStats(clusters: any[]) {
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

        this.updatePieChartStats(this.clusters);
    }, errorResponse => {
      this.loadedData = true;
      this.requestError = errorResponse.error.message;
    });
  }

  /**
   * Fulfill gaps in cluster object to avoid data binding failure
   * @param cluster Cluster object
   */
  preventEmptyFields(cluster: Cluster) {
    if (!cluster.name) {
      cluster.name = '-';
    }
    if (!cluster.description) {
      cluster.description = '-';
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
   * Transforms the data needed to create the grapho
   * @param instance instance object
   */
  toGraphData(instance) {
    this.graphData = {
      nodes: [],
      links: []
    };
    if (instance && instance.groups) {
      instance.groups.forEach(group => {
        const nodeGroup = {
          id: group.service_group_instance_id,
          label: group.name,
          tooltip: 'GROUP ' + group.name + ': ' + this.getBeautyStatusName(group.status_name),
          color: this.getNodeColor(group.status_name),
          text: this.getNodeTextColor(group.status_name),
          group: group.service_group_instance_id
        };
        this.graphData.nodes.push(nodeGroup);
        group.service_instances.forEach(service => {
          const nodeService = {
            id: group.service_group_instance_id + '-s-' + service.service_id,
            label: service.name,
            tooltip: 'SERVICE ' + service.name + ': ' + this.getBeautyStatusName(service.status_name),
            color: this.getNodeColor(service.status_name),
            text: this.getNodeTextColor(group.status_name),
            group: group.service_group_instance_id
          };
          this.graphData.nodes.push(nodeService);
          this.graphData.links.push({
            source: group.service_group_instance_id,
            target: group.service_group_instance_id + '-s-' + service.service_id
          });
        });

      });
    }

    if (instance.rules) {
      instance.rules.forEach(rule => {
        if (rule.auth_services) {
          rule.auth_services.forEach(authService => {
            const targetsIndex: number[] = [];
            for (let index = 0; index < this.graphData.nodes.length; index++) {
              if (this.graphData.nodes[index].label === rule.target_service_name) {
                targetsIndex.push(index);
              }
            }
            const sourcesIndex: number[] = [];
            for (let index = 0; index < this.graphData.nodes.length; index++) {
              if (this.graphData.nodes[index].label === authService) {
                sourcesIndex.push(index);
              }
            }
            sourcesIndex.forEach(indexSource => {
              targetsIndex.forEach(indexTarget => {
                const link = {
                  source: this.graphData.nodes[indexSource].id,
                  target: this.graphData.nodes[indexTarget].id,
                };
                this.graphData.links.push(link);
              });
            });
          });
        }
      });
    }
    this.graphDataLoaded = true;
  }

  /**
   * Get arrow color depending on node source color
   * @param sourceId Link source identifier
   */
  getArrowColor (sourceId: string): string {
    const index = this.graphData.nodes.map(x => x.id).indexOf(sourceId);
    if (index !== -1) {
      return this.graphData.nodes[index].color;
    }
  }

  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'service_running':
        return this.STATUS_COLORS.RUNNING;
      case 'service_error':
        return this.STATUS_COLORS.ERROR;
      case 'service_waiting':
        return this.STATUS_COLORS.OTHER;
      default:
        return this.STATUS_COLORS.OTHER;
    }
  }

  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'service_running':
        return this.STATUS_TEXT_COLORS.RUNNING;
      case 'service_error':
        return this.STATUS_TEXT_COLORS.ERROR;
      case 'service_waiting':
        return this.STATUS_TEXT_COLORS.OTHER;
      default:
        return this.STATUS_TEXT_COLORS.OTHER;
    }
  }

  /**
   * Return if the marker is required
   * @param link Link object
   */
  getMarker(link) {
    const index = this.graphData.nodes.map(x => x.id).indexOf(link.source);
    if (index !== -1) {
      if (this.graphData.nodes[index].id === this.graphData.nodes[index].group) {
        return '';
      } else {
        return 'url(#arrow)';
      }
    }
    return 'url(#arrow)';
  }

  /**
   * Adds https in case of being required
   * @param endpoint String containing the endpoint
   */
  getEndpointHref(endpoint: string) {
    let URL = '';
    if (!endpoint.startsWith('http') && !endpoint.startsWith('https')) {
      URL = 'http://' + endpoint;
    } else {
      URL = endpoint;
    }
    return URL;
  }

  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName (rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }

  /**
   * Returns the lenght of app instances that are part of each cluster
   * @param clusterId Identifier for the cluster
   */
  countAppsInCluster(clusterId: string) {
    let appsInCluster = 0;
    for (let indexInstance = 0, instancesLength = this.instances.length; indexInstance < instancesLength; indexInstance++) {
      const groups = this.instances[indexInstance].groups;
        for (let indexGroup = 0, groupsLength = groups.length; indexGroup < groupsLength; indexGroup++) {
          const serviceInstances = groups[indexGroup].service_instances;
          for (let indexService = 0; indexService < serviceInstances.length; indexService++) {
            if (serviceInstances[indexService].deployed_on_cluster_id === clusterId) {
              appsInCluster++;
            }
          }
      }
    }
    return appsInCluster;
  }
}
