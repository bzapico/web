import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { mockInfrastructurePieChart } from '../utils/mocks';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DeviceInfoComponent } from '../device-info/device-info.component';
import { AssetInfoComponent } from '../asset-info/asset-info.component';
import { EdgeControllerInfoComponent } from '../edge-controller-info/edge-controller-info.component';
import { InstallAgentComponent } from '../install-agent/install-agent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SimpleLogComponent } from '../simple-log/simple-log.component';
import { AgentJoinTokenInfoComponent } from '../agent-join-token-info/agent-join-token-info.component';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss']
})
export class InfrastructureComponent implements OnInit, OnDestroy  {
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
  inventory: any[];

  /**
   * List of available devices, assets and edge controllers
   */
  devices: any[];
  assets: any[];
  controllers: any [];

  /**
   * Interval reference
   */
  refreshIntervalRef: any;

  /**
   * Refresh ratio reference
   */
  REFRESH_RATIO = 5000; // 5 seconds

  /**
   * NGX-Charts object-assign required object references (for rendering)
   */
  infrastructurePieChart: any;

  /**
   * Pie Chart options
   */
  gradient = true;
  doughnut = true;
  colorScheme = {
    domain: ['#0937FF', '#949494']
  };

  /**
   * Count of total cpu, memory, storage, online ECs
   */
  cpuCoresCount: number;
  memoryCount: number;
  storageCount: number;
  onlineCount: number;
  onlineTotalCount: number;

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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.infrastructureMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.inventory = [];
    this.assets = [];
    this.devices = [];
    this.controllers = [];
    this.loadedData = false;
    this.requestError = '';
    this.cpuCoresCount = 0;
    this.memoryCount = 0;
    this.storageCount = 0;
    this.onlineCount = 0;
    this.onlineTotalCount = 0;
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
        this.backend.getInventorySummary(this.organizationId)
        .subscribe(summary => {
          this.cpuCoresCount = summary['total_num_cpu'];
          this.memoryCount = summary['total_ram'];
          this.storageCount = summary['total_storage'];
        });
        this.updateInventoryList();
        this.refreshIntervalRef = setInterval(() => {
          this.updateInventoryList();
        }, this.REFRESH_RATIO); // Refresh each 60 seconds
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
  }

  /**
   * Requests an updated list of inventory
   */
  updateInventoryList() {
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
  normalizeInventoryItems(response: any) {
    this.inventory = [];
    if (!response || response === null) {
    } else {
      if (response.devices) {
        response.devices.forEach((device: {
            type: string;
            id: any;
            device_id: any;
            status: any;
            device_status_name: any;
            location: string;
          }) => {
          device.type = 'Device';
          device.id = device.device_id;
          device.status = device.device_status_name;
          if (!device.location || device.location === undefined || device.location === null) {
            device.location = 'undefined';
          }
          this.inventory.push(device);
        });
      }
      if (response.assets) {
        response.assets.forEach((asset: {
            type: string;
            id: any;
            asset_id: any;
            location: string;
          }) => {
          asset.type = 'Asset';
          asset.id = asset.asset_id;
          if (!asset.location || asset.location === undefined || asset.location === null) {
            asset.location = 'undefined';
          }
          this.inventory.push(asset);
        });
      }
      if (response.controllers) {
        response.controllers.forEach((controller: {
            type: string;
            id: any;
            edge_controller_id: any;
            location: string;
          }) => {
          controller.type = 'EC';
          controller.id = controller.edge_controller_id;
          if (!controller.location || controller.location === undefined || controller.location === null) {
            controller.location = 'undefined';
          }
          this.inventory.push(controller);
        });
      }
    }
  }

  /**
   * Gets the Edge Controllers count in inventory list
   */
  getECsCount() {
    let ecCount = 0;

    this.inventory.forEach(item => {
      if (item.type === 'EC') {
        ecCount += 1;
      }
    });
    return ecCount;
  }

  /**
   * Updates the pie chart with latest changes
   * @param response Backend response where to modify the data
   */
  updateOnlineEcsPieChart(response) {
    this.onlineTotalCount = response.controllers.length;
    const itemStatus =
    response.controllers.filter((item: { status: string; }) => item.status === 'online');
    this.onlineCount = itemStatus.length;
    this.infrastructurePieChart = this.generateSummaryChartData(this.onlineCount, this.onlineTotalCount);
  }

  /**
   * Generates the NGX-Chart required JSON object for pie chart rendering
   * @param online Number of online ECs
   * @param total Number of total ECs online
   * @returns anonym array with the required object structure for pie chart rendering
   */
  generateSummaryChartData(online: number, total: number): any[] {
    return [
      {
        name: 'Online',
        value: online
      },
      {
        name: 'Offline',
        value: total - online
      }
    ];
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
   * Parse to string labels map
   * @param labels Key-value map that contains the labels
   */
  labelsToString(labels: any) {
    if (!labels || labels === '-') {
      return ;
    }
    return Object.entries(labels);
  }

  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case 'online': {
        if (className.toLowerCase() === 'online') {
          return true;
        }
        break;
      }
      case 'offline': {
        if (className.toLowerCase() === 'offline') {
          return true;
        }
        break;
      }
      case 'process': {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        break;
      }
     default: {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        return false;
      }
    }
  }

  /**
  * Open Asset info modal window
  *  @param asset asset object
  */
  openAssetInfo(asset: any) {
    const initialStateAsset = {
      organizationId: this.organizationId,
      edgeControllerId: asset.edge_controller_id,
      assetId: asset.asset_id,
      agentId: asset.agent_id,
      assetIp: asset.eic_net_ip,
      show: asset.show,
      created: asset.created,
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
      summary: asset.last_op_summary,
      lastAlive: asset.last_alive_timestamp,
      inventory: this.inventory,
    };

    this.assetModalRef = this.modalService.show(
    AssetInfoComponent, {
      initialState: initialStateAsset,
      backdrop: 'static',
      ignoreBackdropClick: false
    });

    // onClose is used if the Asset modal comes while closing it, which means that we need to trigger a new edge controller modal
    this.assetModalRef.content.onClose = (ecFromAsset: any) => {
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
  lastOperationLog(asset: any) {
    const initialState = {
      organizationId: this.organizationId,
      lastOpSummary: asset.last_op_summary
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
  uninstallAgent(asset: any) {
    const uninstallConfirm = confirm('Uninstall Agent?');
    if (uninstallConfirm) {
      if (this.organizationId !== null) {
        this.backend.uninstallAgent(this.organizationId, asset.edge_controller_id, asset.asset_id)
          .subscribe(response => {
            this.notificationsService.add({
              message: 'Agent ' + '' + ' has been uninstalled',
              timeout: 3000
            });
          }, error => {
            this.notificationsService.add({
              message: error.error.message,
              timeout: 5000,
              type: 'warning'
            });
          });
      }
    } else {
      // Do nothing
    }
  }

  /**
  * Open Edge Controllers info modal window
  *  @param controller Edge controller object
  */
  openEdgeControllerInfo(controller: any) {
    const initialStateEC = {
      organizationId: this.organizationId,
      id: controller.edge_controller_id,
      assets: controller.assets,
      show: controller.show,
      created: controller.created,
      name: controller.name,
      labels: controller.labels,
      status: controller.status,
      inventory: this.inventory
    };

    this.ecModalRef = this.modalService.show(
      EdgeControllerInfoComponent, {
        initialState: initialStateEC,
        backdrop: 'static',
        ignoreBackdropClick: false
       });

    // onClose is used if the EC modal comes while closing it, which means that we need to trigger a new edge controller modal
    this.ecModalRef.content.onClose = (assetFromEC: any) => {
      if (assetFromEC) {
        this.openAssetInfo(assetFromEC);
      }
    };
    this.ecModalRef.hide();
    this.ecModalRef.content.closeBtnName = 'Close';
  }

  /*
  /**
  * Open install Agent info modal window
  */
  installAgent() {
    const initialState = {
      organizationId: this.organizationId,
      inventory: this.inventory,
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
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateInventoryList();
     });
  }

  /**
   * Opens the modal view that holds the install Agent modal component
   * @param controller edge controller to install
   */
  installAgentFromEC(controller: any) {
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
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateInventoryList();
    });
  }

  /**
   * Creates a new token for an Agent to join the platform
   * @param controller edge controller identifier
   */
  createAgentToken(controller: any) {
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
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateInventoryList();
    });
  }

  /**
   * Operation to remove/uninstall an EIC
   * @param controller identifier
   */
  unlinkEIC(controller: any) {
    if (controller.assets !== 0) {
      alert('Cannot unlink EC. Agents on associated assets should be uninstalled before.');
    } else {
      const unlinkConfirm = confirm('Unlink Edge Controller?');
      if (unlinkConfirm) {
        if (this.organizationId !== null) {
          this.backend.unlinkEIC(this.organizationId, controller.edge_controller_id)
            .subscribe(response => {
              this.notificationsService.add({
                message: 'Edge Controller ' + '' + ' has been unlinked',
                timeout: 3000
              });
            }, error => {
              this.notificationsService.add({
                message: error.error.message,
                timeout: 5000,
                type: 'warning'
              });
            });
        }
      } else {
        // Do nothing
      }
    }
  }

  /**
   * Opens the modal view that holds the device info component
   * @param device device to be opened
   */
  openDeviceInfo(device: any) {
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

    // onClose is used if the device info modal comes while closing it with the clicked groupid
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
  navigateToDevices(groupId: string) {
    window.location.href = '/#/devices?groupId=' + groupId;
  }

  /**
   * Executes devices enablement switcher statement to select one of enabled device to be executed.
   * @param device device in inventory item
   */
  deviceEnablement(device: any) {
    device.enabled = !device.enabled;
    this.backend.updateDevice(this.organizationId, {
       organizationId: this.organizationId,
       deviceGroupId: device.device_group_id,
       deviceId: device.device_id,
       enabled: device.enabled
    }).subscribe((response: any) => {
      let notificationText = 'enabled';
      if (!device.enabled) {
       notificationText = 'disabled';
      }
     this.notificationsService.add({
       message: 'The device is now ' + notificationText,
       timeout: 3000
     });
    });
  }

   /**
   * Operation to unlink a device
   * @param device device in inventory item
   */
  unlinkDevice(device: any) {
    const unlinkConfirm = confirm('Unlink device?');
    if (unlinkConfirm) {
      this.backend.removeDeviceFromInventoryMockup(this.organizationId, device.device_id)
        .subscribe(response => {
          this.notificationsService.add({
            message: 'Device ' + '' + ' has been unlinked',
            timeout: 3000
          });
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: 5000,
            type: 'warning'
          });
        });
    } else {
      // Do nothing
    }
  }

  /**
   * Opens context menu
   * @param item inventory item
   */
  openContextualMenu(item: any) {
    if (item.id === this. activeContextMenuItemId) {
      this.activeContextMenuItemId = '';
    } else {
      this.activeContextMenuItemId = item.id;
    }
  }

  /**
   * Get the item options to show in the context menu
   * @param item inventory item
   */
  getItemOptions(item: any) {
    switch (item.type) {
      case 'EC':
        const ecOptions = [];
        const ecOption1 = {
          name: 'More info',
          action: (inventoryItem: any) => {
            this.openEdgeControllerInfo(inventoryItem);
          },
          item: item
        };
        const ecOption2 = {
          name: 'Install agent',
          action: (inventoryItem: any) => {
            this.installAgentFromEC(inventoryItem);
          },
          item: item
        };
        const ecOption3 = {
          name: 'Create agent token',
          action: (inventoryItem: any) => {
            this.createAgentToken(inventoryItem);
          },
          item: item
        };
        const ecOption4 = {
          name: 'Unlink EC',
          action: (inventoryItem: any) => {
            this.unlinkEIC(inventoryItem);
          },
          item: item
        };
        ecOptions.push(ecOption1);
        ecOptions.push(ecOption2);
        ecOptions.push(ecOption3);
        ecOptions.push(ecOption4);
      return ecOptions;
      case 'Asset':
        const assetOptions = [];
        const assetOption1 = {
          name: 'More info',
          action: (inventoryItem: any) => {
            this.openAssetInfo(inventoryItem);
          },
          item: item
        };
        const assetOption2 = {
          name: 'Last operation log',
          action: (inventoryItem: any) => {
            this.lastOperationLog(inventoryItem);
          },
          item: item
        };
        const assetOption3 = {
          name: 'Uninstall agent',
          action: (inventoryItem: any) => {
            this.uninstallAgent(inventoryItem);
          },
          item: item
        };
        assetOptions.push(assetOption1);
        assetOptions.push(assetOption2);
        assetOptions.push(assetOption3);
      return assetOptions;
      case 'Device':
        const deviceOptions = [];
        const deviceOption1 = {
          name: 'More info',
          action: (inventoryItem: any) => {
            this.openDeviceInfo(inventoryItem);
          },
          item: item
        };
        const deviceOption2 = {
          name: 'Toggle enablement',
          action: (inventoryItem: any) => {
            this.deviceEnablement(inventoryItem);
          },
          item: item
        };
        const deviceOption3 = {
          name: 'Unlink device',
          action: (inventoryItem: any) => {
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
}

