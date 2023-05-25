import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './components/lists/lists.component';
import { HomeComponent } from './home-page/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

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
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class HomeModule { }
