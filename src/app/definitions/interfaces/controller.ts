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
 * Interface that defines the Edge Controller info needed for creating the Edge Controller object instance
 */
export interface Controller {
    // OrganizationId with the organization identifier.
    organization_id: string;
    // EdgeControllerId with the EIC identifier.
    edge_controller_id: string;
    // Show flag to determine if this asset should be shown on the UI. This flag is internally used
    // for the async uninstall/removal of the asset.
    show?: boolean;
    // Created time
    created?: number;
    // Name of the EIC.
    name?: string;
    // Labels defined by the user.
    labels?: any;
    // LastAliveTimestamp contains the last alive message received
    last_alive_timestamp?: string;
    // List of assets
    assets?: any;
    // Status for the UI.
    status?: string;
    // StatusName with the status of the asset.
    status_name?: string;
    // location with the EC location
    location?: string;
    // ECOpSummary contains the result of the last operation for this edge controller
    last_op_result?: any;
    // AssetInfo with the information related to Hw, Storage and OS
    asset_info?: any;
}
