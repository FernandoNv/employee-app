import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthenticationGuard } from './core/auth/authentication-guard';
import { SignInGuard } from './core/auth/signin-guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [SignInGuard],
    loadChildren: () =>
      import('./feature/auth/auth-routing-module').then(
        m => m.AuthRoutingModule
      ),
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivateChild: [AuthenticationGuard],
    loadChildren: () =>
      import('./feature/home/home-routing').then(m => m.HomeRoutingModule),
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
