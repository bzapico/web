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

import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { Backend } from '../definitions/interfaces/backend';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { LogEntryResponse } from '../definitions/interfaces/log-entry-response';

@Component({
  selector: 'logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold organization ID
   */
  organizationId: string;
  /**
   * Model that hold logs entry
   */
  logsEntry: LogEntryResponse;

  constructor(
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.logsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
  }

  ngOnInit() {
  }
}
