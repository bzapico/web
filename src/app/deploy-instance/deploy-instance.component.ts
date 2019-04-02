import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  defaultAutofocus: string;
  /**
   * NGX-select-dropdown
   */
  tab = 1;
  selectedOptions = [];
  options = [];
  selectConfig = {};

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
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
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
      this.registeredName = 'Select any registered app';
    }
  }

  ngOnInit() {
    this.deployInstanceForm = this.formBuilder.group({
      registeredName: [{value: '', disabled: true}],
      selectDrop: [null, Validators.required],
      instanceName: ['', [Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
    });

    this.backend.getRegisteredApps(this.organizationId)
    .subscribe(response => {
        this.registeredApps = response.descriptors || [];
    });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.deployInstanceForm.controls; }

  deployInstance(f) {
    this.instanceName = f.instanceName.value;
    this.submitted = true;
    if (!f.instanceName.errors) {
      this.loading = true;
      this.backend.deploy(this.organizationId, this.registeredId, this.instanceName)
        .subscribe(deployResponse => {
          this.loading = false;
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
          this.bsModalRef.hide();
        });
    }
  }

  selectRegistered(app) {
    this.registeredApp = app;
    this.registeredId = app.app_descriptor_id;
    this.registeredName = app.name;
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
