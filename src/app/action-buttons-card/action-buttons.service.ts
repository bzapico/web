import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../services/notifications.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DeployInstanceComponent } from '../deploy-instance/deploy-instance.component';
import { AddConnectionsComponent } from '../add-connections/add-connections.component';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
/**
 * It sets the timeout in actions like undeploying or deleting
 */
const TIMEOUT_ACTION = 3000;
/**
 * It sets the timeout for errors
 */
const TIMEOUT_ERROR = 5000;

@Injectable({
  providedIn: 'root'
})
export class ActionButtonsService {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Reference for the service that allows the modal component
   */
  modalRef: BsModalRef;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private router: Router,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
  }

  /**
   * Creates an array with the names to be filtered by
   */
  openAddNewConnection() {
    const initialState = {
      organizationId: this.organizationId,
      defaultAutofocus: false,
    };

    this.modalRef = this.modalService.show(AddConnectionsComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.onClose = (newConnection: any) => {
      if (newConnection) {
        }
      };
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.hide();
  }

  /**
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app: any) {
    const undeployConfirm =
    confirm(this.translateService.instant('apps.instance.undeployConfirm', { appName: app.name }));
    if (undeployConfirm) {
      this.backend.undeploy(app.organization_id, app.app_instance_id)
        .subscribe(undeployResponse => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.instance.undeployMessage', { appName: app.name }),
            timeout: TIMEOUT_ACTION
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: TIMEOUT_ERROR,
            type: 'warning'
          });
        });
    }
  }

  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app: any) {
    const initialState = {
      organizationId: app.organization_id,
      registeredId: app.app_descriptor_id,
      registeredName: app.name,
      openFromRegistered: true,
      defaultAutofocus: true,
      appFromRegistered: app
    };
    this.modalRef = this.modalService.show(DeployInstanceComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.onClose = ( () => {
      this.router.navigate(['/applications']);
    });
  }

  /**
   * Requests to delete the selected app
   * @param app Application object
   */
  deleteApp(app: any) {
    const deleteConfirm =
    confirm(this.translateService.instant('apps.registered.deleteApp', { appName: app.name }));
    if (deleteConfirm) {
      this.backend.deleteRegistered(app.organization_id, app.app_descriptor_id)
        .subscribe(() => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.registered.deleting', { appName: app.name }),
            timeout: TIMEOUT_ACTION
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: TIMEOUT_ERROR,
            type: 'warning'
          });
        });
    }
  }
}