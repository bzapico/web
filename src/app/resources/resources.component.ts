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
  refreshIntervalRef:  NodeJS.Timer;

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
  showYAxis = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  showGridLines = false;
  showRefLines = true;
  showRefLabels = true;
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
  autoScale: any;

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
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
    this.nodesChart = [{'name': 'Running nodes', 'series': []}];

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
        }, 60000); // Update each 60 seconds
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
      clusterId: cluster.id,
      clusterName: cluster.name,
      clusterDescription: cluster.description,
      clusterTags: cluster.tags
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

  updateNodesStatusLineChart(runningNodesCount) {
    const now = new Date(Date.now());
    const entry = {
      'value': runningNodesCount,
      'name':  now.getHours() + ':' + now.getMinutes()
    };

    if (this.nodesChart[0].series.length > 5) {
      // Removes first element
      this.nodesChart[0].series.shift();
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
      }];
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
        if (response.clusters.length) {
          this.clusters = response.clusters;
        } else {
          this.clusters = [];
        }
        if (!this.loadedData) {
          this.loadedData = true;
        }
        this.clusters.forEach(cluster => {
          this.preventEmptyFields(cluster);
          runningNodesCount += cluster.running_nodes / cluster.total_nodes * 100;
        });

        this.chunckedClusters = this.chunkClusterList(3, this.clusters);
        this.updatePieChartsData(this.clusters, this.pieChartsData);
        this.updateNodesStatusLineChart(runningNodesCount);
    });
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
   * Checks if the cluster status requires an special css class
   * @param status Cluster status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status) {
      case 'Running': {
        if (className === 'Running') {
          return true;
        }
        break;
      }
      case 'Error': {
        if (className === 'Error') {
          return true;
        }
        break;
      }
     default: {
        if (className === 'Process') {
          return true;
        }
        return false;
      }
    }
  }

}
