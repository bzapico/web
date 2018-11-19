import { Component, OnInit } from '@angular/core';
import { mockClusterChart, mockNodesChart } from '../utils/mocks';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { EditClusterComponent } from '../edit-cluster/edit-cluster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


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
export class ResourcesComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

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
   * Count of total nodes
   */
  nodesCount: number;

  /**
   * Count of total clusters
   */
  clustersCount: number;

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

    this.clusters = [];
    this.chunckedClusters = [];
    this.nodesCount = 0;
    this.clustersCount = 0;
    this.pieChartsData = [];

  /**
   * Mocked Charts
   */
    Object.assign(this, {mockClusterChart, mockNodesChart});
   }

  ngOnInit() {
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).OrganizationId;
      if (this.organizationId !== null) {
        // Requests top card summary data
        this.backend.getResourcesSummary(this.organizationId)
        .subscribe(response => {
          if (response && response._body) {
            const data = JSON.parse(response._body);
            this.clustersCount = data['totalClusters'];
            this.nodesCount = data['totalNodes'];
          }
        });
        this.updateClusterList();
      }
    }
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

    this.modalRef = this.modalService.show(EditClusterComponent, { initialState });
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
    clusterList.forEach(element => {
      pieChartsData.push(this.generateClusterChartData(element.runningNodes, element.totalNodes));
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
      if (response && response._body) {
        const data = JSON.parse(response._body);
        this.clusters = data;
        this.chunckedClusters = this.chunkClusterList(3, this.clusters);
        this.updatePieChartsData(this.clusters, this.pieChartsData);
      }
    });
  }
}
