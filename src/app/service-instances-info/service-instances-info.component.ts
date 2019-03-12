import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-service-instances-info',
  templateUrl: './service-instances-info.component.html',
  styleUrls: ['./service-instances-info.component.scss']
})
export class ServiceInstancesInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * Model that hold organization ID
   */
  instanceId: string;

  /**
   * List of available apps instances
   */
  instance: any;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    // const mock = localStorage.getItem(LocalStorageKeys.serviceInstancesInfoMock) || null;
    // // check which backend is required (fake or real)
    // if (mock && mock === 'true') {
    //   this.backend = mockupBackendService;
    // } else {
    //   this.backend = backendService;
    // }

    // Default initialization
    // this.loadedData = true;
  }

  ngOnInit() {
    // if (this.organizationId !== null) {
    //   this.backend.getAppInstance(this.organizationId,  this.instanceId)
    //   .subscribe(instance => {
    //       this.instance = instance;
    //       if (!this.loadedData) {
    //         this.loadedData = true;
    //       }
    //   });
    // }
  }

}
