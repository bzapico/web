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

// tslint:disable-next-line:max-line-length
// variable privada q se declara cuand osolo se va a utilizar dentro del servicio es decir no vas a jugar con ella fuera de este para nada por eso es private

  private _notificationsss: any[];

  constructor() {
    this._notificationsss = [];
   }

  add(notificationInstance: Notification) {
    this.notifications.push(notificationInstance);
  }
  get notifications() {
    return this._notificationsss;
  }

}
