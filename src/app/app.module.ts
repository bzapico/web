/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
import { UserInfoComponent } from './organization/user-info/user-info.component';
import { OrganizationComponent } from './organization/organization.component';
import { EditClusterComponent } from './resources/edit-cluster/edit-cluster.component';
import { ResourcesComponent } from './resources/resources.component';
import { AddUserComponent } from './organization/add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ClusterComponent } from './resources/cluster/cluster.component';
import { UpdateEventsService } from './services/update-events.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AbbreviatePipe } from './pipes/abbreviate.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DevicesComponent } from './devices/devices.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { AddDevicesGroupComponent } from './devices/add-devices-group/add-devices-group.component';
import { GroupConfigurationComponent } from './devices/group-configuration/group-configuration.component';
import { DeviceGroupCreatedComponent } from './devices/add-devices-group/device-group-created/device-group-created.component';
import { AddLabelComponent } from './add-label/add-label.component';
import { RegisteredInfoComponent } from './applications/registered-info/registered-info.component';
import { RegisterApplicationComponent } from './applications/register-application/register-application.component';
import { DeployInstanceComponent } from './applications/deploy-instance/deploy-instance.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { InstanceInfoComponent } from './applications/instance-info/instance-info.component';
import { ServiceInstancesInfoComponent } from './applications/instance-info/service-instances-info/service-instances-info.component';
import { RuleInfoComponent } from './applications/rule-info/rule-info.component';
import { ServiceInfoComponent } from './applications/registered-info/service-info/service-info.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { AssetInfoComponent } from './infrastructure/asset-info/asset-info.component';
import { EdgeControllerInfoComponent } from './infrastructure/edge-controller-info/edge-controller-info.component';
import { ContextualMenuComponent } from './contextual-menu/contextual-menu.component';
import { InstallAgentComponent } from './infrastructure/install-agent/install-agent.component';
import { DeviceInfoComponent } from './infrastructure/device-info/device-info.component';
import { SimpleLogComponent } from './infrastructure/simple-log/simple-log.component';
import { AgentJoinTokenInfoComponent } from './infrastructure/agent-join-token-info/agent-join-token-info.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdvancedFilterOptionsComponent } from './applications/advanced-filter-options/advanced-filter-options.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DeviceGroupInfoComponent } from './devices/device-group-info/device-group-info.component';
import { InstanceServiceGroupInfoComponent
  } from './applications/instance-info/instance-service-group-info/instance-service-group-info.component';
import { RegisteredServiceGroupInfoComponent
  } from './applications/registered-info/registered-service-group-info/registered-service-group-info.component';
import { ManageConnectionsComponent } from './applications/manage-connections/manage-connections.component';
import { AddConnectionsComponent } from './applications/add-connections/add-connections.component';
import { AppInfoComponent } from './applications/app-info/app-info.component';
import { LabelsCardComponent } from './applications/labels-card/labels-card.component';
import { AppInfoDetailedComponent } from './applications/app-info-detailed/app-info-detailed.component';
import { GraphComponent } from './applications/graph/graph.component';
import { ServicesCardComponent } from './applications/services-card/services-card.component';
import { ActionButtonsCardComponent } from './applications/action-buttons-card/action-buttons-card.component';
import { ToolsComponent } from './tools/tools.component';
import { LogsComponent } from './logs/logs.component';
import { ClusterStatusInfoComponent } from './resources/cluster-status-info/cluster-status-info.component';
import { SearchLogsComponent } from './logs/search-logs/search-logs.component';
import { LogsDisplayComponent } from './logs/logs-display/logs-display.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DownloadFileInfoComponent } from './logs/download-file-info/download-file-info.component';
import { OrganizationInfoCardComponent } from './organization/organization-info-card/organization-info-card.component';
import { NgxNetworkVisModule } from 'ngx-network-vis';

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
    AppInfoComponent,
    LabelsCardComponent,
    AppInfoDetailedComponent,
    GraphComponent,
    ServicesCardComponent,
    ActionButtonsCardComponent,
    ToolsComponent,
    LogsComponent,
    ClusterStatusInfoComponent,
    SearchLogsComponent,
    LogsDisplayComponent,
    DownloadFileInfoComponent,
    OrganizationInfoCardComponent
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
    AddConnectionsComponent,
    AppInfoDetailedComponent,
    ClusterStatusInfoComponent,
    DownloadFileInfoComponent
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
    NgxFileDropModule,
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
    BsDatepickerModule.forRoot(),
    // NG-PICK-DATETIME
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    // GRAPH LIBRARY
    NgxNetworkVisModule,
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
