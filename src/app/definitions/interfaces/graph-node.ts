import { NodeType } from '../enums/node-type.enum';
import { ConnectionInstance } from './connection-instance';

export interface GraphNode {
    id: string;
    app_descriptor_id?: string;
    label: string;
    type: NodeType.Clusters | NodeType.Instances;
    tooltip: string;
    group: string;
    inbound_connections?: ConnectionInstance[];
    outbound_connections?: ConnectionInstance[];
}
