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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { mockInfrastructurePieChart } from '../services/utils/mocks';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';
import { EdgeControllerInfoComponent } from './edge-controller-info/edge-controller-info.component';
import { InstallAgentComponent } from './install-agent/install-agent.component';
import { SimpleLogComponent } from './simple-log/simple-log.component';
import { AgentJoinTokenInfoComponent } from './agent-join-token-info/agent-join-token-info.component';
import { AddLabelComponent } from '../add-label/add-label.component';
import { TranslateService } from '@ngx-translate/core';
import { InfrastructureService } from './infrastructure.service';
import { InventoryStatus } from '../definitions/enums/inventory-status.enum';
import { InventoryType } from '../definitions/enums/inventory-type.enum';
import { Device } from '../definitions/models/device';
import { Asset } from '../definitions/models/asset';
import { Controller } from '../definitions/models/controller';
import { ChartData } from '../definitions/interfaces/chart-data';
import { Subscription, timer } from 'rxjs';
import { Inventory } from '../definitions/interfaces/inventory';
import { Item } from '../definitions/models/item';
import { AssetsForController } from '../definitions/models/assets-for-controller';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss']
})
export class InfrastructureComponent implements OnInit, OnDestroy  {
  /**
   * Refresh ratio reference
   */
  private static readonly REFRESH_RATIO = 6000;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold organization ID
   */
  organizationId: string;
  /**
   * Loaded Data status
   */
  loadedData: boolean;
  /**
   * List of available inventory
   */
  plainInventory: Item[];
  /**
   * List of available devices, assets and edge controllers
   */
  devices: Device[];
  assets: Asset[];
  controllers: Controller[];
  /**
   * Interval reference
   */
  refreshIntervalRef: Subscription;
  /**
   * NGX-Charts object-assign required object references (for rendering)
   */
  infrastructurePieChart: ChartData[];
  /**
   * Pie Chart options
   */
  gradient = true;
  doughnut = true;
  colorScheme = {
    domain: ['#5800FF', '#828282']
  };
  /**
   * Count of total cpu, memory, storage, online ECs
   */
  cpuCores: number;
  RAM: number;
  storage: number;
  ecsOnline: number;
  ecsTotal: number;
  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  reverse: boolean;
  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;
  /**
   * Model that hold the quick filter
   */
  quickFilter: string;
  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;
  /**
   * List of selected labels from an entity
   */
  selectedLabels = [];
  entityId: boolean;
  /**
   * Reference for the service that allows Edge Controller info and asset info component components
   */
  ecModalRef: BsModalRef;
  assetModalRef: BsModalRef;
  agentModalRef: BsModalRef;
  deviceModalRef: BsModalRef;
  lastOpModalRef: BsModalRef;
  addLabelModalRef: BsModalRef;
  /**
   * Hold request error message or undefined
   */
  requestError: string;
  /**
   * Active context menu item ID
   */
  activeContextMenuItemId: string;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private infrastructureService: InfrastructureService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.infrastructureMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.plainInventory = [];
    this.assets = [];
    this.devices = [];
    this.controllers = [];
    this.loadedData = false;
    this.requestError = '';
    this.cpuCores = 0;
    this.RAM = 0;
    this.storage = 0;
    this.ecsOnline = 0;
    this.ecsTotal = 0;
    this.activeContextMenuItemId = '';
    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.searchTerm = '';
    this.quickFilter = '';
    // Filter field
    this.filterField = false;
    /**
     * Charts reference init
     */
    Object.assign(this, { mockInfrastructurePieChart });
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        this.refreshIntervalRef = timer(0, InfrastructureComponent.REFRESH_RATIO).subscribe(() => {
          this.updateInventoryList();
        });
        this.backend.getInventorySummary(this.organizationId)
        .subscribe(summary => {
          if (summary) {
            this.cpuCores = summary['total_num_cpu'] || 0;
            this.RAM = summary['total_ram'] || 0;
            this.storage = summary['total_storage'] || 0;
          }
        });
      }
    }
  }
  ngOnDestroy() {
    this.refreshIntervalRef.unsubscribe();
  }
  /**
   * Sortby pipe in the component
   */
  setOrder(categoryName: string) {
    if (this.sortedBy === categoryName) {
      this.reverse = !this.reverse;
      this.filterField = false;
    }
    this.sortedBy = categoryName;
    this.filterField = true;
  }
  /**
   * Adds a quick filter
   */
  addQuickFilter(quickFilter: string) {
    if (this.quickFilter === quickFilter) {
      this.quickFilter = '';
    } else {
      this.quickFilter = quickFilter;
    }
  }
  /**
   * Reset all the filters fields
   */
  resetFilters() {
    this.filterField = false;
    this.searchTerm = '';
    this.sortedBy = '';
    this.quickFilter = '';
  }
  /**
   * Gets the category headers to add a class
   * @param categoryName class for the header category
   */
  getCategoryCSSClass(categoryName: string) {
    if (this.sortedBy === '') {
      return 'default';
    } else {
      if (this.sortedBy === categoryName) {
        return 'enabled';
      } else if (this.sortedBy !== categoryName) {
        return 'disabled';
      }
    }
  }
  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    return this.infrastructureService.classStatusCheck(status, className);
  }
  /**
  * Open install Agent info modal window
  */
  installAgent() {
    const initialState = {
      organizationId: this.organizationId,
      inventory: this.plainInventory,
      defaultAutofocus: false,
      ecCount: this.getECsCount()
    };
    this.agentModalRef = this.modalService.show(
      InstallAgentComponent, {
        initialState,
        backdrop: 'static',
        ignoreBackdropClick: false
      });
    this.agentModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(() => {
      this.updateInventoryList();
    });
  }
  /**
   * Opens context menu
   * @param item inventory item
   */
  openContextualMenu(event, item: Item) {
    event.stopPropagation();
    if (item.mapId() === this.activeContextMenuItemId) {
      this.activeContextMenuItemId = '';
    } else {
      this.activeContextMenuItemId = item.mapId();
    }
  }
  onContextualMenuClose(item) {
    this.activeContextMenuItemId = '';
  }
  /**
   * Opens the modal view that holds add label component
   * @param item Item object
   */
  addLabel(item: (Device & Asset & Controller)) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: item.mapType(),
      entity: item,
      modalTitle: ''
    };
    switch (item.mapType().toLowerCase()) {
      case InventoryType.Ec:
        initialState.modalTitle = item.name;
        break;
      case InventoryType.Asset:
        if (item.eic_net_ip) {
          initialState.modalTitle = item.eic_net_ip;
        } else {
          initialState.modalTitle = item.mapId();
        }
        break;
      case InventoryType.Device:
        initialState.modalTitle = item.mapId();
        break;
      default:
        break;
    }
    this.addLabelModalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.addLabelModalRef.content.closeBtnName = 'Close';
  }
  /**
   * Deletes a selected label
   * @param item selected label item
   */
  deleteLabel(item: (Device | Asset | Controller)) {
    const deleteConfirm = confirm(this.translateService.instant('infrastructure.label.deleteLabel'));
    if (deleteConfirm) {
      switch (item.mapType()) {
        case InventoryType.Ec:
          const indexEC = this.selectedLabels.map(x => x.id).indexOf(item.mapId());
          if (!(item instanceof Device)) {
            this.backend.updateEC(
                this.organizationId,
                item.edge_controller_id,
                {
                  organizationId: this.organizationId,
                  edge_controller_id: item.edge_controller_id,
                  remove_labels: true,
                  labels: this.selectedLabels[indexEC].labels
                }).subscribe(() => {
              this.selectedLabels.splice(indexEC, 1);
              this.updateInventoryList();
            });
          }
          break;
        case InventoryType.Asset:
          const indexAsset = this.selectedLabels.map(x => x.id).indexOf(item.mapId());
          this.backend.updateAsset(
            this.organizationId,
            item.mapId(),
            {
              organization_id: this.organizationId,
              asset_id: item.mapId(),
              remove_labels: true,
              labels: this.selectedLabels[indexAsset].labels
            }).subscribe(() => {
              this.selectedLabels.splice(indexAsset, 1);
              this.updateInventoryList();
            });
          break;
        case InventoryType.Device:
          const indexDevice = this.selectedLabels.map(x => x.id).indexOf(item.mapId());
          if (item instanceof Device) {
            this.backend.removeLabelFromDevice(
                this.organizationId,
                {
                  organizationId: this.organizationId,
                  device_id: item.mapId(),
                  device_group_id: item.device_group_id,
                  labels: this.selectedLabels[indexDevice].labels
                }).subscribe(() => {
              this.selectedLabels.splice(indexDevice, 1);
              this.updateInventoryList();
            });
          }
          break;
        default:
          break;
      }
    }
  }
  /**
   * Selects a label
   * @param item entity object
   * @param labelKey label key from selected label
   * @param labelValue label value from selected label
   */
  onLabelClick(item: Item, labelKey: string, labelValue: string) {
    const selectedIndex = this.indexOfLabelSelected(item.mapId(), labelKey, labelValue);
    const newLabel = {
      id: item.mapId(),
      labels: {}
    } ;
    if (selectedIndex === -1 ) {
      const selected = this.selectedLabels.map(x => x.id).indexOf(item.mapId());
      if (selected === -1) {
        newLabel.labels[labelKey] = labelValue;
        this.selectedLabels.push(newLabel);
      } else {
        this.selectedLabels[selected].labels[labelKey] = labelValue;
      }
    } else {
      if (Object.keys(this.selectedLabels[selectedIndex].labels).length > 1) {
        delete this.selectedLabels[selectedIndex].labels[labelKey];
      } else {
        this.selectedLabels.splice(selectedIndex, 1);
      }
    }
  }
  /**
   * Check if any label is selected to change the state of add/delete buttons and to change class when a new label is about to be selected
   * @param id entity from selected label
   */
  isAnyLabelSelected(id: string) {
    if (this.selectedLabels.length > 0) {
      const indexSelected = this.selectedLabels.map(x => x.id).indexOf(id);
      if (indexSelected >= 0) {
        return true;
      }
    }
    return false;
  }
  /**
   * Check if the label is selected. Returns the index number in selected labels or -1 if the label is not found.
   * @param entityId entity from selected label
   * @param labelKey label key from selected label
   * @param labelValue label value from selected label
   */
  indexOfLabelSelected(id: string, labelKey: string, labelValue: string) {
    for (let index = 0; index < this.selectedLabels.length; index++) {
      if (this.selectedLabels[index].id === id &&
        this.selectedLabels[index].labels[labelKey] === labelValue
      ) {
        return index;
      }
    }
    return -1;
  }
  /**
   * Get the item options to show in the context menu
   * @param item inventory item
   */
  getItemOptions(item: Item) {
    switch (item.mapType()) {
      case InventoryType.Ec:
        const ecOptions = [];
        const ecOption1 = {
          name: this.translateService.instant('infrastructure.contextMenu.moreInfo'),
          action: (inventoryItem: Controller) => {
            this.openEdgeControllerInfo(inventoryItem);
          },
          item: item
        };
        const ecOption2 = {
          name: this.translateService.instant('infrastructure.contextMenu.installAgent'),
          action: (inventoryItem: Controller) => {
            this.installAgentFromEC(inventoryItem);
          },
          item: item
        };
        const ecOption3 = {
          name: this.translateService.instant('infrastructure.contextMenu.createAgentToken'),
          action: (inventoryItem: Controller) => {
            if (inventoryItem.status === InventoryStatus.Online) {
              this.createAgentToken(inventoryItem);
            } else {
              this.notificationsService.add({
                message: this.translateService.instant('infrastructure.contextMenu.createAgentTokenMessage')
              });
            }
          },
          item: item
        };
        const ecOption4 = {
          name: this.translateService.instant('infrastructure.contextMenu.unlinkEC'),
          action: (inventoryItem: Controller) => {
            this.unlinkEIC(inventoryItem);
          },
          item: item
        };
        ecOptions.push(ecOption1);
        ecOptions.push(ecOption2);
        ecOptions.push(ecOption3);
        ecOptions.push(ecOption4);
      return ecOptions;
      case InventoryType.Asset:
        const assetOptions = [];
        const assetOption1 = {
          name: this.translateService.instant('infrastructure.contextMenu.moreInfo'),
          action: (inventoryItem: Asset) => {
            this.openAssetInfo(inventoryItem);
          },
          item: item
        };
        const assetOption2 = {
          name: this.translateService.instant('infrastructure.contextMenu.lastOperationLog'),
          action: (inventoryItem: Asset) => {
            this.lastOperationLog(inventoryItem);
          },
          item: item
        };
        const assetOption3 = {
          name: this.translateService.instant('infrastructure.contextMenu.uninstallAgent'),
          action: (inventoryItem: Asset) => {
            this.uninstallAgent(inventoryItem);
          },
          item: item
        };
        assetOptions.push(assetOption1);
        assetOptions.push(assetOption2);
        assetOptions.push(assetOption3);
      return assetOptions;
      case InventoryType.Device:
        const deviceOptions = [];
        const deviceOption1 = {
          name: this.translateService.instant('infrastructure.contextMenu.moreInfo'),
          action: (inventoryItem: Device) => {
            this.openDeviceInfo(inventoryItem);
          },
          item: item
        };
        const deviceOption2 = {
          name: this.translateService.instant('infrastructure.contextMenu.toggleEnablement'),
          action: (inventoryItem: Device) => {
            this.deviceEnablement(inventoryItem);
          },
          item: item
        };
        const deviceOption3 = {
          name: this.translateService.instant('infrastructure.contextMenu.unlinkDevice'),
          action: (inventoryItem: Device) => {
            this.unlinkDevice(inventoryItem);
          },
          item: item
        };
        deviceOptions.push(deviceOption1);
        deviceOptions.push(deviceOption2);
        deviceOptions.push(deviceOption3);
      return deviceOptions;
      default:
        break;
    }
  }
  /**
   * Requests an updated list of inventory
   */
  private updateInventoryList() {
    this.requestError = ''; // Empty error before requesting new list
    // Request to get inventory
    this.backend.getInventory(this.organizationId)
    .subscribe(response => {
      this.normalizeInventoryItems(response);
      if (!this.loadedData) {
        this.loadedData = true;
      }
      this.updateOnlineEcsPieChart(response);
    }, (errorResponse: { error: { message: string; }; }) => {
      this.loadedData = true;
      this.requestError = errorResponse.error.message;
    });
  }
  /**
   * Normalize the inventory list and added type
   * @param response Backend response where to modify the data
   */
  private normalizeInventoryItems(response: Inventory) {
    this.plainInventory = [];
    this.ecsOnline = 0;
    if (response.controllers) {
      this.ecsTotal = response.controllers.length;
    } else {
      this.ecsTotal = 0;
    }
    if (response) {
      if (response.devices) {
        response.devices.forEach(device => {
          this.plainInventory
            .push(
              new Device(
                  device.organization_id,
                  device.device_group_id,
                  device.device_id,
                  device.asset_device_id,
                  device.register_since,
                  device.labels,
                  device.enabled,
                  device.device_api_key,
                  device.device_status_name,
                  device.location,
                  device.asset_info)
              );
        });
      }
      if (response.assets) {
        response.assets.forEach(asset => {
          this.plainInventory
            .push(
              new Asset(
                  asset.organization_id,
                  asset.edge_controller_id,
                  asset.asset_id,
                  asset.agent_id,
                  asset.show,
                  asset.created,
                  asset.labels,
                  asset.os,
                  asset.hardware,
                  asset.storage,
                  asset.eic_net_ip,
                  asset.last_op_result,
                  asset.last_alive_timestamp,
                  asset.status,
                  asset.location
              ));
        });
      }
      if (response.controllers) {
        response.controllers.forEach(controller => {
        if (controller.status.toLowerCase() === InventoryStatus.Online) {
          this.ecsOnline++;
        }
          controller.assets = [];
          if (response.assets) {
            response.assets.forEach(asset => {
              if (asset.edge_controller_id === controller.edge_controller_id) {
                const assetIp = asset.eic_net_ip ? asset.eic_net_ip : 'undefined';
                controller.assets.push(new AssetsForController(asset.asset_id, assetIp, asset.mapStatus(), asset.edge_controller_id));
              }
            });
          }
          this.plainInventory
            .push(
              new Controller(
                controller.organization_id,
                controller.edge_controller_id,
                controller.show,
                controller.created,
                controller.name,
                controller.labels,
                controller.last_alive_timestamp,
                controller.status,
                controller.location,
                controller.last_op_result,
                controller.asset_info,
                controller.assets
              ));
        });
      }
    }
  }
  /**
   * Gets the Edge Controllers count in inventory list
   */
  private getECsCount() {
    return this.plainInventory.filter(item => item.mapType() === InventoryType.Ec).length;
  }
  /**
   * Updates the pie chart with latest changes
   * @param response Backend response where to modify the data
   */
  private updateOnlineEcsPieChart(response) {
    if (response.controllers) {
      this.ecsTotal = response.controllers.length;
    } else {
      this.ecsTotal = 0;
    }
    this.infrastructurePieChart = this.infrastructureService.generateSummaryChartData(this.ecsOnline, this.ecsTotal);
  }
  /**
  * Open Asset info modal window
  *  @param asset asset object
  */
  private openAssetInfo(asset: Asset) {
    if (!asset.os || Object.keys(asset.os).length === 0) {
      asset.os = {version: '-', class_name: '-'};
    }
    if (!asset.hardware || Object.keys(asset.hardware).length === 0) {
      asset.hardware = {
        cpus: [{manufacturer: '-', model: '-', architecture: '-', num_cores: 0}],
        installed_ram: 0,
        net_interfaces: [{type: '-', link_capacity: 0}]
      };
    }
    if (!asset.storage || Object.keys(asset.storage).length === 0) {
      asset.storage = [{total_capacity: 0}];
    }
    const initialStateAsset = {
      organizationId: this.organizationId,
      edgeControllerId: asset.edge_controller_id,
      assetId: asset.asset_id,
      agentId: asset.agent_id,
      assetIp: asset.eic_net_ip,
      show: asset.show,
      created: asset.created,
      labels: asset.labels,
      class: asset.os.class_name,
      version: asset.os.version,
      architecture: asset.os.architecture,
      cpus: asset.hardware.cpus,
      netInterfaces: asset.hardware.net_interfaces,
      storages: asset.storage,
      capacity: asset.hardware.installed_ram,
      eic: asset.eic_net_ip,
      status: asset.mapStatus(),
      lastAlive: asset.last_alive_timestamp,
      inventory: this.plainInventory,
    };
    this.assetModalRef = this.modalService.show(
    AssetInfoComponent, {
      initialState: initialStateAsset,
      backdrop: 'static',
      ignoreBackdropClick: false
    });
    // onClose is used if the Asset modal comes while closing it, which means that we need to trigger a new edge controller modal
    this.assetModalRef.content.onClose = (ecFromAsset: Controller) => {
    if (ecFromAsset) {
      this.openEdgeControllerInfo(ecFromAsset);
      }
    };
    this.assetModalRef.hide();
    this.assetModalRef.content.closeBtnName = 'Close';
  }
  /**
  * Open last operation log
  *  @param asset asset object
  */
  private lastOperationLog(asset: Asset) {
    let lastOpSummary;
    if (asset.last_op_result) {
      lastOpSummary = asset.last_op_result;
    } else {
      lastOpSummary = {
        timestamp: '0',
        status: null,
        info: this.translateService.instant('infrastructure.asset.noInfo'),
      };
    }
    const initialState = {
      organizationId: this.organizationId,
      lastOpSummary: lastOpSummary
    };
    this.lastOpModalRef = this.modalService.show(
    SimpleLogComponent, {
      initialState: initialState,
      backdrop: 'static',
      ignoreBackdropClick: false
    });
    this.lastOpModalRef.hide();
    this.lastOpModalRef.content.closeBtnName = 'Close';
  }
  /**
  * Uninstall agent
  *  @param asset asset object
  */
  private uninstallAgent(asset: Asset) {
    const uninstallConfirm = confirm(this.translateService.instant('infrastructure.asset.uninstallAgent'));
    if (uninstallConfirm) {
      if (this.organizationId !== null) {
        this.backend.uninstallAgent(this.organizationId, asset.edge_controller_id, asset.asset_id)
          .subscribe(() => {
            this.notificationsService.add({
              message: this.translateService.instant('infrastructure.asset.uninstallMessage',
                  { asset_id : asset.asset_id })
            });
          }, error => {
            this.notificationsService.add({
              message: error.error.message,
              type: 'warning'
            });
          });
      }
    }
  }
  /**
  * Open Edge Controllers info modal window
  *  @param controller Edge controller object
  */
  private openEdgeControllerInfo(controller: Controller) {
    const initialStateEC = {
      organizationId: this.organizationId,
      id: controller.edge_controller_id,
      assets: controller.assets,
      show: controller.show,
      created: controller.created,
      name: controller.name,
      labels: controller.labels,
      status: controller.status,
      type: controller.mapType(),
      inventory: this.plainInventory
    };
    this.ecModalRef = this.modalService.show(
      EdgeControllerInfoComponent, {
        initialState: initialStateEC,
        backdrop: 'static',
        ignoreBackdropClick: false
      });
    // onClose is used if the EC modal comes while closing it, which means that we need to trigger a new edge controller modal
    this.ecModalRef.content.onClose = (assetFromEC: Asset) => {
      if (assetFromEC) {
        this.openAssetInfo(assetFromEC);
      }
    };
    this.ecModalRef.hide();
    this.ecModalRef.content.closeBtnName = 'Close';
  }
  /**
   * Opens the modal view that holds the install Agent modal component
   * @param controller edge controller to install
   */
  private installAgentFromEC(controller: Controller) {
    const initialState = {
      organizationId: this.organizationId,
      edgeControllerId: controller.edge_controller_id,
      openFromEc: true,
      defaultAutofocus: true,
      ecCount: this.getECsCount(),
      name: controller.name
    };
    this.agentModalRef = this.modalService.show(
      InstallAgentComponent, {
        initialState,
        backdrop: 'static',
        ignoreBackdropClick: false
      });
    this.agentModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(() => {
      this.updateInventoryList();
    });
  }
  /**
   * Creates a new token for an Agent to join the platform
   * @param controller edge controller identifier
   */
  private createAgentToken(controller: Controller) {
    const initialState = {
      organizationId: this.organizationId,
      edgeControllerId: controller.edge_controller_id
    };
    this.agentModalRef = this.modalService.show(
      AgentJoinTokenInfoComponent, {
        initialState,
        backdrop: 'static',
        ignoreBackdropClick: false
      });
    this.agentModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(() => {
      this.updateInventoryList();
    });
  }
  /**
   * Operation to remove/uninstall an EIC
   * @param controller identifier
   */
  private unlinkEIC(controller: Controller) {
    if (controller.assets.length > 0) {
      alert(this.translateService.instant('infrastructure.EIC.unlinkEICError'));
    } else {
      const unlinkConfirm = confirm(this.translateService.instant('infrastructure.EIC.unlinkEIC'));
      if (unlinkConfirm) {
        if (this.organizationId !== null) {
          this.backend.unlinkEIC(this.organizationId, controller.edge_controller_id)
            .subscribe(() => {
              this.notificationsService.add({
                message: this.translateService.instant('infrastructure.EIC.unlinkMessage')
              });
            }, error => {
              this.notificationsService.add({
                message: error.error.message,
                type: 'warning'
              });
            });
        }
      }
    }
  }
  /**
   * Opens the modal view that holds the device info component
   * @param device device to be opened
   */
  openDeviceInfo(device: Device) {
    const initialState = {
      organizationId: this.organizationId,
      deviceGroupId: device.device_group_id,
      deviceId: device.device_id,
      created: device.register_since,
      labels: device.labels,
      status: device.device_status_name,
      enabled: device.enabled,
    };
    this.deviceModalRef = this.modalService.show(
      DeviceInfoComponent, {
        initialState,
        backdrop: 'static',
        ignoreBackdropClick: false
      });
    // onClose is used if the device info modal comes while closing it with the clicked group ID
    this.deviceModalRef.content.onClose = (groupId: string) => {
      if (groupId) {
        this.navigateToDevices(groupId);
      }
    };
    this.deviceModalRef.hide();
    this.deviceModalRef.content.closeBtnName = 'Close';
  }
  /**
   * Navigates to devices group view
   */
  private navigateToDevices(groupId: string) {
    window.location.href = '/#/devices?groupId=' + groupId;
  }
  /**
   * Executes devices enablement switcher statement to select one of enabled device to be executed.
   * @param device device in inventory item
   */
  private deviceEnablement(device: Device) {
    let deviceCurrentEnablementStr = this.translateService.instant('infrastructure.device.DISABLED');
    let deviceFutureEnablementStr = this.translateService.instant('infrastructure.device.enable');
    if (device.enabled) {
      deviceCurrentEnablementStr = this.translateService.instant('infrastructure.device.ENABLED');
      deviceFutureEnablementStr = this.translateService.instant('infrastructure.device.disable');
    }
    const confirmResult = confirm(
      this.translateService.instant('infrastructure.device.enablementConfirm',
            {
              device_id: device.device_id,
              deviceCurrentEnablementStr: deviceCurrentEnablementStr,
              deviceFutureEnablementStr: deviceFutureEnablementStr
            }
          ));
    if (confirmResult ) {
      device.enabled = !device.enabled;
      this.backend.updateDevice(this.organizationId, {
        organizationId: this.organizationId,
        deviceGroupId: device.device_group_id,
        deviceId: device.device_id,
        enabled: device.enabled
      }).subscribe(() => {
        let notificationText = this.translateService.instant('infrastructure.device.notificationTextEnabled');
        if (!device.enabled) {
        notificationText = this.translateService.instant('infrastructure.device.notificationTextDisabled');
        }
      this.notificationsService.add({
        message: this.translateService.instant('infrastructure.device.enablementMessage') + notificationText
      });
      });
    }
  }
  /**
   * Operation to unlink a device
   * @param device device in inventory item
   */
  private unlinkDevice(device: Device) {
    const unlinkConfirm = confirm(this.translateService.instant('infrastructure.device.unlinkConfirm'));
    if (unlinkConfirm) {
      this.backend.removeDevice(this.organizationId, device.device_group_id , device.device_id)
        .subscribe(() => {
          this.notificationsService.add({
            message: this.translateService.instant('infrastructure.device.unlinkMessage')
          });
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
        });
    }
  }
}
