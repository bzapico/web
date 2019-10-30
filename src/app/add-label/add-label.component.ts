import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryType } from '../definitions/enums/inventory-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  /**
   * Models that holds forms info
   */
  addLabelForm: FormGroup;
  submitted = false;
  loading: boolean;
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
  modalTitle: string;
  entity: any;
  entityType: string;
  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.addLabelMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
  }

  ngOnInit() {
    this.addLabelForm =
        this.formBuilder
            .group(
  {
    labelName:
    ['',
      [Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[a-zA-Z0-9_.-]*$')]
    ],
    labelValue:
    ['',
      [Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[a-zA-Z0-9_.-]*$')]
    ],
    });
  }
  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.addLabelForm.controls; }
  /**
   * Request to add a new label
   * @param form Form object reference
   */
  addLabel(form) {
    this.submitted = true;
    const updatedEntity = this.entity;
    if (!form.labelName.errors && !form.labelValue.errors) {
      this.loading = true;
      switch (this.entityType.toLowerCase()) {
        case InventoryType.Cluster:
          if (!updatedEntity.labels || updatedEntity.labels === '-') {
            updatedEntity.labels = {};
          }
          updatedEntity.labels[form.labelName.value] = form.labelValue.value;
          updatedEntity.add_labels = true;
          this.backend.saveClusterChanges(
            this.organizationId,
            this.entity.cluster_id,
            {
              organizationId: this.organizationId,
              clusterId: updatedEntity.cluster_id,
              add_labels: true,
              labels: updatedEntity.labels
            }
          ).subscribe(() => {
            this.loading = false;
            this.notificationsService.add({
              message: this.translateService.instant('label.add-label.update', {entity: this.entity.name})
            });
            this.bsModalRef.hide();
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: error.error.message,
              type: 'warning'
            });
          });
          break;
        case InventoryType.Node:
          if (!updatedEntity.labels || updatedEntity.labels === '-') {
            updatedEntity.labels = {};
          }
          updatedEntity.labels[form.labelName.value] = form.labelValue.value;
          updatedEntity.add_labels = true;
          this.backend.updateNode(
            this.organizationId,
            this.entity.node_id,
            {
              organizationId: this.organizationId,
              nodeId: updatedEntity.node_id,
              add_labels: true,
              labels: updatedEntity.labels
            }
          ).subscribe(() => {
            this.showNotification(this.translateService.instant('label.add-label.updateNode', {entity: this.entity.ip}));
          }, error => {
            this.showNotification(this.translateService.instant(error.error.message, 'warning'));
          });
          this.bsModalRef.hide();
          break;
        case InventoryType.Device:
          if (!updatedEntity.labels || updatedEntity.labels === '-') {
            updatedEntity.labels = {};
          }
          updatedEntity.labels[form.labelName.value] = form.labelValue.value;
          this.backend.addLabelToDevice(
            this.organizationId,
            {
              organization_id: this.organizationId,
              device_group_id: updatedEntity.device_group_id,
              device_id: updatedEntity.device_id,
              labels: updatedEntity.labels
            }
          ).subscribe(() => {
            this.showNotification(
                this.translateService.instant('label.add-label.update', {entity: this.entity.device_id}));
          }, error => {
              this.showNotification(this.translateService.instant(error.error.message, 'warning'));
          });
          this.bsModalRef.hide();
          break;
        case InventoryType.App:
          if (!updatedEntity.labels || updatedEntity.labels === '-') {
            updatedEntity.labels = {};
          }
          console.log('PRELABELS ::: ', updatedEntity.labels);
          updatedEntity.labels[form.labelName.value] = form.labelValue.value;
          updatedEntity.add_labels = true;
          console.log('POSTLABELS ::: ', updatedEntity.labels);
          this.backend.updateAppDescriptor(
            this.organizationId,
            this.entity.app_descriptor_id,
            {
              organizationId: this.organizationId,
              descriptorId: updatedEntity.app_descriptor_id,
              add_labels: true,
              labels: updatedEntity.labels
            }
          ).subscribe(() => {
              this.showNotification(
                  this.translateService.instant('label.add-label.update', {entity: this.entity.app_descriptor_id}));
          }, error => {
              this.showNotification(this.translateService.instant(error.error.message, 'warning'));
          });
          break;
        case InventoryType.Ec:
            if (!updatedEntity.labels || updatedEntity.labels === '-') {
              updatedEntity.labels = {};
            }
            updatedEntity.labels[form.labelName.value] = form.labelValue.value;
            updatedEntity.add_labels = true;
            this.backend.updateEC(
              this.organizationId,
              updatedEntity.edge_controller_id,
              {
                edge_controller_id: updatedEntity.edge_controller_id,
                add_labels: true,
                labels: updatedEntity.labels
              }
            ).subscribe(() => {
                this.showNotification(
                    this.translateService.instant('label.add-label.update', {entity: this.entity.edge_controller_id}));
            }, error => {
                this.showNotification(this.translateService.instant(error.error.message, 'warning'));
            });
            this.bsModalRef.hide();
          break;
        case InventoryType.Asset:
            if (!updatedEntity.labels || updatedEntity.labels === '-') {
              updatedEntity.labels = {};
            }
            updatedEntity.labels[form.labelName.value] = form.labelValue.value;
            this.backend.updateAsset(
              this.organizationId,
              updatedEntity.asset_id,
              {
                asset_id: updatedEntity.asset_id,
                add_labels: true,
                labels: updatedEntity.labels
              }
            ).subscribe(() => {
                this.showNotification(
                    this.translateService.instant('label.add-label.update', {entity: this.entity.asset_id}));
            }, error => {
                this.showNotification(this.translateService.instant(error.error.message, 'warning'));
            });
            this.bsModalRef.hide();
          break;
        default:
          break;
      }
    }
  }
  /**
   * It shows notifications to the user
   *  @param message Message to be showed
   *  @param type Notification type
   */
  private showNotification(message: string, type?: string) {
      this.loading = false;
      const notification = {
          message: message
      };
      if (type) {
          notification['type'] = type;
      }
      this.notificationsService.add(notification);
      this.bsModalRef.hide();
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
