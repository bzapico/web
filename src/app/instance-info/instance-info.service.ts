import { Injectable } from '@angular/core';
import { AccessType } from '../definitions/enums/access-type.enum';
import { TranslateService } from '@ngx-translate/core';

const STATUS_COLORS = {
  RUNNING: '#00E6A0',
  ERROR: '#F7478A',
  OTHER: '#FFEB6C'
};
const STATUS_TEXT_COLORS = {
  RUNNING: '#FFFFFF',
  ERROR: '#FFFFFF',
  OTHER: '#444444'
};

@Injectable({
  providedIn: 'root'
})
export class InstanceInfoService {

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
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.serviceRunning'):
        return STATUS_COLORS.RUNNING;
      case this.translateService.instant('status.serviceError'):
        return STATUS_COLORS.ERROR;
      case this.translateService.instant('status.serviceWaiting'):
        return STATUS_COLORS.OTHER;
      default:
        return STATUS_COLORS.OTHER;
    }
  }

  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.serviceRunning'):
        return STATUS_TEXT_COLORS.RUNNING;
      case this.translateService.instant('status.serviceError'):
        return STATUS_TEXT_COLORS.ERROR;
      case this.translateService.instant('status.serviceWaiting'):
        return STATUS_TEXT_COLORS.OTHER;
      default:
        return STATUS_TEXT_COLORS.OTHER;
    }
  }

  toGraphData(instance) {
    this._graphData = {
      nodes: [],
      links: []
    };
    this._isGeneratedPublicRule = false;
    this._publicRule = null;
    if (instance && instance.groups) {
      instance.groups.forEach(group => {
        const nodeGroup = {
          id: group.service_group_instance_id,
          label: group.name,
          tooltip: this.translateService.instant('graph.group')
              + group.name
              + ': '
              + this.getBeautyStatusName(group.status_name),
          color: this.getNodeColor(group.status_name),
          text: {
            color: this.getNodeTextColor(group.status_name)
          },
          shape: 'rectangle',
          customHeight: 34,
          group: group.service_group_instance_id,
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
        if (instance.rules) {
          instance.rules.forEach(rule => {
            if (rule.access_name === AccessType.InboundAppnet && !rule['inbound_net_interface']) {
              rule['inbound_net_interface'] = instance.inbound_net_interfaces.map(connection => connection.name)[0];
            } else if (rule.access_name === AccessType.OutboundAppnet && !rule['outbound_net_interface']) {
              rule['outbound_net_interface'] = instance.outbound_net_interfaces.map(connection => connection.name)[0];
            }
          });
          instance.rules.forEach(rule => {
            this.setPublicConnections(rule, group);
          });
        }
      });
    }
    if (instance.rules) {
      this.setInboundConnections(instance);
      this.generateOutboundConnections(instance);
    }
    if (instance.rules) {
      instance.rules.forEach(rule => {
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
    group.service_instances.forEach(service => {
      const nodeService = {
        id: group.service_group_instance_id + '-s-' + service.service_id,
        label: service.name,
        tooltip:
            this.translateService.instant('graph.service')
            + service.name
            + ': ' + this.getBeautyStatusName(service.status_name),
        color: this.getNodeColor(service.status_name),
        text: {
          color: this.getNodeTextColor(group.status_name)
        },
        shape: 'rectangle',
        customHeight: 34,
        group: group.service_group_instance_id
      };
      this._graphData.nodes.push(nodeService);
      this._graphData.links.push({
        source: group.service_group_instance_id,
        target: group.service_group_instance_id + '-s-' + service.service_id
      });
    });
  }

  private setInboundConnections(instance) {
    if (instance.inbound_net_interfaces && instance.inbound_net_interfaces.length > 0 ) {
      const inbounds = {};
      instance.inbound_net_interfaces.forEach(inbound => {
        inbounds[inbound.name + '_i_' + instance.app_instance_id] = {
          id: inbound.name + '_i_' + instance.app_instance_id,
          label: inbound.name,
          tooltip: this.translateService.instant('graph.inbound') + inbound.name,
          color: this.isConnectedBound('inbound', instance.inbound_connections, inbound).isConnected ? '#00E6A0' : '#5800FF',
          text: {
            color: '#000',
            y: 0
          },
          secondaryText: {
            text: this.isConnectedBound('inbound', instance.inbound_connections, inbound).secondaryName,
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
      this.setInboundLinks(Object.values(inbounds), instance);
    }
  }

  private generateOutboundConnections(instance) {
    if (instance.outbound_net_interfaces && instance.outbound_net_interfaces.length > 0 ) {
      const outbounds = {};
      instance.outbound_net_interfaces.forEach(outbound => {
        outbounds[outbound.name + '_i_' + instance.app_instance_id] = {
          id: outbound.name + '_i_' + instance.app_instance_id,
          label: outbound.name,
          tooltip: this.translateService.instant('graph.outbound') + outbound.name,
          color: this.isConnectedBound('outbound', instance.outbound_connections, outbound).isConnected ? '#00E6A0' : '#5800FF',
          text: {
            color: '#000',
            y: 0,
          },
          secondaryText: {
            text: this.isConnectedBound('outbound', instance.outbound_connections, outbound).secondaryName,
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
      this.setOutboundLinks(Object.values(outbounds), instance);
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

  private setInboundLinks(inbounds, instance) {
    inbounds.forEach(inbound => {
      const filteredData = instance.rules.filter(rule => inbound.label === rule.inbound_net_interface);
      if (filteredData.length > 0) {
        const nodeTarget = this._graphData.nodes.filter(node => node.label === filteredData[0]['target_service_name']);
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

  private setOutboundLinks(outbounds, instance) {
    outbounds.forEach(outbound => {
      const filteredData = instance.rules.filter(rule => outbound.label === rule.outbound_net_interface);
      if (filteredData.length > 0 ) {
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
    group.service_instances.forEach(service => {
      if (service.name === rule.target_service_name) {
        this._graphData.links.push({
          source: this._publicRule ? this._publicRule.rule_id : rule.rule_id,
          target: group.service_group_instance_id + '-s-' + service.service_id,
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
        this.setPublicRulesNodes(rule,);
        this.setRulesLinks(rule, group);
        this._isGeneratedPublicRule = true;
      }
    }
  }
}
