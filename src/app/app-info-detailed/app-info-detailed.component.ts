import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ServicesStatus } from '../definitions/enums/services-status.enum';

@Component({
  selector: 'app-info-detailed',
  templateUrl: './app-info-detailed.component.html',
  styleUrls: ['./app-info-detailed.component.scss']
})
export class AppInfoDetailedComponent {
  /**
   * Data models for app related information
   */
  organizationId: string;
  appDescriptorId: string;
  appInstanceId: string;
  name: string;
  group: any;
  statusName: string;
  labels: any;
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(public bsModalRef: BsModalRef) {}

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
  /**
   * Checks if the service status requires an special css class
   * @param status Service status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case ServicesStatus.ServiceRunning:
        return className.toLowerCase() === ServicesStatus.ServiceRunning;
      case ServicesStatus.ServiceError:
        return className.toLowerCase() === ServicesStatus.ServiceError;
      case ServicesStatus.ServiceWaiting:
        return className.toLowerCase() === ServicesStatus.ServiceWaiting;
      default:
        return className.toLowerCase() === ServicesStatus.ServiceWaiting;
    }
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
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}
