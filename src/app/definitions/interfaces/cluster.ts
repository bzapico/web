/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * Interface that defines the Cluster info needed for creating the Cluster object instance
 */
import { ClusterStatus } from '../enums/cluster-status.enum';
import { KeyValue } from '@angular/common';

export interface Cluster {
  /**
   * OrganizationId with the organization identifier.
   */
  organization_id?: string;
  /**
   * ClusterId with the cluster identifier.
   */
  cluster_id?: string;
  /**
   * Name of the cluster.
   */
  name?: string;
  /**
   * ClusterTypeName contains the name of the type of cluster.
   */
  cluster_type_name?: string;
  /**
   * MultitenantSupport contains the type of support definition.
   */
  multitenant_support?: string;
  /**
   * StatusName with the name of the status of the cluster based on monitoring information.
   */
  status_name?: string;
  /**
   * Status with the status of the cluster based on cluster alive signals sent between connectivity manager and checker
   */
  status?: ClusterStatus;
  /**
   * Labels for the cluster.
   */
  labels?: KeyValue<string, string>;
  /**
   * TotalNodes contains the total number of nodes in the cluster.
   */
  total_nodes?: number;
  /**
   * RunningNodes contains the number of nodes in the system that are currently working.
   */
  running_nodes?: number;
  /**
   * LastAliveTimestamp contains the last alive message received
   */
  last_alive_timestamp?: string;
  /**
   * State of the cluster with respect to provisioning and installation.
   */
  state?: ClusterStatus;
  /**
   * StateName contains the name of the cluster state.
   */
  state_name?: string;
}
