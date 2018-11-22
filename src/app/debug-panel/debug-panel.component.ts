import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';

/**
 * Interface for the objects that will be listed in the debug panel
 */
export interface ComponentMockOption {
  name: string;
  mock: string;
}

export const AvailableComponents = {
  login: 'Login',
  organization: 'Organization',
  resources: 'Resources',
  cluster: 'Cluster',
  apps: 'Apps',
  profile: 'Profile',
  notifications: 'Notifications',
  sidebar: 'Sidebar',
  userinfo: 'User Info',
  userEdit: 'User Edit',
  editcluster: 'EditCluster',
  addUser: 'Add User'
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.scss']
})
export class DebugPanelComponent implements OnInit {
  /**
   * List of components available to mock up
   */
  components: ComponentMockOption[] = [];
  notificationsMock: any;

  constructor(
    public bsModalRef: BsModalRef,
    private notificationsService: NotificationsService
    ) {
    this.notificationsMock = (localStorage.getItem(LocalStorageKeys.notificationsMock) === 'true' ? true : false);
   }

  ngOnInit() {
    // Load values from localStorage and populate options list
    this.components.push({
      name: AvailableComponents.login,
      mock: localStorage.getItem(LocalStorageKeys.loginMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.organization,
      mock: localStorage.getItem(LocalStorageKeys.organizationMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.resources,
      mock: localStorage.getItem(LocalStorageKeys.resourcesMock) === 'false' ? 'false' : 'true'
    });
     this.components.push({
      name: AvailableComponents.cluster,
      mock: localStorage.getItem(LocalStorageKeys.clusterMock) === 'false' ? 'false' : 'true'
    });   this.components.push({
      name: AvailableComponents.apps,
      mock: localStorage.getItem(LocalStorageKeys.appsMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.profile,
      mock: localStorage.getItem(LocalStorageKeys.profileMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.notifications,
      mock: localStorage.getItem(LocalStorageKeys.notificationsMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.sidebar,
      mock: localStorage.getItem(LocalStorageKeys.sidebarMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.userinfo,
      mock: localStorage.getItem(LocalStorageKeys.userInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.userEdit,
      mock: localStorage.getItem(LocalStorageKeys.userEditMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.editcluster,
      mock: localStorage.getItem(LocalStorageKeys.clusterEditMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.addUser,
      mock: localStorage.getItem(LocalStorageKeys.addUserMock) === 'false' ? 'false' : 'true'
    });
  }

  /**
   * Persist the modifications on the local storage
   * @param componentMockOption Object containing the selected option name and mock value
   */
  optionChange(componentMockOption) {
    // Persist modifications in localStorage
    switch (componentMockOption.name) {
      case AvailableComponents.login:
        localStorage.setItem(LocalStorageKeys.loginMock, componentMockOption.mock);
      break;
      case AvailableComponents.organization:
        localStorage.setItem(LocalStorageKeys.organizationMock, componentMockOption.mock);
      break;
      case AvailableComponents.resources:
        localStorage.setItem(LocalStorageKeys.resourcesMock, componentMockOption.mock);
      break;
      case AvailableComponents.cluster:
        localStorage.setItem(LocalStorageKeys.clusterMock, componentMockOption.mock);
      break;
      case AvailableComponents.apps:
        localStorage.setItem(LocalStorageKeys.appsMock, componentMockOption.mock);
      break;
      case AvailableComponents.profile:
        localStorage.setItem(LocalStorageKeys.profileMock, componentMockOption.mock);
      break;
      case AvailableComponents.notifications:
        localStorage.setItem(LocalStorageKeys.notificationsMock, componentMockOption.mock);
      break;
      case AvailableComponents.sidebar:
        localStorage.setItem(LocalStorageKeys.sidebarMock, componentMockOption.mock);
      break;
      case AvailableComponents.userinfo:
        localStorage.setItem(LocalStorageKeys.userInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.userEdit:
        localStorage.setItem(LocalStorageKeys.userEditMock, componentMockOption.mock);
      break;
      case AvailableComponents.editcluster:
        localStorage.setItem(LocalStorageKeys.clusterEditMock, componentMockOption.mock);
      break;
      case AvailableComponents.addUser:
      localStorage.setItem(LocalStorageKeys.addUserMock, componentMockOption.mock);
    break;
      default:
        console.log('Selected option not registered as available component');
    }

  }

  /**
   * Adds a new notification to notificationsService list so it can be displayed on screen
   */
  spamNotification(): void {
    this.notificationsService.add({
      id: this.notificationsService.uuidv4(),
      message: 'Test notification',
      type: 'info',
      timeout: 10000
    });
  }

}
