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
import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/definitions/interfaces/organization';
import { OrganizationSettings } from 'src/app/definitions/interfaces/organization-settings';
import { LocalStorageKeys } from 'src/app/definitions/const/local-storage-keys';
import { Backend } from 'src/app/definitions/interfaces/backend';
import { BackendService } from 'src/app/services/backend.service';
import { MockupBackendService } from 'src/app/services/mockup-backend.service';
import { RoleOptions } from 'src/app/definitions/enums/role-options.enum';

@Component({
  selector: 'organization-info-card',
  templateUrl: './organization-info-card.component.html',
  styleUrls: ['./organization-info-card.component.scss']
})
export class OrganizationInfoCardComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization id, organization and settings
   */
  organizationId: string;
  organization: Organization;
  /**
   * Models that hold the organization settings list
   */
  settings: OrganizationSettings[];
  /**
   * Models that hold the organization address
   */
  address: string[];
  /**
   * Models that hold the role list
   */
  rolesList: RoleOptions[];
  /**
   * Active List reference
   */
  showSettings: boolean;
  showRoles: boolean;
  showBilling: boolean;
  /**
   * Variable to store the value loaded data
   */
  loadedData: boolean;

  constructor(
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.organizationMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    this.showSettings = true;
    this.showRoles = false;
    this.showBilling = false;
    this.loadedData = false;
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        this.backend.getOrganizationInfo(this.organizationId)
          .subscribe(response => {
              this.organization = response;
              this.loadedData = true;
              if (this.organization.full_address) {
                this.getFormattedAddress();
              }
          });
          this.getRoles();
          this.getSettings();
      }
    }
  }
  /**
   * Query role list
   */
  getRoles() {
    this.backend.listRoles(this.organizationId)
    .subscribe(roles => {
      this.rolesList = roles.roles;
    });

  }
  /**
   * Get the organization settings list
   */
  getSettings() {
    this.backend.getOrganizationSettings(this.organizationId)
    .subscribe(settings => {
      this.settings = settings.settings;
    });
  }
  /**
   * Formats the address to be split in new lines by the comma
   */
  getFormattedAddress() {
    this.address = this.organization['full_address'].split(',');
    this.loadedData = true;
  }
    /**
   * Changes to active list
   * @param listToShow list to show
   */
  changeActiveList(listToShow: string) {
    if (listToShow === 'settings') {
      this.showSettings = true;
      this.showRoles = false;
      this.showBilling = false;
    } else if (listToShow === 'roles') {
      this.showSettings = false;
      this.showRoles = true;
      this.showBilling = false;
    } else if (listToShow === 'billing') {
      this.showSettings = false;
      this.showRoles = false;
      this.showBilling = true;
    }
  }
}
