import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  /**
   * Models that holds forms info
   */
  editUserForm: FormGroup;
  submitted = false;
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
   * Models that hold organization id, user role, name, email and password
   */
  organizationId: string;
  userRole: string;
  userRoleToEdit: string;
  userName: string;
  email: string;
  rolesList: any[];
  temporalRole: string;

  /**
   * Holds the status of the role (if it has been modified)
   */
  roleDirty: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public bsPasswordModalRef: BsModalRef,
    private backendService: BackendService,
    private router: Router,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    this.userRole = null;
    const mock = localStorage.getItem(LocalStorageKeys.userEditMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.roleDirty = false;
  }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      role: ['']
    });

    if (this.userRoleToEdit) {
      // this.userRole should be initialized by initial state
      this.temporalRole = this.userRoleToEdit;
    } else {
      // profile
      this.temporalRole = this.userRole;
    }

    if (this.userRole && this.userRole === 'Owner') {
      // Query role list
      this.backend.listRoles(this.organizationId)
        .subscribe(response => {
          this.rolesList = response.roles;
        });
      }
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.editUserForm.controls; }

  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm('Discard changes?');
      if (discard) {
        this.bsModalRef.hide();
      } else {
        // Do nothing
      }
    } else {
      this.bsModalRef.hide();
    }
  }

  /**
   *  Checks the role of current user
   */
  checkUserRole(buttonRole) {
    if (buttonRole === this.temporalRole) {
      return true;
    }
    return false;
  }

  /**
   * Changes the new user role
   * @param newRole New user role
   */
  changeRole(newRole) {
    this.roleDirty = true;
    this.temporalRole = newRole;
  }

  /**
   * Request to save the user data modifications
   * @param f Form object reference
   */
  saveUserChanges(f) {
    this.submitted = true;
    this.loading = true;
    if (this.email !== null) {
      this.backend.saveUserChanges(this.organizationId, {
        name: f.userName.value,
        email: f.email.value,
        role_name: this.userRole
      })
      .subscribe(response => {
        if (this.userRole && this.userRole === 'Owner') {
          this.backend.changeRole(this.organizationId, this.email, this.getRoleId(this.temporalRole)).
          subscribe(responseRole => {
            this.notificationsService.add({
              message: 'The user ' + this.userName + ' has been edited',
              timeout: 10000
            });
            this.bsModalRef.hide();
            if (!this.userRoleToEdit && this.temporalRole === 'Owner') {
              // no redirection for the owner
            } else if (!this.userRoleToEdit && this.temporalRole === 'Developer') {
              this.router.navigate([
                '/applications'
              ]);
            } else if (!this.userRoleToEdit && this.temporalRole === 'Operator') {
              this.router.navigate([
                '/resources'
              ]);
            }
          }, error => {
            this.notificationsService.add({
              message: 'ERROR: ' + error.error.message,
              timeout: 10000
            });
            this.bsModalRef.hide();
          });
        } else {
          this.notificationsService.add({
            message: 'The user ' + this.userName + ' has been edited',
            timeout: 10000
          });
          this.bsModalRef.hide();
        }
      }, error => {
        this.notificationsService.add({
          message: 'ERROR: ' + error.error.message,
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
      email: this.email
    };
    this.bsPasswordModalRef =
      this.modalService.show(ChangePasswordComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsPasswordModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }

  /**
   * Search between roles list to get the required id
   * @param role Role name
   */
  getRoleId(role: string): string {
    let roleId = '';
    this.rolesList.forEach(roleObject => {
      if (roleObject.name === role) {
        roleId = roleObject.role_id;
        return roleId;
      }
    });
    return roleId;
  }
}

