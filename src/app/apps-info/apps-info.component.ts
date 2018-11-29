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
  instance: any;

  /**
   * Dialog title
   */
  title: string;

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

    // Graph initialization
    this.showlegend = false;
    this.orientation = 'TB';
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
      nodes: [],
      links: []
    };

  }

  ngOnInit() {
     if (this.organizationId !== null) {
      this.backend.getAppInstance(this.organizationId,  this.instanceId)
      .subscribe(instance => {
          this.instance = instance;
          this.toGraphData(instance);
      });
    }
  }

/**
 * Transforms the data needed to create the grapho
 * @param instance instance object
 */
  toGraphData(instance) {
    instance.services.forEach(service => {
      const node = {
        id: service.service_id,
        label: service.name
      };
      this.graphData.nodes.push(node);
    });
    instance.rules.forEach(rule => {
      rule.auth_services.forEach(linkedService => {
        const link = {
          source: rule.source_service_id,
          target: linkedService
        };
        this.graphData.links.push(link);
      });
    });
  }

/**
 * Transforms objects to arrays to be parsed to string and performed in the view
 * @param object Key-value map that contains the object
 */
  objectToString(object: any) {

    return Object.entries(object);
  }

}
