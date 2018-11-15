import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DebugPanelComponent } from '../debug-panel/debug-panel.component';
import { AuthService } from '../services/auth.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nalej-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold user name, role and email on sidebar
   */
  name: string;
  role: string;
  email: string;

  /**
   * Models that hold user id, name and the users list
   */
  userId: string;
  profile: any[];

  /**
   * Reference for the service that allows to open debug panel and profile modal view
   */
  modalRef: BsModalRef;

  constructor(
    backendService: BackendService,
    mockupBackendService: MockupBackendService,
    private modalService: BsModalService,
    private auth: AuthService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.sidebarMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.name = 'Loading ...'; // Default initialization
    this.role = 'Loading ...'; // Default initialization
    this.email = 'Loading ...'; // Default initialization
    this.profile = [];
   }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      const userId = JSON.parse(jwtData).UserId;
      if (userId !== null) {
        this.updateProfileUser(userId);
      }
    }
  }

  /**
   * Opens the modal view that holds the debug panel
   */
  openDebugPanel() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { location.reload(); });
  }

  /**
   * Opens the modal view that holds the user info and editable component
   */
  openEditUser() {
    const initialState = {
      userName: this.name,
      userId: this.email,
      userRole: this.role,
      title: 'Edit profile'
    };

    this.modalRef = this.modalService.show(EditUserComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { this.updateProfileUser(initialState.userId); });
  }

   /**
   * Requests an updated profile user to update the current one
   */
  updateProfileUser(userId) {
    this.backend.getUserProfileInfo(userId)
    .subscribe(response => {
      if (response && response._body) {
        const data = JSON.parse(response._body);
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
      }
    });
  }

  /**
   * Cleans the credentials and leads to login page
   */
  logout() {
    this.auth.logout();
  }
}
