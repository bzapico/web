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
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { OrganizationComponent } from './organization/organization.component';
import { EditClusterComponent } from './edit-cluster/edit-cluster.component';
import { ResourcesComponent } from './resources/resources.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ClusterComponent } from './cluster/cluster.component';
import { UpdateEventsService } from './services/update-events.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AbbreviatePipe } from './pipes/abbreviate.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DevicesComponent } from './devices/devices.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { AddDevicesGroupComponent } from './add-devices-group/add-devices-group.component';
import { GroupConfigurationComponent } from './group-configuration/group-configuration.component';
import { DeviceGroupCreatedComponent } from './device-group-created/device-group-created.component';
import { AddLabelComponent } from './add-label/add-label.component';
import { RegisteredInfoComponent } from './registered-info/registered-info.component';
import { RegisterApplicationComponent } from './register-application/register-application.component';
import { DeployInstanceComponent } from './deploy-instance/deploy-instance.component';
import { FileDropModule } from 'ngx-file-drop';
import { InstanceInfoComponent } from './instance-info/instance-info.component';
import { ServiceInstancesInfoComponent } from './service-instances-info/service-instances-info.component';
import { RuleInfoComponent } from './rule-info/rule-info.component';
import { ServiceInfoComponent } from './service-info/service-info.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';

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
    ApplicationsComponent,
    ClusterComponent,
    ChangePasswordComponent,
    AbbreviatePipe,
    TruncatePipe,
    DevicesComponent,
    FilterPipe,
    SortByPipe,
    AddDevicesGroupComponent,
    GroupConfigurationComponent,
    DeviceGroupCreatedComponent,
    AddLabelComponent,
    RegisteredInfoComponent,
    RegisterApplicationComponent,
    DeployInstanceComponent,
    InstanceInfoComponent,
    ServiceInstancesInfoComponent,
    RuleInfoComponent,
    ServiceInfoComponent,
    AutofocusDirective,
    InfrastructureComponent,
    AssetInfoComponent
  ],
  entryComponents: [
    DebugPanelComponent,
    UserInfoComponent,
    AddUserComponent,
    EditClusterComponent,
    EditUserComponent,
    ChangePasswordComponent,
    AddDevicesGroupComponent,
    GroupConfigurationComponent,
    DeviceGroupCreatedComponent,
    AddLabelComponent,
    RegisterApplicationComponent,
    DeployInstanceComponent,
    ServiceInstancesInfoComponent,
    RuleInfoComponent,
    ServiceInfoComponent,
    AssetInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgxGraphModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SelectDropDownModule,
    RouterModule,
    FileDropModule,
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
