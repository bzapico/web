import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization id, user role, name, email and password
   */
  organizationId: string;
  userRole: string;
  userName: string;
  email: string;

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
  }

  ngOnInit() {
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

