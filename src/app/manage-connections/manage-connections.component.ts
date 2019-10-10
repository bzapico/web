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

@Component({
  selector: 'manage-connections',
  templateUrl: './manage-connections.component.html',
  styleUrls: ['./manage-connections.component.scss']
})
export class ManageConnectionsComponent implements OnInit {
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
    this.title = 'MANAGE CONNECTIONS';
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
    // to preserve the initial state
    // this.copyConnections = [...this.connections];
    this.selectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'No filter',
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.backend.getListConnections(this.organizationId)
    .subscribe(response => {
      const anyResponse: any = response;
      if (anyResponse.connections) {
        this.connections = anyResponse.connections;
        this.appDropdownOptions = this.getAppInstancesOptions();
        }
      });
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
  // TODO
    this.modalRef.content.onClose = (newConnection: any) => {
      if (newConnection) {
        console.log('newConnection', newConnection);
        // this.openAddNewConnection(newConnection);
        }
      };
    this.modalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
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
        name: '----- NO FILTER -----',
        id: '----- NO FILTER -----'
      });
    }
    return instances;
  }

  /**
   * Disconnects app instance
   * @param connection connections
   */
  disconnectInstance(connection) {
    const deleteConfirm =
    confirm(this.translateService.instant('apps.manageConnections.disconnectConfirm'));
    if (deleteConfirm) {
      connection.connected = false;
      this.notificationsService.add({
        message: 'App disconnected',
        timeout: 3000
      });
    }
  }

  /**
   * Handler for change event on ngx-select-dropdown
   * @param f Form
   */
  filterByApp(f) {
    console.log(f);
    if (f.filter.value.name === '----- NO FILTER -----') {
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
   * @param instanceId instance identificator
   */
  goToInstance(instanceId: string) {
    this.router.navigate(['/applications/instance/' + instanceId]);
    this.closeModal();
  }
}
