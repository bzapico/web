import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Backend } from './definitions/interfaces/backend';
import { TranslateService } from '@ngx-translate/core';
import { AddLabelComponent } from './add-label/add-label.component';
import { BackendService } from './services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class LabelsCardServiceService {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * Reference for the service that allows the modal component
   */
  modalRef: BsModalRef;

  /**
   * List of selected labels from an entity
   */
  selectedLabels = [];

  constructor(
    private translateService: TranslateService,
    private modalService: BsModalService,
    private backendService: BackendService
  ) {
    this.backend = this.backendService;
  }

  /**
   * Opens the modal view that holds add label component
   * @param entity selected label entity
   */
  addLabel(entity) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: this.translateService.instant('apps.registered.app'),
      entity: entity,
      modalTitle: entity.name
    };

    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
    });
  }

  /**
   * Deletes a selected label
   * @param entity selected label entity
   * @param selectedLabels selected labels array
   */
  deleteLabel(entity, selectedLabels) {
    const deleteConfirm = confirm(this.translateService.instant('label.deleteLabels'));
    if (deleteConfirm) {
      const index = selectedLabels.map(x => x.app_descriptor_id).indexOf(entity.app_descriptor_id);
      this.backend.updateAppDescriptor(
        entity.organization_id,
        entity.app_descriptor_id,
        {
          organizationId: entity.organization_id,
          descriptorId: entity.app_descriptor_id,
          remove_labels: true,
          labels: {label: 'shop'}
        }).subscribe(updateAppResponse => {
          selectedLabels.splice(index, 1);
        });
    } else {
      // Do nothing
    }
  }

  /**
   * Selects a label
   * @param label label entity
   * @param selectedLabels selected labels array
   */
  onLabelClick(label, selectedLabels) {
    label['selected'] = !label['selected'];
    if (label['selected']) {
      selectedLabels.push(label);
    } else {
      selectedLabels.pop();
    }
  }
}
