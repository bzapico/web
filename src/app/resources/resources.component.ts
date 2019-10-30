import { Component, OnInit, OnDestroy } from '@angular/core';
import { mockClusterChart } from '../services/utils/clusters.mock';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { EditClusterComponent } from '../edit-cluster/edit-cluster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Cluster } from '../definitions/interfaces/cluster';
import { AddLabelComponent } from '../add-label/add-label.component';
import { Subscription, timer } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToolsComponent } from '../tools/tools.component';
import { AppStatus } from '../definitions/enums/app-status.enum';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent extends ToolsComponent implements OnInit, OnDestroy {
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
  clusterWithInstancesList: any[];
  /**
   * Array containing charts data in the required format for NGX-Charts library rendering
   */
  pieChartData: any[];
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
   * NGX-Charts object-assign required object references (for rendering)
   */
  mockClusterChart: any;
  /**
   * Graph options
   */
  graphDataLoaded: boolean;
  graphData: any;
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
    private mockupBackendService: MockupBackendService,
    private translateService: TranslateService) {
    super();
    const mock = localStorage.getItem(LocalStorageKeys.resourcesMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.loadedData = false;
    this.clusters = [];
    this.clustersCount = 0;
    this.pieChartData = [];
    this.requestError = '';
    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.searchTerm = '';
    this.isSearchingInGraph = false;
    // Filter field
    this.filterField = false;
    this.filterFieldClusters = false;
    // Graph initialization
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
    super.ngOnInit();
    if (this.organizationId !== null) {
      this.refreshData();
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
      }, (errorResponse: { error: { message: string; }; }) => {
        this.loadedData = false;
        this.requestError = errorResponse.error.message;
      });
  }
  /**
   * Opens the modal view that holds the edit cluster component
   */
  openEditCluster(cluster: Cluster) {
    const initialState = {
      organizationId: this.organizationId,
      clusterId: cluster.cluster_id,
      clusterName: cluster.name
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
   * @param entity selected label entity
   */
  addLabel(entity: { name: any; }) {
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
  deleteLabel(entity: { cluster_id: string; }) {
    const deleteConfirm = confirm(this.translateService.instant('label.deleteLabels'));
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
  * Check if the label is selected. Return index number in selected labels or -1 if the label is not found.
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
    this.refreshIntervalRef = timer(0, ToolsComponent.REFRESH_INTERVAL).subscribe(() => {
    if (!this.isSearchingInGraph) {
      Promise.all([this.backend.getClusters(this.organizationId).toPromise(),
        this.backend.getInstances(this.organizationId).toPromise(),
        this.backend.getResourcesSummary(this.organizationId).toPromise(),
      ])
          .then(([clusters, instances, summary]) => {
            this.clusters = clusters.clusters;
            this.instances = instances.instances;
            this.getProcessedClusterList();
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
   * @param clusters Array containing the cluster list that sources the chart values
   */
  private updatePieChartStats(clusters: any[]) {
    let online = 0;
    if (clusters) {
      clusters.forEach(cluster => {
        if (cluster.status_name === 'ONLINE') {
          online += 1;
        }
      });
      this.pieChartData = this.generateClusterChartData(online, clusters.length);
    }
  }
  /**
   * Process cluster list and adds each instances associated with each cluster
   */
  private getProcessedClusterList() {
    this.clusterWithInstancesList = [];
    if (this.clusters) {
      this.clusters.forEach(cluster => {
        this.clusterWithInstancesList.push({
          ...cluster,
          ...{instances: this.getAppsInCluster(cluster.cluster_id).length}
        });
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
      const nodeGroup = this.generateClusterNode(
        cluster,
  this.translateService.instant('resources.cluster') + cluster.name + ': ' + this.getBeautyStatusName(cluster.status_name));
      this.graphData.nodes.push(nodeGroup);
      const instancesInCluster = this.getAppsInCluster(cluster.cluster_id);
      instancesInCluster.forEach(instance => {
        const nodeInstance = this.generateInstanceNode(
          instance,
          cluster,
    this.translateService.instant('apps.instance.idInstance') + instance['name'] + ': '
            + this.getBeautyStatusName(instance['status_name'])
        );
        const index = this.graphData.nodes.map(x => x.id).indexOf(nodeInstance.id);
        if (index === -1) {
          this.graphData.nodes.push(nodeInstance);
        }
        if ((this.areIncludedInstancesWithError
            && instance.status_name.toLowerCase() !== AppStatus.Error
            && instance.status_name !== AppStatus.DeploymentError)
            || !this.areIncludedInstancesWithError) {
          this.graphData.links.push({
            source: cluster.cluster_id,
            target: instance['app_instance_id'],
            is_between_apps: false
          });
        }
      });
    });
    this.setLinksBetweenApps();
    this.graphDataLoaded = true;
  }
  /**
   * Return a counter for the amount of search terms in graph
   */
  private occurrencesGraphCounter() {
    this.occurrencesCounter = this.graphData.nodes.filter(
      (node: { label: { toLowerCase: () => { includes: (arg0: string) => void; }; }; }) =>
      node.label.toLowerCase().includes(this.searchTermGraph)).length;
  }
}
