import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormMaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
