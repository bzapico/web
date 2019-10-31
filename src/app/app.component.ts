import { Component } from '@angular/core';
import { NotificationsService } from './services/notifications.service';

import { OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const ENGLISH = 'en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    public notificationsService: NotificationsService,
    private translateService: TranslateService
    ) {
    this.translateService.setDefaultLang(ENGLISH);
    this.translateService.use(ENGLISH);
  }

  ngOnInit(): void {}

}
