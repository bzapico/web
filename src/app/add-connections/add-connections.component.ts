import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationsService } from '../applications/applications.service';

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

  /**
   * Model that hold add connections and its info
   */
  organizationId: string;
  inbounds: any[];
  outbounds: any[];

  sourceInstance: FormControl;
  sourceInterface: FormControl;
  targetInstance: FormControl;
  targetInterface: FormControl;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
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
    private applicationsService: ApplicationsService,
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
      this.inbounds = [];
      this.outbounds = [];
    }

  ngOnInit() {
    this.addNewConnectionsForm = this.formBuilder.group({
      sourceInstance: [null, Validators.required],
      sourceInterface: [null, Validators.required],
      targetInstance: [null, Validators.required],
      targetInterface: [null, Validators.required],
    });

    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        this.backend.getListAvailableInstanceOutbounds(this.organizationId)
          .subscribe(response => {
            if (response.instance_outbounds) {
              response.instance_outbounds.forEach(outbound => {
                const index = this.outbounds.map(x => x.instanceId).indexOf(outbound.app_instance_id);
                if (index === -1) {
                  const instance = {
                    instanceId: outbound.app_instance_id,
                    instanceName: outbound.instance_name,
                    outbounds: []
                  };
                  instance.outbounds.push(outbound.outbound_name);
                  this.outbounds.push(instance);
                } else {
                  this.outbounds[index].outbounds.push(outbound.outbound_name);
                }
              });
            }
            this.sourceInstanceOptions =  this.outbounds;
          });
        this.backend.getListAvailableInstanceInbounds(this.organizationId)
          .subscribe(response => {
            if (response.instance_inbounds) {
              response.instance_inbounds.forEach(inbound => {
                const index = this.inbounds.map(x => x.instanceId).indexOf(inbound.app_instance_id);
                if (index === -1) {
                  const instance = {
                    instanceId: inbound.app_instance_id,
                    instanceName: inbound.instance_name,
                    inbounds: []
                  };
                  instance.inbounds.push(inbound.inbound_name);
                  this.inbounds.push(instance);
                } else {
                  this.inbounds[index].outbounds.push(inbound.inbound_name);
                }
              });
            }
            this.targetInstanceOptions = this.inbounds;
          });
      }
    }
    this.sourceInterfaceOptions = [];
    this.targetInterfaceOptions = [];

    this.sourceInstanceConfig = {
      displayKey: 'instanceName',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('apps.manageConnections.sourceInstance'),
      limitTo: this.outbounds.length,
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.sourceInterfaceConfig = {
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('apps.manageConnections.sourceInterface'),
      limitTo: this.sourceInterfaceOptions.length,
      moreText: 'more',
      noResultsFound: this.translateService.instant('apps.addConnection.noResults')
    };
    this.targetInstanceConfig = {
      displayKey: 'instanceName',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('apps.manageConnections.targetInstance'),
      limitTo: this.inbounds.length,
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

  /**
   * Requests to add new connections
   */
  addNewConnections() {
    this.bsModalRef.hide();
    this.applicationsService.showManageConnections.next(true);
  }

    /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

  /**
   * Modify the source interface options on source selection change
   * @param f Form
   */
  sourceSelectionChange(f) {
    this.sourceInterfaceOptions = f.sourceInstance.value.inbounds;
    console.log(this.sourceInterfaceOptions);
  }

  /**
   * Modify the target interface options on target selection change
   * @param f Form
   */
  targetSelectionChange(f) {
    this.targetInterfaceOptions = f.targetInstance.value.inbounds;
    console.log(this.targetInterfaceOptions);
  }

}

