import { Component, OnInit } from '@angular/core';
import { mockClusterChart } from '../utils/mocks';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  single: any[];
  multi: any[];

  view: any[] = [200, 150];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#0937FF']
  };

  // line, area
  autoScale = true;

  constructor() {
    Object.assign(this, {mockClusterChart});
   }
   onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }
  /**
   * Opens the modal view that holds the edit cluster component
   */
  editCluster() {
  }

}
