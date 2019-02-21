import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockClusterChart, mockNodesChart } from '../utils/mocks';
import { ActivatedRoute } from '@angular/router';
import { Cluster } from '../definitions/interfaces/cluster';
import { AddLabelComponent } from '../add-label/add-label.component';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent implements OnInit {

  /**
   * Models that hold the amount of active labels
   */
  activeLabel: number;

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
    private notificationsService: NotificationsService,
    private route: ActivatedRoute
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.clusterMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.loadedData = false;
    this.clusters = [];
    this.nodes = [];
    this.nodesCount = 0;
    this.clustersCount = 0;
    this.clusterData = {};
    this.requestError = '';
    this.activeLabel = 0;

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
      }];
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
   * Parse to string labels map
   * @param labels Key-value map that contains the labels
   */
  labelsToString(labels: any) {
    if (!labels || labels === '-') {
      return ;
    }
    return Object.entries(labels);
  }

  preventEmptyFields(cluster: Cluster) {
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
    if (!cluster.labels) {
      cluster.labels = '-';
    }
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
   * Checks if the cluster status requires an special css class
   * @param status Cluster status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    status = status || '';
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
   * Opens the modal view that holds add label component
   */
  addLabel() {
    const initialState = {
      organizationId: this.organizationId,
    };

    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { });

  }

  /**
   * Deletes a selected label
   * @param label selected label
   */
  deleteLabel(label) {
    console.log(label);
  }

  /**
   * Selects a label
   * @param entityId entity from selected label
   * @param labelKey label key from selected label
   * @param labelValue label value from selected label
   */
  onLabelClick(entityId, labelKey, labelValue) {
    const selectedIndex = this.indexOfLabelSelected(entityId, labelKey, labelValue);
    if (selectedIndex === -1 ) {
      const labelSelected = {
        entityId: entityId,
        labels: {}
      };
      labelSelected.labels[labelKey] = labelValue;
      this.selectedLabels.push(labelSelected);
    } else {
      this.selectedLabels.splice(selectedIndex, 1);
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
   * Check if any label is selected to change the state of add and delete buttons and to change class when is about to be selected
   */
  isAnyLabelSelected() {
    // this.activeLabel = this.indexOfLabelSelected(entityId, labelKey, labelValue);
// activeLabel === indexOfLabelSelected(node.node_id, label[0], label[1]) ||
// indexOfLabelSelected(node.node_id, label[0], label[1]).length > 0
  }
}
