import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketCardComponent } from './components/market-card/market-card.component';
import { HomeComponent } from './home-page/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    MarketCardComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormMaterialModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,MatIconModule
  ]
})
export class HomeModule { }
