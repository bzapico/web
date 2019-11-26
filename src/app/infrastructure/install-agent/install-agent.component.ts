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
import { Backend } from '../../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { NotificationsService } from '../../services/notifications.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryType } from '../../definitions/enums/inventory-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { Controller } from '../../definitions/models/controller';
import { Item } from '../../definitions/models/item';
import { AgentType } from '../../definitions/enums/agent-type.enum';

@Component({
  selector: 'app-install-agent',
  templateUrl: './install-agent.component.html',
  styleUrls: ['./install-agent.component.scss']
})
export class InstallAgentComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that holds forms info
   */
  installAgentForm: FormGroup;
  submitted = false;
  loading: boolean;
  /**
   * Model that hold Edge Controller ID and its info
   */
  organizationId: string;
  edgeControllerId: string;
  agentType: FormControl;
  sshCredentials: string;
  targetHost: FormControl;
  architecture: FormControl;
  type: FormControl;
  controllersList: Controller[];
  openFromEc: boolean;
  ecCount: number;
  edgeControllerFromEC: string;
  /**
   * Models that hold all inventory list
   */
  inventory: Item[];
  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };
  /**
   * NGX-select-dropdown
   */
  tab = 1;
  options = [];
  selectConfig = {};
  agentTypeOptions: {name: AgentType, code: number}[];
  agentTypeSelectConfig = {};
  architectureSelectConfig = {};
  edgeControllerSelectConfig = {};

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {

    this.inventory = [];
    //  Agent type
    this.openFromEc = false;
    this.agentType = null;
    this.agentTypeSelectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('infrastructure.install-agent.agentType'),
      limitTo: 4,
      moreText: this.translateService.instant('infrastructure.install-agent.more'),
      noResultsFound: this.translateService.instant(
        'apps.addConnection.noResults'
      )
    };
    this.agentTypeOptions = [{
      name: AgentType.LINUX_AMD64,
      code: 0
    }, {
      name: AgentType.LINUX_ARM32,
      code: 1
    }, {
      name: AgentType.LINUX_ARM64,
      code: 2
    }, {
      name: AgentType.WINDOWS_AMD64,
      code: 3
    }, {
      name: AgentType.DARWIN_AMD64,
      code: 4
    }];
    //  edgeControllerId
    this.edgeControllerId = null;
    const mock = localStorage.getItem(LocalStorageKeys.installAgentMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
  }

  ngOnInit() {
    this.installAgentForm = this.formBuilder.group({
      edgeControllerFromEC: [{value: '', disabled: true}],
      type: [null, Validators.required],
      edgeController: [null, Validators.required],
      sshUsername: ['', Validators.required],
      sshPassword: ['', Validators.required],
      target: [null, Validators.required],
    });
    this.edgeControllerSelectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: this.translateService.instant('infrastructure.install-agent.ec'),
      limitTo: this.ecCount,
      moreText: 'more',
      noResultsFound: this.translateService.instant(
        'apps.addConnection.noResults'
      )
    };
    if (!this.edgeControllerFromEC) {
      this.edgeControllerFromEC = this.translateService.instant('infrastructure.install-agent.select');
    }
  }
  /**
   * Gets the controllers list
   */
  getControllersList() {
    const controllersList = [];
    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].type === InventoryType.Ec) {
        controllersList.push(this.inventory[i]);
      }
    }
    return controllersList;
  }
  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.installAgentForm.controls; }
  /**
   * Requests to install agent
   * @param f Form with the agent input data
   */
  installAgent(f) {
    this.submitted = true;
    this.loading = true;
    if (!this.openFromEc && f.edgeController && f.edgeController.value) {
      this.edgeControllerId = f.edgeController.value.edge_controller_id;
    }
    // Local validator check
    if (f.type.invalid === true ||
      (!this.openFromEc && f.edgeController.invalid === true) ||
      f.sshUsername.invalid === true ||
      f.sshPassword.invalid === true ||
      f.target.invalid === true
      ) {
        this.loading = false;
        return;
    }
    const agent = {
      organization_id: this.organizationId,
      agent_type: f.type.value.code,
      edge_controller_id: this.edgeControllerId,
      credentials: {
        username: f.sshUsername.value,
        credentials: {password: f.sshPassword.value},
        is_sudoer: false
      },
      target_host: f.target.value,
      ca_cert: ''
    };
    this.backend.installAgent(agent)
      .subscribe(() => {
        this.loading = false;
        this.notificationsService.add({
          message:
            this.translateService.instant('infrastructure.install-agent.message', {targetHost: agent.target_host }),
        });
        this.bsModalRef.hide();
      }, error => {
        this.loading = false;
        this.notificationsService.add({
          message: this.translateService.instant('infrastructure.error', {error: error.error.message}),
          type: 'warning'
        });
        this.bsModalRef.hide();
      });
  }
  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm(this.translateService.instant('modals.discardChanges'));
      if (discard) {
        this.bsModalRef.hide();
      }
    } else {
      this.bsModalRef.hide();
    }
  }
}
