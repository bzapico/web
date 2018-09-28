import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';

import { AppComponent } from './app.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    DebugPanelComponent,
    LoginComponent
  ],
  entryComponents: [DebugPanelComponent],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    AuthService,
    BackendService,
    { provide: ErrorHandler,
      useClass: ErrorHandlerService }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
