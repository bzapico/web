import { Component, OnInit, Input } from '@angular/core';
import { LabelsCardServiceService } from '../labels-card-service.service';

@Component({
  selector: 'labels-card',
  templateUrl: './labels-card.component.html',
  styleUrls: ['./labels-card.component.scss']
})
export class LabelsCardComponent implements OnInit {
  @Input() labelsData: any[];
  @Input() selectableLabel: boolean;

  selectedLabels: any[];

  constructor(
    private labelsCardService: LabelsCardServiceService
  ) {
    this.selectedLabels = [];
  }

  ngOnInit() {}

  /**
   * Opens the modal view that holds add label component
   * @param entity selected label entity
   */
  addLabel(labelsData) {
    this.labelsCardService.addLabel(labelsData);
  }

  /**
   * Deletes a selected label
   * @param entity selected label entity
   * @param selectedLabels selected labels array
   */
  deleteLabel(labelsData, selectedLabels) {
    this.labelsCardService.deleteLabel(labelsData, selectedLabels);
  }

  /**
   * Selects a label
   * @param label label entity
   * @param selectedLabels selected labels array
   */
  onLabelClick(label, selectedLabels) {
    this.labelsCardService.onLabelClick(label, selectedLabels);
  }
}
