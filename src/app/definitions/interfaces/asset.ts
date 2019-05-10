/**
 * Interface that defines the Asset Data model
 */
export interface Asset {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AssetId with the asset identifier.
    asset_id?: string;
    // AgentId with the agent identifier that is monitoring this asset if any.
    agent_id?: string;
    // Show flag to determine if this asset should be shown on the UI. This flag is internally used
    // for the async uninstall/removal of the asset.
    show?: boolean;
    // Created time
    created?: number;
    // Labels defined by the user.
    labels?: any;
    // OS contains Operating System information.
    os?: any;
    // Hardware information.
    hardware?: any;
    // EicNetIp contains the current IP address that connects the asset to the EIC.
    eic_net_ip?: string;
    // Status of the agent.
    status?: string;
}
