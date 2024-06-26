import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio',
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('../employee/employee-routing.module').then(
            m => m.EmployeeRoutingModule
          ),
      },
      {
        path: 'department',
        loadChildren: () =>
          import('../department/department-routing.module').then(
            m => m.DepartmentRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
