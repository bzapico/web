import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-rule-info',
  templateUrl: './rule-info.component.html',
  styleUrls: ['./rule-info.component.scss']
})
export class RuleInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Data models for rules related information
   */
  name: string;
  ruleId: string;
  access: string;
  targetServiceName: string;
  targetServiceGroupName: string;
  targetPort: string;
  authServiceGroupName: string;
  authServices: any;
  deviceGroupIds: any;
  deviceGroupNames: any;
  appDescriptorId: string;
  /**
   * Loaded Data status
   */
  loadedData: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.ruleInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.loadedData = false;
   }

  ngOnInit() {
  }

}
