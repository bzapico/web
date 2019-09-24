import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService
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
          interfaceName: 'activemqInbound',
          instance: 'activemq'
        },
        outbound: {
          interfaceName: 'OpencastOutbound',
          instance: 'Opencast'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'KuardInbound',
          instance: 'Kuardprocessing'
        },
        outbound: {
          interfaceName: 'KuardOutbound',
          instance: 'Kuard'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'testInbound',
          instance: 'testPara'
        },
        outbound: {
          interfaceName: 'testOutbound',
          instance: 'appTest'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'deviceInbound',
          instance: 'deviceVirtual3'
        },
        outbound: {
          interfaceName: 'Virtual3Outbound',
          instance: 'Virtual3'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'Virtual2Inbound',
          instance: 'deviceVirtual2'
        },
        outbound: {
          interfaceName: 'Virtual2Outbound',
          instance: 'Virtual2'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'Virtual1Inbound',
          instance: 'deviceVirtual1'
        },
        outbound: {
          interfaceName: 'Virtual1Outbound',
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
      placeholder: this.translateService.instant('apps.manageConnections.sourceInstance'),
      limitTo: this.sourceInstanceOptions.length,
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.sourceInterfaceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('apps.manageConnections.sourceInterface'),
      limitTo: this.sourceInterfaceOptions.length,
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.targetInstanceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('apps.manageConnections.targetInstance'),
      limitTo: this.targetInstanceOptions.length,
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.targetInterfaceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('apps.manageConnections.targetInterface'),
      limitTo: this.targetInterfaceOptions.length,
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
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

    // let newConnection: any;
    // let indexFound;

    // for (let i = 0; i < this.copyConnections.length; i++) {
    //   if (this.copyConnections[i]) {
    //     indexFound = i;
    //   }
    // }

    // newConnection = this.copyConnections[indexFound];

    // this.onClose(newConnection);

    this.bsModalRef.hide();
  }

  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm(this.translateService.instant('apps.addConnection.discardChanges'));
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

