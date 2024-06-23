import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin',
      },
      {
        path: 'signin',
        component: SigninComponent,
        title: 'Se identifique',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
