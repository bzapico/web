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
   * Models that hold organization id, asset ID, agent ID, asset IP, Edge Controller name, architecture,
   *  model, manugacturer, cores, show, created, name, labels, class, version, net interfaces, capacity,
   * EIC and status
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
  labels: any;
  class: string;
  version: string;
  netInterfaces: string;
  capacity: string;
  eic: string;
  status: string;

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
      if (this.inventory[i].ec_name === this.ecName &&
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
