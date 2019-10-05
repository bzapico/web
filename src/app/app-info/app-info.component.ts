import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppInfoDetailedComponent } from '../app-info-detailed/app-info-detailed.component';

@Component({
  selector: 'app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent implements OnInit {

  @Input() instance: any;
  @Input() registered: any;

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
  nalejAccordion = 'nalejAccordion';
  isFirstOpen = true;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private modalService: BsModalService
  ) {
    this.showParameters = true;
    this.showNetwork = false;
    this.showSetup = false;
    this.instance = {};
    this.registered = [];
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
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app) {
    const undeployConfirm =
    confirm(this.translateService.instant('apps.instance.undeployConfirm', { appName: app.name }));
    if (undeployConfirm) {
      this.backend.undeploy(this.organizationId, app.app_instance_id)
        .subscribe(undeployResponse => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.instance.undeployMessage', { appName: app.name }),
            timeout: 3000
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: 5000,
            type: 'warning'
          });
        });
    }
  }

  /**
   * Checks if the instances status requires an special css class
   * @param status instances status name
   * @param className CSS class name
   */
  classInstanceStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.running'): {
        if (className.toLowerCase() === this.translateService.instant('status.running')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.deploymentError'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.planningError'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.incomplete'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.error'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case 'queued': {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.planning'): {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.scheduled'): {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        break;
      }
      default: {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        return false;
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
    if (index !== -1) {
      return this.registered[index].name;
    }
  }

  /**
   * Returns the length of service instances group
   */
  countGroupServices() {
    let counter = 0;
    if (this.instance && this.instance.groups) {
      this.instance.groups.forEach(group => {
        counter += group.service_instances.length;
      });
      return counter;
    } else {
      return 0;
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
        timeout: 3000
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
      appDescriptorId: app.app_descriptor_id,
      appInstanceId: app.app_instance_id,
      name: app.name,
      group: app.groups,
      statusName: app.status_name,
      labels: app.labels
    };
    console.log('app ', app);
    console.log('initialState ', initialState);

    this.modalRef = this.modalService.show(AppInfoDetailedComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }

}
