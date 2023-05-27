import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';


@NgModule({
  declarations: [
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormMaterialModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
