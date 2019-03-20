import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockOrganizationInfo, mockUserList } from '../utils/mocks';
import { NotificationsService } from '../services/notifications.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  /**
   * Models that holds forms info
   */
  userInfoForm: FormGroup;
  loading: boolean;

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
  email: string;
  role: string;

  /**
   * Change password modal window reference
   */
  bsPasswordModalRef: BsModalRef;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    private formBuilder: FormBuilder,
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
    this.email = 'Loading ...'; // Default initialization
    this.buttonDeleteUser = 'Delete User';
    this.buttonChangePassword = 'Change Password';
  }

  ngOnInit() {
    this.userInfoForm = this.formBuilder.group({
      userName: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      role: [{value: '', disabled: true}],
    });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.userInfoForm.controls; }

  /**
   *  Upon confirmation, deletes user
   * @param email A user to be deleted
   */
  deleteUser() {
    const deleteConfirm = confirm('Delete user?');
    if (deleteConfirm) {
      if (this.organizationId !== null && this.email !== null) {
        this.backend.deleteUser(this.organizationId, this.email)
          .subscribe(response => {
            this.notificationsService.add({
              message: 'User ' + this.email + ' has been deleted',
              timeout: 5000
            });
            this.bsModalRef.hide();
          }, error => {
            this.notificationsService.add({
              message: error.error.message,
              timeout: 5000
            });
          });
      }
    } else {
      // Do nothing
    }
  }

  /**
   * Opens the modal view that holds change password editable component
   */
  openChangePassword() {
    const initialState = {
      organizationId: this.organizationId,
      email: this.email
    };
    this.bsPasswordModalRef =
      this.modalService.show(ChangePasswordComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsPasswordModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
}
