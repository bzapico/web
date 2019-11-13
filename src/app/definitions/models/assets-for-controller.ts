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

export class AssetsForController {
    asset_id: string;
    eic_net_ip: string;
    status: string;
    edge_controller_id: string;

    constructor(asset_id: string, eic_net_ip: string, status: string, edge_controller_id: string) {
        this.asset_id = asset_id;
        this.eic_net_ip = eic_net_ip;
        this.status = status;
        this.edge_controller_id = edge_controller_id;
    }
}
