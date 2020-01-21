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
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
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
import { NotificationsService } from 'src/app/services/notifications.service';

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
  static orderAsc: OrderOptions =  {
    field: 'timestamp',
    order: Order.ASC
  };
  static orderDesc: OrderOptions = {
    field: 'timestamp',
    order: Order.DESC
  };
  /**
   * entityDropdown decorator that configures a view query for the dropdown
   */
  @ViewChild('entityDropdown') entityDropdown: ElementRef;
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
    fiveMin: false,
    name: ''
  };
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
  /**
   * Interval reference
   */
  refreshIntervalRef: Subscription;
  /**
   * Open modal reference
   */
  bsModalRef: BsModalRef;
  /**
   * Variable to store the value loaded hierarchy data
   */
  entityHierarchyLoaded: boolean;
  /**
   * Variable to store the value of when to add a css class to the dropdown
   */
  greyClass: boolean;

  constructor(
    private translateService: TranslateService,
    private logsService: LogsService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService
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
    this.greyClass = true;
    this.translateService.get('logs.selectEntity').subscribe(val => {
      this.selectConfig = {
        placeholder: val,
        search: true,
        searchPlaceholder: this.translateService.instant('logs.searchEntity'),
        displayKey: 'displayedName',
        height: 'auto',
        moreText: 'more',
        customComparator: () => {},
        clearOnSelection: true,
        noResultsFound: this.translateService.instant('apps.addConnection.noResults'),
      };
    });
    this.entityHierarchyLoaded = false;
    this.entitiesHierarchy = [];
  }

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
        this.getEntityHierarchy();
      }
    });
    this.logsService.downloadStatus.subscribe(downloadLinkResponse => {
        if (downloadLinkResponse) {
        this.openDownloadFileInfo(downloadLinkResponse);
      }
    });
    this.requestSearchLogs();
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
    this.requestSearchLogs();
    this.notificationsService.add({
      message: this.translateService.instant('logs.resetFiltersMessage', {list: list}),
    });
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
      this.catalog = {};
      this.isSearching = true;
      this.currentParameters.msg_query_filter = keyWord;
      this.requestSearchLogs();
      this.notificationsService.add({
        message: this.translateService.instant('logs.searchByTermMessage', {keyWord: keyWord}),
      });
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
    this.catalog = {};
    this.resetDateFilter();
    this.resetTimingFilter();
    // Convert the time from milliseconds to nanoseconds
    const dateTime = (new Date().getTime() * 1000000) - SearchLogsComponent.HOUR_IN_NANO_SEC;
    this.currentParameters.from = dateTime;
    delete this.currentParameters.to;
    this.requestSearchLogs();
    this.notificationsService.add({
      message: this.translateService.instant('logs.lastHourMessage'),
    });
  }
  /**
   * Gets the last day logs filtered list
   */
  getLastDayLogs() {
    this.catalog = {};
    this.resetDateFilter();
    this.timingFilter.lastDay = true;
    this.timingFilter.lastHour = false;
    // Convert the time from milliseconds to nanoseconds
    const dateTime = (new Date().getTime() * 1000000) - SearchLogsComponent.DAY_IN_NANO_SEC;
    this.currentParameters.from = dateTime;
    delete this.currentParameters.to;
    this.requestSearchLogs();
    this.notificationsService.add({
      message: this.translateService.instant('logs.lastDayMessage'),
    });
  }
  /**
   * Watches the changes in the calendar/date template using the dateTimeChange callback
   * @param e event that binds the template to invoke when change event is fired on
   */
  fromOnChange(e: { value: string[]; }) {
    this.catalog = {};
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
      this.notificationsService.add({
        message: this.translateService.instant('logs.fromDateMessage', {date: selectedDateString}),
      });
  }
  /**
   * Watches the changes in the calendar/date template using the dateTimeChange callback
   * @param e event that binds the template to invoke when change event is fired on
   */
  toOnChange(e: { value: string[]; }) {
    this.catalog = {};
    this.resetTimingFilter();
    const selectedDateString: string = e.value[1] + '';
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
      this.notificationsService.add({
        message: this.translateService.instant('logs.toDateMessage', {date: selectedDateArray}),
      });
  }
  /**
   * Change event when user changes the selected options in dropdown
   * @param e event that binds the template
   */
  dropdownSelectionChanged(e: { value: any; }) {
    this.catalog = {};
    const entityIds = e.value;
    if (entityIds && entityIds.app_descriptor_id) {
      this.currentParameters.app_descriptor_id = entityIds.app_descriptor_id;
      this.currentParameters.app_instance_id = entityIds.app_instance_id;
      if (entityIds.service_group_id) {
        this.currentParameters.service_group_id = entityIds.service_group_id;
        this.currentParameters.service_id = entityIds.service_id;
        this.currentParameters.service_group_instance_id = entityIds.service_group_instance_id;
      }
      this.requestSearchLogs();
      this.greyClass = false;
      this.notificationsService.add({
        message: this.translateService.instant('logs.changeEntityMessage', {entityName: entityIds.name}),
      });
    }
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
    this.requestSearchLogs();
    this.notificationsService.add({
      message: this.translateService.instant('logs.sortingMessage', {sorting: sorting}),
    });
  }
  /**
   * Refreshes rate
   * @param rate the frequency
   */
  refreshRateChange(rate: number) {
    this.catalog = {};
    if (this.refreshIntervalRef) {
      this.refreshIntervalRef.unsubscribe();
    }
    if (rate === 0) {
      this.rateFilter = {
        off: true,
        oneMin: false,
        fiveMin: false,
        name: 'off'
      };
      this.notificationsService.add({
        message: this.translateService.instant('logs.refreshRateOffMessage'),
      });
    } else if (rate === 60000) {
      this.rateFilter = {
        off: false,
        oneMin: true,
        fiveMin: false,
        name: this.translateService.instant('logs.rateOneMin')
      };
      this.refreshIntervalRef = timer(0, rate).subscribe(() => {
        this.requestSearchLogs();
      });
      this.notificationsService.add({
        message: this.translateService.instant('logs.refreshRateMessage', {rate: this.rateFilter.name}),
      });
    } else {
      this.rateFilter = {
        off: false,
        oneMin: false,
        fiveMin: true,
        name: this.translateService.instant('logs.rateFiveMin')
      };
      this.refreshIntervalRef = timer(0, rate).subscribe(() => {
        this.requestSearchLogs();
      });
      this.notificationsService.add({
        message: this.translateService.instant('logs.refreshRateMessage', {rate: this.rateFilter.name}),
      });
    }
  }
  /**
   * Copy logs to clipboard
   * @param entries entries to be copied
   */
  copyLogs() {
    if (this.catalog.entries) {
      const logsForCopy: string[] = [];
      this.catalog.entries.forEach(entry => {
        const date = new Date(entry.timestamp / 1000000);
        const splitDate: string[] = date.toString().split(' ');
        const formattedDate = splitDate[0] + ' ' + splitDate[1] + ' ' + splitDate[2] + ' ' + splitDate[3] + ' ' + splitDate[4] + ' ';
        let formattedId =
          '[DESCRIPTOR - ' + entry.app_descriptor_name + ']' +
          '[INSTANCE - ' + entry.app_instance_name + ']';
          if (entry.service_name) {
            formattedId +=
              '[SERVICE GROUP - ' + entry.service_group_name + ']' +
              '[SERVICE - ' + entry.service_name + ']';
          }
        logsForCopy.push(formattedDate + formattedId + ' ' + entry.msg);
      });
      const fullLogsText = JSON.stringify(logsForCopy);
      const temporalInput = document.createElement('input');
        document.body.appendChild(temporalInput);
        temporalInput.setAttribute('id', 'copy_id');
        (<HTMLInputElement>document.getElementById('copy_id')).value = fullLogsText;
        temporalInput.select();
        document.execCommand('copy');
        document.body.removeChild(temporalInput);
        this.notificationsService.add({
          message: this.translateService.instant('logs.copiedMessage'),
        });
    }
  }
  /**
   * Download logs ask for log entries and store them into a zip file
   */
  downloadLogs() {
    this.notificationsService.add({
      message: this.translateService.instant('logs.downloadPrevMessage'),
      type: 'important'
    });
    this.logsService.download(this.currentParameters);
  }
  /**
   * Gets the entity hierarchy to order the dropdown options
   */
  private getEntityHierarchy(): void {
    if (this.catalog.app_descriptor_log_summary) {
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
                  service_id: service.service_id,
                  service_group_instance_id: serviceGroup.service_group_instance_id
                });
              }
            });
          });
        });
      });
    }
    this.entityHierarchyLoaded = true;
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
    this.greyClass = true;
    const temp: any = this.entityDropdown;
    temp.selectedItems = [];
    const selectEntityMessage = this.translateService.instant('logs.selectEntity');
    temp.selectedDisplayText = selectEntityMessage;
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
    delete this.currentParameters.from;
    delete this.currentParameters.to;
  }
}
