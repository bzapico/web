import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LabelsCardService } from './labels-card.service';

@Component({
  selector: 'labels-card',
  templateUrl: './labels-card.component.html',
  styleUrls: ['./labels-card.component.scss']
})
export class LabelsCardComponent {
  @Input() labelsData: any[];
  @Input() isSelectableLabel: boolean;
  @Input() loadedData: boolean;
  @Output() updateLabels: EventEmitter<{action: string, selectedLabels: any[]}>;

  selectedLabels: {}[];

  constructor(
    private labelsCardService: LabelsCardService
  ) {
    this.selectedLabels = [];
    this.updateLabels = new EventEmitter<{action: string, selectedLabels: any[]}>();
    this.labelsData = [];
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
  onLabelClick(label: {}) {
    this.labelsCardService.onLabelClick(label, this.selectedLabels);
  }
}
