import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup } from '@angular/forms';

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
  modalTitle: string;

  entity: any;
  entityType: string;

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
   * Outputs the error messages in the required format, showing the first one
   * @param errors String containing the errors
   */
  formatValidationOutput(errors: string[]) {
    if (this.errorMessages.length === 1) {
      return {
        msg: this.errorMessages[0],
        errors: this.errorMessages
      };
    } else if (this.errorMessages.length > 0) {
      return {
        msg: this.errorMessages[0] + ' +' + (this.errorMessages.length - 1) + ' errors',
        errors: this.errorMessages
      };
    } else {
      return {
        msg: '',
        errors: this.errorMessages
      };
    }
  }

  /**
   * Validates user data
   * @param form Form with user data
   */
  checkFormFields(form: FormGroup) {
    this.errorMessages = [];
    if (form.controls.key.invalid) {
      if (form.controls.key.errors.required) {
        this.errorMessages.push('Label name is required');
      }
      if (form.controls.key.errors.pattern) {
        this.errorMessages.push('Invalid format: cannot contain special characers as _*/.`');
      }
    }
    if (form.controls.value.invalid) {
      if (form.controls.value.errors.required) {
        this.errorMessages.push('Label value is required');
      }
      if (form.controls.value.errors.pattern) {
        this.errorMessages.push('Invalid format: cannot contain special characers as _*/.`');
      }
    }
    if (this.errorMessages.length === 0) {
      this.addLabel(form);
    }
  }

  /**
   * Request to add a new label
   * @param form Form object reference
   */
  addLabel(form) {
    if (this.errorMessages.length === 0) {
      const label = {
        key: form.value.key,
        value: form.value.value,
      };
      const updatedEntity = this.entity;

      switch (this.entityType.toLowerCase()) {
        case 'cluster':
          if (!updatedEntity.labels || updatedEntity.labels === '-') {
            updatedEntity.labels = {};
          }
          updatedEntity.labels[form.value.key] = form.value.value;
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
                this.notificationsService.add({
                  message: 'Updated ' + this.entity.name,
                  timeout: 3000,
                });
                this.bsModalRef.hide();
              }, error => {
                this.notificationsService.add({
                  message: error.error.message,
                  timeout: 5000,
                });
              });
            break;
            case 'node':
              if (!updatedEntity.labels || updatedEntity.labels === '-') {
                updatedEntity.labels = {};
              }
              updatedEntity.labels[form.value.key] = form.value.value;
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
                    this.notificationsService.add({
                      message: 'Updated ' + this.entity.ip + ' node',
                      timeout: 3000,
                    });
                    this.bsModalRef.hide();
                  }, error => {
                    this.notificationsService.add({
                      message: error.error.message,
                      timeout: 5000,
                    });
                  });
              break;
              case 'device':
                if (!updatedEntity.labels || updatedEntity.labels === '-') {
                  updatedEntity.labels = {};
                }
                updatedEntity.labels[form.value.key] = form.value.value;
                updatedEntity.add_labels = true;
                  this.backend.addLabelToDevice(
                    this.organizationId,
                    {
                      organization_id: this.organizationId,
                      device_group_id: updatedEntity.device_group_id,
                      device_id: updatedEntity.device_id,
                      labels: updatedEntity.labels
                    }
                    ).subscribe(updateDeviceResponse => {
                      this.notificationsService.add({
                        message: 'Updated ' + this.entity.device_id ,
                        timeout: 3000,
                      });
                      this.bsModalRef.hide();
                    }, error => {
                      this.notificationsService.add({
                        message: error.error.message,
                        timeout: 5000,
                      });
                    });
                break;
              case 'app':
                if (!updatedEntity.labels || updatedEntity.labels === '-') {
                  updatedEntity.labels = {};
                }
                updatedEntity.labels[form.value.key] = form.value.value;
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
                      this.notificationsService.add({
                        message: 'Updated ' + this.entity.app_descriptor_id ,
                        timeout: 3000,
                      });
                      this.bsModalRef.hide();
                    }, error => {
                      this.notificationsService.add({
                        message: error.error.message,
                        timeout: 5000,
                      });
                    });
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

   /**
   * Another string definition of an array
   * @param array Array of elements
   */
  arrayToString(array: any[]): string {
    let msg = '';
    array.forEach(element => {
      msg = msg + element.toLowerCase() + ', ';
    });
    msg = msg.slice(0, msg.length - 2);
    return msg;
  }

}
