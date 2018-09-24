import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';

import { LocalStorageKeys } from '../definitions/local-storage-keys';
import { Backend } from '../definitions/backend';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  /**
   * Alerts list
   */
  public alerts: AlertModule = [];
  /**
   * Backend handler (mocked up or real backend)
   */
  public backend: Backend;
  /**
   * Holds recursive timeout reference
   */
  timeout: any;

  constructor(
    private mockupBackendService: MockupBackendService,
    private backendService: BackendService,
    private errorHandlerService: ErrorHandlerService
  ) {

    const alertsMock = localStorage.getItem(LocalStorageKeys.notificationsMock);
    if (alertsMock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
  }

  ngOnInit() {

  }
  ngOnDestroy(): void {
    clearInterval(this.timeout);
  }


  openNotification() {

  }

}
