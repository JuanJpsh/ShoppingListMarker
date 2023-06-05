import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingListAreaComponent } from './components/shopping-list-area/shopping-list-area.component';
import { PurchasedProductsListAreaComponent } from './components/purchased-products-list-area/purchased-products-list-area.component';
import { AddUpdateProductDialogComponent } from './components/add-update-product-dialog/add-update-product-dialog.component';
import { CardMaterialModule } from 'src/app/commons/modules/card-material.module';
import { OtherComponentsMaterialModule } from 'src/app/commons/modules/other-components-material.mosule';

@NgModule({
  declarations: [
    ShoppingPageComponent,
    ShoppingListAreaComponent,
    PurchasedProductsListAreaComponent,
    AddUpdateProductDialogComponent
  ],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    FormMaterialModule,
    CardMaterialModule,
    OtherComponentsMaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class ShoppingListModule { }
