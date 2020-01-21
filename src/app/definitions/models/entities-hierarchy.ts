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
 * Class that defines the EntitiesHierarchy structure defines the top
 * level abstraction for the logs dropdown
 */
export class EntitiesHierarchy {
  displayedName: string;
  name: string;
  app_descriptor_id: string;
  id: string;
  app_instance_id?: string;
  service_group_id?: string;
  service_id?: string;

  constructor(
    displayedName: string,
    name: string,
    app_descriptor_id: string,
    id: string,
    app_instance_id?: string,
    service_group_id?: string,
    service_id?: string
  ) {
    this.displayedName = displayedName;
    this.name = name;
    this.app_descriptor_id = app_descriptor_id;
    this.id = id;
    this.app_instance_id = app_instance_id || '';
    this.service_group_id = service_group_id || '';
    this.service_id = service_id || '';
  }
}
