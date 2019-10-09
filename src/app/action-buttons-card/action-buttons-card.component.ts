import { Component, OnInit, Input } from '@angular/core';
import { ActionButtonsService } from './action-buttons.service';


@Component({
  selector: 'action-buttons-card',
  templateUrl: './action-buttons-card.component.html',
  styleUrls: ['./action-buttons-card.component.scss']
})
export class ActionButtonsCardComponent implements OnInit {

  @Input() isOpenFromRegistered: boolean;
  @Input() app: any;

  constructor(
    private actionButtonsService: ActionButtonsService
  ) {
  }

  ngOnInit() {
    console.log('app instance o registered  ', this.app);
  }

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
  undeploy(app) {
    this.actionButtonsService.undeploy(app);
    console.log('app undeploy ', app);
  }

  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app) {
    this.actionButtonsService.deployRegistered(app);
    console.log('app deploy ', app);
  }

  /**
   * Requests to delete the selected app
   * @param app Application object
   */
  deleteApp(app) {
    this.actionButtonsService.deleteApp(app);
    console.log('app delete ', app);
  }
}
