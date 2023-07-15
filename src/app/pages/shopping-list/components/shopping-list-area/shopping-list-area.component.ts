import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketProductNoDate, ProductNoDate, marketProductToUpdate, productToSaveProvider } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateProductDialogComponent } from '../add-update-product-dialog/add-update-product-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-shopping-list-area',
  templateUrl: './shopping-list-area.component.html'
})
export class ShoppingListAreaComponent {
  @Input() products!: MarketProductNoDate[];
  @Output() markPurchasedProduct = new EventEmitter<MarketProductNoDate>()
  @Output() clickDeletedProduct = new EventEmitter<MarketProductNoDate>()
  @Output() onUpdateProduct = new EventEmitter<marketProductToUpdate>()

  constructor(
    private productSvc: ProductService,
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  openAddMarketDialog() {
    this._dialog.open(AddUpdateProductDialogComponent).afterClosed().pipe(
      mergeMap((dialogResponse: ProductNoDate | true | MarketProductNoDate) => {
        if (!dialogResponse)
          return of(null)
        else if (dialogResponse == true) {
          return this.openCretateProductDialog()
        }
        else {
          const marketId = Number.parseInt(this.route.snapshot.params['id'])
          return this.productSvc.addProductToList(marketId, dialogResponse)
        }
      })
    ).subscribe(
      (response) => {
        if (response)
          this.products.push(response as MarketProductNoDate)
      }
    )
  }

  openUpdateMarketDialog(product: MarketProductNoDate) {
    const productToUpdate: ProductNoDate = {
      id: product.id,
      name: product.name,
      price: product.price,
      providerName: product.providerName
    }
    this._dialog.open(AddUpdateProductDialogComponent, {
      data: productToUpdate
    }).afterClosed().subscribe(
      (newProd: ProductNoDate | undefined) => {
        if (newProd && newProd.id != productToUpdate.id) {
          this.onUpdateProduct.emit({
            lastProductId: productToUpdate.id,
            marketProduct: {
              ...product,
              id: newProd.id,
              name: newProd.name,
              price: newProd.price,
              providerName: newProd.providerName
            }
          })
        }
      }
    )
  }

  deleteProduct(_product: MarketProductNoDate) {
    this.productSvc.deleteProduct(_product.marketProductId, _product.id).subscribe(
      resp => {
        this.products = this.products.filter((prod) => prod.marketProductId != _product.marketProductId)
      }
    )
  }

  private openCretateProductDialog() {
    return this._dialog.open(CreateProductComponent).afterClosed().pipe(
      mergeMap((productToSave: productToSaveProvider) => {
        if (!productToSave)
          return of(null)
        return this.createProduct(productToSave)
      })
    )
  }

  private createProduct(product: productToSaveProvider) {
    return this.productSvc.createProduct({
      name: product.name,
      price: product.price,
      providerId: product.providerId
    }).pipe(
      mergeMap(prod => {
        const marketId = Number.parseInt(this.route.snapshot.params['id'])
        const prodNoDate: ProductNoDate = {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          providerName: product.providerName
        }
        return this.productSvc.addProductToList(marketId, prodNoDate)
      })
    )
  }
}
