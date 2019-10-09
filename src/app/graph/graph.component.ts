import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input() links: any[];
  @Input() nodes: any[];
  @Input() orientation: string;
  @Input() autoZoom: boolean;
  @Input() autoCenter: boolean;
  @Input() curve: any;
  @Input() enableZoom: boolean;


  constructor() {
    this.links = [];
    this.nodes = [];
  }

  ngOnInit() {
  }

  /**
   * Return if the marker is required
   * @param link Link object
   */
  getMarker(link) {
    if (!link.notMarker) {
      const index = this.nodes.map(x => x.id).indexOf(link.source);
      if (index !== -1) {
        if (this.nodes[index].id === this.nodes[index].group) {
          return '';
        } else {
          return 'url(#arrow)';
        }
      }
      return 'url(#arrow)';
    }
  }

}
