import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppInfoDetailedComponent } from '../app-info-detailed/app-info-detailed.component';
import { AppStatus } from '../definitions/enums/app-status.enum';
import {BackendService} from '../services/backend.service';
import {MockupBackendService} from '../services/mockup-backend.service';
import {LocalStorageKeys} from '../definitions/const/local-storage-keys';

/**
 * Notification timeout reference
 */
const NOTIFICATION_TIMEOUT = 3000; // 3 seconds

@Component({
  selector: 'app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})

export class AppInfoComponent implements OnInit {
  @Input() instance: any;
  @Input() registered: any;
  @Input() registeredData: any;
  @Input() openFromInstance: boolean;
  @Input() openFromRegistered: boolean;

  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Reference for the service that allows the modal component
   */
  modalRef: BsModalRef;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;

  /**
   *  Active List reference
   */
  showParameters: boolean;
  showNetwork: boolean;
  showSetup: boolean;

  /**
   * Accordion options
   */
  nalejAccordionSmall = 'nalejAccordionSmall';
  isFirstOpen = true;

  basicParameters: any[];
  advancedParameters: any[];

  constructor(
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    this.showParameters = true;
    this.showNetwork = false;
    this.showSetup = false;
    this.instance = {};
    this.registered = [];
    this.registeredData = [];
    this.searchTerm = '';
    this.basicParameters = [];
    this.advancedParameters = [];
  }

  ngOnInit() {
    this.addServiceAndGroupToInterfaces();
    this.addServiceAndGroupToInterfacesInstance();
    this.generateParameters();
  }

  /**
   * Checks if the instances status requires an special css class
   * @param status instances status name
   * @param className CSS class name
   */
  classInstanceStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case AppStatus.Running: {
        if (className.toLowerCase() === AppStatus.Running) {
          return true;
        }
        break;
      }
      case AppStatus.DeploymentError: {
        if (className.toLowerCase() === AppStatus.DeploymentError) {
          return true;
        }
        break;
      }
      case AppStatus.Error: {
        if (className.toLowerCase() === AppStatus.Error) {
          return true;
        }
        break;
      }
      case AppStatus.Incomplete: {
        if (className.toLowerCase() === AppStatus.Incomplete) {
          return true;
        }
        break;
      }
      case AppStatus.PlanningError: {
        if (className.toLowerCase() === AppStatus.PlanningError) {
          return true;
        }
        break;
      }
      case AppStatus.Queued: {
        if (className.toLowerCase() === AppStatus.Process) {
          return true;
        }
        break;
      }
      case AppStatus.Planning: {
        if (className.toLowerCase() === AppStatus.Process) {
          return true;
        }
        break;
      }
      case AppStatus.Scheduled: {
        if (className.toLowerCase() === AppStatus.Process) {
          return true;
        }
        break;
      }
      default: {
        return (className.toLowerCase() === AppStatus.Process);
      }
    }
  }

  /**
   * Changes to active list
   */
  changeActiveList(listToShow: string) {
    if (listToShow === 'parameters') {
      this.showParameters = true;
      this.showNetwork = false;
      this.showSetup = false;
    } else if (listToShow === 'network') {
      this.showParameters = false;
      this.showNetwork = true;
      this.showSetup = false;
    } else if (listToShow === 'setup') {
      this.showParameters = false;
      this.showNetwork = false;
      this.showSetup = true;
    }
  }

  /**
   * Reset all the filters fields
   */
  resetFilters(listToShow: string) {
      if (listToShow === 'parameters') {
      this.showParameters = true;
      this.searchTerm = '';
    } else if (listToShow === 'network') {
      this.showNetwork = false;
      this.searchTerm = '';
    } else if (listToShow === 'setup') {
      this.showSetup = false;
      this.searchTerm = '';
    }
  }

  /**
   * Disconnects app instance
   * @param connection connections
   */
  disconnectInstance(connection, type, nameType, instance) {
    const fullConnection = this.getConnection(instance, type, nameType, connection.name)[0];
    const deleteConfirm = confirm(this.translateService.instant('apps.manageConnections.disconnectConfirm'));
    if (deleteConfirm) {
      this.backend.removeConnection(instance.organization_id, {
        organization_id: instance.organization_id,
        source_instance_id: fullConnection.source_instance_id,
        source_instance_name: fullConnection.source_instance_name,
        target_instance_id: fullConnection.target_instance_id,
        target_instance_name: fullConnection.target_instance_name,
        inbound_name: fullConnection.inbound_name,
        outbound_name: fullConnection.outbound_name,
        user_confirmation: true
      }).subscribe(response => {
            this.notificationsService.add({
              message: 'Removing connection',
              timeout: NOTIFICATION_TIMEOUT
            });
            this.updateInstance(instance);
          });
    }
  }

  getConnection(instance, type: string, nameType: string, name: string): any {
    return instance[type].filter(inbound => inbound[nameType] === name);
  }

  /**
   * Updates connections and appDropdownOptions
   */
  updateInstance(instance) {
    this.backend.getAppInstance(instance.organization_id, instance.app_instance_id)
        .subscribe(inst => {
          this.instance.inbound_connections = inst.inbound_connections;
          this.instance.outbound_connections = inst.outbound_connections;
          this.instance.rules = inst.rules;
          this.instance.outbound_net_interface = inst.outbound_net_interface;
          this.instance.inbound_net_interface = inst.inbound_net_interface;
        });
  }

  /**
   * Open app info detailed modal window
   *  @param app app object
   */
  openAppInfoDetailed(app) {
    const initialState = {
      organizationId: app.organization_id,
      appInstanceId: app.app_instance_id,
      appDescriptorId: app.app_descriptor_id,
      name: app.name,
      group: app.groups,
      statusName: app.status_name,
      rules: app.rules,
      labels: app.labels,
      openFromInstance: this.openFromInstance
    };

    this.modalRef = this.modalService.show(AppInfoDetailedComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }

  /**
   * Open descriptor info detailed modal window
   *  @param descriptor descriptor object
   */
  openDescriptorDetailed(descriptor) {
    const initialState = {
      organizationId: descriptor.organization_id,
      appDescriptorId: descriptor.app_descriptor_id,
      groups: descriptor.groups,
      name: descriptor.name,
      rules: descriptor.rules,
      labels: descriptor.labels,
      openFromRegistered: this.openFromRegistered
    };

    this.modalRef = this.modalService.show(AppInfoDetailedComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }

  private addServiceAndGroup(interface_type: string) {
    this.registeredData[`${interface_type}s`].map(item => {
      this.registeredData.rules.map(rule => {
        if (rule[interface_type] === item.name) {
          item['target_service_name'] = rule['target_service_name'];
          item['target_service_group_name'] = rule['target_service_group_name'];
        }
      });
    });
  }

  private addServiceAndGroupToInterfaces() {
    if (this.registeredData.inbound_net_interfaces) {
      this.addServiceAndGroup('inbound_net_interface');
    }

    if (this.registeredData.outbound_net_interfaces) {
      this.addServiceAndGroup('outbound_net_interface');
    }
  }

  private addServiceAndGroupInstance(interface_type: string) {
    this.instance[`${interface_type}s`].map(item => {
      this.instance.rules.map(rule => {
        if (rule[interface_type] === item.name) {
          item['target_service_name'] = rule['target_service_name'];
          item['target_service_group_name'] = rule['target_service_group_name'];
        }
      });
    });
  }

  private addServiceAndGroupToInterfacesInstance() {
    if (this.instance.inbound_net_interfaces) {
      this.addServiceAndGroupInstance('inbound_net_interface');
    }

    if (this.instance.outbound_net_interfaces) {
      this.addServiceAndGroupInstance('outbound_net_interface');
    }
  }

  private getParametersFromFilters(): any {
    return {
      basic: this.registered.parameters ? this.registered.parameters.filter(parameter => parameter.required) : [],
      advanced: this.registered.parameters ? this.registered.parameters.filter(parameter => !parameter.required) : []
    };
  }

  private generateParameters() {
    const params = this.getParametersFromFilters();
    if (this.openFromInstance) {
      this.backend
        .getListAvailableInstanceParameters(this.instance.organization_id, this.instance.app_instance_id)
          .subscribe(parameters => {
            if (parameters && parameters.parameters) {
              params.basic.forEach(param => {
                parameters.parameters.forEach(item => {
                  if (item.parameter_name === param.name) {
                    this.basicParameters.push(param);
                  }
                });
              });
              params.advanced.forEach(param => {
                parameters.parameters.forEach(item => {
                  if (item.parameter_name === param.name) {
                    this.advancedParameters.push(param);
                  }
                });
              });
            }
          });
    } else if (this.openFromRegistered && this.registeredData.parameters) {
      this.basicParameters = params.basic;
      this.advancedParameters = params.advanced;
    }
  }
}
