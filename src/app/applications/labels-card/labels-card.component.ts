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

// tslint:disable:no-any
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LabelsCardService } from './labels-card.service';
import { LabelsData } from '../../definitions/interfaces/labels-data';

@Component({
  selector: 'labels-card',
  templateUrl: './labels-card.component.html'
})
export class LabelsCardComponent {
  @Input() labelsData: LabelsData;
  @Input() isSelectableLabel: boolean;
  @Input() loadedData: boolean;
  @Output() updateLabels: EventEmitter<{action: string, selectedLabels: any[]}>;

  selectedLabels: {}[];

  constructor(
    private labelsCardService: LabelsCardService
  ) {
    this.selectedLabels = [];
    this.updateLabels = new EventEmitter<{action: string, selectedLabels: any[]}>();
    this.labelsData = {labels: []};
  }
  /**
   * Opens the modal view that holds add label component
   */
  addLabel() {
    this.updateLabels.emit({action: 'add', selectedLabels: this.selectedLabels});
  }
  /**
   * Deletes a selected label
   */
  deleteLabel() {
    this.updateLabels.emit({action: 'delete', selectedLabels: this.selectedLabels});
    this.selectedLabels = [];
  }
  /**
   * Selects a label
   * @param label label entity
   */
  onLabelClick(label: {key: string, value: string, selected?: boolean}) {
    this.labelsCardService.onLabelClick(label, this.selectedLabels);
  }
}
