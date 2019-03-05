import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import * as shape from 'd3-shape';
import { mockAppsInstancesList } from '../utils/mocks';

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
  instance: any;

  /**
   * Dialog title
   */
  title: string;

  /**
   * NGX-Graphs object-assign required object references (for rendering)
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
  nalejColorScheme: string[];
  nextColorIndex: number;

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

    // Graph initialization
    this.showlegend = false;
    this.orientation = 'TB';
    this.curve = shape.curveBundle;
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = true;
    this.draggingEnabled = false;
    this.view = [350, 250];
    this.colorScheme = {
      domain: ['#6C86F7']
    };

    this.graphData = {
      nodes: [],
      links: []
    };
    this.instance = mockAppsInstancesList
    ; // Initialization to avoid null in view
    this.nalejColorScheme = [
      '#1725AE',
      '#040D5A',
      '#0F1B8C',
      '#01073A',
      '#091374'
    ];
    this.nextColorIndex = 0;

  }

  ngOnInit() {
     if (this.organizationId !== null) {
      this.backend.getAppInstance(this.organizationId,  this.instanceId)
      .subscribe(instance => {
          this.instance = instance;
          this.toGraphData(instance);
          if (!this.loadedData) {
            this.loadedData = true;
          }
      });
    }
  }

/**
 * Transforms the data needed to create the grapho
 * @param instance instance object
 */
  toGraphData(instance) {
    instance.groups.forEach(group => {
      const nodeGroup = {
        id: group.service_group_instance_id,
        label: group.name,
        tooltip: 'GROUP: ' + group.service_group_instance_id,
        color: this.nalejColorScheme[this.nextColorIndex],
        group: group.service_group_instance_id
      };
      this.graphData.nodes.push(nodeGroup);
      group.service_instances.forEach(service => {
        const nodeService = {
          id: group.service_group_instance_id + '-s-' + service.service_id,
          label: service.name,
          tooltip: 'SERVICE: ' + service.service_id,
          color: this.nalejColorScheme[this.nextColorIndex],
          group: group.service_group_instance_id
        };
        this.graphData.nodes.push(nodeService);
        this.graphData.links.push({
          source: group.service_group_instance_id,
          target: group.service_group_instance_id + '-s-' + service.service_id
        });

      });
      this.nextColorIndex += 1;
      if ( this.nextColorIndex >= this.nalejColorScheme.length ) {
        this.nextColorIndex = 0;
      }
    });

    if (instance.rules) {
      instance.rules.forEach(rule => {
        if (rule.auth_services) {
          rule.auth_services.forEach(linkedService => {
            console.log(linkedService);
            const link = {
              source: rule.target_service_group_name + rule.target_service_name,
              target: linkedService
            };
            this.graphData.links.push(link);
            console.log(link);
          });
        }
      });
    }
  }

/**
 * Transforms objects to arrays to be parsed to string and performed in the view
 * @param object Key-value map that contains the object
 */
  objectToString(object: any) {
    if (!object) {
      return ['--'];
    }
    return Object.entries(object);
  }

  /**
   * Adds https in case of being required
   * @param endpoint String containing the endpoint
   */
  getEndpointHref(endpoint: string) {
    let URL = '';
    if (!endpoint.startsWith('http') && !endpoint.startsWith('https')) {
      URL = 'http://' + endpoint;
    } else {
      URL = endpoint;
    }
    return URL;
  }

}
