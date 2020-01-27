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
import { mockOrganizationInfo, mockOrganizationSettings, mockUserList, mockUserRoles } from 'src/app/services/utils/mocks';
import { OrganizationSettings } from 'src/app/definitions/interfaces/organization-settings';
import { UserChanges } from 'src/app/definitions/interfaces/user-changes';

@Component({
  selector: 'organization-info-card',
  templateUrl: './organization-info-card.component.html',
  styleUrls: ['./organization-info-card.component.scss']
})
export class OrganizationInfoCardComponent implements OnInit {
  // Dummy mode on
  organization = mockOrganizationInfo as Organization;
  settings = mockOrganizationSettings as OrganizationSettings[];
  users = mockUserList as UserChanges[];
  roles = mockUserRoles;
  rolesCount: number;
  /**
   * Model that hold the address
   */
  address: string[];
  /**
   *  Active List reference
   */
  showSettings: boolean;
  showRoles: boolean;
  showBilling: boolean;

  constructor() {
    this.showSettings = true;
    this.showRoles = false;
    this.showBilling = false;
  }

  ngOnInit() {
    // console.log('org ', this.organization);
    // console.log('settings ', this.settings);
    this.getFormattedAddress();
    this.rolesCount = Object.keys(this.roles).length;

    console.log('rolessss ', Object.keys(this.roles));
    console.log('roles ', this.roles);

  }

  /**
   * Formats the address to be split in new lines by the comma
   */
  getFormattedAddress() {
    this.address = this.organization.full_address.split(',');
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
