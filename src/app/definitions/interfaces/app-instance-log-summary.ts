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
 * AppInstanceLogSummary contains a summary of the logs by app instance
 */
import { KeyValue } from './key-value';
import { ServiceGroupInstanceLogSummary } from './service-group-instance-log-summary';

export interface AppInstanceLogSummary {
  /**
   * OrganizationId with the organization identifier.
   */
  organization_id: string;
  /**
   * AppInstanceID with the identifier of the instance associated to this descriptor
   */
  app_instance_id?: string;
  /**
   * AppInstanceName contains the name of the application instance.
   */
  app_instance_name?: string;
  /**
  * AppDescriptorId with the application descriptor identifier.
  */
  app_descriptor_id?: string;
  /**
  * AppDescriptorName contains the name of the application descriptor.
  */
  app_descriptor_name?: string;
  /**
   * CurrentLabels defined by the user.
   */
  current_labels?: KeyValue;
  /**
   * Groups contains a list of service group instance log summaries
   */
  groups?: ServiceGroupInstanceLogSummary[];
}
