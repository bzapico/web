import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'advanced-filter-options',
  templateUrl: './advanced-filter-options.component.html',
  styleUrls: ['./advanced-filter-options.component.scss']
})
export class AdvancedFilterOptionsComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID, default filter, enabled or disabled option
   */
  organizationId: string;
  defaultFilter: boolean;
  enabled: boolean;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    public bsModalRef: BsModalRef,
  ) {

    // Default initialization
    this.defaultFilter = false;
    this.enabled = false;
  }

  ngOnInit() {
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

}
