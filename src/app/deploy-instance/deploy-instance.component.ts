import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import {FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-deploy-instance',
  templateUrl: './deploy-instance.component.html',
  styleUrls: ['./deploy-instance.component.scss']
})
export class DeployInstanceComponent implements OnInit {

  /**
   * Models that holds forms info
   */
  deployInstanceForm: FormGroup;
  submitted = false;
  loading: boolean;
  loadedData: boolean;

  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold organization ID
   */
  organizationId: string;

  /**
   * Model that hold app registered ID and its name
   */
  registeredId: string;
  registeredName: string;
  openFromRegistered: boolean;
  registeredApp: any;
  registeredApps: any[];
  instanceName: string;
  selectedApp: any;
  appFromRegistered: any;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  defaultAutofocus: string;

  defaultParamsOpened: boolean;
  advParamsOpened: boolean;
  availableParamsCategory = { basic: false, advanced: false};
  params: FormArray;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  selectedOptions = [];
  options = [];
  selectConfig = {};

  /**
   * Model that holds onclose method
   */
  onClose: any;
  /**
   * Options to show/hide navigation buttons
   */
  showBack: boolean;
  showNext: boolean;
  showDeploy: boolean;
  targetInstanceConfig: {};
  instancesNames: string[];
  targetInterfaceConfig: {};
  targetInterfaceOptions: {}[];
  /**
   * Options to active dots
   */
  basicInformationDot: boolean;
  parametersDot: boolean;
  connectionsDot: boolean;

  conditionExpression: string;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {

    const mock = localStorage.getItem(LocalStorageKeys.deployInstanceMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }

    // Default initialization
    this.loadedData = false;
    this.openFromRegistered = false;
    this.registeredApps = [];
    this.selectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'Registered name',
      limitTo: this.registeredApps.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    if (!this.registeredName) {
      this.registeredName = 'Descriptor not found';
    }
    this.availableParamsCategory = {
      basic: false,
      advanced: false
    };
    this.showBack = false;
    this.showNext = true;
    this.showDeploy = false;
    this.basicInformationDot = true;
    this.parametersDot = false;
    this.connectionsDot = false;
    this.conditionExpression = 'basic';
  }

  ngOnInit() {
    console.log('ON INIT ::: SELECTED APP ::: ', this.selectedApp);
    this.deployInstanceForm = this.formBuilder.group({
      registeredName: [{value: '', disabled: true}],
      selectDrop: [null, Validators.required],
      instanceName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      params: this.formBuilder.array([ ])
    });

    this.backend.getRegisteredApps(this.organizationId)
    .subscribe(response => {
        this.registeredApps = response.descriptors || [];
        this.loadedData = true;
    });

    if (this.openFromRegistered && this.appFromRegistered) {
      this.selectedApp = this.appFromRegistered;
      this.registeredName = this.selectedApp.name;
      this.availableParamsCategory.basic = false;
      this.availableParamsCategory.advanced = false;
      this.params = this.deployInstanceForm.get('params') as FormArray;
      if (this.selectedApp.parameters) {
        this.defaultParamsOpened = true;
        this.selectedApp.parameters.forEach(param => {
          param.value = param.default_value;
        });
        this.selectedApp.parameters.forEach(param => {
          this.params.push(this.formBuilder.group(
            [param]
          ));
          if (!param.category) {
            this.availableParamsCategory.basic = true;
          } else {
            this.availableParamsCategory.advanced = true;
          }
        });
      }
    }
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.deployInstanceForm.controls; }

  deployInstance(f) {
    this.instanceName = f.instanceName.value;
    this.submitted = true;
    if (!f.instanceName.errors) {
      if (!this.registeredId) {
        this.registeredId = f.selectDrop.value.app_descriptor_id;
      }
      this.loading = true;
      if (!this.selectedApp.parameters) {
        this.backend.deploy(this.organizationId, this.registeredId, this.instanceName)
          .subscribe(deployResponse => {
            this.loading = false;
            this.onClose(false);
            this.bsModalRef.hide();
            this.notificationsService.add({
              message: 'Deploying instance of ' + this.registeredName,
              timeout: 3000
            });
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: error.error.message,
              timeout: 5000,
              type: 'warning'
            });
            this.onClose(true);
            this.bsModalRef.hide();
          });
      } else {
        const instanceParams = [];
        f.params.value.forEach(param => {
         instanceParams.push({
           parameterName: param[0].name,
           value: param[0].value
          });
        });
        this.backend.deploy(this.organizationId, this.registeredId, this.instanceName, instanceParams)
          .subscribe(deployResponse => {
            this.loading = false;
            this.onClose(false);
            this.bsModalRef.hide();
            this.notificationsService.add({
              message: 'Deploying instance of ' + this.registeredName,
              timeout: 3000
            });
          }, error => {
            this.loading = false;
            this.notificationsService.add({
              message: error.error.message,
              timeout: 5000,
              type: 'warning'
            });
            this.onClose(true);
            this.bsModalRef.hide();
          });
      }
    }
  }

  /**
   * Handler for change event on ngx-select-dropdown
   * @param f Form
   */
  onRegisteredChange(f) {
    this.selectedApp = f.selectDrop.value;
    this.registeredName = this.selectedApp.name;
    this.availableParamsCategory.basic = false;
    this.availableParamsCategory.advanced = false;
    this.params = this.deployInstanceForm.get('params') as FormArray;

    if (this.selectedApp.parameters) {
      this.defaultParamsOpened = true;
      this.selectedApp.parameters.forEach(param => {
        param.value = param.default_value;
      });
      this.selectedApp.parameters.forEach(param => {
        this.params.push(this.formBuilder.group(
          [param]
        ));
        if (!param.category) {
          this.availableParamsCategory.basic = true;
        } else {
          this.availableParamsCategory.advanced = true;
        }
      });
    }
  }

  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm('Discard changes?');
      if (discard) {
        this.onClose(true);
        this.bsModalRef.hide();
      } else {
        // Do nothing
      }
    } else {
      this.onClose(true);
      this.bsModalRef.hide();
    }
  }
  /**
   * Toggle advanced parameters
   */
  toggleAdvancedParameters() {
    this.defaultParamsOpened = false;
    this.advParamsOpened = !this.advParamsOpened;
  }

  /**
   * Toggle default parameters
   */
  toggleDefaultParameters () {
    this.advParamsOpened = false;
    this.defaultParamsOpened = !this.defaultParamsOpened;
  }

  previousStep() {
    switch (this.conditionExpression) {
      case 'basic':
        this.registeredApps = [...this.registeredApps];
        break;
      case 'parameters':
        this.conditionExpression = 'basic';
        this.parametersDot = false;
        this.basicInformationDot = true;
        break;
      case 'connections':
        console.log('CONÉCTAME OTRA VEZ');
        if (this.selectedApp.parameters) {
          this.conditionExpression = 'parameters';
          this.parametersDot = true;
          this.connectionsDot = false;
        } else {
          console.log('HOLAAA');
          this.conditionExpression = 'basic';
          this.basicInformationDot = true;
          this.connectionsDot = false;
        }
        break;
    }
  }

  nextStep() {
    console.log('SELECTED APP ', this.selectedApp);
    switch (this.conditionExpression) {
      case 'basic':
        this.basicInformationDot = false;
        if (this.selectedApp.parameters) {
          this.conditionExpression = 'parameters';
          this.parametersDot = true;
        } else {
          this.conditionExpression = 'connections';
          this.connectionsDot = true;
        }
        this.showBack = true;
        break;
      case 'parameters':
        this.conditionExpression = 'connections';
        this.parametersDot = false;
        this.connectionsDot = true;
        break;
    }
  }

  targetInstanceSelectionChange(f: { [p: string]: AbstractControl }) {

  }

  targetInterfaceSelectionChange(f: { [p: string]: AbstractControl }) {

  }
}
