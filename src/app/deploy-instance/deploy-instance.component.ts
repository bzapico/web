import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

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
  selectDrop: FormControl;
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
  targetInterfaceOptions: {}[];
  conditionExpression: string;
  reload: boolean;
  /**
   * Options to active dots
   */
  basicInformationDot: boolean;
  parametersDot: boolean;
  connectionsDot: boolean;

  /**
   * Configuration for connections step
   */
  requiredConnections: {}[];
  areRequiredConnections: boolean;
  instances: any[];
  instancesNames: string[];
  targetInstance: FormControl;
  targetInterface: FormControl;
  connections: {}[];
  required: boolean;

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
      placeholder: 'Select any registered name',
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
    this.reload = true;
    this.selectDrop = new FormControl(null, Validators.required);
    this.targetInstance = new FormControl(null, Validators.required);
    this.targetInterface = new FormControl(null, Validators.required);
    // this.connectionsListControl = new FormControl();
    this.instancesNames = [];
    this.instances = [];
    this.connections = [];
  }

  ngOnInit() {
    console.log('ON INIT ::: SELECTED APP ::: ', this.selectedApp);
    this.deployInstanceForm = this.formBuilder.group({
      registeredName: [{value: '', disabled: true}],
      instanceName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      params: this.formBuilder.array([ ])
    });
    this.deployInstanceForm.addControl('selectDrop', this.selectDrop);
    this.deployInstanceForm.addControl('targetInstance', this.targetInstance);
    this.deployInstanceForm.addControl('targetInterface', this.targetInterface);
    // this.deployInstanceForm.addControl('connectionsListControl', this.connectionsListControl);
    this.backend.getRegisteredApps(this.organizationId)
    .subscribe(response => {
        this.registeredApps = response.descriptors || [];
        this.registeredApps.unshift({id: -1, name: 'Select any registered name'});
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
    console.log('MIRACLE ::: ', this.selectedApp.outbound_net_interfaces);
    this.instanceName = f.instanceName.value;
    this.submitted = true;
    if (!f.instanceName.errors) {
      if (!this.registeredId) {
        this.registeredId = f.selectDrop.value.app_descriptor_id;
      }
      this.loading = true;
      if (!this.selectedApp.parameters) {
        this.backend.deploy(this.organizationId, this.registeredId, this.instanceName, null, this.connections)
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
        this.backend.deploy(this.organizationId, this.registeredId, this.instanceName, instanceParams, this.connections)
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
    } else if (!this.selectedApp.parameters && !this.selectedApp.outbound_net_interfaces) {
      this.showBack = true;
      this.showNext = false;
      this.showDeploy = true;
      this.basicInformationDot = false;
      this.connectionsDot = true;
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
    console.log('PREVIOUS STEP ::: REG APPS ::: ', this.registeredApps);
    switch (this.conditionExpression) {
      case 'basic':
        this.reload = false;
        this.ngOnInit();
        this.connectionsDot = false;
        this.basicInformationDot = true;
        this.reload = true;
        this.showBack = false;
        this.showDeploy = false;
        this.showNext = true;
        this.deployInstanceForm.controls.selectDrop.setValue({id: -1, name: 'Select any registered name'});
        break;
      case 'parameters':
        this.conditionExpression = 'basic';
        this.parametersDot = false;
        this.basicInformationDot = true;
        this.showBack = false;
        if (!this.selectedApp.outbound_net_interfaces) {
          this.showNext = false;
          this.showDeploy = true;
        }
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
          if (!this.selectedApp.outbound_net_interfaces) {
            this.connectionsDot = true;
            this.showDeploy = true;
            this.showNext = false;
          } else {
            this.parametersDot = true;
          }
        } else {
          this.setConnectionsAndInstances();
          this.conditionExpression = 'connections';
          this.connectionsDot = true;
        }
        this.showBack = true;
        break;
      case 'parameters':
        this.setConnectionsAndInstances();
        console.log('CON INSTANCES ', this.instances);
        this.parametersDot = false;
        this.connectionsDot = true;
        this.showDeploy = true;
        this.showNext = false;
        if (this.instances.length > 0) {
          this.conditionExpression = 'connections';
        }
        break;
    }
  }

  targetInstanceSelectionChange(f, i: number) {
    console.log('fff ', f.targetInstance.value, i);
    // this.targetInstance = this.deployInstanceForm.get('targetInstance') as FormArray;
    console.log('TARGET INSTANCE ', this.targetInstance);
    if (f.targetInstance.value) {
      this.targetInterfaceOptions =
          this.instances.filter(inst => inst.name === f.targetInstance.value)[0].inbound_net_interfaces.map(item => item.name);
    }
  }

  targetInterfaceSelectionChange(f, i: number) {
    console.log('TARGET INTERFACE SELECTION CHANGE :: ', f.targetInterface.value, i);
    // this.targetInterface = this.deployInstanceForm.get('targetInterface') as FormArray;
    // console.log('TARGET INTERFACE ', this.targetInterface);
    if (f.targetInterface.value) {
      this.connections.push(
        {target_instance_id: this.instances.filter(inst => inst.name === f.targetInstance.value)[0].app_instance_id,
         target_inbound_name: f.targetInterface.value,
         source_outbound_name: this.selectedApp.outbound_net_interfaces[0].name}
      );
    }
  }

  private setConnectionsAndInstances() {
    if (this.selectedApp && this.selectedApp.outbound_net_interfaces) {
      this.areRequiredConnections = this.selectedApp.outbound_net_interfaces.filter(item => item.required).length > 0;
      this.requiredConnections = this.selectedApp.outbound_net_interfaces.filter(item => item.required);
    }
    if (this.instances && this.instances.length > 0) {
      this.instancesNames = this.instances.filter(instance => instance.inbound_net_interfaces).map(inst => inst.name);
    }
  }
}
