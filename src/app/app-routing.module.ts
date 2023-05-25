import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './layouts/empty/empty.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { sessionGuard } from './core/guards/session.guard';
import { noSessionGuard } from './core/guards/noSession.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [noSessionGuard],
    component: EmptyComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'register',
    pathMatch: 'full',
    canActivate: [noSessionGuard],
    component: EmptyComponent,
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    canActivate: [sessionGuard],
    component: DashboardComponent,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
