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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Backend } from '../../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../../services/backend.service';
import { NotificationsService } from '../../services/notifications.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { ServiceInstancesInfoComponent } from './service-instances-info/service-instances-info.component';
import { RuleInfoComponent } from '../rule-info/rule-info.component';
import { TranslateService } from '@ngx-translate/core';
import { InstanceServiceGroupInfoComponent } from './instance-service-group-info/instance-service-group-info.component';
import { ServicesStatus } from '../../definitions/enums/services-status.enum';
import { InstanceInfoService } from './instance-info.service';
import { ApplicationDescriptor } from '../../definitions/models/application-descriptor';
import { ServiceGroupInstance } from '../../definitions/interfaces/service-group-instance';
import { ApplicationInstance } from '../../definitions/models/application-instance';
import { Subscription, timer } from 'rxjs';
import { GraphData } from '../../definitions/models/graph-data';
import { ColorScheme } from '../../definitions/interfaces/color-scheme';
import { KeyValue } from '../../definitions/interfaces/key-value';
import { ServiceInstance } from '../../definitions/interfaces/service-instance';

@Component({
  selector: 'app-instance-info',
  templateUrl: './instance-info.component.html',
  styleUrls: ['./instance-info.component.scss']
})
export class InstanceInfoComponent implements OnInit, OnDestroy {
  /**
   * Refresh ratio reference
   */
  private static REFRESH_RATIO = 5000;
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold organization ID
   */
  organizationId: string;
  /**
   * Loaded Data status
   */
  loadedData: boolean;
  /**
   * Model that hold organization ID
   */
  instanceId: string;
  /**
   * Model that hold instance
   */
  instance: ApplicationInstance;
  enabled: boolean;
  openFromInstance: boolean;
  /**
   * Registered instances list
   */
  registered: ApplicationDescriptor[];
  /**
   * List of available services groups
   */
  groups: ServiceGroupInstance[];
  /**
   * List of labels
   */
  labels: KeyValue;
  isSelectableLabel: boolean;
  /**
   * Open form registered reference
   */
  isOpenFromRegistered: boolean;
  /**
   * Interval reference
   */
  refreshIntervalRef: Subscription;
  /**
   * Hold request error message or undefined
   */
  requestError: string;
  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  reverse: boolean;
  sortedByRules: string;
  reverseRules: boolean;
  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;
  searchTermRules: string;
  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;
  filterFieldRules: boolean;
  /**
   * Reference for the service that allows the modal component
   */
  modalRef: BsModalRef;
  /**
   *  Show the services graph tab
   */
  showGraph: boolean;
  /**
   * Accordion options
   */
  nalejAccordion = 'nalejAccordion';
  isFirstOpen = true;
  /**
   * Graph options
   */
  graphReset: boolean;
  graphDataLoaded: boolean;
  graphData: GraphData;
  orientation: string;
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  colorScheme: ColorScheme;
  width: number;
  height: number;
  draggingEnabled: boolean;
  nextColorIndex: number;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private instanceInfoService: InstanceInfoService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.openFromInstance = true;
    this.labels = [];
    this.isSelectableLabel = false;
    this.isOpenFromRegistered = false;
    this.groups = [];
    this.instance = new ApplicationInstance('', '', '');
    this.registered = [];
    this.requestError = '';
    this.showGraph = true;
    this.enabled = false;
    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.sortedByRules = '';
    this.reverseRules = false;
    this.searchTerm = '';
    this.searchTermRules = '';
    // Filter field
    this.filterField = false;
    this.filterFieldRules = false;
     // Graph initialization
    this.graphReset = false;
    this.orientation = 'TB';
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = true;
    this.draggingEnabled = false;
    this.colorScheme = {
      domain: ['#6C86F7']
    };
    this.graphDataLoaded = false;
    this.graphData = new GraphData([], []);
    this.nextColorIndex = 0;
    this.loadedData = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.instanceId = params['instanceId']; // (+) converts string 'id' to a number
    });
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
        if (this.organizationId !== null) {
          this.refreshIntervalRef
            = timer(0, InstanceInfoComponent.REFRESH_RATIO)
              .subscribe(() => {
                this.updateInfo();
              });
        }
    }
  }

  ngOnDestroy() {
    this.refreshIntervalRef.unsubscribe();
  }
  /**
   * Sortby pipe in the component
   * @param categoryName the name of the chosen category
   */
  setOrder(list: string, categoryName: string) {
    if (list === this.translateService.instant('apps.instance.servicesList')) {
      if (this.sortedBy === categoryName) {
        this.reverse = !this.reverse;
        this.filterField = false;
      }
      this.sortedBy = categoryName;
      this.filterField = true;
    } else if (list === this.translateService.instant('apps.instance.rulesList')) {
      if (this.sortedByRules === categoryName) {
        this.reverseRules = !this.reverseRules;
        this.filterFieldRules = false;
      }
      this.sortedByRules = categoryName;
      this.filterFieldRules = true;
    }
  }
  /**
   * Reset all the filters fields
   */
  resetFilters(list: string) {
    if (list === this.translateService.instant('apps.instance.servicesList')) {
      this.filterField = false;
      this.searchTerm = '';
      this.sortedBy = '';
    } else if (list === this.translateService.instant('apps.instance.rulesList')) {
      this.filterFieldRules = false;
      this.searchTermRules = '';
      this.sortedByRules = '';
    }
  }
  /**
   * Gets the category headers to add a class
   * @param categoryName the class for the header category
   */
  getCategoryCSSClass(list: string, categoryName: string) {
    if (list === this.translateService.instant('apps.instance.rulesList')) {
      if (this.sortedByRules === '') {
        return this.translateService.instant('devices.default');
      } else {
        if (this.sortedByRules === categoryName) {
          return this.translateService.instant('devices.enabled');
        } else if (this.sortedByRules !== categoryName) {
          return this.translateService.instant('devices.disabled');
        }
      }
    } else if (list === this.translateService.instant('apps.instance.servicesList')) {
      if (this.sortedBy === '') {
        return this.translateService.instant('devices.default');
      } else {
        if (this.sortedBy === categoryName) {
          return this.translateService.instant('devices.enabled');
        } else if (this.sortedBy !== categoryName) {
          return this.translateService.instant('devices.disabled');
        }
      }
    }
  }
  /**
   * Returns the descriptor
   * @param instance Instance app
   */
  getDescriptorFromInstance(instance: ApplicationInstance): ApplicationDescriptor[] {
    return this.registered.filter(x => x.app_descriptor_id === instance.app_descriptor_id);
  }
  /**
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app) {
    let message = this.translateService.instant('apps.instance.undeployConfirm', { appName: app.name });
    if (app.inbound_connections || app.outbound_connections) {
      message = this.translateService.instant('apps.instance.undeployDoubleCheckConfirm', { appName: app.name });
    }
    const undeployConfirm = confirm(message);
    if (undeployConfirm) {
      this.backend.undeploy(this.organizationId, app.app_instance_id, {user_confirmation: true})
          .subscribe(() => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.instance.undeployMessage', { appName: app.name })
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
        });
    }
  }
  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case ServicesStatus.ServiceRunning:
        return className.toLowerCase() === ServicesStatus.ServiceRunning;
      case ServicesStatus.ServiceError:
        return className.toLowerCase() === ServicesStatus.ServiceError;
      case ServicesStatus.ServiceWaiting:
        return className.toLowerCase() === ServicesStatus.ServiceWaiting;
      default:
        return (className.toLowerCase() === ServicesStatus.ServiceWaiting);
    }
  }
  /**
   * Shows the graph in services card
   *  @param type type name
   */
  selectDisplayMode(type: string) {
    if (type === this.translateService.instant('graph.typeList')) {
      this.showGraph = false;
    } else if (type === this.translateService.instant('graph.typeGraph')) {
      this.showGraph = true;
    }
  }
  /**
   * Open services info modal window
   *  @param service service object
   */
  openServicesInfo(service) {
    const initialState = {
      organizationId: this.organizationId,
      serviceId: service.service_group_id,
      instanceId: service.service_instance_id,
      appDescriptorId: service.app_descriptor_id,
      appInstanceId: service.app_instance_id,
      environmentVariables: service.environment_variables,
      exposedPorts: service.exposed_ports,
      image: service.image,
      name: service.name,
      groupId: service.service_group_id,
      groupInstanceId: service.service_group_instance_id,
      replicas: service.replicas,
      specs: service.specs,
      statusName: service.status_name,
      typeName: service.type_name,
      endpoints: service.endpoints,
      credentials : service.credentials,
      dockerRepository: service.docker_repository,
      deployAfter: service.deploy_after,
      deployedOnCluster: service.deployed_on_cluster_id,
      labels: service.labels,
    };
    this.modalRef = this.modalService.show(ServiceInstancesInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }
  /**
   * Open group services info modal window
   *  @param group group object
   *  @param event event object
   */
  openGroupServicesInfo(group, event) {
    event.stopPropagation();
    const initialState = {
      organizationId: this.organizationId,
      appDescriptorId: group.app_descriptor_id,
      appInstanceId: group.app_instance_id,
      policyName: group.policy_name,
      name: group.name,
      serviceGroupId: group.service_group_id,
      serviceGroupInstanceId: group.service_group_instance_id,
      serviceInstances: group.service_instances,
      status: group.status_name,
      globalFqdn: group.global_fqdn,
      metadata: group.metadata
    };
    this.modalRef = this.modalService.show(InstanceServiceGroupInfoComponent,
      { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }
  /**
   * Open rules info modal window
   * @param rule rule object
   */
  openRulesInfo(rule) {
    const initialState = {
      organizationId: this.organizationId,
      ruleId: rule.rule_id,
      access: rule.access_name,
      appDescriptorId: rule.app_descriptor_id,
      authServices: rule.auth_services,
      authServiceGroupName: rule.auth_service_group_name,
      name: rule.name,
      targetPort: rule.target_port,
      targetServiceGroupName: rule.target_service_group_name,
      targetServiceName: rule.target_service_name,
      deviceGroupIds: rule.device_group_ids,
      deviceGroupNames: rule.device_group_names,
    };
    this.modalRef = this.modalService.show(RuleInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }
  /**
   * Gets beauty status name
   * @param status status object
   */
  getBeautyStatusName(status: string) {
    this.instanceInfoService.getBeautyStatusName(status);
  }
  /**
   * Returns the length of service instances group
   */
  countGroupServices() {
    let counter = 0;
    if (this.instance && this.instance.groups) {
      this.instance.groups.forEach(group => {
        counter += group.service_instances.length;
      });
      return counter;
    } else {
      return 0;
    }
  }
  /**
   * Return the list of group services
   * @param groupId Group identifier
   */
  getGroupServices(groupId: string): ServiceInstance[] {
    const index = this.groups
      .map(x => x.service_group_instance_id)
      .indexOf(groupId);
    if (index === -1) {
      return [];
    } else {
      return this.groups[index].service_instances;
    }
  }
  /**
   * Adds https in case of being required
   * @param endpoint String containing the endpoint
   */
  getEndpointHref(endpoint: string) {
    let URL = '';
    if (!endpoint.startsWith('http') && !endpoint.startsWith('https')) {
      URL = 'http://' + endpoint;
    } else {
      URL = endpoint;
    }
    return URL;
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
   * Request the list of registered apps and updates the instance info
   */
  private updateInfo() {
    this.backend.getRegisteredApps(this.organizationId)
      .subscribe(registeredAppsResponse => {
        this.registered = registeredAppsResponse.descriptors;
        this.updateInstanceInfo(this.organizationId);
      });
  }
  /**
   * Transforms the data needed to create the graph
   * @param instance instance object
   */
  private toGraphData(instance) {
    this.instanceInfoService.toGraphData(instance);
    this.graphData = this.instanceInfoService.graphData;
    this.graphDataLoaded = true;
  }
  /**
   * Requests an updated list of available services group to update the current one
   * @param organizationId Organization identifier
   */
  private updateInstanceInfo(organizationId: string) {
    if (organizationId !== null) {
      // Requests an updated services group list
      this.backend.getAppInstance(this.organizationId,  this.instanceId)
      .subscribe(instance => {
          if (this.anyChanges(this.instance, instance)) {
            if (instance.labels) {
              const labelsLikeArray = [];
              Object.keys(instance.labels).forEach(label => {
                labelsLikeArray.push({key: label, value: instance.labels[label], selected: false});
              });
              instance.labels = labelsLikeArray;
            }
            this.instance = instance;
            this.groups = instance.groups || [];
            this.toGraphData(instance);
            if (!this.loadedData) {
              this.loadedData = true;
            }
          }
      }, errorResponse => {
          this.loadedData = true;
          this.requestError = errorResponse.error.message;
        });
    }
  }
  /**
   * Compares the status of each instance service to determine if there are changes in the instances
   * @param instanceOutdated Outdated instance object
   * @param instanceUpdated Updated instance object
   */
  private anyChanges(instanceOutdated, instanceUpdated) {
    let anyChanges = false;
    const instanceOutdatedServices = [];
    const instanceUpdatedServices = [];
    if (!instanceOutdated ||
        !instanceOutdated.groups ||
        !instanceUpdated ||
        !instanceUpdated.groups ||
        (instanceOutdated.groups.length !== instanceUpdated.groups.length)) {
      return true;
    }
    // Creating arrays of services to compare
    instanceOutdated.groups.forEach(group => {
      group.service_instances.forEach(service => {
        instanceOutdatedServices.push({
            id: group.service_group_instance_id + service.service_instance_id,
            status: service.status_name
          });
      });
    });
    instanceUpdated.groups.forEach(group => {
      group.service_instances.forEach(service => {
        instanceUpdatedServices.push({
            id: group.service_group_instance_id + service.service_instance_id,
            status: service.status_name
          });
      });
    });
    // Check if there is any difference in the status
    instanceOutdatedServices.forEach(service => {
      const index = instanceUpdatedServices.map(x => x.id).indexOf(service.id);
      if (index !== -1) {
        if (instanceUpdatedServices[index].status !== service.status) {
          anyChanges = true;
        }
      } else {
        anyChanges = true;
      }
    });
    return anyChanges;
  }
  /**
   * Show the graph and hides the services table
   * @param displayGraph show if the graph is displayed
   */
  onShowGraph(displayGraph: boolean) {
    this.showGraph = displayGraph;
  }
}
