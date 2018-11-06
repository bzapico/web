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
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * Model that hold cluster ID
   */
  clusterId: string;

  /**
   * Model that hold cluster data
   */
  clusterData: any[];

  /**
   * List of available clusters
   */
  clusters: any[];

  /**
   * List of available nodes
   */
  nodes: any[];

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
    this.nodesCount = 0;
    this.clustersCount = 0;
    this.pieChartsData = [];
    this.clusterData = [];

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
         this.updateNodesList();
       }
     }
    //  this.backend.getClusterDetail(this.clusterId)
    //  .subscribe(response => {
    //    if (response && response._body) {
    //      const data = JSON.parse(response._body);
    //      this.clusterData = data;
    //    }
    //  });
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
   * Requests an updated list of available nodes to update the current one
   */
  updateNodesList() {
    // Requests an updated nodes list
    this.backend.getNodes(this.clusterId)
    .subscribe(response => {
      if (response && response._body) {
        const data = JSON.parse(response._body);
        this.nodes = data;
        this.updatePieChartsData(this.clusters, this.pieChartsData);
      }
    });
  }

}
