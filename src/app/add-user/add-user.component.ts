import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RoleOptions } from '../definitions/enums/role-options.enum';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  /**
   * Models that holds forms info
   */
  addUserForm: FormGroup;
  userName: FormControl;
  email: FormControl;
  organizationId: string;
  userRole: string;
  password: FormControl;
  passwordConfirm: FormControl;
  submitted = false;
  loading: boolean;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };
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
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
    this.userRole = null;
    this.selectConfig = {
      displayKey: 'role',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('organization.users.addEx'),
      limitTo: 3,
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.roleOptions = [
      RoleOptions.NalejAdmin,
      RoleOptions.Operator,
      RoleOptions.Developer
    ];
    const mock = localStorage.getItem(LocalStorageKeys.addUserMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [''],
      role: [null, Validators.required],
    });
  }

  /**
   * Custom validator for checking the passwords,
   * @param group passwords group
   */
  samePasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordConfirm = group.controls.passwordConfirm.value;
    return password === passwordConfirm ? true : false;
  }
  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.addUserForm.controls; }
  /**
   * Requests to add a new user
   * @param f Form with the user input data
   */
  addUser(f) {
    this.submitted = true;
    const user = {
      name: f.userName.value,
      email: f.email.value,
      password: f.password.value,
      role_name: f.role.value
    };
    if (f.userName.invalid === true ||
      f.email.invalid === true ||
      f.password.invalid === true ||
      f.password.value !== f.passwordConfirm.value ||
      f.passwordConfirm.invalid  === true ||
      f.role.value === true
      ) {
      return;
    }
    this.loading = true;
    this.backend.addUser(this.organizationId, user)
      .subscribe(response => {
        this.loading = false;
        this.notificationsService.add({
          message: this.translateService.instant('organization.userCreated', {user: user.email}),
        });
        this.bsModalRef.hide();
      }, error => {
        this.loading = false;
        if (error.status === 409) {
          this.notificationsService.add({
            message: this.translateService.instant('organization.userExists', {error: error.error.message}),
            type: 'warning'
          });
        } else {
            this.notificationsService.add({
              message:  this.translateService.instant('infrastructure.error', {error: error.error.message}),
              type: 'warning'
            });
          }
      });
  }
  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm(this.translateService.instant('modals.discardChanges'));
      if (discard) {
        this.bsModalRef.hide();
      }
    } else {
      this.bsModalRef.hide();
    }
  }
}
