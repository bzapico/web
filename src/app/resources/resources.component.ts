import { Component, OnInit } from '@angular/core';
import { mockClusterChart, mockNodesChart } from '../utils/mocks';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

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
  mockClusterChart: any;
  mockNodesChart: any;
  autoScale: any;


  constructor(
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

  /**
   * Mocked Charts
   */
    Object.assign(this, {mockClusterChart, mockNodesChart});
   }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).OrganizationId;
      if (this.organizationId !== null) {
        this.backend.getResourcesSummary(this.organizationId)
        .subscribe(response => {
          if (response && response._body) {
            const data = JSON.parse(response._body);
            this.clustersCount = data['totalClusters'];
            this.nodesCount = data['totalNodes'];
          }
        });
        this.backend.getClusters(this.organizationId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.clusters = data;
              this.chunckedClusters = this.chunkClusterList(3, this.clusters);
            }
          });
      }
    }
  }
  /**
   * Opens the modal view that holds the edit cluster component
   */
  editCluster() {
  }
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
}
