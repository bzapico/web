import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApplicationInstance } from '../definitions/interfaces/application-instance';
import { AppStatus } from '../definitions/enums/app-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  showManageConnections = new Subject();

  constructor() {}

  /**
   * Returns the length of the services in registered list. Represents the number of available services
   * @param app selected app
   */
  getServicesCount(app): number {
    let temporalCount = 0;
    app.groups.forEach(group => {
      if (group.services) {
        temporalCount = group.services.length + temporalCount;
      }
    });
    return temporalCount;
  }
  /**
   * Fulfill nulls to avoid data binding failure
   * @param instance Application instance
   */
  preventEmptyFields(instance: ApplicationInstance) {
    if (!instance.description) {
      instance.description = '-';
    }
    if (!instance.labels) {
      instance.labels = '-';
    }
    if (!instance.status_name) {
      instance.status_name = '-';
    }
  }
  /**
   * Checks if the app status requires an special css class
   * @param status app status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case AppStatus.Running: {
        if (className.toLowerCase() === AppStatus.Running) {
          return true;
        }
        break;
      }
      case AppStatus.DeploymentError: {
        if (className.toLowerCase() === AppStatus.DeploymentError) {
          return true;
        }
        break;
      }
      case AppStatus.Error: {
        if (className.toLowerCase() === AppStatus.Error) {
          return true;
        }
        break;
      }
      case AppStatus.Incomplete: {
        if (className.toLowerCase() === AppStatus.Incomplete) {
          return true;
        }
        break;
      }
      case AppStatus.PlanningError: {
        if (className.toLowerCase() === AppStatus.PlanningError) {
          return true;
        }
        break;
      }
      case AppStatus.Queued: {
        if (className.toLowerCase() === AppStatus.Process) {
          return true;
        }
        break;
      }
      case AppStatus.Planning: {
        if (className.toLowerCase() === AppStatus.Process) {
          return true;
        }
        break;
      }
      case AppStatus.Scheduled: {
        if (className.toLowerCase() === AppStatus.Process) {
          return true;
        }
        break;
      }
      default: {
        return (className.toLowerCase() === AppStatus.Process);
      }
    }
  }
}
