import { Component, Input } from '@angular/core';
import { ProductNoDate } from '../../models/product';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-purchased-products-list-area',
  templateUrl: './purchased-products-list-area.component.html'
})
export class PurchasedProductsListAreaComponent {
  @Input() products!: ProductNoDate[];
}
