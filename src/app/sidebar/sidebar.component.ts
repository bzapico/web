import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nalej-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  backend: Backend;
  name: string;
  role: string;
  email: string;
  constructor(
    backendService: BackendService,
    mockupBackendService: MockupBackendService
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
}
