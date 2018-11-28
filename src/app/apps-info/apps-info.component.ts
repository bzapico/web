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
    this.title = 'App info';
    this.name = 'Loading ...'; // Default initialization
    this.id = 'Loading ...'; // Default initialization
    this.tags = 'Loading ...'; // Default initialization
    this.type = 'Loading ...'; // Default initialization
    this.configuration = 'Loading ...'; // Default initialization
    this.service = 'Loading ...'; // Default initialization

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
  }

}
