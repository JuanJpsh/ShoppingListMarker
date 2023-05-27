import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseCardComponent } from './components/purchase-card/purchase-card.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { AddUpdateDialogComponent } from './components/add-update-dialog/add-update-dialog.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
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

@NgModule({
  declarations: [
    PurchaseCardComponent,
    ShoppingListComponent,
    AddUpdateDialogComponent,
    ShoppingPageComponent,
    ProvidersListComponent,
    EmpAddEditComponent
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
    MatIconModule
  ]
})
export class ShoppingListModule { }
