import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.scss']
})
export class EditClusterComponent implements OnInit {
   /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Text for the save button
   */
  buttonSave: string;
  /**
   * Models that hold cluster name, cluster description and cluster tags
   */
  clusterId: string;
  clusterName: string;
  clusterDescription: string;
  clusterTags: string;

  constructor(
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
      this.clusterDescription = 'Loading...'; // Default initialization
      this.clusterTags = 'Loading...'; // Default initialization
      this.clusterId = 'Loading ...'; // Default initialization
      this.buttonSave = 'Save';
  }

  ngOnInit() {
  }

  saveClusterChanges() {
    if (this.clusterId !== null) {
      this.backend.saveClusterChanges(this.clusterId, {
        newClusterName: this.clusterName,
        newClusterDescription: this.clusterDescription,
        newClusterTags: this.clusterTags
      })
        .subscribe(response => {
          this.notificationsService.add({
            message: 'The cluster ' + this.clusterName + ' has been edited'
          });
          this.bsModalRef.hide();
        });
    }
  }
}
