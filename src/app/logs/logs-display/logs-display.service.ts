import { Injectable } from '@angular/core';
import { LogEntryResponse } from '../../definitions/interfaces/log-entry-response';

@Injectable({
  providedIn: 'root'
})
export class LogsDisplayService {
  /**
   * Model that hold logs entry response
   */
  logsEntry: LogEntryResponse;

  constructor(
  ) { }

  /**
   * Create a new JavaScript Date object based on the timestamp
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate() {
    if (this.logsEntry && this.logsEntry.timestamp) {
      const date = new Date(this.logsEntry.timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayOfWeek = days[date.getDay()];
      let hour: number | string = date.getHours();
      let min: number | string = date.getMinutes();
      let sec: number | string = date.getSeconds();
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      const formatedDate = `${dayOfWeek} ${month} ${day} ${hour}:${min}:${sec} ${year}`;
      return formatedDate;
    }
    return 'undefined';
  }
}
