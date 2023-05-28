import { Component, Input, OnInit } from '@angular/core';
import { ProductNoDate } from '../../models/product';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-shopping-list-area',
  templateUrl: './shopping-list-area.component.html'
})
export class ShoppingListAreaComponent {
  @Input() products!: ProductNoDate[];
}
