import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

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

  constructor( public bsModalRef: BsModalRef ) {
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
      case 'service_running':
        return 'teal';
      case 'service_error':
        return 'red';
      case 'service_waiting':
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
        if (className.toLowerCase() === 'service_waiting') {
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
