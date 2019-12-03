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
 *  ServiceGroupInstanceLogSummary contains a summary of the logs by service group instance
 */
import { ServiceInstanceLogSummary } from './service-instance-log-summary';

export interface ServiceGroupInstanceLogSummary {
  /**
   * ServiceGroupId with the service group identifier
   */
  service_group_id?: string;
  /**
   * ServiceGroupInstanceId with the service group instance identifier
   */
  service_group_instance_id?: string;
  /**
   * Name of this service group instance log summary
   */
  name?: string;
  /**
   * ServiceInstances contains a list of service instance log summaries
   */
  service_instances?: ServiceInstanceLogSummary[];
}
