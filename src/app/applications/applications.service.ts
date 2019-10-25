import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClusterStatus } from '../definitions/enums/cluster-status.enum';
import { ApplicationInstance } from '../definitions/interfaces/application-instance';
import { AppStatus } from '../definitions/enums/app-status.enum';
/**
 * It sets the status colors for nodes
 */
const STATUS_COLORS = {
  RUNNING: '#00E6A0',
  ERROR: '#F7478A',
  OTHER: '#FFEB6C'
};
/**
 * It sets the status colors for nodes
 */
const STATUS_TEXT_COLORS = {
  RUNNING: '#FFFFFF',
  ERROR: '#FFFFFF',
  OTHER: '#444444'
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  showManageConnections = new Subject();

  constructor() {}

  /**
   * It returns a node with style
   * @param color Background color for the node
   * @param textColor Text color for the node
   * @param customBorderColor Border color for the node
   * @param customBorderWidth Border width for the node
   * @param customHeight Height for the node
   */
  getStyledNode(color: string, textColor: string, customBorderColor: string, customBorderWidth: number, customHeight: number): {} {
    return {
      color: color,
      text: textColor,
      customBorderColor: customBorderColor,
      customBorderWidth: customBorderWidth,
      customHeight: customHeight
    };
  }
  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case ClusterStatus.Running:
      case ClusterStatus.Online:
      case ClusterStatus.OnlineCordon:
        return STATUS_COLORS.RUNNING;
      case ClusterStatus.Error:
      case ClusterStatus.Offline:
      case ClusterStatus.OfflineCordon:
        return STATUS_COLORS.ERROR;
      default:
        return STATUS_COLORS.OTHER;
    }
  }
  /**
   * Return an specific text color depending on the node status
   * @param status Status name
   */
  getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case ClusterStatus.Running:
      case ClusterStatus.Online:
      case ClusterStatus.OnlineCordon:
        return STATUS_TEXT_COLORS.RUNNING;
      case ClusterStatus.Error:
      case ClusterStatus.Offline:
      case ClusterStatus.OfflineCordon:
        return STATUS_TEXT_COLORS.ERROR;
      default:
        return STATUS_TEXT_COLORS.OTHER;
    }
  }
  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName(rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }
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
