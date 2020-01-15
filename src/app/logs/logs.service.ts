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

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  // Temporary dummy mode
  logs: LogResponse = mockLogsList as LogResponse;

  constructor() { }
  public getLogsEntry(): LogResponse {
    return this.logs;
  }
}
