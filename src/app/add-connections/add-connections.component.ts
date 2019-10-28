import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationsService } from '../applications/applications.service';
import { NotificationsService } from '../services/notifications.service';

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
    private notificationsService: NotificationsService,
    private translateService: TranslateService
    ) {
      const mock = localStorage.getItem(LocalStorageKeys.addConnectionsMock) || null;
      // check which backend is required (fake or real)
      if (mock && mock === 'true') {
        this.backend = this.mockupBackendService;
      } else {
        this.backend = this.backendService;
      }
      // Init inbounds and outbounds arrays
      this.inbounds = [];
      this.outbounds = [];
    }

  ngOnInit() {
    // Build form
    this.addNewConnectionsForm = this.formBuilder.group({
      sourceInstance: [null, Validators.required],
      sourceInterface: [null, Validators.required],
      targetInstance: [null, Validators.required],
      targetInterface: [null, Validators.required],
    });
    // Get Organization identifier
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        // Get outbounds
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
        // Get inbounds
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
    // Init source and target interface options
    this.sourceInterfaceOptions = [];
    this.targetInterfaceOptions = [];

    // Init configs
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
    // Check if form fields are fulfilled
    if (this.f.sourceInstance.value &&
      this.f.sourceInterface.value &&
      this.f.targetInstance.value &&
      this.f.targetInterface.value) {
        // Build the connection request Object
        const connectionRequest = {
          organization_id: this.organizationId,
          source_instance_id: this.f.sourceInstance.value.instanceId,
          target_instance_id: this.f.targetInstance.value.instanceId,
          outbound_name: this.f.sourceInterface.value,
          inbound_name: this.f.targetInterface.value
        };
        // Request to add a connection
        this.backend.addConnection(this.organizationId, connectionRequest).subscribe(result => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.manageConnections.createdConnection')
          });
          this.bsModalRef.hide();
          this.applicationsService.showManageConnections.next(true);
        });
    } else {
      alert(this.translateService.instant('apps.manageConnections.requiredFields'));
    }
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
    if (f.sourceInstance.value.outbounds) {
      this.sourceInterfaceOptions = f.sourceInstance.value.outbounds;
    }
  }

  /**
   * Modify the target interface options on target selection change
   * @param f Form
   */
  targetSelectionChange(f) {
    if (f.targetInstance.value.inbounds) {
      this.targetInterfaceOptions = f.targetInstance.value.inbounds;
    }
  }

}
