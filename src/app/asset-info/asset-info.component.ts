import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { EdgeControllerComponent } from '../edge-controller/edge-controller.component';

@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit {
   /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id and more // TODO
   */
  organizationId: string;
  assetId: string;
  agentId: string;
  assetIp: string;
  ecName: string;
  architecture: string;
  model: string;
  manufacturer: string;
  cores: string;
  show: string;
  created: string;
  name: string;
  labels: any;
  class: string;
  version: string;
  netInterfaces: string;
  capacity: string;
  eic: string;
  status: string;

  /**
   * Change Edge Controller modal window reference
   */
  bsEdgeModalRef: BsModalRef;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.assetInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.loadedData = true;
   }

  ngOnInit() {
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
   * Create a new JavaScript Date object based on the timestamp 
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate(timestamp: any) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const formattedDate = month + '/' + day + '/' + year;

    return formattedDate;
  }

  /**
   * Opens the modal view that holds Edge Controller component //TODO
   */
  openEdgeControllerInfo(controller) {
    const initialState = {
      organizationId: this.organizationId,
      controllerId: controller.edge_controller_id,
      assets: controller.assets,
      show: controller.show,
      created: controller.created,
      name: controller.name,
      labels: controller.labels,
      status: controller.status
    };
    this.bsEdgeModalRef =
      this.modalService.show(EdgeControllerComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsEdgeModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
}
