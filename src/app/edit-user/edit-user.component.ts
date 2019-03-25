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
  userName: string;
  email: string;
  rolesList: any[];
  selfEditProfile: boolean;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  selectedOptions = [];
  options = [];
  selectConfig = {};
  roleOptions: any[];

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
    this.roleOptions = [
     'Owner',
     'Operator',
     'Developer'
    ];
    const mock = localStorage.getItem(LocalStorageKeys.userEditMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
  }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      userName: ['', [Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      email: [{value: '', disabled: true}],
      role: [null, Validators.required],
    });
    this.selectConfig = {
      displayKey: 'role',
      search: false,
      height: 'auto',
      placeholder: this.userRole,
      limitTo: 3,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };

    // Query role list
    this.backend.listRoles(this.organizationId)
      .subscribe(response => {
        this.rolesList = response.roles;
      });
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
   * Request to save the user data modifications
   * @param f Form object reference
   */
  saveUserChanges(f) {
    this.submitted = true;
    if (!f.userName.errors && f.role.value) {
      this.loading = true;
      this.backend.saveUserChanges(this.organizationId, {
        name: f.userName.value,
        email: this.email,
        role_name: f.role.value
      })
      .subscribe(response => {
        this.userName = f.userName.value;
        this.loading = false;
        if (f.role.value) {
          this.backend.changeRole(this.organizationId, this.email, this.getRoleId(f.role.value)).
          subscribe(responseRole => {
            this.notificationsService.add({
              message: 'The user ' + this.userName + ' has been edited',
              timeout: 5000
            });
            this.bsModalRef.hide();
            if (this.selfEditProfile === true && f.role.value === 'Owner') {
              // no redirection for the owner
            } else if (this.selfEditProfile === true && f.role.value === 'Developer') {
              this.router.navigate([
                '/applications'
              ]);
            } else if (this.selfEditProfile === true && f.role.value === 'Operator') {
              this.router.navigate([
                '/resources'
              ]);
            }
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: 'ERROR: ' + error.error.message,
              timeout: 5000
            });
            this.bsModalRef.hide();
          });
        } else {
          this.loading = false;
          this.notificationsService.add({
            message: 'The user ' + this.userName + ' has been edited',
            timeout: 5000
          });
          this.bsModalRef.hide();
        }
      }, error => {
        this.loading = false;
        this.notificationsService.add({
          message: 'ERROR: ' + error.error.message,
          timeout: 5000,
        });
        this.bsModalRef.hide();
      });
    }
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

