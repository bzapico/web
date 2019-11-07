import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'registered-service-group-info',
  templateUrl: './registered-service-group-info.component.html',
  styleUrls: ['./registered-service-group-info.component.scss']
})
export class RegisteredServiceGroupInfoComponent {
  /**
   * Data models for registered service group related information
   */
  name: string;
  organizationId: string;
  appDescriptorId: string;
  serviceGroupId: string;
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor( public bsModalRef: BsModalRef ) {
    // Default initialization
    this.loadedData = false;
  }
}
