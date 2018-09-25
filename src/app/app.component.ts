import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nalej';
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private notificationsService: NotificationsService
    ) {
  }
  openModal() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }
  add(): void {
    this.notificationsService.add({
      type: 'warning',
      message: `This alert is added`,
    });
  }
}
