import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nalej';
  modalRef: BsModalRef;
  notificationInstances: any[];
 
  constructor(
    private modalService: BsModalService,
    ) {
    this.notificationInstances = [{
    type: 'success',
    msg: `Well done! You successfully read this important alert message. (added: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  }];

  }
  
  openModal() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }
  add(): void {
    this.notificationInstances.push({
      type: 'danger',
      msg: `This alert is added`,
    });
  console.log(this.notificationInstances);
  }
}
