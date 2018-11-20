import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-apps-info',
  templateUrl: './apps-info.component.html',
  styleUrls: ['./apps-info.component.scss']
})
export class AppsInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Dialog title
   */
  title: string;

  /**
   * Models that hold app name, organization id, app description, app tags, app configuration, app service
   */
  name: string;
  id: string;
  description: string;
  tags: string;
  type: string;
  configuration: string;
  service: string;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.title = 'App info';
    this.name = 'Loading ...'; // Default initialization
    this.id = 'Loading ...'; // Default initialization
    this.tags = 'Loading ...'; // Default initialization
    this.type = 'Loading ...'; // Default initialization
    this.configuration = 'Loading ...'; // Default initialization
    this.service = 'Loading ...'; // Default initialization
  }

  ngOnInit() {
  }

}
