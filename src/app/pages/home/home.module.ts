import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './components/lists/lists.component';
import { HomeComponent } from './home-page/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ListsComponent,
    HomeComponent,
    EmpAddEditComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormMaterialModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class HomeModule { }
