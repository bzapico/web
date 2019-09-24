import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  showManageConnections = new Subject();

  constructor() {}
}
