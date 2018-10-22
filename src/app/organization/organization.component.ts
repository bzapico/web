import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockUserProfileInfo } from '../utils/mocks';
import { NotificationsService } from '../services/notifications.service';
import { EditClusterComponent } from '../edit-cluster/edit-cluster.component';

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
   * Models that hold organization id, name, subscription type and the users list
   */
  organizationId: string;
  organizationName: string;
  subscriptionType: string;
  users: any[];

  // TODO deleted from here and place it where it belongs
  clusterName: string;
  clusterDescription: string;
  clusterTags: string;

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
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
      this.organizationId = JSON.parse(jwtData).OrganizationId;
      if (this.organizationId !== null) {
        this.backend.getOrganizationInfo(this.organizationId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.organizationName = data.name;
            }
          });
        this.backend.getOrganizationUsers(this.organizationId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
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
    const initialState = {
      organizationName: this.organizationName,
      organizatinoId: this.organizationId
    };

    this.modalRef = this.modalService.show(UserInfoComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { this.updateUserList(); });
  }
  /**
   * Opens the modal view that holds the edit cluster component TODO**
   */
  openEditCluster() {
    this.modalRef = this.modalService.show(EditClusterComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }

  addUser() {
    this.backend.addUser(this.organizationId, mockUserProfileInfo)
      .subscribe(response => {
        this.notificationsService.add({
          message: 'User added successfully'
        });
        this.updateUserList();
      });
  }

  updateUserList() {
    if (this.organizationId != null) {
      this.backend.getOrganizationUsers(this.organizationId)
      .subscribe(response => {
        if (response && response._body) {
          const data = JSON.parse(response._body);
          this.users = data;
        }
      });
    }
  }
}
