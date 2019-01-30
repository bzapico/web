import { Component, OnInit, OnDestroy } from '@angular/core';
import { mockClusterChart, mockNodesChart } from '../utils/mocks';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { EditClusterComponent } from '../edit-cluster/edit-cluster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Cluster } from '../definitions/interfaces/cluster';


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
   * Clusters list chuncked in sub-lists of 3 elements (required to show top component slider)
   */
  chunckedClusters: any[];

  /**
   * Array containing charts data in the required format for NGX-Charts library rendering
   */
  pieChartsData: any[];

  /**
   * Array containing charts data in the required format for NGX-Charts library rendering
   */
  nodesChart: any[];

  /**
   * Count of total nodes
   */
  nodesCount: number;

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
  REFRESH_INTERVAL = 20000;

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
  mockClusterChart: any;
  mockNodesChart: any;

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
    this.chunckedClusters = [];
    this.nodesCount = 0;
    this.clustersCount = 0;
    this.pieChartsData = [];
    this.nodesChart = [{'name': 'Running nodes %', 'series': []}];
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
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        // Requests top card summary data
        this.backend.getResourcesSummary(this.organizationId)
        .subscribe(summary => {
            this.clustersCount = summary['total_clusters'] || 0 ;
            this.nodesCount = summary['total_nodes'] || 0;
        });
        this.updateClusterList();
        this.refreshIntervalRef = setInterval(() => {
          //  Request cluster list
          this.updateClusterList();
        }, this.REFRESH_INTERVAL);
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
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
   * Updates the pieChartsData with latest changes
   * @param clusterList Array containing the cluster list that sources the chart values
   * @param pieChartsData Array that contains sub-arrays that hold each chart labels and values
   */
  updatePieChartsData (clusterList, pieChartsData) {
    for (let i = 0; i < pieChartsData.length; i++) {
      pieChartsData.pop();
    }
    if (clusterList && clusterList.length > 0) {
      clusterList.forEach(element => {
        pieChartsData.push(this.generateClusterChartData(element.running_nodes, element.total_nodes));
      });
    }
  }

  /**
   * Updates nodes timeline with new data
   * @param runningNodesPercentage New running nodes count
   */
  updateNodesStatusLineChart(runningNodesPercentage) {
    const now = new Date(Date.now());
    let minutes: any = now.getMinutes();
    let seconds: any = now.getSeconds();
    const winwidth = window.innerWidth;
    const series = this.nodesChart[0].series;
    let numXAxisTimeStamps = 0;

    if (minutes < 10) {
      minutes = '0' + now.getMinutes();
    }
    if (seconds < 10) {
      seconds = '0' + now.getSeconds();
    }
    const entry = {
      'value': runningNodesPercentage,
      'name':  now.getHours() + ':' + minutes + ':' + seconds
    };
    if (winwidth < 1440) {
      numXAxisTimeStamps = 2;
    } else if (winwidth >= 1440 && winwidth <= 1800) {
      numXAxisTimeStamps = 3;
    } else if (winwidth > 1800) {
      numXAxisTimeStamps = 4;
    }
    if (this.nodesChart[0].series.length > numXAxisTimeStamps) {
      this.nodesChart[0].series = series.slice(series.length - numXAxisTimeStamps);
    }
    this.nodesChart[0].series.push(entry);
    this.nodesChart = [...this.nodesChart];
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
   * Splits the cluster list into chunks (number of elements defined by the chunks parameter)
   * @param chunks Number of elements per chunk
   * @param clusterList Array containing the available clusters
   * @returns chunked array
    */
  chunkClusterList(chunks, clusterList) {
    let i, j, chunkedArray;
    const resultChunkArray = [];
    const chunk = chunks;
    for (i = 0, j = clusterList.length; i < j; i += chunk) {
      chunkedArray = clusterList.slice(i, i + chunk);
      resultChunkArray.push(chunkedArray);
    }
    return resultChunkArray;
  }

  /**
   * Requests an updated list of available clusters to update the current one
   */
  updateClusterList() {
    // Requests an updated clusters list
    this.backend.getClusters(this.organizationId)
    .subscribe(response => {
      let runningNodesCount = 0;
      let totalNodesCount = 0;
      let nodesRunningPercentage = 0;
        if (response.clusters && response.clusters.length) {
          this.clusters = response.clusters;
        } else {
          this.clusters = [];
        }
        if (!this.loadedData) {
          this.loadedData = true;
        }
        this.clusters.forEach(cluster => {
          this.preventEmptyFields(cluster);
          runningNodesCount += cluster.running_nodes;
          totalNodesCount += cluster.total_nodes;
        });
        nodesRunningPercentage = (runningNodesCount / totalNodesCount) * 100;

        this.chunckedClusters = this.chunkClusterList(3, this.clusters);
        this.updatePieChartsData(this.clusters, this.pieChartsData);
        this.updateNodesStatusLineChart(nodesRunningPercentage);
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
  }
