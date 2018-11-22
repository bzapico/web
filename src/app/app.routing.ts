// tslint:disable-next-line:eofline
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, provideRoutes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { OrganizationComponent } from './organization/organization.component';
import { ResourcesComponent } from './resources/resources.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ClusterComponent } from './cluster/cluster.component';

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
            }
        ]
    },
    // otherwise redirect to home
    {
        path: '**',
        redirectTo: ''
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });

