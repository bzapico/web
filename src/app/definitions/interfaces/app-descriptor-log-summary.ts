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
 *  AppDescriptorLogSummary contains a summary of the logs by app descriptor
 */
import { KeyValue } from './key-value';
import { AppInstanceLogSummary } from './app-instance-log-summary';

export interface AppDescriptorLogSummary {
  /**
   * OrganizationId with the organization identifier.
   */
  organization_id: string;
  /**
   * AppDescriptorId with the descriptor identifier
   */
  app_descriptor_id?: string;
  /**
   * AppDescriptorName with the descriptor name
   */
  app_descriptor_name?: string;
  /**
   *CurrentLabels defined by the user.
   */
  current_labels?: KeyValue;
  /**
   * Instances contains a list of instances created from this descriptor
   */
  instances?: AppInstanceLogSummary[];
}
