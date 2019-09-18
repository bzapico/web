import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'instance-service-group-info',
  templateUrl: './instance-service-group-info.component.html',
  styleUrls: ['./instance-service-group-info.component.scss']
})
export class InstanceServiceGroupInfoComponent implements OnInit {

  /**
   * Data models for instance service group related information
   */
  name: string;
  organizationId: string;
  appDescriptorId: string;
  appInstanceId: string;
  policyName: string;
  serviceGroupId: string;
  serviceGroupInstanceId: string;
  serviceInstances: any;
  status: string;
  globalFqdn: string;
  metadata: any;

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private translateService: TranslateService
    ) {
    // Default initialization
    this.loadedData = false;
   }

  ngOnInit() {
  }

  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName (rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }

  /**
   * Depending on the service status, returns the css class name that is required
   * @param status Service status string
   */
  getServiceStatusClass(status: string ) {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.serviceRunning'):
        return 'teal';
      case this.translateService.instant('status.serviceError'):
        return 'red';
      case this.translateService.instant('status.serviceWaiting'):
        return 'yellow';
      default:
        return 'yellow';
    }
  }

  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.serviceRunning'): {
        if (className.toLowerCase() === this.translateService.instant('status.serviceRunning')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.serviceError'): {
        if (className.toLowerCase() === this.translateService.instant('status.serviceError')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.serviceWaiting'): {
        if (className.toLowerCase() === this.translateService.instant('status.serviceWaiting')) {
          return true;
        }
        break;
      }
     default: {
        if (className.toLowerCase() === this.translateService.instant('status.serviceWaiting')) {
          return true;
        }
        return false;
      }
    }
  }

  /**
   * Adds https in case of being required
   * @param endpoint String containing the endpoint
   */
  getEndpointHref(endpoint: string) {
    let URL = '';
    if (!endpoint.startsWith('http') && !endpoint.startsWith('https')) {
      URL = 'http://' + endpoint;
    } else {
      URL = endpoint;
    }
    return URL;
  }
}
