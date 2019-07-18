import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

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
   * Models that hold organization id, asset ID, agent ID, asset IP, architecture,
   * cpus, show, created, labels, class, version, net interfaces, capacity,
   * EIC and status
   */
  organizationId: string;
  edgeControllerId: string;
  assetId: string;
  agentId: string;
  assetIp: string;
  architecture: string;
  cpus: [];
  show: string;
  created: string;
  labels: any;
  class: string;
  version: string;
  netInterfaces: string;
  capacity: string;
  eic: string;
  storages: [];
  status: string;

  /**
   * Models that hold the Edge Controller name
   */
  ecName: string;

  /**
   * Model that holds onclose method defined in Infrastructure component
   */
  onClose: any;

  /**
   * Models that hold all inventory list
   */
  inventory: any[];

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
    this.inventory = [];
    this.ecName = '';
    // this.storage = { type: 'unknown', total_capacity: 'undefined'};
   }

  ngOnInit() {
    this.ecName = this.getECname();
  }

  /**
   * Gets the Edge Controller name
   */
  getECname() {
    let edgeControllerName: any;

    for (let index = 0; index < this.inventory.length; index++) {
      if (
        this.inventory[index].edge_controller_id &&
        this.inventory[index].name &&
        this.inventory[index].edge_controller_id === this.edgeControllerId
        ) {
      edgeControllerName = this.inventory[index].name;
      }
    } return edgeControllerName;
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

      const formatedDate = month + '/' + day + '/' + year;

    return formatedDate;
  }

  /**
   * Gets the return Edge Controller value from the modal and gives it to infrastructure
   * component to open the Edge Controller Info modal window
   */
  openEdgeControllerInfo() {
    let controller: any;
    let ecIndexFound;

    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].edge_controller_id === this.edgeControllerId &&
        this.inventory[i].type === 'EC'
        ) {
        ecIndexFound = i;
      }
    }

    controller = this.inventory[ecIndexFound];

    this.onClose(controller);

    this.bsModalRef.hide();
  }
}
