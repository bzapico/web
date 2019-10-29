import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.simpleLogMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    this.lastOpSummary = {
      timestamp: 0,
      info: this.translateService.instant('infrastructure.asset.noInfo'),
      status: '-'
    };
  }

  ngOnInit() {
  }

  /**
   * Create a new JavaScript Date object based on the timestamp
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate() {
    if (this.lastOpSummary && this.lastOpSummary.timestamp) {
      const date = new Date(this.lastOpSummary.timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      let hour: any = date.getHours();
      let min: any = date.getMinutes();
      let sec: any = date.getSeconds();

      if (hour < 10) {
        hour = '0' + hour;
      }
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      const formatedDate = month + '/' + day + '/' + year + ' - ' + hour + ':' + min + ':' + sec ;

      return formatedDate;
    }
    return 'undefined';
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

}
