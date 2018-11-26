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
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * List of available apps
   */
  apps: any[];

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
  mockAppChart: any;
  mockAppPieChart: any;
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
    this.loadedData = false;
    this.apps = [];

  /**
   * Mocked Charts
   */
  Object.assign(this, {mockAppPieChart, mockAppChart});
}


  ngOnInit() {
      // Get User data from localStorage
      const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
      if (jwtData !== null) {
        this.organizationId = JSON.parse(jwtData).OrganizationId;
        if (this.organizationId !== null) {
          // Requests top card summary data
          this.backend.getApps(this.organizationId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.apps = data;
            }
          });
        }
      }
    }
}
