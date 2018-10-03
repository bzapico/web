// tslint:disable-next-line:eofline
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, provideRoutes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'login',
        component: LoginComponent
    },
    // otherwise redirect to home
    {
        path: '**',
        redirectTo: ''
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});

