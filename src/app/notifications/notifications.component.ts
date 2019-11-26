/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Component, Input } from '@angular/core';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { Notification } from '../definitions/interfaces/notification';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html'
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
