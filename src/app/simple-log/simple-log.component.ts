import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-simple-log',
  templateUrl: './simple-log.component.html',
  styleUrls: ['./simple-log.component.scss']
})
export class SimpleLogComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * Model that hold organization ID and last operations summary
   */
  organizationId: string;
  lastOpSummary: any;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.simpleLogMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.lastOpSummary = {};
    // Default initialization
    // this.timestamp = 0;
    // this.status = 'Loading ...';
    // this.info = 'Loading ...';

  //   last_op_summary: {
  //     operation_id: '54654asd-654654-qweqwe',
  //     timestamp:  1550746669,
  //     status: 'scheduled',
  //     info: 'info'
  // },
   }

  ngOnInit() {
    console.log(this.lastOpSummary  , 'summary ');
  }

  /**
   * Create a new JavaScript Date object based on the timestamp
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate(timestamp: any) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const formatedDate = month + '/' + day + '/' + year + ' - ' + hour + ':' + min + ':' + sec ;

    return formatedDate;
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

}
