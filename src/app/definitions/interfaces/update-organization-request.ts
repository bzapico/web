
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
import { Organization } from './organization';

/**
 * UpdateOrganizationRequest message with the information required for updating an user.
 */
export interface UpdateOrganizationRequest extends Organization {
  /**
	 * UpdateName if the name is to be updated
	 */
  update_name?: boolean;
  /**
	 * UpdatePhotoBase64 if the photo encoded in base64 is to be updated
	 */
  update_photo?: boolean;
  /**
	 * UpdateZipCode if the zip code is to be updated
	 */
  update_zip_code?: boolean;
  /**
	 * UpdateCountry if the country is to be updated
	 */
  update_country?: boolean;
  /**
	 * UpdateState if the state is to be updated
	 */
  update_state?: boolean;
  /**
	 * UpdateCity if the city is to be updated
	 */
  update_city?: boolean;
  /**
   * UpdateFullAddress of the organization is to be updated
   */
  update_full_address?: boolean;
}
