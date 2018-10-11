import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from './services/notifications.service';

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nalej';
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private notificationsService: NotificationsService
    ) {

  }
  ngOnInit(): void {

  }

}
