import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {

  constructor(private translateService: TranslateService) { }

  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case 'online': {
        if (className.toLowerCase() === 'online') {
          return true;
        }
        break;
      }
      case 'offline': {
        if (className.toLowerCase() === 'offline') {
          return true;
        }
        break;
      }
      case 'process': {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        break;
      }
      default: {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        return false;
      }
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
