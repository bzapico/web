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
 *  ServiceInstanceLogSummary contains a summary of the logs by service instance
 */
export interface ServiceInstanceLogSummary {
  /**
   * ServiceId with the service identifier
   */
  service_id ?: string;
  /**
   * ServiceInstanceId with the service instance identifier
   */
  service_instance_id?: string;
  /**
   * Name of the service instance log summary
   */
  name?: string;
}
