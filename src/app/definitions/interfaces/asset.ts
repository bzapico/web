/**
 * Interface that defines the Asset info needed for creating the Asset any instance
 */
import { KeyValue } from './key-value';
import { OperatingSystemInfo } from './operating-system-info';
import { HardwareInfo } from './hardware-info';
import { StorageHardwareInfo } from './storage-hardware-info';
import { InventoryLocation } from './inventory-location';
import { AgentOpSummary } from './agent-op-summary';

export interface Asset {
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
     * location with the asset location
     */
    location?: InventoryLocation;
}
