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
  /**
   * It models necessary options for params step
   */
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
  requiredConnections: any[];
  areRequiredConnections: boolean;
  instances: any[];
  instancesNames: string[];
  targetInstance: FormControl;
  targetInterface: FormControl;
  connections: {}[];
  required: boolean;
  targetInterfaceConfig: any;
  targetInstanceConfig: any;

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
    this.targetInterfaceConfig = {};
    this.targetInstanceConfig = {};
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
    this.instancesNames = [];
    this.instances = [];
    this.connections = [];
    this.areRequiredConnections = false;
    this.requiredConnections = [];
  }

  ngOnInit() {
    this.deployInstanceForm = this.formBuilder.group({
      registeredName: [{value: '', disabled: true}],
      instanceName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      params: this.formBuilder.array([ ])
    });
    this.deployInstanceForm.addControl('selectDrop', this.selectDrop);
    this.deployInstanceForm.addControl('targetInstance', this.targetInstance);
    this.deployInstanceForm.addControl('targetInterface', this.targetInterface);
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
          this.params.push(this.formBuilder.group([param]));
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
  /**
   * It deploys an instance using data from the form
   * @param f Form
   */
  deployInstance(f) {
    this.instanceName = f.instanceName.value;
    this.submitted = true;
    if (!f.instanceName.errors) {
      if (!this.registeredId) {
        this.registeredId = f.selectDrop.value.app_descriptor_id;
      }
      const instanceParams = [];
      if (!this.selectedApp.parameters) {
        f.params.value.forEach(param => {
          instanceParams.push({
            parameterName: param[0].name,
            value: param[0].value
          });
        });
      }
      this.backend.deploy(this.organizationId, this.registeredId, this.instanceName, instanceParams, this.connections)
        .subscribe(() => {
          this.onClose(false);
          this.bsModalRef.hide();
          this.notificationsService.add({
            message: `Deploying instance of ${this.registeredName}`
          });
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
          this.onClose(true);
          this.bsModalRef.hide();
        });
      }
    }
  /**
   * Handler for change event on ngx-select-dropdown
   * @param f Form
   */
  onRegisteredChange(f) {
    this.selectedApp = f.selectDrop.value;
    this.setConnectionsAndInstances();
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
        this.params.push(this.formBuilder.group([param]));
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
  /**
   * Handler for go to the previous step
   */
  previousStep() {
    switch (this.conditionExpression) {
      case 'basic':
        this.setBasicState();
        break;
      case 'parameters':
        this.conditionExpression = 'basic';
        this.parametersDot = false;
        this.basicInformationDot = true;
        this.setBasicState();
        break;
      case 'connections':
        if (this.selectedApp.parameters) {
          this.conditionExpression = 'parameters';
          this.parametersDot = true;
          this.connectionsDot = false;
          this.showDeploy = false;
          this.showNext = true;
        } else {
          this.conditionExpression = 'basic';
          this.showBack = false;
          this.setBasicState();
        }
        break;
    }
  }
  /**
   * Handler for go to the next step
   */
  nextStep() {
    this.setConnectionsAndInstances();
    switch (this.conditionExpression) {
      case 'basic':
        if (this.selectedApp.parameters) {
          this.conditionExpression = 'parameters';
          this.parametersDot = true;
          this.basicInformationDot = false;
          if (!this.areRequiredConnections) {
            this.showDeploy = true;
            this.showNext = false;
          }
        } else {
            if (this.areRequiredConnections) {
              this.conditionExpression = 'connections';
              this.basicInformationDot = false;
              this.connectionsDot = true;
              this.showNext = false;
              this.showDeploy = true;
            } else {
              this.showDeploy = true;
              this.showNext = false;
            }
        }
        this.showBack = true;
        break;
      case 'parameters':
        this.parametersDot = false;
        this.connectionsDot = true;
        this.showDeploy = true;
        this.showNext = false;
        if (this.instances.length > 0 && this.areRequiredConnections) {
          this.conditionExpression = 'connections';
        }
        break;
    }
  }
  /**
   * Handler for get data to interface config select
   * @param f Form
   */
  targetInstanceSelectionChange(f) {
    if (f.targetInstance.value) {
      this.targetInterfaceOptions =
          this.instances.filter(inst => inst.name === f.targetInstance.value)[0].inbound_net_interfaces.map(item => item.name);
      this.targetInterfaceConfig = {
        displayKey: 'name',
        search: false,
        height: 'auto',
        placeholder: 'Select any interface name',
        limitTo: this.targetInterfaceOptions.length,
        moreText: 'more',
        noResultsFound: 'No results found!'
      };
    }
  }
  /**
   * Handler for capture data from interface config select
   * @param f Form
   * @param i Index to capture the correct required connection
   */
  targetInterfaceSelectionChange(f, i: number) {
    if (f.targetInterface.value) {
      this.connections.push(
        {target_instance_id: this.instances.filter(inst => inst.name === f.targetInstance.value)[0].app_instance_id,
        target_inbound_name: f.targetInterface.value,
        source_outbound_name: this.requiredConnections[i].name}
      );
    }
  }
  /**
   * Handler for set the disabled state to the button next
   * @param f Form
   */
  isInactiveNext(f) {
    let isInactiveNext = false;
    if (this.conditionExpression === 'basic') {
      isInactiveNext = !this.selectedApp || this.selectedApp.id === -1 || !f.instanceName.value;
    } else if (this.conditionExpression === 'parameters') {
      this.selectedApp.parameters.map(param => {
        if (!param.category) {
          isInactiveNext = (isInactiveNext || (param.value === param.default_value));
        }
      });
    }
    return isInactiveNext;
  }
  /**
   * Handler for set the disabled state to the button deploy
   * @param f Form
   */
  isInactiveDeploy(f) {
    let isInactiveDeploy = false;
    switch (this.conditionExpression) {
      case 'basic':
        isInactiveDeploy = !this.selectedApp || !f.instanceName.value;
        break;
      case 'parameters':
        this.selectedApp.parameters.map(param => {
          if (!param.category) {
            isInactiveDeploy = (isInactiveDeploy || (param.value === param.default_value));
          }
        });
        break;
      case 'connections':
        isInactiveDeploy = this.connections.length === 0 || this.connections.length < this.requiredConnections.length;
        break;
    }
    return isInactiveDeploy;
  }
  /**
   * Handler for generate required connections, instances names and init the config for target instance
   */
  private setConnectionsAndInstances() {
    if (this.selectedApp && this.selectedApp.outbound_net_interfaces) {
      this.requiredConnections = this.selectedApp.outbound_net_interfaces.filter(item => item.required);
      this.areRequiredConnections = this.requiredConnections.length > 0;
    } else {
      this.requiredConnections = [];
      this.areRequiredConnections = false;
    }
    if (this.instances && this.instances.length > 0) {
      this.instancesNames = this.instances.filter(instance => instance.inbound_net_interfaces).map(inst => inst.name);
      this.targetInstanceConfig = {
        displayKey: 'name',
        search: false,
        height: 'auto',
        placeholder: 'Select any instance name',
        limitTo: this.instancesNames.length,
        moreText: 'more',
        noResultsFound: 'No results found!'
      };
    }
  }
  /**
   * Handler for reset the form to the basic state
   */
  private setBasicState() {
    this.reload = false;
    this.ngOnInit();
    this.connectionsDot = false;
    this.basicInformationDot = true;
    this.reload = true;
    this.showBack = false;
    this.showDeploy = false;
    this.showNext = true;
    this.deployInstanceForm.controls.selectDrop.setValue({id: -1, name: 'Select any registered name'});
    if (!(this.openFromRegistered && this.appFromRegistered)) {
      this.selectedApp = null;
    }
  }
}
