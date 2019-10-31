import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockNodesChart } from '../services/utils/mocks';
import { mockClusterChart } from '../services/utils/clusters.mock';
import { ActivatedRoute } from '@angular/router';
import { Cluster } from '../definitions/interfaces/cluster';
import { AddLabelComponent } from '../add-label/add-label.component';
import { ClusterStatus } from '../definitions/enums/cluster-status.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent implements OnInit {
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
   * Model that hold cluster ID
   */
  clusterId: string;
  /**
   * Model that hold cluster data
   */
  clusterData: Cluster;
  /**
   * List of available clusters
   */
  clusters: any[];
  /**
   * List of available nodes
   */
  nodes: any[];
  /**
   * Count of total nodes
   */
  nodesCount: number;
  /**
   * Count of total clusters
   */
  clustersCount: number;
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
  mockNodesChart: any;
  autoScale: any;
  clusterPieChart: any;
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

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.clusterMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.loadedData = false;
    this.clusters = [];
    this.nodes = [];
    this.nodesCount = 0;
    this.clustersCount = 0;
    this.clusterData = {};
    this.requestError = '';
    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.searchTerm = '';
    // Filter field
    this.filterField = false;
  /**
   * Mocked Charts
   */
    Object.assign(this, {mockClusterChart, mockNodesChart});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clusterId = params['clusterId']; // (+) converts string 'id' to a number
    });
     // Get User data from localStorage
      const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
      if (jwtData !== null) {
        this.organizationId = JSON.parse(jwtData).organizationID;
        if (this.organizationId !== null) {
         // Requests top card summary data
          this.backend.getResourcesSummary(this.organizationId)
          .subscribe(summary => {
            this.clustersCount = summary['total_clusters'];
            this.nodesCount = summary['total_nodes'];
          });
          this.updateNodesList();
        }
      }
      this.backend.getClusterDetail(this.organizationId, this.clusterId)
      .subscribe(cluster => {
        this.preventEmptyFields(cluster);
        this.clusterData = cluster;
        this.clusterPieChart = this.generateSummaryChartData(this.clusterData.running_nodes, this.clusterData.total_nodes);
      });
  }

  /**
   * Checks if the cluster status requires an special css class
   * @param status Cluster status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    status = status || '';
    switch (status.toLowerCase()) {
      case ClusterStatus.Running:
      case ClusterStatus.Online:
      case ClusterStatus.OnlineCordon:
        return className.toLowerCase() === ClusterStatus.Running;
      case ClusterStatus.Error:
      case ClusterStatus.Offline:
      case ClusterStatus.OfflineCordon:
        return className.toLowerCase() === ClusterStatus.Error;
      default:
        return className.toLowerCase() === ClusterStatus.Unknown;
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
   * Opens the modal view that holds add label component
   */
  addLabel(node) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: 'node',
      entity: node,
      modalTitle: node.ip
    };
    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { });
  }
  /**
   * Deletes a selected label
   * @param entity selected label entity
   */
  deleteLabel(entity) {
    const deleteConfirm = confirm(this.translateService.instant('label.deleteLabels'));
    if (deleteConfirm) {
      const index = this.selectedLabels.map(x => x.entityId).indexOf(entity.node_id);
      this.backend.updateNode(
        this.organizationId,
        entity.node_id,
        {
          organizationId: this.organizationId,
          nodeId: entity.node_id,
          remove_labels: true,
          labels: this.selectedLabels[index].labels
        }).subscribe(updateNodeResponse => {
          this.selectedLabels.splice(index, 1);
          this.updateNodesList();
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
   * Requests an updated list of available nodes to update the current one
   */
  updateNodesList() {
    this.requestError = ''; // Empty error before requesting new list
    // Requests an updated nodes list
    this.backend.getNodes(this.organizationId, this.clusterId)
    .subscribe(response => {
      this.nodes = response.nodes;
      if (!this.loadedData) {
        this.loadedData = true;
      }
    }, errorResponse => {
      this.loadedData = true;
      this.requestError = errorResponse.error.message;
    });
  }
  /**
   * Fulfill nulls to avoid data binding failure
   * @param cluster cluster
   */
  private preventEmptyFields(cluster: Cluster) {
    if (!cluster.name) {
      cluster.name = '-';
    }
    if (!cluster.description) {
      cluster.description = '-';
    }
    if (!cluster.total_nodes) {
      cluster.total_nodes = 0;
    }
    if (!cluster.running_nodes) {
      cluster.running_nodes = 0;
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
        name: this.translateService.instant('status.runningUp'),
        value: running
      },
      {
        name: this.translateService.instant('status.stopped'),
        value: total - running
      }];
  }
}
