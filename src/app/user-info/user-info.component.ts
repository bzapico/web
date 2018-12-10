import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockOrganizationInfo, mockUserList } from '../utils/mocks';
import { NotificationsService } from '../services/notifications.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

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
   * Text for the change password action button
   */
  buttonChangePassword: string;

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

  /**
   * Change password modal window reference
   */
  bsPasswordModalRef: BsModalRef;



  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
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
    this.buttonChangePassword = 'Change Password';
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
    const deleteConfirm = confirm('Delete user?');
    if (deleteConfirm) {
      if (this.organizationId !== null && this.userId !== null) {
        this.backend.deleteUser(this.organizationId, this.userId)
          .subscribe(response => {
            this.notificationsService.add({
              message: 'User ' + this.userId + ' has been deleted',
              timeout: 10000
            });
            this.bsModalRef.hide();
          }, error => {
            this.notificationsService.add({
              message: error.error.message,
              timeout: 10000
            });
          });
      }
    } else {
      // Do nothing
    }
  }

/* TODO */
  /**
   *  Upon confirmation, resets the password
   */
  resetPassword() {
    if (this.organizationId !== null && this.userId !== null) {
      this.backend.resetPassword(this.organizationId, this.userId)
      .subscribe(response => {
        this.notificationsService.add({
          message: 'Your new password is ' + response._body,
          timeout: 10000
        });
        this.bsModalRef.hide();
      });
    }
  }

   /**
   * Opens the modal view that holds change password editable component
   */
  openChangePassword() {
    const initialState = {
      organizationId: this.organizationId,
      userId: this.userId
    };

    this.bsPasswordModalRef =
      this.modalService.show(ChangePasswordComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsPasswordModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
}
