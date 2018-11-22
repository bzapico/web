import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockClusterChart, mockNodesChart } from '../utils/mocks';
import { ActivatedRoute } from '@angular/router';
import { ClusterInfo } from '../definitions/interfaces/cluster-info';

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
  clusterData: ClusterInfo;

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
    this.clusters = [];
    this.nodes = [];
    this.nodesCount = 0;
    this.clustersCount = 0;
    this.clusterData = {};

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
            console.log(summary);
            this.clustersCount = summary['total_clusters'];
            this.nodesCount = summary['total_nodes'];
          });
         this.updateNodesList();
       }
     }
     this.backend.getClusterDetail(this.organizationId, this.clusterId)
      .subscribe(cluster => {
        this.clusterData = cluster;
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
    this.backend.getNodes(this.organizationId, this.clusterId)
    .subscribe(nodes => {
      this.nodes = nodes;
    });
  }

}
