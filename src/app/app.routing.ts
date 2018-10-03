// tslint:disable-next-line:eofline
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrganizationComponent } from './organization/organization.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'organization', component: OrganizationComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

