import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Employees } from './features/employees/employees';
import { Home } from './features/home/home';
import { rootRedirectGuard } from './core/guards/root-redirect-guard';
import { authGuard } from "../app/core/guards/auth.guard"
import { LayoutComponent } from './core/layout/layout';
import { Attendance } from './features/attendance/attendance';
import { Settings } from './features/settings/settings';
import { Payroll } from './features/payroll/payroll';

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
      {path: 'employees', component: Employees},
      {path: 'attendance', component: Attendance},
      {path: 'settings', component: Settings},
      {path: 'payroll', component: Payroll}
    ]
  }
];
