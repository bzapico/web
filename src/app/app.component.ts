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
  notificationRef: AlertModule;

  constructor(private modalService: BsModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }
  openNotifications() {
    this.notificationRef = NotificationsComponent;

  }
}
