/**
 * Interface that defines the Cluster info needed for creating the Cluster object instance
 */
export interface ClusterInfo {
  name: string;
  id?: string;
  nodes: string;
  description: string;
  status: string;
  type: string;
  tags: string;
  multitenant: string;
}
