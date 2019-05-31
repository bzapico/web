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
   * Models that holds forms info
   */
  installAgentForm: FormGroup;

  organizationId: string;
  edgeControllerId: string;
  agentType: FormControl;
  sshCredentials: string;
  targetHost: FormControl;
  architecture: FormControl;
  type: FormControl;
  submitted = false;
  loading: boolean;

//  const InstallAgentRequest: any {
//   'edgeControllerId': 'ss',
//   ' agentType': '',
//   ' sshCredentials': 'string;',
//   ' targetHost': 's'
//   }


  /**
   * Backend reference
   */
  backend: Backend;

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
  edgeControllerIdOptions: any[];
  edgeControllerIdSelectConfig = {};

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    //  Agent type
    this.agentType = null;
    this.agentTypeSelectConfig = {
      displayKey: 'agentType',
      search: false,
      height: 'auto',
      placeholder: 'Agent type',
      limitTo: 3,
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
    this.edgeControllerIdSelectConfig = {
      displayKey: 'edgeControllerId',
      search: false,
      height: 'auto',
      placeholder: 'Edge Inventory Controller',
      limitTo: 3,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.edgeControllerIdOptions = [
      'edge65',
      'edge66',
    ];


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
      sshUsername: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      sshPassword: ['', [Validators.required, Validators.minLength(6)]],
      target: [null, Validators.required],
      type: [null, Validators.required],
      ec: [null, Validators.required],
    });
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
