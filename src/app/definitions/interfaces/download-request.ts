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
import { OrderOptions } from './order-options';
/**
 *  DownloadLogRequest contains a message to request to download logs
 */
export interface DownloadRequest {
  /**
	 * OrganizationId with the organization identifier.
	 */
  organization_id?: string;
  /**
	 * AppDescriptorId with the descriptor identifier
	 */
  app_descriptor_id?: string;
  /**
	 *  AppInstanceId with the identifier of the target application instance.
	 */
  app_instance_id?: string;
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
	 * ServiceId with the service identifier
	 */
  service_id?: string;
  /**
	 * MsgQueryFilter contains a text query on the log entry.
	 */
  msg_query_filter?: string;
  /**
	 * From specifies the minimal timestamp of the expected entries.
	 */
  from?: number;
  /**
	 * To specifies the maximum timestamp of the expected entries.
	 */
  to?: number;
  /**
	 * Order specifies the sort order of the entries (on timestamp)
	 */
  order?: OrderOptions[];
  /**
	 * IncludeMetadata  flag to indicate if the result should not be augmented by adding names, etc.
	 */
  include_metadata?: boolean;
}
