import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingListAreaComponent } from './components/shopping-list-area/shopping-list-area.component';
import { PurchasedProductsListAreaComponent } from './components/purchased-products-list-area/purchased-products-list-area.component';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ShoppingPageComponent,
    EmpAddEditComponent,
    ShoppingListAreaComponent,
    PurchasedProductsListAreaComponent
  ],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormMaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class ShoppingListModule { }
