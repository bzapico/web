import { Component, Input } from '@angular/core';
import { ActionButtonsService } from './action-buttons.service';


@Component({
  selector: 'action-buttons-card',
  templateUrl: './action-buttons-card.component.html',
  styleUrls: ['./action-buttons-card.component.scss']
})
export class ActionButtonsCardComponent {

  @Input() isOpenFromRegistered: boolean;
  @Input() loadedData: boolean;
  @Input() app: {};

  constructor(
    private actionButtonsService: ActionButtonsService
  ) {
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
  undeploy(app: {}) {
    this.actionButtonsService.undeploy(app);
  }

  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app: {}) {
    this.actionButtonsService.deployRegistered(app);
  }

  /**
   * Requests to delete the selected app
   * @param app Application object
   */
  deleteApp(app: {}) {
    this.actionButtonsService.deleteApp(app);
  }
}
