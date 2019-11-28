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
import * as shape from 'd3-shape';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { Backend } from '../definitions/interfaces/backend';
import { ApplicationInstance } from '../definitions/models/application-instance';

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
    RUNNING: '#00E6A0',
    ONLINE: '#00E6A0',
    OFFLINE: '#949494',
    ONLINE_CORDON: '#EEEEEE',
    OFFLINE_CORDON: '#EEEEEE',
    PROVISIONING: '#5800FF',
    PROVISIONED: '#009DFF',
    INSTALLED: '#00FFF5',
    UNINSTALLING: '#FFEB6C',
    DECOMISIONING: '#FF9898',
    INSTALL_IN_PROGRESS: '#00FFF5',
    SCALING: '#E5FF79',
    FAILURE: '#F7478A',
    UNKNOWN: '#151515',
    ERROR: '#F7478A',
    OTHER: '#FFEB6C'
  };
  /**
   * It sets the status text colors for nodes
   */
  static readonly STATUS_TEXT_COLORS = {
    RUNNING: '#FFFFFF',
    ONLINE: '#444444',
    OFFLINE: '#FFFFFF',
    ONLINE_CORDON: '#444444',
    OFFLINE_CORDON: '#444444',
    PROVISIONING: '#FFFFFF',
    PROVISIONED: '#FFFFFF',
    INSTALLED: '#FFFFFF',
    UNINSTALLING: '#FFFFFF',
    DECOMISIONING: '#444444',
    INSTALL_IN_PROGRESS: '#FFFFFF',
    SCALING: '#444444',
    FAILURE: '#FFFFFF',
    UNKNOWN: '#FFFFFF',
    ERROR: '#FFFFFF',
    OTHER: '#444444'
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

  constructor() {
    this.graphData = new GraphData([], []);
    this.graphReset = false;
    this.instances = [];
    this.orientation = 'TB';
    this.curve = shape.curveBasis;
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
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Graph options
   */
  graphData: GraphData<any[]>;
  graphReset: boolean;
  orientation: string;
  curve: any;
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
  colorScheme: any;
  /**
   * Search process
   */
  searchTermGraph: string;

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
      case ClusterStatus.Running:
      case ClusterStatus.Online:
        return ToolsComponent.STATUS_COLORS.RUNNING;
      case ClusterStatus.OnlineCordon:
        return ToolsComponent.STATUS_COLORS.ONLINE_CORDON;
      case ClusterStatus.Installed:
        return ToolsComponent.STATUS_COLORS.INSTALLED;
      case ClusterStatus.Error:
      case AppStatus.DeploymentError:
      case AppStatus.Incomplete:
      case AppStatus.PlanningError:
      case AppStatus.Error:
        return ToolsComponent.STATUS_COLORS.ERROR;
      case ClusterStatus.Provisioning:
        return ToolsComponent.STATUS_COLORS.PROVISIONING;
      case ClusterStatus.Provisioned:
        return ToolsComponent.STATUS_COLORS.PROVISIONED;
      case ClusterStatus.InstallInProgress:
        return ToolsComponent.STATUS_COLORS.INSTALL_IN_PROGRESS;
      case ClusterStatus.Uninstalling:
        return ToolsComponent.STATUS_COLORS.UNINSTALLING;
      case ClusterStatus.Decomisioning:
        return ToolsComponent.STATUS_COLORS.DECOMISIONING;
      case AppStatus.Queued:
      case AppStatus.Deploying:
      case AppStatus.Scheduled:
      case AppStatus.Planning:
        return ToolsComponent.STATUS_COLORS.OTHER;
      case ClusterStatus.Offline:
        return ToolsComponent.STATUS_COLORS.OFFLINE;
      case ClusterStatus.OfflineCordon:
        return ToolsComponent.STATUS_COLORS.OFFLINE_CORDON;
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
      case ClusterStatus.Running:
      case ClusterStatus.Online:
      case ClusterStatus.OnlineCordon:
      case ClusterStatus.Installed:
        return ToolsComponent.STATUS_TEXT_COLORS.RUNNING;
      case ClusterStatus.Error:
      case AppStatus.DeploymentError:
      case AppStatus.Incomplete:
      case AppStatus.PlanningError:
      case AppStatus.Error:
        return ToolsComponent.STATUS_TEXT_COLORS.ERROR;
      case ClusterStatus.Provisioning:
      case ClusterStatus.Provisioned:
      case ClusterStatus.InstallInProgress:
      case ClusterStatus.Uninstalling:
      case ClusterStatus.Decomisioning:
      case AppStatus.Queued:
      case AppStatus.Deploying:
      case AppStatus.Scheduled:
      case AppStatus.Planning:
        return ToolsComponent.STATUS_TEXT_COLORS.OTHER;
      case ClusterStatus.Offline:
      case ClusterStatus.OfflineCordon:
      case ClusterStatus.Unknown:
        return ToolsComponent.STATUS_TEXT_COLORS.OFFLINE;
      default:
        return ToolsComponent.STATUS_TEXT_COLORS.OTHER;
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
  getAppsInCluster(clusterId: string): any[] {
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
  getMarker(link: { [x: string]: any; is_between_apps: any; }, origin: string) {
    const index = this.graphData.nodes.map((x: { id: any; }) => x.id).indexOf(link[origin]);
    if (index !== -1) {
      if (link.is_between_apps) {
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
  getStyledNode(color: string, textColor: string, customBorderColor: string, customBorderWidth: number, customHeight: number): {} {
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
          node[connection_type].forEach((connection: { source_instance_id: any; target_instance_id: any; }) => {
            const source = connection.source_instance_id;
            const target = connection.target_instance_id;
            const isSourceNode = this.graphData.nodes.filter(item => item.id === source).length > 0;
            const isTargetNode = this.graphData.nodes.filter(item => item.id === target).length > 0;
            if (isSourceNode && isTargetNode) {
              linksBetweenApps[ source + '_' + target] = {
                source: source,
                target: target,
                is_between_apps: true
              };
            }
          });
        });
      }
    });
    this.graphData.links.push(...Object.values(linksBetweenApps));
  }
  generateClusterNode(cluster: any, tooltip: string): any {
    const clusterName = cluster.name.toLowerCase();
    const status = cluster.state ? (cluster.state === ClusterStatus.Installed ? cluster.status_name : cluster.state) : cluster.status_name;
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
                            ToolsComponent.FOUND_NODES_BORDER_SIZE : 0,
          ToolsComponent.CUSTOM_HEIGHT_CLUSTERS)
    };
  }
  generateInstanceNode(instance: ApplicationInstance, cluster: any, tooltip: string): any {
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
