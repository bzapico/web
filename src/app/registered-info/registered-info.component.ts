import { Component, OnInit, HostListener } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddLabelComponent } from '../add-label/add-label.component';
import { DeployInstanceComponent } from '../deploy-instance/deploy-instance.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as shape from 'd3-shape';
import { AppDescriptor } from '../definitions/interfaces/app-descriptor';
import { mockRegisteredAppsList } from '../utils/mocks';
import { RuleInfoComponent } from '../rule-info/rule-info.component';
import { ServiceInfoComponent } from '../service-info/service-info.component';

@Component({
  selector: 'app-registered-info',
  templateUrl: './registered-info.component.html',
  styleUrls: ['./registered-info.component.scss']
})
export class RegisteredInfoComponent implements OnInit {
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
   * List of available services
   */
  services: any[];

  /**
   * Count of total services for summary card
   */
  servicesCount: number;

  /**
   * Model that hold descriptor ID
   */
  descriptorId: string;

  /**
   * Model that hold registered application descriptor data
   */
  registeredData: AppDescriptor;

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
   * List of selected labels from an entity
   */
  selectedLabels = [];
  entityId: boolean;

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
  sortedByRules: string;
  reverse: boolean;
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
  graphReset: boolean;
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


  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.registeredInfoMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    // Default initialization
    this.services = [];
    this.servicesCount = 0;
    this.labels = [];
    this.displayedGroups = [];
    this.activeGroupId = 'ALL';
    this.requestError = '';
    this.showGraph = true;
    this.registeredData = {
      groups: [],
      environment_variables: {},
      configuration_options: {}
    };
    // SortBy
    this.sortedBy = '';
    this.sortedByRules = '';
    this.reverse = false;
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
     this.graphReset = false;
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
      this.descriptorId = params['registeredId']; // (+) converts string 'id' to a number
   });
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
        if (this.organizationId !== null) {
          this.updateAppDescriptor();
        }
        this.updateDisplayedGroupsNamesLength();
    }
  }

  updateAppDescriptor() {
    this.loadedData = false;
    this.backend.getAppDescriptor(this.organizationId, this.descriptorId)
      .subscribe(registeredResponse => {
        this.registeredData = registeredResponse;
        this.groups = registeredResponse.groups || [];
        if (this.displayedGroups.length === 0 && this.groups.length > 0) {
          for (let index = 0; index < this.groups.length && index < this.DISPLAYED_GROUP_MAX; index++) {
            this.displayedGroups.push(this.groups[index]);
          }
        }
        this.toGraphData(registeredResponse);
        this.updateDisplayedGroupsNamesLength();
        if (!this.loadedData) {
          this.loadedData = true;
        }
      }, errorResponse => {
        this.loadedData = true;
        this.requestError = errorResponse.error.message;
      });
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
      return [];
    }
    return Object.entries(labels);
  }

  /**
   * Opens the modal view that holds add label component
   */
  addLabel(entity) {
    const initialState = {
      organizationId: this.organizationId,
      entityType: 'app',
      entity: entity,
      modalTitle: entity.name
    };

    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateAppDescriptor();
    } );
  }

  /**
   * Deletes a selected label
   * @param entity selected label entity
   */
  deleteLabel(entity) {
    const deleteConfirm = confirm('Delete labels?');
    if (deleteConfirm) {
      const index = this.selectedLabels.map(x => x.entityId).indexOf(entity.app_descriptor_id);
      this.backend.updateAppDescriptor(
        this.organizationId,
        entity.app_descriptor_id,
        {
          organizationId: this.organizationId,
          descriptorId: entity.app_descriptor_id,
          remove_labels: true,
          labels: this.selectedLabels[index].labels
        }).subscribe(updateAppResponse => {
          this.selectedLabels.splice(index, 1);
          this.updateAppDescriptor();
        });
    } else {
      // Do nothing
    }
  }

  /**
   * Selects a label
   * @param entityId entity from selected label
   * @param labelKey label key from selected label
   * @param labelValue label value from selected label
   */
  onLabelClick(entityId, labelKey, labelValue) {
    const selectedIndex = this.indexOfLabelSelected(entityId, labelKey, labelValue);
    const newLabel = {
      entityId: entityId,
      labels: {}
    } ;
    if (selectedIndex === -1 ) {
      const selected = this.selectedLabels.map(x => x.entityId).indexOf(entityId);
      if (selected === -1) {
        newLabel.labels[labelKey] = labelValue;
        this.selectedLabels.push(newLabel);
      } else {
        this.selectedLabels[selected].labels[labelKey] = labelValue;
      }
    } else {
      if (Object.keys(this.selectedLabels[selectedIndex].labels).length > 1) {
        delete this.selectedLabels[selectedIndex].labels[labelKey];
      } else {
        this.selectedLabels.splice(selectedIndex, 1);
      }
    }
  }

  /**
  * Check if the label is selected. Returs index number in selected labels or -1 if the label is not found.
  * @param entityId entity from selected label
  * @param labelKey label key from selected label
  * @param labelValue label value from selected label
  */
  indexOfLabelSelected(entityId, labelKey, labelValue) {
    for (let index = 0; index < this.selectedLabels.length; index++) {
      if (this.selectedLabels[index].entityId === entityId &&
          this.selectedLabels[index].labels[labelKey] === labelValue
        ) {
          return index;
      }
    }
  return -1;
  }

  /**
   * Check if any label is selected to change the state of add/delete buttons and to change class when a new label is about to be selected
   * @param entityId entity from selected label
   */
  isAnyLabelSelected(entityId) {
    if (this.selectedLabels.length > 0) {
      const indexSelected = this.selectedLabels.map(x => x.entityId).indexOf(entityId);
      if (indexSelected >= 0) {
          return true;
      }
    }
    return false;
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
    const index = this.groups.map(x => x.service_group_id).indexOf(this.displayedGroups[0].service_group_id);
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
    .map(x => x.service_group_id)
    .indexOf(this.displayedGroups[this.displayedGroups.length - 1].service_group_id);
    if (index !== -1 && this.groups[index + 1]) {
      this.displayedGroups.push(this.groups[index + 1]);
      this.displayedGroups.shift();
    }
    this.updateDisplayedGroupsNamesLength();
  }

  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app) {
    const initialState = {
      organizationId: this.organizationId,
      registeredId: app.app_descriptor_id,
      registeredName: app.name,
      openFromRegistered: true,
      defaultAutofocus: true
    };

    this.modalRef = this.modalService.show(DeployInstanceComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      this.router.navigate(['/applications']);
    });
  }

  /**
   * Requests to delete the selected app
   * @param app Application object
   */
  deleteApp(app) {
    const deleteConfirm = confirm('Delete ' + app.name + '?');
    if (deleteConfirm) {
      this.backend.deleteRegistered(this.organizationId, app.app_descriptor_id)
        .subscribe(deleteResponse => {
          this.notificationsService.add({
            message: 'Deleting ' + app.name,
            timeout: 3000
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: 5000,
            type: 'warning'
          });
        });
    }
  }

  /**
   * Transforms the data needed to create the grapho
   * @param registered registered object
   */
  toGraphData(registered) {
    registered.groups.forEach(group => {
      const nodeGroup = {
        id: group.service_group_id,
        label: group.name,
        tooltip: 'GROUP: ' + group.name,
        color: '#444',
        group: group.service_group_id
      };
      this.graphData.nodes.push(nodeGroup);
      group.services.forEach(service => {
        const nodeService = {
          id: group.service_group_id + '-s-' + service.service_id,
          label: service.name,
          tooltip: 'SERVICE: ' + service.name,
          color: '#343434',
          group: group.service_group_id
        };
        this.graphData.nodes.push(nodeService);
        this.graphData.links.push({
          source: group.service_group_id,
          target: group.service_group_id + '-s-' + service.service_id
        });

      });
      this.nextColorIndex += 1;
      if ( this.nextColorIndex >= this.nalejColorScheme.length ) {
        this.nextColorIndex = 0;
      }
    });

    if (registered.rules) {
      registered.rules.forEach(rule => {
        if (rule.auth_services) {
          rule.auth_services.forEach(linkedService => {
            const sourceIndex = this.graphData.nodes.map(x => x.label).indexOf(rule.target_service_name);
            const targetIndex = this.graphData.nodes.map(x => x.label).indexOf(linkedService);
            const link = {
              target: this.graphData.nodes[sourceIndex].id,
              source: this.graphData.nodes[targetIndex].id
            };
            this.graphData.links.push(link);
          });
        }
      });
    }
    this.graphDataLoaded = true;
  }

  /**
   * Method that counts the number of services
   */
  countServices(): number {
    let temporalCount = 0;
    this.services.forEach(group => {
      temporalCount = group.length + temporalCount;
    });
    return temporalCount;
  }

  /**
   * Returns the length of the services in registered list. Represents the number of available services
   * @param registered selected registered
   */
  getServicesCount(registered) {
    let temporalCount = 0;
    if (registered && registered.groups) {
      registered.groups.forEach(group => {
        temporalCount = group.services.length + temporalCount;
      });
    }
    return temporalCount;
  }

  /**
   * Gets the services array list and traverse the group array list to show in table
   */
  getServices() {
    const groupServices = [];
    this.services.forEach(group => {
      group.forEach(service => {

        groupServices.push(service);
      });
    });
    return groupServices;
  }

  /**
   * Returns the lenght of service instances that are part of the specified active group
   * @param activeGroupId Identifier for the active group
   */
  countGroupServices(groupId: string) {
    if (groupId === 'ALL') {
      let counter = 0;
      if (this.registeredData && this.registeredData.groups) {
        this.registeredData.groups.forEach(group => {
          counter += group.services.length;
        });
        return counter;
      } else {
        return 0;
      }
    } else {
      const index = this.displayedGroups
        .map(x => x.service_group_id)
        .indexOf(groupId);
      if (index !== -1) {
        return this.displayedGroups[index].services.length;
      }
      return 0;
    }
  }

  /**
   * Search for an specific array of services that are part of the same group
   * @param groupId Group identifier
   */
  getGroupServices(groupId: string): any[] {
    if (!groupId) {
      return [];
    }
    if (groupId === 'ALL') {
      const services = [];
      if (this.registeredData && this.registeredData.groups) {
        this.registeredData.groups.forEach(group => {
          group.services.forEach(service => {
            services.push(service);
          });
        });
        return services;
      } else {
        return [];
      }
    } else {
      const index = this.displayedGroups
      .map(x => x.service_group_id)
      .indexOf(this.activeGroupId);

      if (index !== -1) {
        return this.displayedGroups[index].services;
      } else {
        return [];
      }
    }
  }

  /**
   * Transforms objects to arrays to be parsed to string and performed in the view
   * @param object Key-value map that contains the object
   */
  objectToString(object: any) {
    if (!object) {
      return ['--'];
    }
    return Object.entries(object);
  }

  /**
   * Shows the graph in services card
   */
  showWindowGraph() {
    this.showGraph = !this.showGraph;
  }

  /**
  * Open serivces info modal window
  *  @param service service object
  */
 openServicesInfo(service) {
   const initialState = {
     organizationId: this.organizationId,
     serviceId: service.service_group_id,
     appDescriptorId: service.app_descriptor_id,
     exposedPorts: service.exposed_ports,
     environmentVariables: service.environment_variables,
     image: service.image,
     labels: service.labels,
     name: service.name,
     groupId: service.service_group_id,
     replicas: service.replicas,
     specs: service.specs,
     endpoints: service.endpoints
   };

   this.modalRef = this.modalService.show(ServiceInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
   this.modalRef.content.closeBtnName = 'Close';

 }

 /**
  * Open rules info modal window
  *  @param rule rule object
  */
 openRulesInfo(rule) {
   const initialState = {
     organizationId: this.organizationId,
     ruleId: rule.rule_id,
     access: rule.access,
     appDescriptorId: rule.app_descriptor_id,
     authServices: rule.auth_services,
     authServiceGroupName: rule.auth_service_group_name,
     name: rule.name,
     targetPort: rule.target_port,
     targetServiceGroupName: rule.target_service_group_name,
     targetServiceName: rule.target_service_name,
     deviceGroupIds: rule.device_group_ids,
     deviceGroupNames: rule.device_group_names
   };

   this.modalRef = this.modalService.show(RuleInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
   this.modalRef.content.closeBtnName = 'Close';

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
  /**
   * Helper to workaround the reset graph status through the DOM refresh, using *ngIf
  */
  resetGraphZoom() {
    this.graphReset = true;
    setTimeout(() => {
      this.graphReset = false;
    }, 1);
  }

}