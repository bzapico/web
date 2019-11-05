/**
 * AppInstance represents an instance of the application in the system
 */
import { ServiceGroupInstance } from '../interfaces/service-group-instance';
import { InstanceMetadata } from '../interfaces/instance-metadata';
import { ConnectionInstance } from '../interfaces/connection-instance';
import { AppStatus } from '../enums/app-status.enum';

export class ApplicationInstance {
  /**
   * AppInstanceId with the application instance identifier.
   */
  app_instance_id?: string;
  /**
   * Groups with the Service collocation strategies.
   */
  groups?: ServiceGroupInstance[];
  /**
   * Status of the deployed instance.
   */
  status?: AppStatus;
  /**
   * Status name of the instance.
   */
  status_name?: string;
  /**
   * Metadata descriptor for the instances triggered by this app.
   */
  metadata?: InstanceMetadata[];
  /**
   * Textual information about this particular application instance.
   */
  info?: string;
  /**
   * InboundConnections with a list of connections where the instance is the target.
   */
  inbound_connections?: ConnectionInstance[];
  /**
   * OutboundConnections with a list of connections where the instance is the source.
   */
  outbound_connections?: ConnectionInstance[];
  // Temporal workaround to avoid losing undeploying status on update,
  // until the backend updates the app status after triggering undeploy action.
  // (https://daisho.atlassian.net/browse/NP-1679
  undeploying?: boolean;

  getId(): string {
    return this.app_instance_id;
  }
}
