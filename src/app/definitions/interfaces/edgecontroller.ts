/**
 * Interface that defines the Edge Controller Data model
 */
export interface EdgeController {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // EdgeControllerId with the EIC identifier.
    edge_controller_id?: string;
    // Show flag to determine if this asset should be shown on the UI. This flag is internally used
    // for the async uninstall/removal of the asset.
    show?: boolean;
    // Created time
    created?: number;
    // Labels defined by the user.
    labels?: any;
    // Name of the EIC.
    name?: string;
}
