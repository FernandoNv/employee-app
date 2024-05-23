import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar',
  },
  {
    path: 'criar',
    component: EmployeeCreateComponent,
    title: 'Criar Funcionário',
  },
  {
    path: 'listar',
    component: EmployeeListComponent,
    title: 'Listar Funcionários',
  },
  {
    path: ':id',
    component: EmployeeEditComponent,
    title: 'Editar Funcionário',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
