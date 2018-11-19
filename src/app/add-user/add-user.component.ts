import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id, user role, name and email
   */
  organizationId: string;
  userRole: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: 'static',
    ignoreBackdropClick: true
  };
  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    this.userRole = null;
    const mock = localStorage.getItem(LocalStorageKeys.addUserMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

  }

  ngOnInit() {
  }

  /**
   * Requests to add a new user
   * @param form Form with the user input data
   */
  addUser(form) {
    const user = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      role_name: this.userRole
    };
    this.backend.addUser(this.organizationId, user)
      .subscribe(response => {
        this.notificationsService.add({message: user.email + ' created successfully'});
        this.bsModalRef.hide();
      });
  }

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
   * Changes the new user role
   * @param newRole New user role
   */
  changeRole(newRole) {
    this.userRole = newRole;
  }

  /**
   * Validates user data
   * @param form Form with user data
   */
  isFormValid(form) {
    if (this.userRole === null) {
      return false;
    }

    if (!form.valid) {
      return false;
    }

    if (form.value.password !== form.value.passwordConfirm) {
      return false;
    }

    return true;
  }

}
