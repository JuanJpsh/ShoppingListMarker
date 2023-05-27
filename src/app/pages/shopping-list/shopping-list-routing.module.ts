import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
