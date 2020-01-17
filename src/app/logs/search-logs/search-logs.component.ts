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
import { LogsService } from '../logs.service';
import { timer, Subscription } from 'rxjs';
import { EntitiesHierarchy } from '../../definitions/models/entities-hierarchy';
import { BackendService } from 'src/app/services/backend.service';
import { LocalStorageKeys } from 'src/app/definitions/const/local-storage-keys';
import { MockupBackendService } from 'src/app/services/mockup-backend.service';
import { Backend } from 'src/app/definitions/interfaces/backend';
import { SearchRequest } from 'src/app/definitions/interfaces/search-request';
import { OrderOptions } from 'src/app/definitions/interfaces/order-options';
import { Order } from 'src/app/definitions/enums/order.enum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DownloadFileInfoComponent } from '../download-file-info/download-file-info.component';

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
  private static readonly HOUR_IN_NANO_SEC = 3600000000000;
  private static readonly DAY_IN_NANO_SEC = 24 * SearchLogsComponent.HOUR_IN_NANO_SEC;
  /**
   * Order is used to define the ordering of the results
   */
  static orderAsc: OrderOptions[] =  [{
    field: 'timestamp',
    order: Order.ASC
  }];
  static orderDesc: OrderOptions[] = [{
    field: 'timestamp',
    order: Order.DESC
  }];
  /**
   * Logs response
   */
  catalog: LogResponse;
  /**
   * Search request parameter to be changed each time search method is called
   */
  currentParameters: SearchRequest;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold organization id
   */
  organizationId: string;
  /**
   * Model that hold the last day and last hour timing filters
   */
  timing: string;
  timingFilter = {
    lastHour: false,
    lastDay: false,
  };
  /**
   * Model that hold the sorting filter
   */
  sorting: string;
  sortingFilter = {
    ascend: true,
    descend: false,
  };
  /**
   * Model that hold the rate refresh
   */
  rate: string;
  rateFilter = {
    off: true,
    oneMin: false,
    fiveMin: false
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
   * Boolean variables for indicate different flags to search/filter in the logs
   */
  isSearching: boolean;
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
  dateFilter: FormControl;
  /**
   * Object array with entities names with object type to avoid auto array sort
   */
  entitiesHierarchy: EntitiesHierarchy[];
  fakeValue: EntitiesHierarchy;
  /**
   * Interval reference
   */
  refreshIntervalRef: Subscription;
  /**
   * Open modal reference
   */
  bsModalRef: BsModalRef;

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private logsService: LogsService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private modalService: BsModalService,
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.logsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    this.currentParameters = {
      order: SearchLogsComponent.orderAsc
    };
    this.searchTerm = '';
    this.filterField = false;
    this.isOpen = true;
    this.isSearching = false;
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
    this.fakeValue =
    new EntitiesHierarchy('Select an specific entity', '', '', '-1');
  }
  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.entityFilterForm.controls; }

  ngOnInit() {
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        this.currentParameters = {
          organization_id: this.organizationId
        };
      }
    }
    this.logsService.searchLogsResponse.subscribe(searchResponse => {
      if (searchResponse) {
        searchResponse = searchResponse as LogResponse;
        this.catalog = searchResponse;
      }
    });
    this.logsService.downloadStatus.subscribe(downloadLinkResponse => {
      if (downloadLinkResponse) {
        this.openDownloadFileInfo(downloadLinkResponse);
      }
    });
    this.requestSearchLogs();
    this.entityFilterForm = this.formBuilder.group({
      entity: [null]
    });
    this.getEntityHierarchy();
  }
  /**
   * Search logs method that calls the logs service to communicate between components
   */
  requestSearchLogs() {
    return this.logsService.searchLogs(this.currentParameters);
  }
  /**
   * Resets all the filters fields
   */
  resetFilters(list: string) {
    if (list === 'search') {
      this.resetSearchFilter();
    } else if (list === 'filters') {
      this.resetDropdownOptions();
      this.resetTimingFilter();
      this.resetSortingFilter();
      this.resetRateFilter();
      this.resetDateFilter();
    }
  }
  /**
   * Shows search options
   */
  showSearchOptions() {
    this.isOpen = !this.isOpen;
  }
  /**
   * Searches by term
   * @param keyWord search term used in the search
   */
  searchByTerm(keyWord: string) {
    if (this.searchTerm) {
      this.isSearching = true;
      this.currentParameters.msg_query_filter = keyWord;
      this.requestSearchLogs();
    }
  }
  /**
   * Binds the keyup event in the template to search logs
   * @param e event that binds the template
   * @param searchTerm search term
   */
  searchOnKeyUp(e: any, keyWord: string) {
    this.isSearching = true;
    this.searchByTerm(keyWord);
  }
  /**
   * Gets the last hour logs filtered list
   */
  getLastHourLogs() {
    this.resetDateFilter();
    this.resetTimingFilter();
    // Convert the time from milliseconds to nanoseconds
    const dateTime = (new Date().getTime() * 1000000) - SearchLogsComponent.HOUR_IN_NANO_SEC;
    this.currentParameters.from = dateTime;
    delete this.currentParameters.to;
    this.requestSearchLogs();
  }
  /**
   * Gets the last day logs filtered list
   */
  getLastDayLogs() {
    this.resetDateFilter();
    this.timingFilter.lastDay = true;
    this.timingFilter.lastHour = false;
    // Convert the time from milliseconds to nanoseconds
    const dateTime = (new Date().getTime() * 1000000) - SearchLogsComponent.DAY_IN_NANO_SEC;
    this.currentParameters.from = dateTime;
    delete this.currentParameters.to;
    this.requestSearchLogs();
  }
  /**
   * Watches the changes in the calendar/date template using the dateTimeChange callback
   * @param e event that binds the template to invoke when change event is fired on
   */
  fromOnChange(e: { value: string[]; }) {
    this.resetTimingFilter();
    const selectedDateString: string = e.value[0] + '';
    const selectedDateArray = selectedDateString.split(' ');
    // Parser library time
    const fromDateTime = Date.parse(
      selectedDateArray[2] + ' ' +
      selectedDateArray[1] + ' ' +
      selectedDateArray[3] + ' ' +
      selectedDateArray[4] + ' ' +
      selectedDateArray[5]) * 1000000;
      this.currentParameters.from = fromDateTime;
      this.requestSearchLogs();
  }
  /**
   * Watches the changes in the calendar/date template using the dateTimeChange callback
   * @param e event that binds the template to invoke when change event is fired on
   */
  toOnChange(e: { value: string[]; }) {
    this.resetTimingFilter();
    const selectedDateString: string = e.value[0] + '';
    const selectedDateArray = selectedDateString.split(' ');
    // Parser library time
    const toDateTime = Date.parse(
      selectedDateArray[2] + ' ' +
      selectedDateArray[1] + ' ' +
      selectedDateArray[3] + ' ' +
      selectedDateArray[4] + ' ' +
      selectedDateArray[5]) * 1000000;
      this.currentParameters.to = toDateTime;
      this.requestSearchLogs();
  }
  /**
   * Change event when user changes the selected options in dropdown
   * @param e event that binds the template
   */
  dropdownSelectionChanged(e: { value: any; }) {
    const entityIds = e.value;
    this.currentParameters.app_descriptor_id = entityIds.app_descriptor_id;
    this.currentParameters.app_instance_id = entityIds.app_instance_id;
    if (entityIds.service_group_id) {
      this.currentParameters.service_group_id = entityIds.service_group_id;
      this.currentParameters.service_id = entityIds.service_id;
    }
    this.requestSearchLogs();
  }
  /**
   * Adds a quick filter
   * @param sorting sort type
   */
    changeSorting(sorting: string) {
    if (sorting === 'ascend') {
      this.resetSortingFilter();
      this.currentParameters.order = SearchLogsComponent.orderAsc;
    } else if (sorting === 'descend') {
      this.sortingFilter.ascend = false;
      this.sortingFilter.descend = true;
      this.currentParameters.order = SearchLogsComponent.orderDesc;
    }
  }
  /**
   * Refreshes rate
   * @param rate the frequency
   */
  refreshRateChange(rate: number) {
    if (this.refreshIntervalRef) {
      this.refreshIntervalRef.unsubscribe();
    }
    if (rate === 0) {
      this.rateFilter = {
        off: true,
        oneMin: false,
        fiveMin: false
      };
    } else if (rate === 60000) {
      this.rateFilter = {
        off: false,
        oneMin: true,
        fiveMin: false
      };
      this.refreshIntervalRef = timer(0, rate).subscribe(() => {
        this.requestSearchLogs();
      });
    } else {
      this.rateFilter = {
        off: false,
        oneMin: false,
        fiveMin: true
      };
      this.refreshIntervalRef = timer(0, rate).subscribe(() => {
        this.requestSearchLogs();
      });
    }
  }
  /**
   * Copy logs to clipboard
   * @param entries entries to be copied
   */
  copyLogs() {
    let catalogToString: any;
    catalogToString = this.catalog.entries.map(entries => {
      const jsonString = JSON.stringify(entries);
      return jsonString;
    });
    const temporalInput = document.createElement('input');
      document.body.appendChild(temporalInput);
      temporalInput.setAttribute('id', 'copy_id');
      (<HTMLInputElement>document.getElementById('copy_id')).value = catalogToString;
      temporalInput.select();
      document.execCommand('copy');
      document.body.removeChild(temporalInput);
  }
  /**
   * Download logs ask for log entries and store them into a zip file
   */
  downloadLogs() {
    this.logsService.download(this.currentParameters);
  }
  /**
   * Gets the entity hierarchy to order the dropdown options
   */
  private getEntityHierarchy(): void {
    this.catalog.app_descriptor_log_summary.forEach(descriptor => {
      descriptor.instances.forEach(instance => {
        this.entitiesHierarchy.push({
          displayedName: SearchLogsComponent.INSTANCE_HEADER + instance.app_instance_name,
          name: instance.app_instance_name,
          app_descriptor_id: descriptor.app_descriptor_id,
          id: instance.app_instance_id,
          app_instance_id: instance.app_instance_id
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
                id: service.service_id,
                app_instance_id: instance.app_instance_id,
                service_group_id: serviceGroup.service_group_id,
                service_id: service.service_id
              });
            }
          });
        });
      });
    });
  }
  /**
   * Opens the modal view that holds download file info component
   * @param downloadParams download params
   */
  private openDownloadFileInfo(url) {
    const initialState = {
      organizationId: this.organizationId,
      url: url
    };
    this.bsModalRef =
      this.modalService.show(DownloadFileInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
  /**
   * Resets the dropdown options
   */
  private resetDropdownOptions() {
    this.entityFilterForm.controls.entity.setValue(this.fakeValue);
    this.entitiesHierarchy = [];
    this.ngOnInit();
    this.entityFilterForm.controls.entity.setValue(null);
  }
  /**
   * Resets the search filter
   */
  private resetSearchFilter() {
    this.filterField = false;
    this.isSearching = false;
    this.searchTerm = '';
  }
  /**
   * Resets the date filter
   */
  private resetDateFilter() {
    this.dateFilter = new FormControl([]);
  }
  /**
   * Resets the rate filter
   */
  private resetRateFilter() {
    this.rateFilter.off = true;
    this.rateFilter.oneMin = false;
    this.rateFilter.fiveMin = false;
  }
  /**
   * Resets the sorting filter
   */
  private resetSortingFilter() {
    this.sortingFilter.ascend = true;
    this.sortingFilter.descend = false;
  }
  /**
   * Resets the timing filter
   */
  private resetTimingFilter() {
    this.timingFilter.lastDay = false;
    this.timingFilter.lastHour = false;
  }
}
