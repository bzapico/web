import { Component, OnInit, Input  } from '@angular/core';
import { LocalStorageKeys } from '../definitions/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { Backend } from '../definitions/backend';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {


  // tslint:disable-next-line:no-input-rename
  @Input('notifications') alerts: any[];

  /**
   * Backend handler (mocked up or real backend)
   */
  public backend: Backend;
  /**
   * Alerts have dismiss option.
   */
  dismissible = true;
  /**
   * Dynamic HTML in alerts
   */
  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `<strong>Well done!</strong> You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    }
  ];

  constructor(
    private mockupBackendService: MockupBackendService,
    private backendService: BackendService
    ) {
    this.alerts = [];
    const notificationsMock = localStorage.getItem(LocalStorageKeys.notificationsMock);
    if (notificationsMock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
  }

  ngOnInit() {
  }

  /**
   * Alerts have dismiss option. Enabling it will show close button to the right of the alert.
   */
  reset(): void {
    this.alerts = this.defaultAlerts;
  }

  onClosed(dismissedAlert: any): void {
  console.log(dismissedAlert);
  }


}
