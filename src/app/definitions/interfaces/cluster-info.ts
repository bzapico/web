/**
 * Interface that defines the Cluster info needed for creating the Cluster object instance
 */
export interface ClusterInfo {
  name?: string;
  cluster_id?: string;
  total_nodes?: string;
  running_nodes?: string;
  description?: string;
  status?: string;
  cluster_type?: string;
  labels?: string;
  multitenant?: string;
}
