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
 *  LogEntryResponse message containing a log entry
 */
export interface LogEntryResponse {
  /**
  * AppDescriptorId with the descriptor identifier
  */
  app_descriptor_id?: string;
  /**
   * AppDescriptorName with the descriptor name
   */
  app_descriptor_name?: string;
  /**
   *  AppInstanceId with the identifier of the target application instance.
   */
  app_instance_id?: string;
  /**
   * AppInstanceName wit the name of the instance
   */
  app_instance_name?: string;
  /**
   * ServiceGroupId with the service group identifier
   */
  service_group_id?: string;
  /**
   * ServiceGroupInstanceId with the target group instance. If not set, the response will contain all groups in
   *  the application instance.
   */
  service_group_instance_id?: string;
  /**
   * ServiceGroupName withe the name of the service group
   */
  service_group_name?: string;
  /**
   * ServiceId with the service identifier
   */
  service_id?: string;
  /**
   * ServiceInstanceId with the service instance identifier
   */
  service_instance_id?: string;
  /**
   * ServiceName with the name of the service
   */
  service_name?: string;
  /**
   * Timestamp
   */
  timestamp?: number;
  /**
   * Msg contains the log entry.
   */
  msg?: string;
  /**
   * IsDead means that the service is not longer deployed
   */
  is_dead?: boolean;
}
