/**
 * Interface that defines the Edge Controller info needed for creating the Edge Controller object instance
 */

export interface Controller {
    organization_id: string;
    edge_controller_id: string;
    ec_name: string;
    show?: boolean;
    created?: number;
    labels?: string;
    assets?: string;
    status?: string;
}
