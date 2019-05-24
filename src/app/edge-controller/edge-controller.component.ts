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
   * Models that hold organization id and more // TODO
   */
  organizationId: string;
  controllerId: string;
  assets: any;
  show: string;
  created: string;
  name: string;
  labels: any;
  status: string;

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
   * Opens the modal view that holds asset component //TODO
   */
  openAssetInfo(asset) {
    const initialState = {
      organizationId: this.organizationId,
      assetId: asset.asset_id,
      agentId: asset.agent_id,
      assetIp: asset.asset_ip,
      ecName: asset.ec_name,
      show: asset.show,
      created: asset.created,
      name: asset.name,
      labels: asset.labels,
      class: asset.os.class,
      version: asset.os.version,
      architecture: asset.hardware.cpus.architecture,
      model: asset.hardware.cpus.model,
      manufacturer: asset.hardware.cpus.manufacturer,
      cores: asset.hardware.cpus.num_cores,
      netInterfaces: asset.hardware.net_interfaces,
      storage: asset.storage,
      capacity: asset.storage.total_capacity,
      eic: asset.eic_net_ip,
      status: asset.status,
    };

    this.bsAssetModalRef =
      this.modalService.show(AssetInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsAssetModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
}
