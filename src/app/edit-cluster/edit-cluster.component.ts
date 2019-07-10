import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.scss']
})
export class EditClusterComponent implements OnInit {

  /**
   * Models that holds forms info
   */
  editClusterForm: FormGroup;
  submitted = false;
  loading: boolean;

  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id, cluster id, name
   */
  organizationId: string;
  clusterId: string;
  clusterName: string;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.clusterEditMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.clusterName = 'Loading...'; // Default initialization
  }

  ngOnInit() {
    this.editClusterForm = this.formBuilder.group({
      clusterName: ['',  [Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9-]+$')]],
    });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.editClusterForm.controls; }

  /**
   * Request to save the cluster data modifications
   * @param f Form object reference
   */
  saveClusterChanges(f) {
    this.submitted = true;
    if (this.organizationId !== null && this.clusterId !== null && !f.clusterName.errors ) {
      this.loading = true;
      this.backend.saveClusterChanges(this.organizationId, this.clusterId, {
        name: f.clusterName.value,
      })
        .subscribe(response => {
          this.clusterName = f.clusterName.value;
          this.loading = false;
          this.notificationsService.add({
            message: 'The cluster ' + this.clusterName + ' has been edited',
            timeout: 3000
          });
          this.bsModalRef.hide();
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
