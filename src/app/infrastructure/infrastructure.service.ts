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
import { TranslateService } from '@ngx-translate/core';
import { InventoryStatus } from '../definitions/enums/inventory-status.enum';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {

  constructor(private translateService: TranslateService) {}
  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case InventoryStatus.Online:
        return className.toLowerCase() === InventoryStatus.Online;
      case InventoryStatus.Offline:
        return className.toLowerCase() === InventoryStatus.Offline;
      default:
        return className.toLowerCase() === InventoryStatus.Process;
    }
  }
  /**
   * Generates the NGX-Chart required JSON object for pie chart rendering
   * @param online Number of online ECs
   * @param total Number of total ECs online
   * @returns anonym array with the required object structure for pie chart rendering
   */
  generateSummaryChartData(online: number, total: number): any[] {
    return [
      {
        name: this.translateService.instant('infrastructure.chart.online'),
        value: online
      },
      {
        name: this.translateService.instant('infrastructure.chart.offline'),
        value: total - online
      }
    ];
  }
}
