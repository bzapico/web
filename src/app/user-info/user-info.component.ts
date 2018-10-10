import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold user name, organization company name and user email
   */
  userName: string;
  organizationCompanyName: string;
  userEmail: string;

  constructor(
    public bsModalRef: BsModalRef,
    backendService: BackendService,
    mockupBackendService: MockupBackendService,
    ) {
      const mock = localStorage.getItem(LocalStorageKeys.userInfoMock) || null;
      // check which backend is required (fake or real)
      if (mock && mock === 'true') {
        this.backend = mockupBackendService;
      } else {
        this.backend = backendService;
      }
      this.userName = 'John Doe';
      this.organizationCompanyName = 'Nike. Org';
      this.userEmail = 'john@doe.com';

     }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      const userInfoMock = JSON.parse(jwtData).userInfoMock;
      if (userInfoMock !== null) {
        this.backend. getUserInfo(userInfoMock)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.organizationCompanyName = data.organizationCompanyName;
            }
          });
        this.backend. getUserInfo(userInfoMock)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.userName = data.userName;
            }
          });
      }
    }
  }

}
