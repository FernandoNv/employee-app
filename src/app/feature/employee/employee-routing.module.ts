import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    title: 'Listar Funcionários',
  },
  {
    path: 'add',
    component: EmployeeCreateComponent,
    title: 'Criar Funcionário',
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
