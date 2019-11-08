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

/**
 * AppInstance represents an instance of the application in the system
 */
import { ServiceGroupInstance } from '../interfaces/service-group-instance';
import { InstanceMetadata } from '../interfaces/instance-metadata';
import { ConnectionInstance } from '../interfaces/connection-instance';
import { AppStatus } from '../enums/app-status.enum';
import { Application } from './application';

export class ApplicationInstance extends Application {
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
