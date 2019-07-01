/**
 * Interface that defines the Edge Controller info needed for creating the Edge Controller object instance
 */
export interface Controller {
    // OrganizationId with the organization identifier.
    organization_id: string;
    // EdgeControllerId with the EIC identifier.
    edge_controller_id: string;
    // Name of the EIC.
    name?: string;
    // Show flag to determine if this asset should be shown on the UI. This flag is internally used
    // for the async uninstall/removal of the asset.
    show?: boolean;
    // Created time
    created?: number;
     // Labels defined by the user.
    labels?: any;
    // LastAliveTimestamp contains the last alive message received
    last_alive_timestamp?: number;
    // List of assets
    assets?: any;
    // Status for the UI.
    status?: string;
    // Status beauty name for the UI.
    status_name?: string;
    // location with the EC location
    location?: string;
}