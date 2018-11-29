/**
 * Interface that defines the Cluster info needed for creating the Cluster object instance
 */
export interface Cluster {
  name?: string;
  cluster_id?: string;
  total_nodes?: number;
  running_nodes?: number;
  description?: string;
  status_name?: string;
  cluster_type_name?: string;
  labels?: string;
  multitenant_support?: string;
}
