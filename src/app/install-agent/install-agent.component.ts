import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-install-agent',
  templateUrl: './install-agent.component.html',
  styleUrls: ['./install-agent.component.scss']
})
export class InstallAgentComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that holds forms info
   */
  installAgentForm: FormGroup;
  submitted = false;
  loading: boolean;

  /**
   * Model that hold Edge Controller ID and its info
   */
  organizationId: string;
  edgeControllerId: string;
  agentType: FormControl;
  sshCredentials: string;
  targetHost: FormControl;
  architecture: FormControl;
  type: FormControl;
  controllersList: any[];
  openFromEc: boolean;

  /**
   * Models that hold all inventory list
   */
  inventory: any[];

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  options = [];
  selectConfig = {};

  agentTypeOptions: any[];
  agentTypeSelectConfig = {};
  architectureOptions: any[];
  architectureSelectConfig = {};
  edgeControllerOptions: any[];
  edgeControllerSelectConfig = {};

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {

    //  Agent type
    this.openFromEc = false;
    this.agentType = null;
    this.agentTypeSelectConfig = {
      search: false,
      height: 'auto',
      placeholder: 'Agent type',
      limitTo: 4,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.agentTypeOptions = [
     'LINUX_X86',
     'LINUX-ARM32',
     'LINUX-ARM64',
     'WINDOWS'
    ];

    //  edgeControllerId
    this.edgeControllerId = null;

    const mock = localStorage.getItem(LocalStorageKeys.installAgentMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
  }

  ngOnInit() {
    this.installAgentForm = this.formBuilder.group({
      type: [null, Validators.required],
      ec: [null, Validators.required],
      sshUsername: ['', Validators.required],
      sshPassword: ['', Validators.required],
      target: [null, Validators.required],
    });

    this.controllersList = this.getControllersList();
    console.log(this.controllersList.length);

console.log('tomate ', this.inventory.length);
    this.edgeControllerSelectConfig = {
      displayKey: 'ec_name',
      search: false,
      height: 'auto',
      placeholder: 'Edge Inventory Controller',
      limitTo: this.controllersList.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
  }

  /**
   * Gets the controllers list
   */
  getControllersList() {
    const controllersList = [];

    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].type === 'EC') {
        controllersList.push(this.inventory[i]);
      }
    }
    return controllersList;
  }

  /**
   * Custom validator for checking the passwords,
   * @param group passwords group
   */
  samePasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordConfirm = group.controls.passwordConfirm.value;
    return password === passwordConfirm ? true : false;
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.installAgentForm.controls; }

  /**
   * Requests to install agent
   * @param f Form with the agent input data
   */
  installAgent(f) {
    this.submitted = true;
    const agent = {
      agent_type: f.type.value,
      edge_controller_id: f.ec.value.edge_controller_id,
      username: f.sshUsername.value,
      password: f.sshPassword.value,
      target_host: f.target.value
    };

    if (f.type.invalid === true ||
      f.ec.invalid === true ||
      f.sshUsername.invalid === true ||
      f.sshPassword.invalid === true ||
      f.target.value === true
      ) {
        return;
      }
    if (!this.edgeControllerId) {
      this.edgeControllerId = f.ec.value.edge_controller_id;
    }
    this.loading = true;
    this.backend.installAgent(this.organizationId, this.edgeControllerId, agent)
      .subscribe(response => {
        this.loading = false;
        this.notificationsService.add({
          message: 'Installing agent on ' + agent.target_host + ' target host',
          timeout: 3000
        });
        this.bsModalRef.hide();
      }, error => {
        this.loading = false;
        this.notificationsService.add({
          message: 'ERROR: ' + error.error.message,
          timeout: 5000,
          type: 'warning'
        });
      });
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
}
