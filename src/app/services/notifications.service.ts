import { Injectable } from '@angular/core';

export interface Notification {
  message: string;
  type?: string;
  duration?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private _notifications: any[];

  constructor() {
    this._notifications = [];
   }

  add(notificationInstance: Notification) {
    this.notifications.push(notificationInstance);
  }
  get notifications() {
    return this._notifications;
  }

}
