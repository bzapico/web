import { Component, Input } from '@angular/core';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { Notification } from '../definitions/interfaces/notification';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  @Input() notifications: Notification[];
  /**
   * Backend handler (mocked up or real backend)
   */
  public backend: Backend;
  /**
   * Notifications have dismiss option.
   */
  dismissible = true;

  constructor(
    private mockupBackendService: MockupBackendService,
    private backendService: BackendService,
    private notificationsService: NotificationsService
    ) {
    this.notifications = [];
    const notificationsMock = localStorage.getItem(LocalStorageKeys.notificationsMock);
    if (notificationsMock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
  }
  /**
   * Notifications have dismiss option. Enabling it will show close button to the right of the alert.
   */
  onClosed(dismissedNotifications: Notification) {
    this.notificationsService.onClosed(dismissedNotifications);
  }
}
