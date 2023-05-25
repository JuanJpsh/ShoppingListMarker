import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseCardComponent } from './components/purchase-card/purchase-card.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { AddUpdateDialogComponent } from './components/add-update-dialog/add-update-dialog.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';



@NgModule({
  declarations: [
    PurchaseCardComponent,
    ShoppingListComponent,
    AddUpdateDialogComponent,
    ShoppingPageComponent,
    ProvidersListComponent
  ],
  imports: [
    CommonModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule { }
