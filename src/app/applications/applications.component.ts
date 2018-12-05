import { Component, OnInit, OnDestroy } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { mockAppChart, mockAppPieChart } from '../utils/mocks';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { ApplicationInstance } from '../definitions/interfaces/application-instance';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppsInfoComponent } from '../apps-info/apps-info.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
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
   * List of available apps instances
   */
  instances: any[];

  /**
   * List of registered apps
   */
  registered: any[];

  labels: any[];

  /**
   * Number of running instances
   */
  countRunning: number;

  /**
   * Number of registered apps
   */
  countRegistered: number;

  /**
   * Interval reference
   */
  refreshIntervalRef: any;

  /**
   * Charts references
   */
  mockAppChart: any;
  mockAppPieChart: any;
  appsChart: any;

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

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
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.instances = [];
    this.registered = [];
    this.labels = [];
    this.countRegistered = 0;
    this.loadedData = false;
    this.appsChart = [{name: 'Running apps', series: []}];
    /**
     * Charts reference init
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
          this.refreshIntervalRef = setInterval(() => {
            this.updateAppInstances(this.organizationId);
            this.updateRegisteredInstances(this.organizationId);
          }, 60000); // Refresh each 60 seconds
      }
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

  /**
   * Updates instances array
   * @param organizationId Organization identifier
   */
  updateAppInstances(organizationId: string) {
    if (organizationId !== null) {
      // Request to get apps instances
      this.backend.getInstances(this.organizationId)
      .subscribe(response => {
          this.instances = response.instances || [];
          this.updatePieChartStats(this.instances);
          this.updateRunningAppsLineChart(this.instances);
          if (!this.loadedData) {
            this.loadedData = true;
          }
      });
    }
  }

  /**
   * Updates registered apps array
   * @param organizationId Organization identifier
   */
  updateRegisteredInstances(organizationId: string) {
    if (organizationId !== null) {
      // Request to get registered apps
      this.backend.getRegisteredApps(this.organizationId)
      .subscribe(response => {
          this.registered = response.descriptors || [];
      });
    }
  }

  /**
   * Opens the modal view that holds the apps info component
   */
  openAppsInfo(app) {
    const initialState = {
      organizationId: this.organizationId,
      instanceId: app.app_instance_id
    };

    this.modalRef = this.modalService.show(AppsInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    // this.modalService.onHide.subscribe((reason: string) => { this.updateUserList(); });
  }

  /**
   * Updates pie chart status
   * @param instances Array of instance objects
   */
  updatePieChartStats(instances: any[]) {
    let running = 0;
    if (instances) {
      instances.forEach(app => {
        if (app.status_name === 'RUNNING') {
          running += 1;
        }
      });
      this.countRunning = running;
      this.instancesPieChart = this.generateSummaryChartData(this.countRunning, instances.length);
    }
  }

  /**
   * Updates timeline chart
   * @param instances Instances array
   */
  updateRunningAppsLineChart(instances) {
    let runningAppsCount = 0;
    instances.forEach(instance => {
      if (instance.status_name.toLowerCase() === 'running') {
        runningAppsCount += 1;
      }
    });

    const now = new Date(Date.now());
    const entry = {
      'value': runningAppsCount / instances.length * 100,
      'name':  now.getHours() + ':' + now.getMinutes()
    };

    if (this.appsChart[0].series.length > 5) {
      // Removes first element
      this.appsChart[0].series.shift();
    }
    this.appsChart[0].series.push(entry);
    this.appsChart = [...this.appsChart];
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
   * Parse to string labels map
   * @param labels Key-value map that contains the labels
   */
  labelsToString(labels: any) {
    if (!labels || labels === '-') {
      return ;
    }
    return Object.entries(labels);
  }

  /**
   * Fulfill nulls to avoid data binding failure
   * @param instance Application instance
   */
  preventEmptyFields(instance: ApplicationInstance) {
    if (!instance.description) {
      instance.description = '-';
    }
    if (!instance.labels) {
      instance.labels = '-';
    }
    if (!instance.status_name) {
      instance.status_name = '-';
    }
  }
}