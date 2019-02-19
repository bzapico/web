import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id
   */
  organizationId: string;
  labelName: string;
  labelValue: string;

  errorMessages: string[];

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.addLabelMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.errorMessages = [];
    }

  ngOnInit() {
  }
  /**
   * Request to add a new label
   * @param form Form object reference
   */
  addLabel(form) {
    if (this.errorMessages.length === 0) {
      const user = {
        name: form.value.name,
        value: form.value.value,
      };
    }
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

}
