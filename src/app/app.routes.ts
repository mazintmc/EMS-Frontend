import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Employees } from './features/employees/employees';
import { Home } from './features/home/home';
import { rootRedirectGuard } from './core/guards/root-redirect-guard';
import { authGuard } from "../app/core/guards/auth.guard"
import { LayoutComponent } from './core/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [rootRedirectGuard],
    pathMatch: 'full'
  },
  { path: 'login', component: Login },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {path: 'dashboard', component: Dashboard},
      {path: 'employees', component: Employees}
    ]
  }
];
