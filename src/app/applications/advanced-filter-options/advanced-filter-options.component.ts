/* 
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
