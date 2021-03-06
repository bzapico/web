/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// tslint:disable:no-any
import { Component } from '@angular/core';
import { Backend } from '../../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { InventoryType } from '../../definitions/enums/inventory-type.enum';
import { Asset } from '../../definitions/models/asset';
import { KeyValue } from '../../definitions/interfaces/key-value';

@Component({
  selector: 'app-edge-controller-info',
  templateUrl: './edge-controller-info.component.html'
})
export class EdgeControllerInfoComponent {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization ID, Edge Controller ID, list of assets, show, created, name, labels and status
   */
  organizationId: string;
  id: string;
  assets: Asset[];
  show: string;
  created: number;
  name: string;
  labels: KeyValue;
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
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.edgeControllerInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.backendService;
    } else {
      this.backend = this.mockupBackendService;
    }
    // Default initialization
    this.loadedData = true;
  }

  /**
   * Create a new JavaScript Date object based on the timestamp
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate(timestamp: number) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const formattedDate = month + '/' + day + '/' + year;
    return formattedDate;
  }
  /**
   * Gets the return asset value from the modal and gives it to infrastructure component
   * to open the Asset Info modal window
   *  @param assetReduced Reduced asset info to locate the whole asset object
   */
  openAssetInfo(assetReduced) {
    let asset: Asset;
    let assetIndexFound: number;
    assetIndexFound = -1;
    for (let i = 0; i < this.inventory.length && assetIndexFound === -1 ; i++) {
      if (
        this.inventory[i].type === InventoryType.Asset &&
        this.inventory[i].asset_id === assetReduced.asset_id &&
        this.inventory[i].edge_controller_id === assetReduced.edge_controller_id
        ) {
        assetIndexFound = i;
      }
    }
    asset = this.inventory[assetIndexFound];
    this.onClose(asset);
    this.bsModalRef.hide();
  }
}
