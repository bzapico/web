import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { OrganizationComponent } from './organization/organization.component';


@NgModule({
  declarations: [
    AppComponent,
    DebugPanelComponent,
    SidebarComponent,
    MainComponent,
    LoginComponent,
    UserInfoComponent,
    OrganizationComponent
  ],
  entryComponents: [
    DebugPanelComponent,
    UserInfoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    // NGX-BOOTSTRAP
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    // ROUTES
    routes,
  ],
  exports: [
    LoginComponent
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
