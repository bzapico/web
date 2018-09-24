import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';

import { AppComponent } from './app.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    DebugPanelComponent,
    NotificationsComponent
  ],
  entryComponents: [DebugPanelComponent],
  imports: [
    FormsModule,
    BrowserModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [{provide: ErrorHandler, useClass: ErrorHandlerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
