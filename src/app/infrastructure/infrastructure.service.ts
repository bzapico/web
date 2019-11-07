import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InventoryStatus } from '../definitions/enums/inventory-status.enum';
import { ChartData } from '../definitions/interfaces/chart-data';

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
  generateSummaryChartData(online: number, total: number): ChartData[] {
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
