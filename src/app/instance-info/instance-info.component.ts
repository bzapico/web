import { Component, OnInit, HostListener } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import * as shape from 'd3-shape';
import { ServiceInstancesInfoComponent } from '../service-instances-info/service-instances-info.component';
import { RuleInfoComponent } from '../rule-info/rule-info.component';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-instance-info',
  templateUrl: './instance-info.component.html',
  styleUrls: ['./instance-info.component.scss']
})
export class InstanceInfoComponent implements OnInit {

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
  instance: any;
  enabled: boolean;

  /**
   * Registered instances list
   */
  registered: any[];

  /**
   * List of available services
   */
  services: any[];

  /**
   * Models that hold the active group
   */
  activeGroupId: string;

  /**
   * List of available services groups
   */
  groups: any[];

  /**
   * List of labels
   */
  labels: any[];

  /**
   * Models that keeps the displayed groups names length
   */
  displayedGroupsNamesLength: number;
  maxLabelsLength: number;

  /**
   * List of active displayed group
   */
  displayedGroups: any[];

  /**
   * Count of num max for displayed groups
   */
  DISPLAYED_GROUP_MAX = 4;

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
   * NGX-Graphs object-assign required object references (for rendering)
   */
  mockServicesGraph: any;

  /**
   * Graph options
   */
  graphDataLoaded: boolean;
  showlegend: boolean;
  graphData: any;
  orientation: string;
  curve: any;
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  colorScheme: any;
  view: any[];
  width: number;
  height: number;
  draggingEnabled: boolean;
  nalejColorScheme: string[];
  nextColorIndex: number;
  STATUS_COLORS = {
    RUNNING: '#0937FF',
    ERROR: '#F25272',
    OTHER: '#03D7E8'
  };

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    // Default initialization
    this.labels = [];
    this.groups = [];
    this.instance = {
        groups: [],
        environment_variables: {},
        configuration_options: {}
      };
    this.registered = [];
    this.displayedGroups = [];
    this.activeGroupId = 'ALL';
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
     this.showlegend = false;
     this.orientation = 'TB';
     this.curve = shape.curveBasis;
     this.autoZoom = true;
     this.autoCenter = true;
     this.enableZoom = true;
     this.draggingEnabled = false;
     this.colorScheme = {
       domain: ['#6C86F7']
     };
     this.graphDataLoaded = false;
     this.graphData = {
       nodes: [],
       links: []
     };



     this.nalejColorScheme = [
       '#1725AE',
       '#040D5A',
       '#0F1B8C',
       '#01073A',
       '#091374'
     ];
     this.nextColorIndex = 0;

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
          this.backend.getRegisteredApps(this.organizationId)
            .subscribe(registeredAppsResponse => {
              this.registered = registeredAppsResponse.descriptors;
            });
          this.updateInstanceInfo(this.organizationId);
        }
        this.updateDisplayedGroupsNamesLength();
    }
    this.backend.getAppInstance(this.organizationId,  this.instanceId)
    .subscribe(instance => {
        this.instance = instance;
        if (!this.loadedData) {
          this.loadedData = true;
        }
    });
  }

  /**
   * Transforms the data needed to create the grapho
   * @param instance instance object
   */
  toGraphData(instance) {
    if (instance && instance.groups) {
      instance.groups.forEach(group => {
        const nodeGroup = {
          id: group.service_group_instance_id,
          label: group.name,
          tooltip: 'GROUP ' + group.name + ': ' + this.getBeautyStatusName(group.status_name),
          color: this.getNodeColor(group.status_name),
          group: group.service_group_instance_id
        };
        this.graphData.nodes.push(nodeGroup);
        group.service_instances.forEach(service => {
          const nodeService = {
            id: group.service_group_instance_id + '-s-' + service.service_id,
            label: service.name,
            tooltip: 'SERVICE ' + service.name + ': ' + this.getBeautyStatusName(service.status_name),
            color: this.getNodeColor(service.status_name),
            group: group.service_group_instance_id
          };
          this.graphData.nodes.push(nodeService);
          this.graphData.links.push({
            source: group.service_group_instance_id,
            target: group.service_group_instance_id + '-s-' + service.service_id
          });
        });

      });
    }

    if (instance.rules) {
      instance.rules.forEach(rule => {
        if (rule.auth_services) {
          rule.auth_services.forEach(linkedService => {
            const sourceIndex = this.graphData.nodes.map(x => x.label).indexOf(rule.target_service_name);
            const targetIndex = this.graphData.nodes.map(x => x.label).indexOf(linkedService);
            const link = {
              target: this.graphData.nodes[sourceIndex].id,
              source: this.graphData.nodes[targetIndex].id,
            };
            this.graphData.links.push(link);
          });
        }
      });
    }
    this.graphDataLoaded = true;
  }

  /**
   * Get arrow color depending on node source color
   * @param sourceId Link source identifier
   */
  getArrowColor (sourceId: string): string {
    const index = this.graphData.nodes.map(x => x.id).indexOf(sourceId);
    if (index !== -1) {
      return this.graphData.nodes[index].color;
    }
  }

  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'service_running':
        return this.STATUS_COLORS.RUNNING;
      break;
      case 'service_error':
        return this.STATUS_COLORS.ERROR;
      break;
      case 'service_waiting':
        return this.STATUS_COLORS.OTHER;
      break;
      default:
        return this.STATUS_COLORS.OTHER;
    }
  }

  /**
   * Transforms objects to arrays to be parsed to string and performed in the view
   */
  instanceLabelsToString() {
    if (this.instance && this.instance.labels) {
      return Object.entries(this.instance.labels);
    }
  }
  /**
   * Transforms objects to arrays to be parsed to string and performed in the view
   * @param object Key-value map that contains the object
   */
  objectToString(object) {
    if (Object.entries(object)) {
      return Object.entries(object);
    }
  }

  /**
   * Calculates the number of characters needed to hide the title of tabs, breakpoints calculated through manual testing
   * @param event to pass in onResize method
   */
  @HostListener('window:resize', ['$event'])
    onResize(event) {
      if (event.target.innerWidth < 1280) {
        this.maxLabelsLength = 55;
      } else if (event.target.innerWidth < 1440) {
        this.maxLabelsLength = 65;
      } else if (event.target.innerWidth < 1613) {
        this.maxLabelsLength = 75;
      } else if (event.target.innerWidth < 1920) {
        this.maxLabelsLength = 85;
      } else {
        this.maxLabelsLength = 100;
      }
    }

  /**
   * Parse to string labels map
   * @param labels Key-value map that contains the labels
   */
  labelsToString(labels: any) {
    if (!labels || labels === '-') {
      return ;
    }
    return Object.entries(labels);
  }

  /**
   * Changes to active group
   * @param groupId service group identifier
   */
  changeActiveGroup(groupId: string) {
    this.activeGroupId = groupId;
  }

  /**
   * Checks if the service group is active to show in the tabs
   * @param groupId service group identifier
   */
  amIactive(groupId) {
    if (groupId === this.activeGroupId) {
      return 'active';
    }
    // Empty class when is not active
    return '';
  }

  /**
   * Checks if there are less than a maximum number groups in groups list
   * @param groups groups list identifier
   */
  haveIGroups(groups) {
    if (groups.length > this.DISPLAYED_GROUP_MAX) {
      return '';
    }
    return 'opacity';
  }

  /**
   * Sortby pipe in the component
   * @param categoryName the name of the chosen category
   */
  setOrder(list: string, categoryName: string) {
    if (list === 'services') {
      if (this.sortedBy === categoryName) {
        this.reverse = !this.reverse;
        this.filterField = false;
      }
      this.sortedBy = categoryName;
      this.filterField = true;
    } else if (list === 'rules') {
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
    if (list === 'services') {
      this.filterField = false;
      this.searchTerm = '';
      this.sortedBy = '';
    } else if (list === 'rules') {
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
    if (list === 'rules') {
      if (this.sortedByRules === '') {
        return 'default';
      } else {
        if (this.sortedByRules === categoryName) {
          return 'enabled';
        } else if (this.sortedByRules !== categoryName) {
          return 'disabled';
        }
      }
    } else if (list === 'services') {
      if (this.sortedBy === '') {
        return 'default';
      } else {
        if (this.sortedBy === categoryName) {
          return 'enabled';
        } else if (this.sortedBy !== categoryName) {
          return 'disabled';
        }
      }
    }
  }

  /**
   * Updates the displayed groups chars length to calculate the number of letters displayed according to the size of the viewport
   */
  updateDisplayedGroupsNamesLength() {
    this.displayedGroupsNamesLength = 0;
    this.displayedGroups.forEach(group => {
      this.displayedGroupsNamesLength += group.name.length;
    });
  }

  /**
   * Displayed groups list swipes left by pressing the arrow button functionality
   */
  swipeLeft() {
    const index = this.groups.map(x => x.service_group_instance_id).indexOf(this.displayedGroups[0].service_group_instance_id);
    if (index !== -1 && index > 0) {
      this.displayedGroups.unshift(this.groups[index - 1]);
      this.displayedGroups.pop();
      this.updateDisplayedGroupsNamesLength();
    }
  }

  /**
   * Displayed groups list swipes right by pressing the arrow button functionality
   */
  swipeRight() {
    const index = this.groups
      .map(x => x.service_group_instance_id)
      .indexOf(this.displayedGroups[this.displayedGroups.length - 1].service_group_instance_id);
    if (index !== -1 && this.groups[index + 1]) {
      this.displayedGroups.push(this.groups[index + 1]);
      this.displayedGroups.shift();
    }
    this.updateDisplayedGroupsNamesLength();
  }

   /**
   * Requests an updated list of available services group to update the current one
   * @param organizationId Organization identifier
   */
  updateInstanceInfo(organizationId: string) {
    if (organizationId !== null) {
      // Requests an updated services group list
      this.backend.getAppInstance(this.organizationId,  this.instanceId)
      .subscribe(instance => {
          this.instance = instance;
          this.groups = instance.groups || [];
          if (this.displayedGroups.length === 0 && this.groups.length > 0) {
            for (let index = 0; index < this.groups.length && index < this.DISPLAYED_GROUP_MAX; index++) {
              this.displayedGroups.push(this.groups[index]);
            }
          }
          this.toGraphData(instance);
          this.updateDisplayedGroupsNamesLength();
          if (!this.loadedData) {
            this.loadedData = true;
          }
      }, errorResponse => {
          this.loadedData = true;
          this.requestError = errorResponse.error.message;
        });
    }
  }

  /**
   * Returns the descriptor beauty name
   * @param descriptorId Descriptor identifier
   */
  getDescriptorName(descriptorId: string) {
    const index =
    this.registered
        .map(x => x.app_descriptor_id).
        indexOf(descriptorId);
    if (index !== -1) {
      return this.registered[index].name;
    }
  }

   /**
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app) {
    const undeployConfirm = confirm('Undeploy ' + app.name + '?');
    if (undeployConfirm) {
      this.backend.undeploy(this.organizationId, app.app_instance_id)
        .subscribe(undeployResponse => {
          this.notificationsService.add({
            message: 'Undeploying ' + app.name,
            timeout: 3000
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: 5000
          });
        });
    }
  }

  /**
   * Checks if the cluster status requires an special css class
   * @param className CSS class name
   */
  instanceClassStatusCheck(className: string): boolean {
    if (this.instance && this.instance.status_name) {
      switch (this.instance.status_name.toLowerCase()) {
        case 'running': {
          if (className.toLowerCase() === 'running') {
            return true;
          }
          break;
        }
        case 'error': {
          if (className.toLowerCase() === 'error') {
            return true;
          }
          break;
        }
       default: {
          if (className.toLowerCase() === 'other') {
            return true;
          }
          return false;
        }
      }
    }
  }

  /**
   * Depending on the service status, returns the css class name that is required
   * @param status Service status string
   */
  getServiceStatusClass (status: string ) {
    switch (status.toLowerCase()) {
      case 'service_running':
        return 'blue';
      break;
      case 'service_error':
        return 'red';
      break;
      case 'service_waiting':
        return 'teal';
      break;
      default:
        return 'teal';
    }
  }


  /**
   * Shows the graph in services card
   */
  selectDisplayMode(type: string) {
    if (type === 'list') {
      this.showGraph = false;
    } else if (type === 'graph') {
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
      enviormentVariables: service.enviroment_variables,
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
   * Return the last specified number of chars of an string
   * @param numberOfChars number of chars to be returned
   * @param text text to substring
   */
  getLastChars(numberOfChars: number, text: string) {
    return text.substr(text.length - numberOfChars, numberOfChars);
  }

  /**
   * Returns the lenght of service instances that are part of the specified active group
   * @param activeGroupId Identifier for the active group
   */
  countGroupServices(groupId: string) {
    if (groupId === 'ALL') {
      let counter = 0;
      if (this.instance && this.instance.groups) {
        this.instance.groups.forEach(group => {
          counter += group.service_instances.length;
        });
        return counter;
      } else {
        return 0;
      }
    } else {
      const index = this.displayedGroups
        .map(x => x.service_group_instance_id)
        .indexOf(groupId);
      if (index !== -1) {
        return this.displayedGroups[index].service_instances.length;
      }
      return 0;
    }
  }

  /**
   * Return the list of group services
   */
  getGroupServices(groupId: string) {
    if (!groupId) {
      return [];
    }
    if (groupId === 'ALL') {
      const services = [];
      if (this.instance && this.instance.groups) {
        this.instance.groups.forEach(group => {
          group.service_instances.forEach(service => {
            services.push(service);
          });
        });
        return services;
      } else {
        return [];
      }
    } else {
      const index = this.displayedGroups
      .map(x => x.service_group_instance_id)
      .indexOf(this.activeGroupId);

      if (index !== -1) {
        return this.displayedGroups[index].service_instances;
      } else {
        return [];
      }
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
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName (rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
  }

  /**
   * Return if the marker is required
   * @param link Link object
   */
  getMarker(link) {
    const index = this.graphData.nodes.map(x => x.id).indexOf(link.source);
    if (index !== -1) {
      if (this.graphData.nodes[index].id === this.graphData.nodes[index].group) {
        return '';
      } else {
        return 'url(#arrow)';
      }
    }
    return 'url(#arrow)';
  }
}
