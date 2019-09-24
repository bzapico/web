import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'add-connections',
  templateUrl: './add-connections.component.html',
  styleUrls: ['./add-connections.component.scss']
})
export class AddConnectionsComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that holds forms info
   */
  addNewConnectionsForm: FormGroup;
  submitted = false;
  loading: boolean;

  /**
   * Model that holds onclose method defined in manage connection component
   */
  onClose: any;

  /**
   * Model that hold add connections and its info
   */
  organizationId: string;
  connections: any[];
  copyConnections: any[];

  sourceInstance: FormControl;
  sourceInterface: FormControl;
  targetInstance: FormControl;
  targetInterface: FormControl;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  filteredOptions: any[];
  // options = [];
  // selectConfig = {};
  defaultAutofocus: string;

  sourceInstanceOptions: any[];
  sourceInstanceConfig = {};

  sourceInterfaceOptions: any[];
  sourceInterfaceConfig = {};

  targetInstanceOptions: any[];
  targetInstanceConfig = {};

  targetInterfaceOptions: any[];
  targetInterfaceConfig = {};

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    ) {
      const mock = localStorage.getItem(LocalStorageKeys.addConnectionsMock) || null;
      // check which backend is required (fake or real)
      if (mock && mock === 'true') {
        this.backend = this.mockupBackendService;
      } else {
        this.backend = this.backendService;
      }
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
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'activemq'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Opencast'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'kuaroprocessing'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Kuard'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'testPara'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'appTest'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'deviceVirtual3'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Virtual3'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'deviceVirtual2'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Virtual2'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'deviceVirtual1'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Virtual1'
        },
        connected: true
      }
    ];
    }

  ngOnInit() {
    this.addNewConnectionsForm = this.formBuilder.group({
      sourceInstance: [null, Validators.required],
      sourceInterface: [null, Validators.required],
      targetInstance: [null, Validators.required],
      targetInterface: [null, Validators.required],
    });
    // to preserve the initial state
    this.copyConnections = [...this.connections];
    this.filteredOptions = this.getFilterName();
    this.sourceInstanceOptions =  this.getFilterSourceInstanceName();
    this.sourceInterfaceOptions = this.getFilterSourceInterfaceName();
    this.targetInstanceOptions = this.getFilterTargetInstanceName();
    this.targetInterfaceOptions = this.getFilterTargetInterfaceName();


    this.sourceInstanceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Source Instance',
      limitTo: this.sourceInstanceOptions.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.sourceInterfaceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Source Interface',
      limitTo: this.sourceInterfaceOptions.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.targetInstanceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Target Instance',
      limitTo: this.targetInstanceOptions.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.targetInterfaceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Target Interface',
      limitTo: this.targetInterfaceOptions.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.addNewConnectionsForm.controls; }

  getFilterName() {
    const filteredNames = [];
    this.copyConnections.forEach(connectionName => {
      filteredNames.push(connectionName.outbound.instance);
      filteredNames.push(connectionName.inbound.instance);
    });
    return filteredNames;
  }

  getFilterSourceInstanceName() {
    const filterSourceInstanceNames = [];
    this.copyConnections.forEach(connectionName => {
      filterSourceInstanceNames.push(connectionName.outbound.instance);
    });
    return filterSourceInstanceNames;
  }

  getFilterSourceInterfaceName() {
    const filterSourceInterfaceNames = [];
    this.copyConnections.forEach(connectionName => {
      filterSourceInterfaceNames.push(connectionName.inbound.interfaceName);
    });
    return filterSourceInterfaceNames;
  }

  getFilterTargetInstanceName() {
    const filterTargetInstanceNames = [];
    this.copyConnections.forEach(connectionName => {
      filterTargetInstanceNames.push(connectionName.inbound.instance);
    });
    return filterTargetInstanceNames;
  }

  getFilterTargetInterfaceName() {
    const filterTargetInterfaceNames = [];
    this.copyConnections.forEach(connectionName => {
      filterTargetInterfaceNames.push(connectionName.outbound.interfaceName);
    });
    return filterTargetInterfaceNames;
  }

  /**
   * Requests to add new connections
   * @param f Form with the connections input data
   */
  addNewConnections(f) {
    this.submitted = true;
    this.loading = true;

    let newConnection: any;
    let indexFound;

    for (let i = 0; i < this.copyConnections.length; i++) {
      if (this.copyConnections[i]) {
        indexFound = i;
      }
    }

    newConnection = this.copyConnections[indexFound];

    this.onClose(newConnection);

    this.bsModalRef.hide();
  }

  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm('Discard changes?');
      if (discard) {
        this.bsModalRef.hide();
      } else {
        // Do nothing
      }
    } else {
      this.bsModalRef.hide();
    }
  }

    /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}

