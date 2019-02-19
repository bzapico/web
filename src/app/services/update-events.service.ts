import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateEventsService {

  changesOnUserList = new Subject();
  changesOnGroupDevicesList = new Subject();

  constructor() { }

}
