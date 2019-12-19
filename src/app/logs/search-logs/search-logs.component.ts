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
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LogResponse } from 'src/app/definitions/interfaces/log-response';
import { LogEntryResponse } from 'src/app/definitions/interfaces/log-entry-response';
import { mockLogsList } from 'src/app/services/utils/logs.mocks';

@Component({
  selector: 'search-logs',
  templateUrl: './search-logs.component.html',
  styleUrls: ['./search-logs.component.scss']
})
export class SearchLogsComponent implements OnInit {

  logsEntry: LogResponse = mockLogsList as LogResponse;
  /**
   * Model that hold the rate refresh
   */
  rate: string;
  rateRefresh = {
    off: true,
    oneMin: true,
    fiveMin: true
  };
  /**
   * Model that hold the sorting filter
   */
  sorting: string;
  sortingFilter = {
    ascend: true,
    descend: true,
  };
  /**
   * Models that holds forms info
   */
  entityFilterForm: FormGroup;
  entityFilter: FormControl;
  entity: FormControl;
  /**
   * NGX-select-dropdown
   */
  entityDropdownOptions: any[];
  selectConfig = {};
    /**
   * Model that hold the search term in search box
   */
  searchTerm: string;
  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;
  /**
   * Variable to store the value of menu state
   */
  public isOpen: boolean;
  /**
   * Picker with rangeFrom and rangeTo selection
   */
  public selectedMoments: any;

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder
    ) {
    this.searchTerm = '';
    this.filterField = false;
    this.isOpen = true;
  }
    /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.entityFilterForm.controls; }

  ngOnInit() {
    this.entityFilterForm = this.formBuilder.group({
      entity: [null],
    });
    this.selectConfig = {
      displayKey: 'name',
      search: true,
      searchPlaceholder: 'Search',
      height: 'auto',
      placeholder: this.translateService.instant('logs.selectEntity'),
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.formatEntityLogs();
  }
  /**
   * Formats entity logs
   */
  formatEntityLogs() {
    const entries = this.logsEntry.entries;
    const planeEntries = {};
    this.entityDropdownOptions = [];
    for (let i = 0; i < entries.length; i++) {
      const eachEntry = entries[i];
      // TODO
      eachEntry.app_descriptor_name = '[descriptor] ' + eachEntry.app_descriptor_name;
      eachEntry.app_instance_name = '--[instance] ' + eachEntry.app_instance_name;
      eachEntry.service_group_name = '----[service] ' + eachEntry.service_group_name;

      planeEntries[eachEntry['app_descriptor_id']] = eachEntry;
      if (!planeEntries[eachEntry['app_descriptor_id']]) {
        console.log('help');
        planeEntries[eachEntry['app_descriptor_id']]['instanceList'] = [];
      }
      if (eachEntry.app_instance_name) {
        planeEntries[eachEntry['app_descriptor_id']]['instanceList'].push(eachEntry.app_instance_name);
      }
    }
    this.entityDropdownOptions = Object.values(planeEntries);
  }

  /**
   * Refreshes rate
   */
  refreshRate(rate: string) {
    alert(this.translateService.instant('apps.filters.notAppliedSearching'));
    let canApply = false;
    const auxFilters = { ...this.rateRefresh };
    auxFilters[rate] = !auxFilters[rate];
    for (const filter in auxFilters) {
      if (!!!auxFilters[filter]) {
        continue;
      }
      if (auxFilters[filter]) {
        canApply = true;
        continue;
      }
    }
    if (canApply) {
      this.rateRefresh[rate] = !this.rateRefresh[rate];
    }
  }
  /**
   * Adds a quick filter
   */
  addSortingFilter(sorting: string) {
    let canApply = false;
      const auxFilters = { ...this.sortingFilter };
      auxFilters[sorting] = !auxFilters[sorting];
      for (const filter in auxFilters) {
        if (!!!auxFilters[filter]) {
          continue;
        }
        if (auxFilters[filter]) {
          canApply = true;
          continue;
        }
        if (canApply) {
          this.sortingFilter[sorting] = !this.sortingFilter[sorting];
        }
      }
    }
  /**
   * Reset all the filters fields
   */
  resetFilters(list: string) {
    if (list === 'search') {
      this.filterField = false;
      this.searchTerm = '';
    } else if (list === 'filters') {
      this.rateRefresh.off = true;
      this.rateRefresh.oneMin = true;
      this.rateRefresh.fiveMin = true;
      this.sortingFilter.ascend = true;
      this.sortingFilter.descend = true;
      this.selectedMoments = new FormControl([]);
    }
  }

  showSearchOptions() {
    this.isOpen = !this.isOpen;
  }
}
