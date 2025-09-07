import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authCanMatch } from './services/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    canMatch: [authCanMatch],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((r) => r.dashboardRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
