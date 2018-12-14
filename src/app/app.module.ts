import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule, CarouselModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { OrganizationComponent } from './organization/organization.component';
import { EditClusterComponent } from './edit-cluster/edit-cluster.component';
import { ResourcesComponent } from './resources/resources.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AppsInfoComponent } from './apps-info/apps-info.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ClusterComponent } from './cluster/cluster.component';
import { UpdateEventsService } from './services/update-events.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AbbreviatePipe } from './pipes/abbreviate.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DebugPanelComponent,
    NotificationsComponent,
    SidebarComponent,
    MainComponent,
    LoginComponent,
    UserInfoComponent,
    OrganizationComponent,
    ResourcesComponent,
    AddUserComponent,
    EditClusterComponent,
    EditUserComponent,
    AppsInfoComponent,
    ApplicationsComponent,
    ClusterComponent,
    ChangePasswordComponent,
    AbbreviatePipe,
    TruncatePipe
  ],
  entryComponents: [
    DebugPanelComponent,
    UserInfoComponent,
    AddUserComponent,
    EditClusterComponent,
    EditUserComponent,
    AppsInfoComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgxGraphModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    // NGX-BOOTSTRAP
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    // ROUTES
    routes
  ],
  exports: [
    LoginComponent
   ],
  providers: [
    AuthService,
    BackendService,
    { provide: ErrorHandler,
      useClass: ErrorHandlerService },
    UpdateEventsService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
