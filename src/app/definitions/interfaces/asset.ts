/**
 * Interface that defines the Asset info needed for creating the Asset object instance
 */

export interface Asset {
    organization_id: string;
    edge_controller_id: string;
    asset_id: number;
    agent_id: number;
    eic_net_ip: string;
    ec_name: string;
    show?: boolean;
    created?: number;
    labels?: string;
    os?: string;
    hardware?: string;
    storage?: string;
    agent_op_summary?: string;
    last_alive_timestamp?: number;
    status?: string;
}
