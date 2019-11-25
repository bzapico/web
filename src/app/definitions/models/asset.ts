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
 * Interface that defines the Asset info needed for creating the Asset any instance
 */
import { KeyValue } from '../interfaces/key-value';
import { OperatingSystemInfo } from '../interfaces/operating-system-info';
import { HardwareInfo } from '../interfaces/hardware-info';
import { StorageHardwareInfo } from '../interfaces/storage-hardware-info';
import { InventoryLocation } from '../interfaces/inventory-location';
import { AgentOpSummary } from '../interfaces/agent-op-summary';
import { InventoryType } from '../enums/inventory-type.enum';
import { ConnectedStatus } from '../enums/connected-status.enum';
import { Item } from './item';

export class Asset extends Item {
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id: string;
    /**
     * EdgeControllerId with the EIC identifier.
     */
    edge_controller_id: string;
    /**
     * AssetId with the asset identifier.
     */
    asset_id: string;
    /**
     * AgentId with the agent identifier that is monitoring this asset if any.
     */
    agent_id: string;
    /**
     * Show flag to determine if this asset should be shown on the UI. This flag is internally used
     * for the async uninstall/removal of the asset.
     */
    show?: boolean;
    /**
     * Created time
     */
    created?: number;
    /**
     * Labels defined by the user.
     */
    labels?: KeyValue;
    /**
     * OS contains Operating System information.
     */
    os?: OperatingSystemInfo;
    /**
     * Hardware information.
     */
    hardware?: HardwareInfo;
    /**
     * Storage information.
     */
    storage?: StorageHardwareInfo[];
    /**
     * EicNetIp contains the current IP address that connects the asset to the EIC.
     */
    eic_net_ip: string;
    /**
     * LastOpResult contains the result of the last operation fr this asset
     */
    last_op_result?: AgentOpSummary;
    /**
     * LastAliveTimestamp contains the last alive message received
     */
    last_alive_timestamp?: string;
    /**
     * Status of the asset.
     */
    status?: ConnectedStatus;
    /**
     * location with the asset location
     */
    location?: InventoryLocation;

    constructor(
        organization_id: string,
        edge_controller_id: string,
        asset_id: string,
        agent_id: string,
        show: boolean,
        created: number,
        labels: KeyValue,
        os: OperatingSystemInfo,
        hardware: HardwareInfo,
        storage: StorageHardwareInfo[],
        eic_net_ip: string,
        last_op_result: AgentOpSummary,
        last_alive_timestamp: string,
        status: ConnectedStatus,
        location: InventoryLocation) {
        super();
        this.organization_id = organization_id;
        this.edge_controller_id = edge_controller_id;
        this.asset_id = asset_id;
        this.agent_id = agent_id;
        this.show = show;
        this.created = created;
        this.labels = labels;
        this.os = os;
        this.hardware = hardware;
        this.storage = storage;
        this.eic_net_ip = eic_net_ip;
        this.last_op_result = last_op_result;
        this.last_alive_timestamp = last_alive_timestamp;
        this.status = status;
        this.location = location;
    }

    get id(): string {
        return this.asset_id;
    }

    get type(): InventoryType {
        return InventoryType.Asset;
    }

    get itemStatus(): string {
        return this.status;
    }

    get itemLocation(): string {
        return this.location && this.location.geolocation ? this.location.geolocation : 'undefined';
    }
}
