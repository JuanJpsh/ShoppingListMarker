import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketProductNoDate, ProductNoDate } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateProductDialogComponent } from '../add-update-product-dialog/add-update-product-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-shopping-list-area',
  templateUrl: './shopping-list-area.component.html'
})
export class ShoppingListAreaComponent {
  @Input() products!: MarketProductNoDate[];
  @Output() markPurchasedProduct = new EventEmitter<MarketProductNoDate>()
  @Output() clickDeletedProduct = new EventEmitter<MarketProductNoDate>()

  constructor(
    private productSvc: ProductService,
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  openAddMarketDialog() {
    this._dialog.open(AddUpdateProductDialogComponent).afterClosed().pipe(
      mergeMap((product: ProductNoDate) => {
        if (!product)
          return of(null)
        const marketId = Number.parseInt(this.route.snapshot.params['id'])
        return this.productSvc.addProductToList(marketId, product)
      })
    ).subscribe(
      (resp) => {
        if (resp)
          this.products.push(resp)
      }
    )
  }

  deleteProduct(_product: MarketProductNoDate) {
    this.productSvc.deleteProducto(_product.marketProductId,_product.id).subscribe(
      resp => {
        this.products = this.products.filter((prod)=>prod.marketProductId!=_product.marketProductId)
      }
    )
  }
}
