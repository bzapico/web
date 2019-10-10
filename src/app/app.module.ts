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
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { EdgeControllerInfoComponent } from './edge-controller-info/edge-controller-info.component';
import { ContextualMenuComponent } from './contextual-menu/contextual-menu.component';
import { InstallAgentComponent } from './install-agent/install-agent.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { SimpleLogComponent } from './simple-log/simple-log.component';
import { AgentJoinTokenInfoComponent } from './agent-join-token-info/agent-join-token-info.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdvancedFilterOptionsComponent } from './advanced-filter-options/advanced-filter-options.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DeviceGroupInfoComponent } from './device-group-info/device-group-info.component';
import { InstanceServiceGroupInfoComponent } from './instance-service-group-info/instance-service-group-info.component';
import { RegisteredServiceGroupInfoComponent } from './registered-service-group-info/registered-service-group-info.component';
import { ManageConnectionsComponent } from './manage-connections/manage-connections.component';
import { AddConnectionsComponent } from './add-connections/add-connections.component';
import { LabelsCardComponent } from './labels-card/labels-card.component';
import { ServicesCardComponent } from './services-card/services-card.component';
import { ActionButtonsCardComponent } from './action-buttons-card/action-buttons-card.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ContextualMenuComponent,
    DeviceInfoComponent,
    AssetInfoComponent,
    EdgeControllerInfoComponent,
    ContextualMenuComponent,
    InstallAgentComponent,
    SimpleLogComponent,
    AgentJoinTokenInfoComponent,
    AdvancedFilterOptionsComponent,
    DeviceGroupInfoComponent,
    InstanceServiceGroupInfoComponent,
    RegisteredServiceGroupInfoComponent,
    ManageConnectionsComponent,
    AddConnectionsComponent,
    LabelsCardComponent,
    ServicesCardComponent,
    ActionButtonsCardComponent
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
    DeviceInfoComponent,
    AssetInfoComponent,
    EdgeControllerInfoComponent,
    InstallAgentComponent,
    SimpleLogComponent,
    AgentJoinTokenInfoComponent,
    AdvancedFilterOptionsComponent,
    DeviceGroupInfoComponent,
    InstanceServiceGroupInfoComponent,
    RegisteredServiceGroupInfoComponent,
    ManageConnectionsComponent,
    AddConnectionsComponent
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
    // NGX-TRANSLATE
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    // NGX-BOOTSTRAP
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
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
