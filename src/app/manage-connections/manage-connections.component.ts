import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';

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
  instances: any[];
  registered: any[];
  instanceName: string;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;

  /**
   * Models that holds forms info
   */
  manageConnectionsFilterForm: FormGroup;
  submitted = false;
  manageConnections: FormControl;
  filter: FormControl;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  options = [];
  manageConnectionsOptions: any[];
  manageConnectionsSelectConfig = {};

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
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
    this.instances = [];
    this.instanceName = '';

    //  Manage connections dropdown
    this.manageConnections = null;
    this.manageConnectionsSelectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'No filter',
      limitTo: this.instances.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.manageConnectionsOptions =
    [{
      name: 'WordPress',
      code: 0
    }, {
      name: 'MySQL',
      code: 1
    }, {
      name: 'MySQL2',
      code: 2
    }, {
      name: 'WordPress2',
      code: 3
    }];


    // CONNECTIONS
    this.connections = [
      {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'MySQL'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'WordPress'
      }
    },
    {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'activemq'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'Opencast'
      }
    },
    {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'kuaroprocessing'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'Kuard'
      }
    },
    {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'testPara'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'appTest'
      }
    },
    {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'deviceVirtual3'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'Virtual3'
      }
    },
    {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'deviceVirtual2'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'Virtual2'
      }
    },
    {
      inbound: {
        interfaceName: 'dbInbound',
        instance: 'deviceVirtual1'
      },
      outbound: {
        interfaceName: 'dbOutbound',
        instance: 'Virtual1'
      }
    }
    ];
  }

  ngOnInit() {
    this.manageConnectionsFilterForm = this.formBuilder.group({
      filter: [null],
    });
    this.updateAppInstances(this.organizationId);
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.manageConnectionsFilterForm.controls; }
  /**
   * Updates instances array
   * @param organizationId Organization identifier
   */
  updateAppInstances(organizationId: string) {
    if (organizationId !== null) {
      // Request to get apps instances
      this.backend.getInstances(this.organizationId)
      .subscribe(response => {
          this.instances = response.instances || [];
          this.getInstancesName();
      });
    }
  }
  /**
   * Opens the modal view that holds the add new connections component
   */
  addNewConnection() {
    console.log('add connection');
  }

  getInstancesName() {
    for (let index = 0; index < this.instances.length; index++) {
      this.instanceName = this.instances[index].name;
    }
  }

  /**
   * Disconnects app instance
   */
  disconnectInstance(app) {
    const deleteConfirm = confirm('Disconnect?');
    if (deleteConfirm) {
      this.notificationsService.add({
        message: 'App disconnected',
        timeout: 3000
      });
    }
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

  /**
   * Requests to add manage connections filter
   * @param f Form with the filter input data
   */
  addManageConnectionsFilter(f) {
    this.submitted = true;
    this.bsModalRef.hide();
  }
}
