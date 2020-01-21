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
import { DownloadLogState } from '../enums/download-log-state.enum';
/**
 *  DownloadLogResponse with a response of a download/check operation
 */
export interface DownloadLogResponse {
  /**
   * OrganizationId with the organization identifier.
   */
  organization_id?: string;
  /**
   * RequestId contains a request identifier
   */
  request_id?: string;
  /**
   *  From specifies the minimal timestamp of the expected entries.
   */
  from?: number;
  /**
   * To specifies the maximum timestamp of the expected entries.
   */
  to?: number;
  /**
   * State with the state of the operation.
   */
  state?: DownloadLogState;
  /**
   * StateName with the name of the state.
   */
  state_name?: string;
  /**
   * URL is send only if the log is ready to be downloaded.
   */
  url?: string;
  /**
   * Expiration with timestamp until the file can be downloaded.
   */
  expiration?: number;
  /**
   * Info contains additional information on the status of the operation.
   */
  info?: string;
}
