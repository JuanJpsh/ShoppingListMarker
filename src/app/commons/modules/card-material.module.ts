import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatDividerModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class CardMaterialModule { }
