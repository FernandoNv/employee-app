import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'inicio',
    component: HomeComponent,
    title: 'Início',
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      import('./employee/employee.module').then(m => m.EmployeeModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página não Encontrada',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
