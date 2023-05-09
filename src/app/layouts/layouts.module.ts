import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EmptyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
