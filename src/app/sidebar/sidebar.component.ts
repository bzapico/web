import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DebugPanelComponent } from '../debug-panel/debug-panel.component';
import { AuthService } from '../services/auth.service';

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
   * Reference for the service that allows to open debug panel
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
   }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      const userId = JSON.parse(jwtData).userId;
      if (userId !== null) {
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
    }
  }

  /**
   * Opens the modal view that holds the debug panel
   */
  openDebugPanel() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }

  /**
   * Cleans the credentials and leads to login page
   */
  logout() {
    this.auth.logout();
  }
}
