import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketProductNoDate } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-purchased-products-list-area',
  templateUrl: './purchased-products-list-area.component.html'
})
export class PurchasedProductsListAreaComponent {
  @Input() products!: MarketProductNoDate[];
  @Output() markListedProduct = new EventEmitter<MarketProductNoDate>()
  @Output() clickDeletedProduct = new EventEmitter<MarketProductNoDate>()

  constructor(
    private productSvc: ProductService,
  ) { }

  deleteProduct(_product: MarketProductNoDate) {
    this.productSvc.deleteProduct(_product.marketProductId, _product.id).subscribe(
      () => {
        this.products = this.products.filter((prod) => prod.marketProductId != _product.marketProductId)
      }
    )
  }

  addProductAccount() {
    if (this.products)
      return this.products.reduce((account, prod) => account + prod.price, 0)
    return 0
  }
}
