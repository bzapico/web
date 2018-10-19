import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.scss']
})
export class EditClusterComponent implements OnInit {
   /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Dialog title
   */
  title: string;
  /**
   * Text for the save button
   */
  buttonSave: string;
  /**
   * Models that hold cluster name, cluster description and cluster tags
   */
  clusterName: string;
  clusterDescription: string;
  clusterTags: string;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.userInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
      this.title = 'Edit Cluster 1';
      this.clusterName = 'Loading...'; // Default initialization
      this.clusterDescription = 'Loading...'; // Default initialization
      this.clusterTags = 'Loading...'; // Default initialization
      this.buttonSave = 'Save';
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      const jwtJson = JSON.parse(jwtData);
      this.clusterName = jwtJson.clusterName;
      this.clusterDescription = jwtJson.clusterDescription;
      this.clusterTags = jwtJson.clusterTags;
      if (this.clusterName !== null) {
        this.backend.getUserProfileInfo(this.clusterName)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.clusterDescription = data.description;
              this.clusterName = data.name;
              this.clusterTags = data.tags;
            }
          });
      }
    }
  }

  saveClusterChanges() {

  }

}
