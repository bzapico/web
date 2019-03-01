import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-deploy-instance',
  templateUrl: './deploy-instance.component.html',
  styleUrls: ['./deploy-instance.component.scss']
})
export class DeployInstanceComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * Model that hold app registered ID and its name
   */
  registeredId: string;
  registeredName: string;
  openFromRegistered: boolean;
  registeredApp: any;
  registeredApps: any[];
  instanceName: string;

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

    const mock = localStorage.getItem(LocalStorageKeys.deployInstanceMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.openFromRegistered = false;
    this.registeredApps = [];
    if (!this.registeredName) {
      this.registeredName = 'Select any registered app';
    }
  }

  ngOnInit() {
    this.backend.getRegisteredApps(this.organizationId)
    .subscribe(response => {
        this.registeredApps = response.descriptors || [];
    });
  }

  deployInstance() {
    this.backend.deploy(this.organizationId, this.registeredId, this.instanceName)
      .subscribe(deployResponse => {
        console.log(deployResponse);
        this.bsModalRef.hide();
        this.notificationsService.add({
          message: 'Deploying instance of ' + this.registeredName,
          timeout: 3000
        });
      }, error => {
        this.notificationsService.add({
          message: error.error.message,
          timeout: 5000
        });
        this.bsModalRef.hide();
      });
  }

  selectRegistered(app) {
    this.registeredApp = app;
    this.registeredId = app.app_descriptor_id;
    this.registeredName = app.name;
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
