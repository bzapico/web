import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppInfoDetailedComponent } from '../app-info-detailed/app-info-detailed.component';
import { AppStatus } from '../definitions/enums/app-status.enum';

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
   * Model that hold organization ID
   */
  organizationId: string;
  connections: any[];
  copyConnections: any[];

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

  constructor(
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private modalService: BsModalService
  ) {
    this.showParameters = true;
    this.showNetwork = false;
    this.showSetup = false;
    this.instance = {};
    this.registered = [];
    this.registeredData = [];
    this.searchTerm = '';
    // CONNECTIONS
    this.connections = [
      {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'MySQL'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'WordPress'
      },
      connected: true
    },
    {
      inbound: {
        interfaceName: 'activemqInbound',
        instance: 'activemq'
      },
      outbound: {
        interfaceName: 'OpencastOutbound',
        instance: 'Opencast'
      },
      connected: true
    },
    {
      inbound: {
        interfaceName: 'KuardInbound',
        instance: 'Kuardprocessing'
      },
      outbound: {
        interfaceName: 'KuardOutbound',
        instance: 'Kuard'
      },
      connected: true
    },
    {
      inbound: {
        interfaceName: 'testInbound',
        instance: 'testPara'
      },
      outbound: {
        interfaceName: 'testOutbound',
        instance: 'appTest'
      },
      connected: true
    },
    {
      inbound: {
        interfaceName: 'deviceInbound',
        instance: 'deviceVirtual3'
      },
      outbound: {
        interfaceName: 'Virtual3Outbound',
        instance: 'Virtual3'
      },
      connected: true
    },
    {
      inbound: {
        interfaceName: 'Virtual2Inbound',
        instance: 'deviceVirtual2'
      },
      outbound: {
        interfaceName: 'Virtual2Outbound',
        instance: 'Virtual2'
      },
      connected: true
    },
    {
      inbound: {
        interfaceName: 'Virtual1Inbound',
        instance: 'deviceVirtual1'
      },
      outbound: {
        interfaceName: 'Virtual1Outbound',
        instance: 'Virtual1'
      },
      connected: true
    }
    ];
  }

  ngOnInit() {
    // to preserve the initial state
    this.copyConnections = [...this.connections];
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
   * Returns the descriptor beauty name
   * @param descriptorId Descriptor identifier
   */
  getDescriptorName(descriptorId: string) {
    const index =
    this.registered
        .map(x => x.app_descriptor_id).
        indexOf(descriptorId);
    if (index > -1) {
      return this.registered[index].name;
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
  disconnectInstance(connection) {
    const deleteConfirm =
    confirm(this.translateService.instant('apps.manageConnections.disconnectConfirm'));
    if (deleteConfirm) {
      connection.connected = false;
      this.notificationsService.add({
        message: 'App disconnected',
        timeout: NOTIFICATION_TIMEOUT
      });
    }
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
}
