import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'advanced-filter-options',
  templateUrl: './advanced-filter-options.component.html',
  styleUrls: ['./advanced-filter-options.component.scss']
})
export class AdvancedFilterOptionsComponent {
  /**
   * Model that hold organization ID, default filter, enabled or disabled option
   */
  organizationId: string;
  defaultFilter: boolean;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };
  showOnlyNodes: boolean;
  showRelatedNodes: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {
    this.showOnlyNodes = this.bsModalService.config.initialState['showOnlyNodes'] || false;
    this.showRelatedNodes = this.bsModalService.config.initialState['showRelatedNodes'] || false;
    // Default initialization
    this.defaultFilter = false;
  }

  saveChanges() {
    this.bsModalService.config.initialState['showOnlyNodes'] = this.showOnlyNodes;
    this.bsModalService.config.initialState['showRelatedNodes'] = this.showRelatedNodes;
    this.closeModal();
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

}
