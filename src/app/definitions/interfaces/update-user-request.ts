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

import { User } from './user';

/**
 * UpdateUserRequest message with the information required for updating an user.
 */
export interface UpdateUserRequest extends User {
	/**
	 * UpdateName if the name is to be updated
	 */
  update_name?: boolean;
	/**
	 * UpdatePhotoBase64 if the photo encoded in base64 is to be updated
	 */
  update_photo_base64?: boolean;
	/**
	 * UpdateLastName if the last name is to be updated
	 */
  update_last_name?: boolean;
	/**
	 * UpdateTitle if the title is to be updated
	 */
  update_title?: boolean;
	/**
	 * UpdatePhone if the phone is to be updated
	 */
  update_phone?: boolean;
	/**
	 * UpdateLocation if the location is to be updated
	 */
  update_location?: boolean;
}
