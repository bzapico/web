import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization name, subscription type, users list and number of users
   */
  organizationName: string;
  subscriptionType: string;
  usersCount: number;
  users: any[];



  constructor(
    backendService: BackendService,
    mockupBackendService: MockupBackendService,
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.organizationMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.organizationName = 'Loading...';
    this.subscriptionType = 'Free subscription';
    this.usersCount = 0;
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      const organizationId = JSON.parse(jwtData).organizationId;
      if (organizationId !== null) {
        this.backend.getOrganizationInfo(organizationId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.organizationName = data.organizationName;
            }
          });
        this.backend.getOrganizationUsers(organizationId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.users = data.users;
            }
          });
      }
    }
  }

}
