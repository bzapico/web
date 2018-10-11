import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserInfoComponent } from '../user-info/user-info.component';
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
   * Models that hold organization name, subscription type and the users list
   */
  organizationName: string;
  subscriptionType: string;
  users: any[];

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
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
    this.users = [];
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
              this.organizationName = data.name;
            }
          });
        this.backend.getOrganizationUsers(organizationId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              console.log(data);
              this.users = data;
            }
          });
      }
    }
  }

  /**
   * Opens the modal view that holds the user info component
   */
  openUserInfo() {
    this.modalRef = this.modalService.show(UserInfoComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }

}
