import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelsCardServiceService {

  constructor() { }

  /**
   * Selects a label
   * @param label label entity
   * @param selectedLabels selected labels array
   */
  onLabelClick(label: {}, selectedLabels: {}[]) {
    label['selected'] = !label['selected'];
    if (label['selected']) {
      selectedLabels.push(label);
    } else {
      selectedLabels.pop();
    }
  }
}
