import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-edge-controller-info',
  templateUrl: './edge-controller-info.component.html',
  styleUrls: ['./edge-controller-info.component.scss']
})
export class EdgeControllerInfoComponent implements OnInit {
   /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization ID, Edge Controller ID, list of assets, show, created, name, labels and status
   */
  organizationId: string;
  id: string;
  assets: any[];
  show: string;
  created: string;
  name: string;
  labels: any;
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
    const mock = localStorage.getItem(LocalStorageKeys.edgeControllerInfoMock) || null;
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
   * Gets the return asset value from the modal and gives it to infrastructure component 
   * to open the Asset Info modal window
   *  @param assetReduced Reduced asset info to locate the whole asset object
   */
  openAssetInfo(assetReduced) {
    let asset: any;
    let assetIndexFound: number;
    assetIndexFound = -1;

    for (let i = 0; i < this.inventory.length && assetIndexFound === -1 ; i++) {
      if (
        this.inventory[i].type === 'Asset' &&
        this.inventory[i].eic_net_ip === assetReduced.eic_net_ip &&
        this.inventory[i].ec_name === this.name
        ) {
        assetIndexFound = i;
      }
    }

    asset = this.inventory[assetIndexFound];

    this.onClose(asset);
    this.bsModalRef.hide();
  }

}
