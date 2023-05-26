import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './layouts/empty/empty.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { sessionGuard } from './core/guards/session.guard';
import { noSessionGuard } from './core/guards/noSession.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [sessionGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'market/:id',
        pathMatch: 'full',
        loadChildren: () => import('./pages/shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ],
    
  },
  {
    path: '',
    canActivate: [noSessionGuard],
    component: EmptyComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'register',
        pathMatch: 'full',
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
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
