import { Component } from '@angular/core';
import { NotificationsService } from './services/notifications.service';

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nalej';

  constructor(
    public notificationsService: NotificationsService
    ) {

  }
  ngOnInit(): void {

  }

}
