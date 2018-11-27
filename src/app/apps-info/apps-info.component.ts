import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

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
  legend: boolean;
  graphData: any;
  orientation: string;
  curve: any;
  autoZoom: boolean;
  autoCenter: boolean;
  colorScheme = {
    domain: ['#6C86F7']
  };

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



    this.legend = false;
    this.orientation = 'TB';
    this.curve = 'curveLinear';
    this.autoZoom = false;
    this.autoCenter = false;

    this.graphData = {
      nodes: [
        {
          id: 'start',
          label: 'start'
        }, {
          id: '1',
          label: 'Query ThreatConnect',
        }, {
          id: '2',
          label: 'Query XForce',
        }, {
          id: '3',
          label: 'Format Results'
        }, {
          id: '4',
          label: 'Search Splunk'
        }, {
          id: '5',
          label: 'Block LDAP'
        }, {
          id: '6',
          label: 'Email Results'
        }
      ],
      links: [
        {
          source: 'start',
          target: '1',
          label: 'links to'
        }, {
          source: 'start',
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
        }, {
          source: '3',
          target: '5'
        }
      ]

};

  }


  ngOnInit() {
  }

}
