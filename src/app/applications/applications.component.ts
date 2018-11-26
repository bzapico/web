import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { mockAppChart, mockAppPieChart } from '../utils/mocks';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
   /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * List of available app instances
   */
  instances: any[];

  /**
   * List of registered apps
   */
  registered: any[];

  /**
   * Number of running instances
   */
  countRunning: number;

  /**
   * Number of registered apps
   */
  countRegistered: number;

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
  instancesTimelineChart: any;
  instancesPieChart: any;
  autoScale: any;

  constructor(
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.instances = [];
    this.registered = [];
    this.countRegistered = 0;
    /**
     * Mocked Charts
     */
    Object.assign(this, {mockAppChart, mockAppPieChart});
}

  ngOnInit() {
      // Get User data from localStorage
      const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
      if (jwtData !== null) {
        this.organizationId = JSON.parse(jwtData).organizationID;
          this.updateAppInstances(this.organizationId);
          this.updateRegisteredInstances(this.organizationId);
      }
  }

  updateAppInstances(organizationId: string) {
    if (organizationId !== null) {
      // Requests top card summary data
      this.backend.getApps(this.organizationId)
      .subscribe(apps => {
          this.instances = apps;
          this.updatePieChartStats(apps);
      });
    }
  }
  updateRegisteredInstances(organizationId: string) {
    if (organizationId !== null) {
      // Requests top card summary data
      this.backend.getRegisteredApps(this.organizationId)
      .subscribe(registered => {
          this.registered = registered;
      });
    } 
  }
  updatePieChartStats(instances: any[]) {
    let running = 0;
    instances.forEach(app => {
      if (app.status_name === 'Running') {
        running += 1;
      }
    });
    this.countRunning = running;
    this.instancesPieChart = this.generateSummaryChartData(this.countRunning, instances.length - 1);
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
}
