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
