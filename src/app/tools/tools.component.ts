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

import { Component, OnInit } from '@angular/core';
import { ClusterStatus } from '../definitions/enums/cluster-status.enum';
import { AppStatus } from '../definitions/enums/app-status.enum';
import { GraphData } from '../definitions/models/graph-data';
import { NodeType } from '../definitions/enums/node-type.enum';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { Backend } from '../definitions/interfaces/backend';
import { ApplicationInstance } from '../definitions/models/application-instance';
import { Cluster } from '../definitions/interfaces/cluster';
import { StyledNode } from '../definitions/interfaces/styled-node';
import { GraphNode } from '../definitions/interfaces/graph-node';
import { ColorScheme } from '../definitions/interfaces/color-scheme';
import * as shape from 'd3-shape';
import { GraphLink } from '../definitions/interfaces/graph-link';

@Component({
  selector: 'tools',
  template: ``
})
export class ToolsComponent implements OnInit {
  /**
   * It sets a border color for found nodes by a term in the graph
   */
  static readonly FOUND_NODES_BORDER_COLOR = '#5800FF';
  /**
   * It sets a border size for found nodes by a term in the graph
   */
  static readonly FOUND_NODES_BORDER_SIZE = 4;
  /**
   * Refresh ratio
   */
  static readonly REFRESH_INTERVAL = 20000;
  /**
   * It sets the status colors for nodes
   */
  static readonly STATUS_COLORS = {
    // Clusters
    PROVISIONING: '#5800FF',
    PROVISIONED: '#009DFF',
    INSTALL_IN_PROGRESS: '#00FFF5',
    ONLINE: '#00E6A0',
    ONLINE_CORDON: '#EEEEEE',
    OFFLINE_CORDON: '#EEEEEE',
    OFFLINE: '#949494',
    SCALING: '#E5FF79',
    UNINSTALLING: '#FFEB6C',
    DECOMMISSIONING: '#FF9898',
    FAILURE: '#F7478A',
    UNKNOWN: '#151515',
    // Instances
    QUEUED: '#5800FF',
    PLANNING: '#009DFF',
    SCHEDULED: '#00FFF5',
    DEPLOYING: '#FFEB6C',
    RUNNING: '#00E6A0',
    TERMINATING: '#FF9898',
    INCOMPLETE: '#F7478A',
    PLANNING_ERROR: '#F7478A',
    DEPLOYMENT_ERROR: '#F7478A',
    ERROR: '#F7478A',
    TERMINATED: '#949494',
    OTHER: '#FFEB6C'
  };
  /**
   * It sets the status text colors for nodes
   */
  static readonly STATUS_TEXT_COLORS = {
    BLACK: '#444444',
    WHITE: '#FFFFFF',
  };
  /**
   * It sets the status border colors for nodes
   */
  static readonly STATUS_BORDER_COLORS = {
    ONLINE_CORDON: '#00E6A0',
    OFFLINE_CORDON: '#949494',
    UNKNOWN: '#BFBFBF',
  };
  /**
   * It sets a height for clusters nodes in the graph
   */
  static readonly CUSTOM_HEIGHT_CLUSTERS = 58;
  /**
   * It sets a height for instances nodes in the graph
   */
  static readonly CUSTOM_HEIGHT_INSTANCES = 32;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Graph options
   */
  graphData: GraphData;
  graphReset: boolean;
  orientation: string;
  curve = shape.curveBasis;
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  draggingEnabled: boolean;
  areIncludedInstancesWithError: boolean;
  /**
   * Instances list
   */
  instances: ApplicationInstance[];
  /**
   * Model that hold organization ID
   */
  organizationId: string;
  /**
   * Pie Chart options
   */
  gradient: boolean;
  doughnut: boolean;
  colorScheme: ColorScheme;
  /**
   * Search process
   */
  searchTermGraph: string;

  constructor() {
    this.graphData = new GraphData([], []);
    this.graphReset = false;
    this.instances = [];
    this.orientation = 'TB';
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = true;
    this.draggingEnabled = false;
    this.organizationId = null;
    this.gradient = true;
    this.doughnut = true;
    this.colorScheme = {
      domain: ['#5800FF', '#828282']
    };
    this.searchTermGraph = '';
    this.areIncludedInstancesWithError = true;
  }

  ngOnInit() {
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
    }
  }
  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case ClusterStatus.Provisioning:
      case AppStatus.Queued:
        return ToolsComponent.STATUS_COLORS.PROVISIONING;
      case ClusterStatus.Provisioned:
      case AppStatus.Planning:
        return ToolsComponent.STATUS_COLORS.PROVISIONED;
      case ClusterStatus.InstallInProgress:
      case AppStatus.Scheduled:
        return ToolsComponent.STATUS_COLORS.INSTALL_IN_PROGRESS;
      case ClusterStatus.Online:
      case AppStatus.Running:
        return ToolsComponent.STATUS_COLORS.RUNNING;
      case ClusterStatus.OnlineCordon:
        return ToolsComponent.STATUS_COLORS.ONLINE_CORDON;
      case ClusterStatus.OfflineCordon:
        return ToolsComponent.STATUS_COLORS.OFFLINE_CORDON;
      case ClusterStatus.Offline:
      case AppStatus.Terminated:
        return ToolsComponent.STATUS_COLORS.OFFLINE;
      case ClusterStatus.Scaling:
        return ToolsComponent.STATUS_COLORS.SCALING;
      case ClusterStatus.Uninstalling:
      case AppStatus.Deploying:
        return ToolsComponent.STATUS_COLORS.UNINSTALLING;
      case ClusterStatus.Decommissioning:
      case AppStatus.Terminating:
        return ToolsComponent.STATUS_COLORS.DECOMMISSIONING;
      case ClusterStatus.Failure:
      case AppStatus.DeploymentError:
      case AppStatus.Incomplete:
      case AppStatus.PlanningError:
      case AppStatus.Error:
        return ToolsComponent.STATUS_COLORS.ERROR;
      case ClusterStatus.Unknown:
        return ToolsComponent.STATUS_COLORS.UNKNOWN;
      default:
        return ToolsComponent.STATUS_COLORS.OTHER;
    }
  }
  /**
   * Return an specific text color depending on the node status
   * @param status Status name
   */
  getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case ClusterStatus.Scaling:
      case ClusterStatus.Uninstalling:
      case ClusterStatus.OnlineCordon:
      case ClusterStatus.InstallInProgress:
      case ClusterStatus.OfflineCordon:
      case AppStatus.Scheduled:
      case AppStatus.Deploying:
        return ToolsComponent.STATUS_TEXT_COLORS.BLACK;
      case ClusterStatus.Provisioning:
      case AppStatus.Queued:
      case ClusterStatus.Provisioned:
      case AppStatus.Planning:
      case ClusterStatus.Online:
      case AppStatus.Running:
      case ClusterStatus.Offline:
      case AppStatus.Terminated:
      case ClusterStatus.Decommissioning:
      case AppStatus.Terminating:
      case ClusterStatus.Failure:
      case AppStatus.DeploymentError:
      case AppStatus.Incomplete:
      case AppStatus.PlanningError:
      case AppStatus.Error:
        case ClusterStatus.Unknown:
        return ToolsComponent.STATUS_TEXT_COLORS.WHITE;
      default:
        return ToolsComponent.STATUS_TEXT_COLORS.WHITE;
    }
  }
  /**
   * Return an specific border color depending on the node status
   * @param status Status name
   */
  getBorderColor(status: string): string {
    switch (status.toLowerCase()) {
      case ClusterStatus.OnlineCordon:
        return ToolsComponent.STATUS_BORDER_COLORS.ONLINE_CORDON;
      case ClusterStatus.OfflineCordon:
        return ToolsComponent.STATUS_BORDER_COLORS.OFFLINE_CORDON;
      case ClusterStatus.Unknown:
        return ToolsComponent.STATUS_BORDER_COLORS.UNKNOWN;
      default:
        return '';
    }
  }
  /**
   * Return an the border size needed to paint online-cordon, offline-cordon and unknown status
   * @param status Status name
   */
  getBorderSize(status: string): number {
    switch (status.toLowerCase()) {
      case ClusterStatus.OnlineCordon:
      case ClusterStatus.OfflineCordon:
      case ClusterStatus.Unknown:
        return 2;
      default:
        return 0;
    }
  }
  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName(rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }
  /**
   * Helper to workaround the reset graph status through the DOM refresh, using *ngIf
   */
  resetGraphZoom() {
    this.graphReset = true;
    setTimeout(() => {
      this.graphReset = false;
    }, 1);
  }
  /**
   * It returns filtered app instances avoiding duplicated instances by cluster ID
   * @param clusterId Identifier for the cluster
   */
  getAppsInCluster(clusterId: string): ApplicationInstance[] {
    const appsInCluster = {};
    if (this.instances) {
      for (let indexInstance = 0, instancesLength = this.instances.length; indexInstance < instancesLength; indexInstance++) {
        if (this.areIncludedInstancesWithError
            && (this.instances[indexInstance].status_name.toLowerCase() === AppStatus.Error
                || this.instances[indexInstance].status_name.toLowerCase() === AppStatus.DeploymentError)) {
          appsInCluster[this.instances[indexInstance].app_instance_id] = this.instances[indexInstance];
        } else {
          const groups = this.instances[indexInstance].groups || [];
          for (let indexGroup = 0, groupsLength = groups.length; indexGroup < groupsLength; indexGroup++) {
            const serviceInstances = groups[indexGroup].service_instances || [];
            for (let indexService = 0; indexService < serviceInstances.length; indexService++) {
              if (serviceInstances[indexService].deployed_on_cluster_id === clusterId) {
                appsInCluster[serviceInstances[indexService].app_instance_id] = this.instances[indexInstance];
              }
            }
          }
        }
      }
    }
    return Object.values(appsInCluster);
  }
  /**
   * Return if the marker is required
   * @param link Link object
   */
  getMarker(link: GraphLink, origin: string): string {
    const index = this.graphData.nodes.map((x: { id: string; }) => x.id).indexOf(link[origin]);
    if (index !== -1) {
      if (link.isBetweenApps) {
        return 'url(#arrow)';
      } else {
        return '';
      }
    }
    return '';
  }
  /**
   * It returns a node with style
   * @param color Background color for the node
   * @param textColor Text color for the node
   * @param customBorderColor Border color for the node
   * @param customBorderWidth Border width for the node
   * @param customHeight Height for the node
   */
  getStyledNode(color: string, textColor: string, customBorderColor: string, customBorderWidth: number, customHeight: number): StyledNode {
    return {
      color: color,
      text: textColor,
      customBorderColor: customBorderColor,
      customBorderWidth: customBorderWidth,
      customHeight: customHeight
    };
  }
  /**
   * It sets the links between apps
   */
  setLinksBetweenApps() {
    const linksBetweenApps = {};
    const connections = ['inbound_connections', 'outbound_connections'];
    this.graphData.nodes.forEach(node => {
      if (node.type === NodeType.Instances) {
        connections.forEach(connection_type => {
          node[connection_type].forEach((connection: { source_instance_id: string; target_instance_id: string; }) => {
            const source = connection.source_instance_id;
            const target = connection.target_instance_id;
            const isSourceNode = this.graphData.nodes.filter(item => item.id === source).length > 0;
            const isTargetNode = this.graphData.nodes.filter(item => item.id === target).length > 0;
            if (isSourceNode && isTargetNode) {
              linksBetweenApps[ source + '_' + target] = {source: source, target: target, notMarker: false, isBetweenApps: true};
            }
          });
        });
      }
    });
    Object.values(linksBetweenApps).map((item: GraphLink) => {
      this.graphData.links.push({source: item.source, target: item.target, notMarker: false, isBetweenApps: item.isBetweenApps});
    });
  }
  generateClusterNode(cluster: Cluster, tooltip: string): GraphNode & StyledNode {
    const clusterName = cluster.name.toLowerCase();
    const status = cluster.state ?
    (cluster.state === ClusterStatus.Installed.toUpperCase() ? cluster.status_name : cluster.state) : cluster.status_name;
    return {
      ...{
        id: cluster.cluster_id,
        label: cluster.name,
        type: NodeType.Clusters,
        tooltip: tooltip,
        group: cluster.cluster_id
      },
      ...this.getStyledNode(
          this.getNodeColor(status),
          this.getNodeTextColor(status),
          (this.searchTermGraph && clusterName.includes(this.searchTermGraph)) ?
                            ToolsComponent.FOUND_NODES_BORDER_COLOR : this.getBorderColor(status),
          (this.searchTermGraph && clusterName.includes(this.searchTermGraph)) ?
                            ToolsComponent.FOUND_NODES_BORDER_SIZE : this.getBorderSize(status),
          ToolsComponent.CUSTOM_HEIGHT_CLUSTERS)
    };
  }
  generateInstanceNode(instance: ApplicationInstance, cluster: Cluster, tooltip: string): GraphNode & StyledNode {
    const instanceName = instance.name.toLowerCase();
    return {
    ...{
      id: instance.app_instance_id,
      app_descriptor_id: instance.app_descriptor_id,
      label: instance.name,
      type: NodeType.Instances,
      tooltip: tooltip,
      group: cluster.cluster_id
    },
    ...this.getStyledNode(
        this.getNodeColor(instance.status_name),
        this.getNodeTextColor(instance.status_name),
        (this.searchTermGraph && instanceName.includes(this.searchTermGraph)) ?
                          ToolsComponent.FOUND_NODES_BORDER_COLOR : '',
        (this.searchTermGraph && instanceName.includes(this.searchTermGraph)) ?
                          ToolsComponent.FOUND_NODES_BORDER_SIZE : 0,
        ToolsComponent.CUSTOM_HEIGHT_INSTANCES
    ),
        inbound_connections: instance.inbound_connections || [],
        outbound_connections: instance.outbound_connections || [],
    };
  }
}
