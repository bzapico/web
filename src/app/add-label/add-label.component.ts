import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * It sets the timeout in actions like undeploying or deleting
 */
const TIMEOUT_ACTION = 3000;
/**
 * It sets the timeout for errors
 */
const TIMEOUT_ERROR = 5000;

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
    private notificationsService: NotificationsService
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
        case 'cluster':
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
          ).subscribe(updateClusterResponse => {
            this.loading = false;
            this.notificationsService.add({
              message: 'Updated ' + this.entity.name,
              timeout: TIMEOUT_ACTION,
            });
            this.bsModalRef.hide();
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: error.error.message,
              timeout: TIMEOUT_ERROR,
              type: 'warning'
            });
          });
          break;
        case 'node':
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
          ).subscribe(updateNodeResponse => {
            this.loading = false;
            this.notificationsService.add({
              message: 'Updated ' + this.entity.ip + ' node',
              timeout: TIMEOUT_ACTION,
            });
            this.bsModalRef.hide();
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: error.error.message,
              timeout: TIMEOUT_ERROR,
              type: 'warning'
            });
          });
          this.bsModalRef.hide();
          break;
        case 'device':
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
          ).subscribe(updateDeviceResponse => {
            this.loading = false;
            this.notificationsService.add({
              message: 'Updated ' + this.entity.device_id,
              timeout: TIMEOUT_ACTION,
            });
            this.bsModalRef.hide();
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: error.error.message,
              timeout: TIMEOUT_ERROR,
              type: 'warning'
            });
          });
          this.bsModalRef.hide();
          break;
        case 'app':
          if (!updatedEntity.labels || updatedEntity.labels === '-') {
            updatedEntity.labels = {};
          }
          updatedEntity.labels[form.labelName.value] = form.labelValue.value;
          updatedEntity.add_labels = true;
          this.backend.updateAppDescriptor(
            this.organizationId,
            this.entity.app_descriptor_id,
            {
              organizationId: this.organizationId,
              descriptorId: updatedEntity.app_descriptor_id,
              add_labels: true,
              labels: updatedEntity.labels
            }
          ).subscribe(updateAppResponse => {
            this.loading = false;
            this.notificationsService.add({
              message: 'Updated ' + this.entity.app_descriptor_id,
              timeout: TIMEOUT_ACTION,
            });
            this.bsModalRef.hide();
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: error.error.message,
              timeout: TIMEOUT_ERROR,
              type: 'warning'
            });
          });
          break;
        case 'ec':
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
            ).subscribe(updateECResponse => {
              this.loading = false;
              this.notificationsService.add({
                message: 'Updated ' + this.entity.edge_controller_id,
                timeout: TIMEOUT_ACTION,
              });
              this.bsModalRef.hide();
            }, error => {
              this.loading = false;
              this.notificationsService.add({
                message: error.error.message,
                timeout: TIMEOUT_ERROR,
                type: 'warning'
              });
            });
            this.bsModalRef.hide();
          break;
        case 'asset':
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
            ).subscribe(updateAssetResponse => {
              this.loading = false;
              this.notificationsService.add({
                message: 'Updated ' + this.entity.asset_id,
                timeout: TIMEOUT_ACTION,
              });
              this.bsModalRef.hide();
            }, error => {
              this.loading = false;
              this.notificationsService.add({
                message: error.error.message,
                timeout: TIMEOUT_ERROR,
                type: 'warning'
              });
            });
            this.bsModalRef.hide();
          break;
        default:
          break;
      }
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
