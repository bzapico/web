import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-info-detailed',
  templateUrl: './app-info-detailed.component.html',
  styleUrls: ['./app-info-detailed.component.scss']
})
export class AppInfoDetailedComponent implements OnInit {
  /**
   * Data model to show where the modal is triggered
   */
  openFromRegistered: boolean;

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

  constructor(
    public bsModalRef: BsModalRef,
  ) {
    this.openFromRegistered = false;
  }

  ngOnInit() {

    console.log('las labels ', this.labels);
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

  /**
   * Checks if the service status requires an special css class
   * @param status Service status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case 'service_running': {
        if (className.toLowerCase() === 'service_running') {
          return true;
        }
        break;
      }
      case 'service_error': {
        if (className.toLowerCase() === 'service_error') {
          return true;
        }
        break;
      }
      case 'service_waiting': {
        if (className.toLowerCase() === 'service_waiting') {
          return true;
        }
        break;
      }
      default: {
        if (className.toLowerCase() === 'service_scheduled') {
          return true;
        }
        return false;
      }
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
