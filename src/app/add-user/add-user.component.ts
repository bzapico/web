import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';

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

  organizationId: string;
  userRole: string;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    this.organizationId = '';
    this.userRole = null;
    this.backend = mockupBackendService;
  }

  ngOnInit() {
  }

  addUser(form) {
    const user = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      role: this.userRole
    };
    this.backend.addUser(this.organizationId, user)
      .subscribe(response => {
        if (!response._body) {
          this.notificationsService.add({message: user.email + ' created successfully'});
          this.bsModalRef.hide();
        } else {
          // Error
          this.notificationsService.add({message: response._body});
        }
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

  changeRole(newRole) {
    this.userRole = newRole;
  }

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
