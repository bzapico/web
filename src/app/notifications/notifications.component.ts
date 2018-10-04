import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';

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
   * Notifications have dismiss option.
   */
  dismissible = true;
  /**
   * Dynamic HTML in notifications
   */
  defaultNotifications: any[] = [
    {
      type: 'success',
      message: `<strong>Well done!</strong> You successfully read this important alert message.`
    },
    {
      type: 'info',
      message: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      message: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    }
  ];

  constructor(
    private mockupBackendService: MockupBackendService,
    private backendService: BackendService,
    private notificationsService: NotificationsService
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
   * Notifications have dismiss option. Enabling it will show close button to the right of the alert.
   */
  reset(): void {
    this.alerts = this.defaultNotifications;
  }
  onClosed(dismissedNotifications: any): void {
    this.notificationsService.onClosed(dismissedNotifications);
  }

}
