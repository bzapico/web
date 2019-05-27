import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { AssetInfoComponent } from '../asset-info/asset-info.component';

@Component({
  selector: 'app-edge-controller',
  templateUrl: './edge-controller.component.html',
  styleUrls: ['./edge-controller.component.scss']
})
export class EdgeControllerComponent implements OnInit {
   /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization ID, Edge Controller ID, list of assets, show, created, name, labels and status
   */
  organizationId: string;
  ecId: string;
  ecAssets: any[];
  ecShow: string;
  ecCreated: string;
  ecName: string;
  ecLabels: any;
  ecStatus: string;
  fromModal: boolean;

  onClose: any;

  /**
   * Models that hold all inventory list
   */
  inventory: any[];

  /**
  * Index of the found asset in inventory list
  */
  assetIndexFound: number;

  /**
   * Change Edge Controller modal window reference
   */
  bsAssetModalRef: BsModalRef;

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
    this.assetIndexFound = -1;

    // Default initialization
    this.loadedData = true;
   }

  ngOnInit() {
    if (  this.fromModal === true) {

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
   * Opens the modal view that holds asset component //TODO
   */
  openAssetInfo(assetReduced) {
    // const assetLocated = {
    //   type: 'Asset',
    //   asset_ip: assetReduced.asset_ip,
    //   ec_name: this.ecName
    // };

    // let asset: any;

    // for (let i = 0; i < this.inventory.length && this.assetIndexFound === -1 ; i++) {
    //   if (
    //     this.inventory[i].type === assetLocated.type &&
    //     this.inventory[i].asset_ip === assetLocated.asset_ip &&
    //     this.inventory[i].ec_name === assetLocated.ec_name
    //     ) {
    //     this.assetIndexFound = i;
    //   }
    // }

    // asset = this.inventory[this.assetIndexFound];

    // const initialState = {
    //   organizationId: this.organizationId,
    //   inventory: this.inventory,
    //   assetId: asset.asset_id,
    //   agentId: asset.agent_id,
    //   assetIp: asset.asset_ip,
    //   ecName: asset.ec_name,
    //   show: asset.show,
    //   created: asset.created,
    //   labels: asset.labels,
    //   class: asset.os.class,
    //   version: asset.os.version,
    //   architecture: asset.hardware.cpus.architecture,
    //   model: asset.hardware.cpus.model,
    //   manufacturer: asset.hardware.cpus.manufacturer,
    //   cores: asset.hardware.cpus.num_cores,
    //   netInterfaces: asset.hardware.net_interfaces,
    //   storage: asset.storage,
    //   capacity: asset.storage.total_capacity,
    //   eic: asset.eic_net_ip,
    //   status: asset.status,
    //   fromModal: true
    // };

    // this.bsAssetModalRef =
    //   this.modalService.show(AssetInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    // this.bsAssetModalRef.content.closeBtnName = 'Close';

    this.onClose('hola');
    this.bsModalRef.hide();
//     this.modalService.onHide.subscribe((reason: string) => {
//       const _reason = reason ? `, dismissed by ${reason}` : '';
//       console.log(`onHide event has been fired${_reason}`);
// console.log('movidas del edge');
//     });
// this.bsModalRef.content.onClose.subscribe(result => {
//   console.log('results ', result);
// });


  }

}
