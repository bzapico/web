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

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { OrganizationComponent } from './organization/organization.component';
import { ResourcesComponent } from './resources/resources.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ClusterComponent } from './resources/cluster/cluster.component';
import { DevicesComponent } from './devices/devices.component';
import { RegisteredInfoComponent } from './applications/registered-info/registered-info.component';
import { InstanceInfoComponent } from './applications/instance-info/instance-info.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { LogsComponent } from './logs/logs.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'organization',
                pathMatch: 'full'
            },
            {
                path: 'organization',
                component: OrganizationComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'resources',
                component: ResourcesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'resources/cluster/:clusterId',
                component: ClusterComponent,
            },
            {
                path: 'applications',
                component: ApplicationsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'applications/registered/:registeredId',
                component: RegisteredInfoComponent,
            },
            {
                path: 'applications/instance/:instanceId',
                component: InstanceInfoComponent,
            },
            {
                path: 'devices',
                component: DevicesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'infrastructure',
                component: InfrastructureComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'logs',
                component: LogsComponent,
                canActivate: [AuthGuard]
            },
        ]
    },
    // otherwise redirect to home
    {
        path: '**',
        redirectTo: ''
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
