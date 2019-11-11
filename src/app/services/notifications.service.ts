import { Injectable } from '@angular/core';
import { Notification } from '../definitions/interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  /**
   * It sets the timeout in actions like undeploying or deleting
   */
  private static readonly TIMEOUT_ACTION = 3000;
  /**
   * It sets the timeout for errors
   */
  private static readonly TIMEOUT_ERROR = 5000;

  private _notifications: Notification[];

  constructor() {
    this._notifications = [];
  }

  /**
  * add()
  */
  add(notificationInstance: Notification) {
    if (notificationInstance.type) {
      if (notificationInstance.type === 'warning' && !notificationInstance.timeout) {
        notificationInstance.timeout = NotificationsService.TIMEOUT_ERROR;
      }
    } else {
      if (!notificationInstance.timeout) {
        notificationInstance.timeout = NotificationsService.TIMEOUT_ACTION;
      }
    }
    this._notifications.push(notificationInstance);
  }
  /**
   * Get notifications list
   */
  get notifications() {
    return this._notifications;
  }
  /**
   * onClosed() will show close button to the right of the alert for dismiss option
   */
  onClosed(dismissedNotification: Notification) {
    const index = this._notifications.map(x => x.id).indexOf(dismissedNotification.id);
    if (index !== -1) {
      this._notifications.splice(index, 1);
    }
  }
  /**
   * Generates UUID v4
   * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
