import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { AddConnectionsComponent } from '../add-connections/add-connections.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'manage-connections',
  templateUrl: './manage-connections.component.html',
  styleUrls: ['./manage-connections.component.scss']
})
export class ManageConnectionsComponent implements OnInit {
  static readonly REFRESH_INTERVAL = 10000;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold manage connections and its info
   */
  organizationId: string;
  title: string;
  connections: any[];
  copyConnections: any[];
  selectedApp: any;
  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;
  /**
   * Models that holds forms info
   */
  manageConnectionsFilterForm: FormGroup;
  manageConnections: FormControl;
  filter: FormControl;
  /**
   * NGX-select-dropdown
   */
  tab = 1;
  appDropdownOptions: any[];
  selectConfig = {};
  /**
   * Reference for the service that allows the modal component
   */
  modalRef: BsModalRef;
  /**
   * Holds the reference of the interval that refreshes the lists
   */
  refreshIntervalRef: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private router: Router
    ) {
      const mock = localStorage.getItem(LocalStorageKeys.manageConnectionsMock) || null;
      // Check which backend is required (fake or real)
      if (mock && mock === 'true') {
        this.backend = this.mockupBackendService;
      } else {
        this.backend = this.backendService;
      }
    this.title = this.translateService.instant('apps.manageConnections.title');
    this.searchTerm = '';
    this.selectedApp = '';
    //  Manage connections dropdown
    this.manageConnections = null;
    this.connections = [];
  }

  ngOnInit() {
    // Get organizationID
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
    }
    this.manageConnectionsFilterForm = this.formBuilder.group({
      filter: [null],
    });
    this.selectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('advancedFilterOptions.noFilters'),
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.updateConnections();
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.manageConnectionsFilterForm.controls; }
  /**
   * Creates an array with the names to be filtered by
   */
  openAddNewConnection() {
    const initialState = {
      organizationId: this.organizationId,
      defaultAutofocus: false,
    };
    this.modalRef = this.modalService.show(AddConnectionsComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.onClose = (newConnection: any) => {
      if (newConnection) {
      }};
    this.modalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
  /**
   * Updates connections and appDropdownOptions
   */
  updateConnections() {
    this.backend.getListConnections(this.organizationId)
    .subscribe(response => {
      const anyResponse: any = response;
      if (anyResponse.list) {
        this.connections = anyResponse.list;
        this.appDropdownOptions = this.getAppInstancesOptions();
        }
      });
  }
  /**
   * Returns app instances names and ids in an object array
   */
  getAppInstancesOptions() {
    const instances = [];
    if (this.connections && this.connections !== []) {
      this.connections.forEach(connectionName => {
        instances.push({
          name: connectionName.source_instance_name,
          id: connectionName.source_instance_id
        });
        instances.push({
          name: connectionName.target_instance_name,
          id: connectionName.target_instance_id
        });
      });
      instances.push({
        name: this.translateService.instant('advancedFilterOptions.noFiltersDrop'),
        id: this.translateService.instant('advancedFilterOptions.noFiltersDrop')
      });
    }
    return instances;
  }
  /**
   * Disconnects app instance
   * @param connection connections
   */
  disconnectInstance(connection) {
    let message = this.translateService.instant('apps.manageConnections.disconnectConfirm');
    if (connection.outbound_required) {
      message = this.translateService.instant('apps.manageConnections.disconnectConfirmOutboundRequired');
    }
    const deleteConfirm = confirm(message);
    if (deleteConfirm) {
      this.backend.removeConnection(this.organizationId, {
        organization_id: this.organizationId,
        source_instance_id: connection.source_instance_id,
        source_instance_name: connection.source_instance_name,
        target_instance_id: connection.target_instance_id,
        target_instance_name: connection.target_instance_name,
        inbound_name: connection.inbound_name,
        outbound_name: connection.outbound_name,
        user_confirmation: true
      })
        .subscribe(() => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.manageConnections.disconnectMessage'),
          });
          this.updateConnections();
        });
    }
  }
  /**
   * Handler for change event on ngx-select-dropdown
   * @param f Form
   */
  filterByApp(f) {
    // Workaround to enable "resetting" the filter to no filter after selecting an app
    if (f.filter.value.name === this.translateService.instant('advancedFilterOptions.noFiltersDrop')) {
      f.filter.value = null;
      this.selectedApp = '';
    } else {
      this.selectedApp = f.filter.value.name;
    }
  }
  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
  /**
   * Reset all the filters fields
   */
  resetFilters() {
    this.searchTerm = '';
  }
  /**
   * Navigates to the desired instance and closes the modal
   * @param instanceId instance identification
   */
  goToInstance(instanceId: string) {
    this.router.navigate(['/applications/instance/' + instanceId]);
    this.closeModal();
  }
}
