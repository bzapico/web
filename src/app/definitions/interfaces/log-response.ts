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
 *  LogResponse message containing the results of a query.
 */
import { LogEntryResponse } from './log-entry-response';
import { AppDescriptorLogSummary } from './app-descriptor-log-summary';
import { AppInstanceLogSummary } from './app-instance-log-summary';

export interface LogResponse {
  /**
   * OrganizationId with the organization identifier.
   */
  organization_id?: string;
  /**
   * From with the minimal timestamp of the returned results.
   */
  from?: number;
  /**
   * To with the maximum timestamp of the returned results.
   */
  to?: number;
  /**
   * Entries with the captured log entries.
   */
  entries?: LogEntryResponse[];
  /**
   * AppDescriptorLogSummary contains an array with the log summary of an app descriptor
   */
  app_descriptor_log_summary?: AppDescriptorLogSummary[];
  /**
   * AppInstanceLogSummary contains an array with the log summary of an app instance
   */
  app_instance_log_summary?: AppInstanceLogSummary[];
  /**
   * FailedClusterIds with a list of cluster identifiers ∫that failed to request the logs
   */
  failed_cluster_ids?: string[];
}
