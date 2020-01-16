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
import { LogResponse } from 'src/app/definitions/interfaces/log-response';
import { LogsService } from '../logs.service';

@Component({
  selector: 'logs-display',
  templateUrl: './logs-display.component.html',
  styleUrls: ['./logs-display.component.scss']
})
export class LogsDisplayComponent implements OnInit {
  logs: LogResponse;

  constructor(
    private logsService: LogsService
  ) {
  }

  ngOnInit() {
    // TODO
    this.logs = this.logsService.logs;
  }

}
