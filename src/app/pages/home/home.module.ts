import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketCardComponent } from './components/market-card/market-card.component';
import { HomeComponent } from './home-page/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormMaterialModule } from 'src/app/commons/modules/form-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CardMaterialModule } from 'src/app/commons/modules/card-material.module';
import { AddUpdateMarketDialogComponent } from './components/add-update-market-dialog/add-update-market-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MarketCardComponent,
    HomeComponent,
    AddUpdateMarketDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormMaterialModule,
    CardMaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class HomeModule { }
