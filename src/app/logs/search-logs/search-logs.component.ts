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
import { mockLogsList } from 'src/app/services/utils/logs.mocks';

@Component({
  selector: 'search-logs',
  templateUrl: './search-logs.component.html',
  styleUrls: ['./search-logs.component.scss']
})
export class SearchLogsComponent implements OnInit {
  /**
   * Headers to show hierarchy in dropdown options
   */
  private static readonly INSTANCE_HEADER = '[instance]';
  private static readonly SERVICE_HEADER = '····[service]';
  // Temporary dummy mode
  logs: LogResponse = mockLogsList as LogResponse;
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
  isOpen: boolean;
  /**
   * Picker with rangeFrom and rangeTo selection
   */
  selectedMoments: FormControl;
  /**
   * Object array with entities names with object type to avoid auto array sort
   */
  entitiesHierarchy: {
    displayedName: string,
    name: string,
    app_descriptor_id: string,
    app_instance_id?: string,
    service_group_id?: string,
    service_id?: string,
  }[];

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.searchTerm = '';
    this.filterField = false;
    this.isOpen = true;
    this.translateService.get('logs.selectEntity').subscribe(val => {
      this.selectConfig = {
        placeholder: val,
        search: true,
        searchPlaceholder: this.translateService.instant('logs.searchEntity'),
        displayKey: 'displayedName',
        height: 'auto',
        moreText: 'more',
        customComparator: () => {},
        noResultsFound: this.translateService.instant('apps.addConnection.noResults'),
      };
    });
    this.entitiesHierarchy = [];
  }
  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.entityFilterForm.controls; }

  ngOnInit() {
    this.entityFilterForm = this.formBuilder.group({
      entity: [null],
    });
    this.getEntityHierarchy();
  }
  /**
  * Gets the entity hierarchy to order the dropdown options
  */
  getEntityHierarchy(): void {
    this.logs.app_descriptor_log_summary.forEach(descriptor => {
      descriptor.instances.forEach(instance => {
        this.entitiesHierarchy.push({
          displayedName: SearchLogsComponent.INSTANCE_HEADER + instance.app_instance_name,
          name: instance.app_instance_name,
          app_descriptor_id: descriptor.app_descriptor_id,
          app_instance_id: instance.app_instance_id,
        });
        instance.groups.forEach(serviceGroup => {
          serviceGroup.service_instances.forEach(service => {
            const serviceArray = this.entitiesHierarchy.filter(a =>
              a.service_id === service.service_id &&
              a.app_instance_id === instance.app_instance_id);
            if (serviceArray.length === 0) {
              this.entitiesHierarchy.push({
                displayedName: SearchLogsComponent.SERVICE_HEADER + service.name,
                name: service.name,
                app_descriptor_id: descriptor.app_descriptor_id,
                app_instance_id: instance.app_instance_id,
                service_group_id: serviceGroup.service_group_id,
                service_id: service.service_id,
              });
            }
          });
        });
      });
    });
  }
  /**
  * Change event when user changes the selected options in dropdown
  */
  selectionChanged(e) {
    // Skeleton
    console.log('e ', e.value );
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
  /**
   * Shows search options
   */
  showSearchOptions() {
    this.isOpen = !this.isOpen;
  }
}
