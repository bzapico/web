import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input() notifications: any[];

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

  ngOnInit() {

  }

  /**
   * Notifications have dismiss option. Enabling it will show close button to the right of the alert.
   */
  onClosed(dismissedNotifications: any): void {
    this.notificationsService.onClosed(dismissedNotifications);
  }

}
