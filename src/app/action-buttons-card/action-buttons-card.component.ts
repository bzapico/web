import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../services/notifications.service';
import { Backend } from '../definitions/interfaces/backend';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DeployInstanceComponent } from '../deploy-instance/deploy-instance.component';
import { AddConnectionsComponent } from '../add-connections/add-connections.component';

/**
 * It sets the timeout in actions like undeploying or deleting
 */
const TIMEOUT_ACTION = 3000;
/**
 * It sets the timeout for errors
 */
const TIMEOUT_ERROR = 5000;

@Component({
  selector: 'action-buttons-card',
  templateUrl: './action-buttons-card.component.html',
  styleUrls: ['./action-buttons-card.component.scss']
})
export class ActionButtonsCardComponent implements OnInit {
  @Input() isOpenFromInstance: boolean;
  @Input() isOpenFromRegistered: boolean;
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
    private notificationsService: NotificationsService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
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
    // TODO
    this.modalRef.content.onClose = (newConnection: any) => {
      if (newConnection) {
        console.log('newConnection', newConnection);
        // this.openAddNewConnection(newConnection);
        }
      };
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.hide();
  }

  /**
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app) {
    const undeployConfirm =
    confirm(this.translateService.instant('apps.instance.undeployConfirm', { appName: app.name }));
    if (undeployConfirm) {
      this.backend.undeploy(this.organizationId, app.app_instance_id)
        .subscribe(undeployResponse => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.instance.undeployMessage', { appName: app.name }),
            timeout: 3000
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: 5000,
            type: 'warning'
          });
        });
    }
  }

  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app) {
    const initialState = {
      organizationId: this.organizationId,
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
  deleteApp(app) {
    const deleteConfirm =
    confirm(this.translateService.instant('apps.registered.deleteApp', { appName: app.name }));
    if (deleteConfirm) {
      this.backend.deleteRegistered(this.organizationId, app.app_descriptor_id)
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
