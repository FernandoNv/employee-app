import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
    title: 'Listar Departamento',
  },
  {
    path: 'add',
    component: DepartmentCreateComponent,
    title: 'Criar Departamento',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
