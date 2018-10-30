import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockOrganizationInfo, mockUserList } from '../utils/mocks';
import { NotificationsService } from '../services/notifications.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Dialog title
   */
  title: string;
  /**
   * Text for the resset password action button
   */
  buttonRessetPassword: string;
  /**
   * Text for the delete user action button
   */
  buttonDeleteUser: string;
  /**
   * Models that hold user name, organization id, name, user email/ID and role selection
   */
  userName: string;
  organizationId: string;
  organizationName: string;
  userId: string;
  role: string;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.userInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.title = 'User info';
    this.userName = 'Loading ...'; // Default initialization
    this.userId = 'Loading ...'; // Default initialization
    this.buttonDeleteUser = 'Delete User';
    this.buttonRessetPassword = 'Resset Password';
  }

  ngOnInit() {
  }

  /**
   *  Checks the role of current user
   */
  checkUserRole(buttonRole) {
    if (buttonRole === this.role) {
      return true;
    }
    return false;
  }
  /**
   *  Upon confirmation, deletes user
   * @param userId A user to be deleted
   */
  deleteUser() {
    if (this.organizationId !== null && this.userId !== null) {
      this.backend.deleteUser(this.organizationId, this.userId)
        .subscribe(response => {
          this.notificationsService.add({
            message: 'User ' + this.userId + ' has been deleted'
          });
          this.bsModalRef.hide();
        });
    }
  }
  /**
   *  Upon confirmation, ressets the password
   */
  resetPassword() {
    if (this.organizationId !== null && this.userId !== null) {
      this.backend.resetPassword(this.organizationId, this.userId)
        .subscribe(response => {
          this.notificationsService.add({
            message: 'Your new password is ' + response._body
          });
          this.bsModalRef.hide();
        });
    }
  }

}
