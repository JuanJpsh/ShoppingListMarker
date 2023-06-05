import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketProductNoDate } from '../../models/product';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-purchased-products-list-area',
  templateUrl: './purchased-products-list-area.component.html'
})
export class PurchasedProductsListAreaComponent {
  @Input() products!: MarketProductNoDate[];
  @Output() markListedProduct = new EventEmitter<MarketProductNoDate>()
}
