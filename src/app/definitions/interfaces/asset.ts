/**
 * Interface that defines the Asset info needed for creating the Asset object instance
 */

export interface Asset {
    // OrganizationId with the organization identifier.
    organization_id: string;
    // EdgeControllerId with the EIC identifier.
    edge_controller_id: string;
    // AssetId with the asset identifier.
    asset_id: number;
    // AgentId with the agent identifier that is monitoring this asset if any.
    agent_id: number;
    // EicNetIp contains the current IP address that connects the asset to the EIC.
    eic_net_ip: string;
    // Show flag to determine if this asset should be shown on the UI. This flag is internally used
    // for the async uninstall/removal of the asset.
    show?: boolean;
    // Created time
    created?: number;
    // Labels defined by the user.
    labels?: string;
    // OS contains Operating System information.
    os?: string;
    // Hardware information.
    hardware?: string;
    // Storage information.
    storage?: string;
    // LastOpSummary contains the result of the last operation fr this asset
    last_op_summary?: string;
    // LastAliveTimestamp contains the last alive message received
    last_alive_timestamp?: number;
    // Status of the agent.
    status?: string;
}
