import { Component } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { ServicesStatus } from '../definitions/enums/services-status.enum';

@Component({
  selector: 'app-service-instances-info',
  templateUrl: './service-instances-info.component.html',
  styleUrls: ['./service-instances-info.component.scss']
})
export class ServiceInstancesInfoComponent {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Data models for instances related information
   */
  name: string;
  image: string;
  serviceId: string;
  statusName: string;
  specs: any;
  endpoints: any;
  exposedPorts: any;
  typeName: string;
  credentials: any;
  environmentVariables: any;
  labels: any;
  groupId: string;
  appDescriptorId: string;
  instanceId: string;
  deployAfter: any;
  deployedOnCluster: string;
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.serviceInstancesInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.loadedData = true;
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
      case ServicesStatus.ServiceRunning:
        return className.toLowerCase() === ServicesStatus.ServiceRunning;
      case ServicesStatus.ServiceError:
        return className.toLowerCase() === ServicesStatus.ServiceError;
      case ServicesStatus.ServiceWaiting:
        return className.toLowerCase() === ServicesStatus.ServiceWaiting;
      default:
        return (className.toLowerCase() === ServicesStatus.ServiceWaiting);
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
}
