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
import { Component, OnInit } from '@angular/core';
import { Backend } from '../../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { InventoryType } from '../../definitions/enums/inventory-type.enum';
import { Controller } from '../../definitions/models/controller';
import { KeyValue } from '../../definitions/interfaces/key-value';
import { Item } from '../../definitions/models/item';

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
  show: string;
  created: number;
  labels: KeyValue;
  class: string;
  version: string;
  architecture: string;
  cpus: [];
  netInterfaces: string;
  storages: [];
  capacity: string;
  eic: string;
  status: string;
  lastAlive: number;
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
  inventory: Item[];
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
    const mock = localStorage.getItem(LocalStorageKeys.assetInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.loadedData = true;
    this.inventory = [];
    this.ecName = '';
  }

  ngOnInit() {
    this.ecName = this.getECname();
  }

  /**
   * Gets the Edge Controller name
   */
  getECname(): string {
    let edgeControllerName = '';
    for (let index = 0; index < this.inventory.length; index++) {
      if (this.inventory[index].mapType() === InventoryType.Ec
        && (this.inventory[index] as Controller).edge_controller_id
        && (this.inventory[index] as Controller).name
        && (this.inventory[index] as Controller).edge_controller_id === this.edgeControllerId) {
      edgeControllerName = (this.inventory[index] as Controller).name;
      }
    }
    return edgeControllerName;
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
    let controller: Controller;
    let ecIndexFound;
    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].mapType() === InventoryType.Ec
        && (this.inventory[i] as Controller).edge_controller_id === this.edgeControllerId) {
        ecIndexFound = i;
      }
    }
    controller = this.inventory[ecIndexFound] as Controller;
    this.onClose(controller);
    this.bsModalRef.hide();
  }
}
