import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { NotificationsService } from './services/notifications.service';
import { NotificationsComponent } from './notifications/notifications.component';

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ NotificationsComponent ]
})
export class AppComponent implements OnInit{
  title = 'nalej';
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private notificationsService: NotificationsService
    ) {

  }
  ngOnInit(): void {
    // So far we need mocked up views until we have the backend integration ready
    // localStorage.setItem(LocalStorageKeys.loginMock, 'true');
  }
  add(): void {
    this.notificationsService.add({
      type: 'warning',
      message: `This alert is added`,
      // timeout: 10000
    });
  }
  onClosed(dismissedNotifications) {
    console.log(dismissedNotifications);

  }

}
