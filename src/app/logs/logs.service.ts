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

import { Injectable } from '@angular/core';
import { LogResponse } from 'src/app/definitions/interfaces/log-response';
import { mockLogsList } from 'src/app/services/utils/logs.mocks';
import { Backend } from '../definitions/interfaces/backend';
import { Subject } from 'rxjs';
import { LocalStorageKeys } from 'src/app/definitions/const/local-storage-keys';
import { DownloadLogResponse } from '../definitions/interfaces/download-log-response';
import { MockupBackendService } from '../services/mockup-backend.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  /**
   * searchLogsResponse manages the timing in the BE interaction
   */
  searchLogsResponse = new Subject();
  /**
   * downloadStatus manages the timing in the BE interaction
   */
  downloadStatus = new Subject();
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold organization id
   */
  organizationId: string;
  /**
   * LogResponse reference
   */
  // Temporary dummy mode
  logs: LogResponse = mockLogsList as LogResponse;
  /**
   * DownloadLogResponse reference
   */
  downloadResponse: DownloadLogResponse;
  /**
   * Interval reference
   */
  // interval: NodeJS.Timer;
  interval: any;

  constructor(
    private mockupBackendService: MockupBackendService,
  ) {
      this.backend = this.mockupBackendService;
  }
  /**
   * Search for log entries matching a query
   * @param searchParams message with the query to be resolved
   */
  searchLogs(searchParams) {
    this.searchLogsResponse.next(this.logs);
  }
  /**
   * Download ask for log entries and store them into a zip file
   * @param downloadParams contains a message to request to download logs
   */
  download(downloadParams) {
    // this.downloadStatus.next(this.downloadResponse);
    this.backend.downloadLogs(downloadParams).subscribe(downloadResponse => {
      // Get User data from localStorage
      const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
      if (jwtData !== null) {
        this.organizationId = JSON.parse(jwtData).organizationID;
        if (this.organizationId !== null) {
          this.downloadResponse = {
            organization_id: this.organizationId,
            request_id: downloadResponse.request_id
          };
        }
      }
      this.interval = setTimeout(() => {
        this.checkLogs(downloadResponse.request_id);
      }, 5);
      // console.log('interval ', typeof this.interval);
    });
  }

  /**
   * Check checks the state of the download operation
   * @param downloadParams DownloadRequestId contains the identifier of an operation
   */
  checkLogs(downloadParams) {
    this.backend.checkLogs(downloadParams.request_id).subscribe(checkResponse => {
        this.downloadStatus.next(checkResponse.url);
        clearTimeout(this.interval);
      });
  }
}
