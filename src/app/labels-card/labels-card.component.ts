import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LabelsCardServiceService } from '../labels-card-service.service';

@Component({
  selector: 'labels-card',
  templateUrl: './labels-card.component.html',
  styleUrls: ['./labels-card.component.scss']
})
export class LabelsCardComponent {
  @Input() labelsData: any[];
  @Input() selectableLabel: boolean;
  @Output() updateLabels: EventEmitter<{action: string, selectedLabels: any[]}>;

  selectedLabels: {}[];

  constructor(
    private labelsCardService: LabelsCardServiceService
  ) {
    this.selectedLabels = [];
    this.updateLabels = new EventEmitter<{action: string, selectedLabels: any[]}>();
  }

  /**
   * Opens the modal view that holds add label component
   * @param entity selected label entity
   */
  addLabel() {
    this.updateLabels.emit({action: 'add', selectedLabels: this.selectedLabels});
  }

  /**
   * Deletes a selected label
   */
  deleteLabel() {
    this.updateLabels.emit({action: 'delete', selectedLabels: this.selectedLabels});
  }

  /**
   * Selects a label
   * @param label label entity
   */
  onLabelClick(label: {}) {
    this.labelsCardService.onLabelClick(label, this.selectedLabels);
  }
}
