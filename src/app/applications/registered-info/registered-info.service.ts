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

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccessType } from '../../definitions/enums/access-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RegisteredInfoService {

  private _graphData: any;
  private _isGeneratedPublicRule: boolean;
  private _publicRule: any;

  constructor(
      private translateService: TranslateService) {
    this._graphData = {
      nodes: [],
      links: []
    };
    this._isGeneratedPublicRule = false;
    this._publicRule = null;
  }

  get isGeneratedPublicRule(): boolean {
    return this._isGeneratedPublicRule;
  }

  set isGeneratedPublicRule(value: boolean) {
    this._isGeneratedPublicRule = value;
  }

  get publicRule(): any {
    return this._publicRule;
  }

  set publicRule(value: any) {
    this._publicRule = value;
  }

  get graphData(): any {
    return this._graphData;
  }

  set graphData(value: any) {
    this._graphData = value;
  }

  toGraphData(registered) {
    this._graphData = {
      nodes: [],
      links: []
    };
    this._isGeneratedPublicRule = false;
    this._publicRule = null;
    if (registered && registered.groups) {
      registered.groups.forEach(group => {
        const nodeGroup = {
          id: group.service_group_id,
          label: group.name,
          tooltip: this.translateService.instant('graph.group')
              + group.name,
          color: '#000000',
          text: {
            color: '#FFFFFF'
          },
          shape: 'rectangle',
          customHeight: 34,
          group: group.service_group_id,
          icon: {
            width: 24,
            height: 24,
            x: 14,
            y: 5,
            viewBox: '0 0 24 24',
            paths: [
              {
                fill: '#FFF',
                d: 'M4,11H9V5H4Zm0,7H9V12H4Zm6,0h5V12H10Zm6,0h5V12H16Zm-6-7h5V5H10Zm6-6v6h5V5Z'
              },
              {
                fill: 'none',
                d: 'M0,0H24V24H0Z'
              }
            ]
          }
        };
        this._graphData.nodes.push(nodeGroup);
        this.setServicesInstancesNodesAndLinks(group);
        if (registered.rules) {
          registered.rules.forEach(rule => {
            this.setPublicConnections(rule, group);
          });
        }
      });
    }
    if (registered.rules) {
      this.setInboundConnections( registered);
      this.generateOutboundConnections( registered);
    }
    if (registered.rules) {
      registered.rules.forEach(rule => {
        if (rule.auth_services) {
          rule.auth_services.forEach(authService => {
            const targetsIndex: number[] = [];
            for (let index = 0; index < this._graphData.nodes.length; index++) {
              if (this._graphData.nodes[index].label === rule.target_service_name) {
                targetsIndex.push(index);
              }
            }
            const sourcesIndex: number[] = [];
            for (let index = 0; index < this._graphData.nodes.length; index++) {
              if (this._graphData.nodes[index].label === authService) {
                sourcesIndex.push(index);
              }
            }
            sourcesIndex.forEach(indexSource => {
              targetsIndex.forEach(indexTarget => {
                const link = {
                  source: this._graphData.nodes[indexSource].id,
                  target: this._graphData.nodes[indexTarget].id,
                };
                this._graphData.links.push(link);
              });
            });
          });
        }
      });
    }
  }

  private setServicesInstancesNodesAndLinks(group) {
    group.services.forEach(service => {
      const nodeService = {
        id: group.service_group_id + '-s-' + service.service_id,
        label: service.name,
        tooltip: this.translateService.instant('graph.service') + service.name,
        color: '#000000',
        text: {
          color: '#FFFFFF'
        },
        shape: 'rectangle',
        customHeight: 34,
        group: group.service_group_id
      };
      this._graphData.nodes.push(nodeService);
      this._graphData.links.push({
        source: group.service_group_id,
        target: group.service_group_id + '-s-' + service.service_id
      });
    });
  }

  private setInboundConnections(registered) {
    if (registered.inbound_net_interfaces && registered.inbound_net_interfaces.length > 0 ) {
      const inbounds = {};
      registered.inbound_net_interfaces.forEach(inbound => {
        inbounds[inbound.name + '_i_' + registered.app_descriptor_id] = {
          id: inbound.name + '_i_' + registered.app_descriptor_id,
          label: inbound.name,
          tooltip: this.translateService.instant('graph.inbound') + inbound.name,
          color: this.isConnectedBound('inbound', registered.inbound_connections, inbound).isConnected ? '#5800ff' : '#444444',
          text: {
            color: '#000',
            y: 0
          },
          secondaryText: {
            text: this.isConnectedBound('inbound', registered.inbound_connections, inbound).secondaryName,
            color: '#000'
          },
          shape: 'circle',
          customRadius: 24,
          icon: {
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            paths: [
              {
                fill: 'none',
                d: 'M0 0h24v24H0z'
              },
              {
                fill: '#fff',
                d: 'M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z'
              }
            ]
          }
        };
      });
      this._graphData.nodes.push(...Object.values(inbounds));
      this.setInboundLinks(Object.values(inbounds), registered);
    }
  }

  private generateOutboundConnections( registered) {
    if (registered.outbound_net_interfaces && registered.outbound_net_interfaces.length > 0 ) {
      const outbounds = {};
      registered.outbound_net_interfaces.forEach(outbound => {
        outbounds[outbound.name + '_i_' + registered.app_descriptor_id] = {
          id: outbound.name + '_i_' + registered.app_descriptor_id,
          label: outbound.name,
          tooltip: this.translateService.instant('graph.outbound') + outbound.name,
          color: this.isConnectedBound('outbound', registered.outbound_connections, outbound).isConnected ? '#5800ff' : '#444444',
          text: {
            color: '#000',
            y: 0,
          },
          secondaryText: {
            text: this.isConnectedBound('outbound', registered.outbound_connections, outbound).secondaryName,
            color: '#000'
          },
          shape: 'circle',
          customRadius: 24,
          icon: {
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            paths: [
              {
                fill: 'none',
                d: 'M0,0H24V24H0Z'
              },
              {
                fill: '#fff',
                d: 'M9,5V7h6.59L4,18.59,5.41,20,17,8.41V15h2V5Z'
              }
            ]
          }
        };
      });
      this._graphData.nodes.push(...Object.values(outbounds));
      this.setOutboundLinks(Object.values(outbounds), registered);
    }
  }

  private isConnectedBound(type, instances_connections, bound): {isConnected: boolean, secondaryName: string} {
    const data = {
      inbound: {
        rule: 'inbound_name',
        name: 'source_instance_name'
      },
      outbound: {
        rule: 'outbound_name',
        name: 'target_instance_name'
      }
    };
    let filteredData = [];
    if (instances_connections) {
      filteredData = instances_connections.filter(instance_connection => instance_connection[data[type].rule] === bound.name);
    }
    const isConnected = filteredData.length > 0;
    return {
      isConnected: isConnected,
      secondaryName: isConnected ? filteredData[0][data[type].name] : ''
    };
  }

  private setInboundLinks(inbounds, registered) {
    inbounds.forEach(inbound => {
      const filteredData = registered.rules.filter(rule => inbound.label === rule.inbound_net_interface);
      if (filteredData.length > 0) {
        const nodeTarget =  this._graphData.nodes.filter(node => node.label === filteredData[0]['target_service_name']);
        if (nodeTarget.length > 0) {
          this._graphData.links.push({
            source: inbound.id,
            target: nodeTarget[0].id,
            notMarker: true
          });
        }
      }
    });
  }

  private setOutboundLinks(outbounds, registered) {
    outbounds.forEach(outbound => {
      const filteredData = registered.rules.filter(rule => outbound.label === rule.outbound_net_interface);
      if (filteredData.length > 0) {
        const nodeTarget = this._graphData.nodes.filter(node => node.label === filteredData[0]['target_service_name']);
        if (nodeTarget.length > 0) {
          this._graphData.links.push({
            source: outbound.id,
            target: nodeTarget[0].id,
            notMarker: true
          });
        }
      }
    });
  }

  private setPublicRulesNodes(rule) {
    const ruleNode = {
      id: rule.rule_id,
      label: '',
      tooltip: this.translateService.instant('graph.rule') + rule.name,
      color: '#5800FF',
      text: {
        color: '#000',
        y: 0
      },
      secondaryText: {
        text: 'Public Access',
        color: '#000'
      },
      shape: 'circle',
      customRadius: 24,
      icon: {
        width: 25,
        height: 25,
        viewBox: '0 0 25 25',
        paths: [
          {
            fill: '#ffffff',
            d: 'M21.444,6.216A35.833,35.833,0,0,1,12.485,7.27,35.833,35.833,0,0,1,3.527,6.216' +
                'L3,8.324A37.36,37.36,0,0,0,9.324,9.377v13.7h2.108V16.755h2.108v6.324h2.108' +
                'V9.377a37.36,37.36,0,0,0,6.324-1.054Zm-8.958,0a2.108,2.108,0,1,0-2.108-2.108' +
                'A2.114,2.114,0,0,0,12.485,6.216Z'
          },
          {
            fill: 'none',
            d: 'M0,0H24V24H0Z'
          }
        ]
      }
    };
    this._graphData.nodes.push(ruleNode);
  }

  private setRulesLinks(rule, group) {
    group.services.forEach(service => {
      if (service.name === rule.target_service_name) {
        this._graphData.links.push({
          source: this._publicRule ? this._publicRule.rule_id : rule.rule_id,
          target: group.service_group_id + '-s-' + service.service_id,
          notMarker: true
        });
        if (!this._publicRule) {
          this._publicRule = rule;
        }
      }
    });
  }

  private setPublicConnections(rule, group) {
    if (rule.access_name === AccessType.Public) {
      if (!this._isGeneratedPublicRule) {
        this.setPublicRulesNodes(rule);
        this.setRulesLinks(rule, group);
        this._isGeneratedPublicRule = true;
      }
    }
  }
}
