/**
 * Node entity representing a single node of the architecture that executes application instances.
 */
import { KeyValue } from './key-value';

export interface Node {
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id: string;
    /**
     * ClusterId with the associated cluster identifier the node is assigned to.
     */
    cluster_id: string;
    /**
     * Id with the node identifier.
     */
    node_id: string;
    /**
     * Ip with the node IP.
     */
    ip: string;
    /**
     * Labels for the node.
     */
    labels: KeyValue;
    /**
     * StatusName of the node based on monitoring information.
     */
    status_name: string;
    /**
     * StateName of assignation of the node.
     */
    state_name: string;
}
