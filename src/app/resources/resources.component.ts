/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { EditClusterComponent } from './edit-cluster/edit-cluster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Cluster } from '../definitions/interfaces/cluster';
import { AddLabelComponent } from '../add-label/add-label.component';
import { Subscription, timer } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToolsComponent } from '../tools/tools.component';
import { AppStatus } from '../definitions/enums/app-status.enum';
import { ClusterStatusInfoComponent } from './cluster-status-info/cluster-status-info.component';
import { ToolsService } from '../tools/tools.service';
import { NotificationsService } from '../services/notifications.service';
import { NameValue } from '../definitions/interfaces/name-value';
import { GraphData } from '../definitions/models/graph-data';
import { Options, DataSet, Node, Edge, NgxNetworkVisService } from '@nalej/ngx-network-vis';
import { GraphNode } from '../definitions/interfaces/graph-node';
import { StyledNode } from '../definitions/interfaces/styled-node';

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
  clusterWithInstancesList: (Cluster & {instances: number})[];
  /**
   * Array containing charts data in the required format for NGX-Charts library rendering
   */
  pieChartData: NameValue[];
  /**
   * Count of total clusters
   */
  clustersCount: number;
  /**
   * Number of online clusters
   */
  countOnline: number;
  /**
   * Holds the reference of the interval that refreshes the lists
   */
  refreshIntervalRef: Subscription;
  /**
   * Hold request error message or undefined
   */
  requestError: string;
  /**
   * Graph options
   */
  graphDataLoaded: boolean;
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
  /**
   * Active context menu item ID
   */
  activeContextMenuId: string;
  /**
   * Options to configure the layout and physic for the graph
   */
  options: Options;
  /**
   * Nodes data set
   */
  nodes: DataSet<Node>;
  /**
   * Edges data set
   */
  edges: DataSet<Edge>;

  graphId = 'resources-graph';

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private translateService: TranslateService,
    private toolsService: ToolsService,
    private notificationsService: NotificationsService,
    private ngxNetworkVisService: NgxNetworkVisService
    ) {
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
    this.activeContextMenuId = '';
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
    this.graphData = new GraphData([], []);
    this.setOptions();
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
   * @param online Number of online nodes in a cluster
   * @param total Number of total nodes in a cluster
   * @returns anonym array with the required object structure for pie chart rendering
   */
  generateClusterChartData(online: number): NameValue[] {
    return [
      {
        name: 'Online',
        value: online
      },
      {
        name: 'Stopped',
        value: this.clusters.length - online
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
   * Opens the modal view that holds the edit cluster component
   */
  openStatusCluster() {
    const initialState = {
      organizationId: this.organizationId
    };
    this.modalRef = this.modalService.show(ClusterStatusInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
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
  addLabel(entity: { name: string; }) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: 'cluster',
      entity: entity,
      modalTitle: entity.name
    };
    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(() => {this.updateClusterList(); });
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
        }).subscribe(() => {
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
  onLabelClick(entityId: string, labelKey: string | number, labelValue: string) {
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
  indexOfLabelSelected(entityId: string, labelKey: string | number, labelValue: string) {
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
  isAnyLabelSelected(entityId: string) {
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
   * Opens clusters context menu
   * @param cluster cluster
   */
  openContextualMenu(event, cluster: any) {
    event.stopPropagation();
    if (cluster.cluster_id === this.activeContextMenuId) {
      this.activeContextMenuId = '';
    } else {
      this.activeContextMenuId = cluster.cluster_id;
    }
  }
  /**
   * Return an specific dot color depending on the node status
   * @param status Status name
   * @param cluster cluster
   */
  getStatusDotColor(status: string, cluster: any): {'background-color': string, border?: string} {
    return this.toolsService.getStatusDotColor(status, cluster);
  }
  /**
   * Return the status if the state is installed
   * @param status Status name
   * @param cluster cluster
   */
  getStatusOrState(status: string, cluster: any): string {
    return this.toolsService.getStatusOrState(status, cluster);
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
            this.clusters = clusters.clusters || [];
            this.instances = instances.instances || [];
            this.getProcessedClusterList();
            this.clustersCount = summary['total_clusters'] || 0 ;
            if (!this.loadedData) {
              this.loadedData = true;
            }
            this.updatePieChartStats();
            if (this.clusters && this.clusters.length > 0
                || this.instances && this.instances.length > 0) {
              this.toGraphData();
            }
          })
          .catch(errorResponse => {
            this.loadedData = false;
            this.requestError = errorResponse.error.message;
          });
      }
    });
  }
  /**
   * Requests to cordon that prevents the scheduler to deploy user applications on the target cluster
   * @param cluster cluster
   */
  cordon(cluster) {
    const uncordonConfirm = confirm(this.translateService.instant('resources.cordonConfirm', { clusterName: cluster.name }));
    if (uncordonConfirm) {
      this.backend.cordon(this.organizationId, cluster.cluster_id)
        .subscribe(() => {
          this.notificationsService.add({
            message:  this.translateService.instant('resources.cordonMessage', { clusterName: cluster.name })
          });
          this.refreshData();
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
        });
    }
  }
  /**
   * Requests to uncordon that enables the scheduler to deploy user applications on the target cluster
   * @param cluster cluster
   */
  uncordon(cluster) {
    const uncordonConfirm = confirm(this.translateService.instant('resources.uncordonConfirm', { clusterName: cluster.name }));
    if (uncordonConfirm) {
      this.backend.uncordon(this.organizationId, cluster.cluster_id)
        .subscribe(() => {
          this.notificationsService.add({
            message:  this.translateService.instant('resources.uncordonMessage', { clusterName: cluster.name })
          });
          this.refreshData();
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
        });
    }
  }
  /**
   * Requests to drain that reschedules all applications deployed in a given cluster
   * @param cluster cluster
   */
  drain(cluster) {
    const uncordonConfirm = confirm(this.translateService.instant('resources.drainConfirm', { clusterName: cluster.name }));
    if (uncordonConfirm) {
      this.backend.drain(this.organizationId, cluster.cluster_id)
        .subscribe(() => {
          this.notificationsService.add({
            message:  this.translateService.instant('resources.drainMessage', { clusterName: cluster.name })
          });
          this.refreshData();
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
        });
    }
  }
  /**
   * Updates the pieChartsData status
   */
  private updatePieChartStats() {
    let online = 0;
    if (this.clusters) {
      this.clusters.forEach(cluster => {
        if (cluster.status_name === 'ONLINE' || 'ONLINE_CORDON') {
          online++;
        }
      });
      this.countOnline = online;
      this.pieChartData = this.generateClusterChartData(online);
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
    this.graphData.nodes = [];
    this.graphData.links = [];
    this.nodes = new DataSet<Node>([]);
    this.edges = new DataSet<Edge>([]);
    if (this.searchTermGraph) {
      this.searchTermGraph = this.searchTermGraph.toLowerCase();
    }
    this.clusters.forEach(cluster => {
      const nodeGroup: GraphNode & StyledNode = this.generateClusterNode(
        cluster,
  this.translateService.instant('resources.cluster') + cluster.name + ': ' + this.getBeautyStatusName(cluster.status_name));
      this.graphData.nodes.push(nodeGroup);
      this.nodes.add([{
        id: nodeGroup.id,
        label: nodeGroup.label,
        font: {
          color: '#fff',
          size: 20,
          strokeWidth: 1,
          strokeColor: '#000'
        },
        level: 1,
        shape: nodeGroup.shape,
        shapeProperties: { borderRadius: 6 },
        size: 37,
        borderWidth: 2,
        borderWidthSelected: 3,
        color: nodeGroup.color
      }]);
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
        this.nodes.add([{
          id: nodeInstance.id,
          label: nodeInstance.label,
          font: {
            color: '#fff',
            size: 20,
            strokeWidth: 1,
            strokeColor: '#000'
          },
          level: 1,
          shape: nodeInstance.shape,
          shapeProperties: { borderRadius: 6 },
          size: 37,
          borderWidth: 2,
          borderWidthSelected: 3,
          color: nodeInstance.color
        }]);

        if ((this.areIncludedInstancesWithError
            && instance.status_name.toLowerCase() !== AppStatus.Error
            && instance.status_name.toLowerCase() !== AppStatus.DeploymentError)
            || !this.areIncludedInstancesWithError) {
          this.graphData
            .links.push({ source: cluster.cluster_id, target: instance.app_instance_id, notMarker: false, isBetweenApps: false});
        }
      });
    });
    this.setLinksBetweenApps();
    const container = document.getElementById(this.graphId);
    this.ngxNetworkVisService.generate(this.graphId, container, this.nodes, this.edges, this.options);
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
  /**
   * Alerts when the graph is ready
   */
  networkReady() {
    console.log('Network is ready');
  }

  private setOptions() {
    const layout = {
      hierarchical: {
        enabled: true,
        levelSeparation: 150,
        nodeSpacing: 110,
        treeSpacing: 200,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: 'UD'
      }
    };
    const manipulation = {
      enabled: false,
      initiallyActive: false,
      addNode: true,
      addEdge: true,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true
    };
    const interaction = {
      navigationButtons: false
    };
    this.options = { layout, manipulation, interaction };
  }
}
