import { Component, OnInit, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.scss']
})
export class ServicesCardComponent implements OnInit {
  /**
   *  Show the services graph tab
   */
  showGraph: boolean;
  displayGraph: EventEmitter<boolean>;

  constructor(   private translateService: TranslateService) {
    this.showGraph = true;
    this.displayGraph = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  /**
   * Shows the graph in services card
   */
  selectDisplayMode(type: string) {
    if (type === this.translateService.instant('graph.typeList')) {
      this.showGraph = false;
    } else if (type === this.translateService.instant('graph.typeGraph')) {
      this.showGraph = true;
    }
    this.displayGraph.emit(this.showGraph);
  }

}
