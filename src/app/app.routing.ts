// tslint:disable-next-line:eofline
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, provideRoutes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { OrganizationComponent } from './organization/organization.component';

const appRoutes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        outlet: 'login',
        component: LoginComponent
    },
    {
        path: 'app',
        component: MainComponent,
        outlet: 'login',
        canActivate: [AuthGuard]
    },
    {
        path: 'app/organization',
        component: OrganizationComponent,
        outlet: 'main',
        canActivate: [AuthGuard]
    },
    // otherwise redirect to home
    {
        path: '**',
        redirectTo: ''
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });

