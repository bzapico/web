import { KeyValue } from './key-value';
import { AgentOpSummary } from './agent-op-summary';
import { InventoryLocation } from './inventory-location';

export interface UpdateAssetRequest {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AssetId with the asset identifier.
    asset_id?: string;
    // Add Label flag to indicate that the set of labels need to be added.
    add_labels?: boolean;
    // Remove label flag to indicate that the set of labels need to be removed.
    remove_labels?: boolean;
    // Labels for the cluster.
    labels?: KeyValue;
    // UpdateLastOpSummary flag to indicate that last_alive_timestamp need to be updated
    update_last_op_summary?: boolean;
    // LastOpSummary contains the result of the last operation fr this asset
    last_op_summary?: AgentOpSummary;
    // UpdateLastAlive flag to indicate that last_alive_timestamp need to be updated
    update_last_alive?: boolean;
    // LastAliveTimestamp contains the last alive message received
    last_alive_timestamp?: string;
    // UpdateIP contains a flag to indicate if eic_net_ip need to be updated
    update_ip?: boolean;
    // EicNetIp contains the current IP address that connects the asset to the EIC.
    eic_net_ip?: string;
    // UpdateLocation flag to indicate that location needs to be updated
    update_location?: boolean;
    // location with the asset location
    location?: InventoryLocation;
}
