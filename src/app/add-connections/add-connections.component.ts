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
   * Model that hold add connections and its info
   */
  organizationId: string;
  sourceInstances: any[];
  sourceInterfaces: any[];
  targetInterfaces: any[];
  targetInstances: any[];
  sourceInstance: FormControl;
  sourceInterface: FormControl;
  targetInstance: FormControl;
  targetInterface: FormControl;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  options = [];
  selectConfig = {};
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
    //  Source Instance
    this.sourceInstances = [];
    this.sourceInstanceOptions = [{
      name: 'App1',
      code: 0
    }, {
      name: 'App2',
      code: 1
    }, {
      name: 'App3',
      code: 2
    }, {
      name: 'App4',
      code: 3
    }];
    //  Source Interfaces
    this.sourceInterfaces = [];
    this.sourceInterfaceOptions = [{
      name: 'App1',
      code: 0
    }, {
      name: 'App2',
      code: 1
    }, {
      name: 'App3',
      code: 2
    }, {
      name: 'App4',
      code: 3
    }];
    //  Target Interfaces
    this.targetInterfaces = [];
    this.targetInterfaceOptions = [{
      name: 'App1',
      code: 0
    }, {
      name: 'App2',
      code: 1
    }, {
      name: 'App3',
      code: 2
    }, {
      name: 'App4',
      code: 3
    }];
    //  Target Instances
    this.targetInstances = [];
    this.targetInstanceOptions = [{
      name: 'App1',
      code: 0
    }, {
      name: 'App2',
      code: 1
    }, {
      name: 'App3',
      code: 2
    }, {
      name: 'App4',
      code: 3
    }];

    }

  ngOnInit() {
    this.addNewConnectionsForm = this.formBuilder.group({
      sourceInstance: [null, Validators.required],
      sourceInterface: [null, Validators.required],
      targetInstance: [null, Validators.required],
      targetInterface: [null, Validators.required],
    });
    this.sourceInstanceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Source Instance',
      limitTo: 4,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.sourceInterfaceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Source Interface',
      limitTo: 4,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.targetInstanceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Target Instance',
      limitTo: 4,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.targetInterfaceConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Target Interface',
      limitTo: 4,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.addNewConnectionsForm.controls; }

  /**
   * Requests to add new connections
   * @param f Form with the connections input data
   */
  addNewConnections(f) {
    this.submitted = true;
    this.loading = true;
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

