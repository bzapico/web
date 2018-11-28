import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-apps-info',
  templateUrl: './apps-info.component.html',
  styleUrls: ['./apps-info.component.scss']
})
export class AppsInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * Model that hold organization ID
   */
  instanceId: string;

  /**
   * List of available apps instances
   */
  instances: any[];

  /**
   * Dialog title
   */
  title: string;

  /**
   * Models that hold app name, organization id, app description, app tags, app configuration, app service
   */
  name: string;
  id: string;
  description: string;
  tags: string;
  type: string;
  configuration: string;
  service: string;

  /**
   * NGX-Grpahs object-assign required object references (for rendering)
   */
  mockServicesGraph: any;

  /**
   * Graph options
   */
  showlegend: boolean;
  graphData: any;
  orientation: string;
  curve: any;
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  colorScheme: any;
  view: any[];
  width: number;
  height: number;
  draggingEnabled: boolean;


  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
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
    this.title = 'App info';
    this.name = 'Loading ...';
    this.id = 'Loading ...';
    this.tags = 'Loading ...';
    this.type = 'Loading ...';
    this.configuration = 'Loading ...';
    this.service = 'Loading ...';

    // Graph initialization
    this.showlegend = false;
    this.orientation = 'LR';
    this.curve = shape.curveLinear;
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = false;
    this.draggingEnabled = false;
    this.view = [400, 250];
    this.colorScheme = {
      domain: ['#6C86F7']
    };

    this.graphData = {
      nodes: [
        {
          id: 'mongo',
          label: 'mongo'
        }, {
          id: '1',
          label: 'Q',
        }, {
          id: '2',
          label: 'F',
        }, {
          id: '3',
          label: 'R'
        }, {
          id: '4',
          label: 'S'
        }, {
          id: '6',
          label: 'E'
        }
      ],
      links: [
        {
          source: 'mongo',
          target: '1',
          label: 'links to'
        }, {
          source: 'mongo',
          target: '2'
        }, {
          source: '1',
          target: '3',
          label: 'related to'
        }, {
          source: '2',
          target: '4'
        }, {
          source: '2',
          target: '6'
        }
      ]
    };
  }

  ngOnInit() {
     // Get User data from localStorage
     const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
     if (jwtData !== null) {
       this.organizationId = JSON.parse(jwtData).organizationID;
         this.updateAppInstance(this.organizationId, this.instanceId);
     }
  }

  updateAppInstance(organizationId: string, instanceId: string) {
    if (organizationId !== null) {
      // Request to get apps instances
      this.backend.getAppInstance(this.organizationId, this.instanceId)
      .subscribe(instances => {
          this.instances = instances;
          if (!this.loadedData) {
            this.loadedData = true;
          }
      });
    }
  }

}
