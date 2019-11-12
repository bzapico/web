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

import { Component, Input } from '@angular/core';
import { ActionButtonsService } from './action-buttons.service';
import { Application } from '../../definitions/models/application';

@Component({
  selector: 'action-buttons-card',
  templateUrl: './action-buttons-card.component.html',
  styleUrls: ['./action-buttons-card.component.scss']
})
export class ActionButtonsCardComponent {

  @Input() isOpenFromRegistered: boolean;
  @Input() loadedData: boolean;
  @Input() app: Application;

  constructor(
    private actionButtonsService: ActionButtonsService
  ) {}

  /**
   * Creates an array with the names to be filtered by
   */
  openAddNewConnection() {
    this.actionButtonsService.openAddNewConnection();
  }
  /**
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app: Application) {
    this.actionButtonsService.undeploy(app);
  }
  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app: Application) {
    this.actionButtonsService.deployRegistered(app);
  }
  /**
   * Requests to delete the selected app
   * @param app Application object
   */
  deleteApp(app: Application) {
    this.actionButtonsService.deleteApp(app);
  }
}
