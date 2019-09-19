import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'device-group-info',
  templateUrl: './device-group-info.component.html',
  styleUrls: ['./device-group-info.component.scss']
})
export class DeviceGroupInfoComponent implements OnInit {
  /**
   * Data models for device group related information
   */
  name: string;
  deviceGroupId: string;
  deviceGroupApiKey: string;
  defaultDeviceConnectivity: string;
  enabled: boolean;

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

}
