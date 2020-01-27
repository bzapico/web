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
 * Organization model with the information related to a given organization
 */
export interface Organization {
  /**
   * OrganizationId with the organization identifier.
   */
  organization_id?: string;
  /**
   * Organization name
   */
  name: string;
  /**
   * Organization full address
   */
  full_address?: string;
  /**
   * City
   */
  city?: string;
  /**
   * Country
   */
  country?: string;
  /**
   * Zip code
   */
  zip_code?: number;
  /**
   * PhotoBase64 with the base64 encoded photo
   */
  photo_base64?: string;
  /**
   * Creation date
   */
  created?: number;
  /**
   * Organization email
   */
  email?: string;
}
