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
 * Interface that defines the device Group info needed for creating the device Group object instance
 */
export interface Group {
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id: string;
    /**
     * DevicesGroupId with the device group identifier.
     */
    device_group_id?: string;
    /**
     * Name of the device group.
     */
    name?: string;
    /**
     * Created time
     */
    created?: string;
    /**
     * Labels defined by the user.
     */
    labels?: string;
    /**
     * Enabled determines if the device can interact with the running applications.
     */
    enabled?: boolean;
    /**
     * DefaultDeviceConnectivity determines if the devices are enable or disable by default
     */
    default_device_connectivity?: boolean;
    /**
     * DeviceGroupApiKey with the API used by the devices associated to this group for registration purposes.
     */
    device_group_api_key?: string;
  }
