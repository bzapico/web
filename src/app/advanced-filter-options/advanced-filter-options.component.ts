import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'advanced-filter-options',
  templateUrl: './advanced-filter-options.component.html',
  styleUrls: ['./advanced-filter-options.component.scss']
})
export class AdvancedFilterOptionsComponent implements OnInit {
  /**
   * Model that hold organization ID, show only nodes, show related nodes and default filter
   */
  organizationId: string;
  showOnlyNodes: boolean;
  showRelatedNodes: boolean;
  defaultFilter: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.showOnlyNodes = this.bsModalService.config.initialState['showOnlyNodes'];
    this.showRelatedNodes = this.bsModalService.config.initialState['showRelatedNodes'];
    this.defaultFilter = this.bsModalService.config.initialState['defaultFilter'];
  }

  /**
   * Save changes
   */
  saveChanges() {
    this.bsModalService.config.initialState['showOnlyNodes'] = this.showOnlyNodes;
    this.bsModalService.config.initialState['showRelatedNodes'] = this.showRelatedNodes;
    this.bsModalService.config.initialState['defaultFilter'] = this.defaultFilter;
    this.closeModal();
  }
  /**
   * Reset all the filters fields
   */
  resetFilters() {
    this.defaultFilter = false;
    this.showOnlyNodes = false;
    this.showRelatedNodes = false;
  }
  /**
   * Change the filter options to use radio button
   */
  changeFilterOption(filterOption: string) {
    this.resetFilters();
    this[filterOption] = true;
  }
  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}
