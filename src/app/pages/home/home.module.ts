import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './components/lists/lists.component';
import { HomeComponent } from './home-page/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    ListsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
