import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockClusterChart, mockNodesChart } from '../utils/mocks';

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
   * List of available clusters
   */
  clusters: any[];

  /**
   * List of available nodes
   */
  nodes: any[];

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
    this.nodes = [];
    this.chunckedClusters = [];
    this.nodesCount = 0;
    this.clustersCount = 0;
    this.pieChartsData = [];

  /**
   * Mocked Charts
   */
    Object.assign(this, {mockClusterChart});
   }

  ngOnInit() {
  }

}
