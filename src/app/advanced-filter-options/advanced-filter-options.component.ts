import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

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
  name: string;

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
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.advancedFilterOptions) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.defaultFilter = false;
    this.enabled = false;
  }

  ngOnInit() {
  }

  /**
   *  Request to save the advanced filter modifications
   */
  saveFilterChanges() {
    this.bsModalRef.hide();
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

}
