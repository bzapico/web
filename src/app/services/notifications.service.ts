import { Injectable } from '@angular/core';

export interface Notification {
  message: string;
  type?: string;
  timeout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private _notifications: any[];

  constructor() {
    this._notifications = [];
    // this._notifications.push({message: 'This option is not available at this moment', type: 'warning',  timeout: 5000});
   }

  /**
  * add()
  */

  add(notificationInstance: Notification) {

    if (this._notifications.length < 5) {
      this.notifications.push(notificationInstance);
    } else if (this._notifications.length === 5) {
      this.notifications.push(notificationInstance);
      this.notifications.shift();
      }
    }

  get notifications() {
    return this._notifications;
  }
  /**
   * onClosed() will show close button to the right of the alert for dismiss option
   */

  onClosed(dismissedNotifications) {
    console.log(dismissedNotifications);

  }

}
