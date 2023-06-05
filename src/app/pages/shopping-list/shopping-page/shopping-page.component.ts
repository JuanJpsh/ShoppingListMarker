import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MarketProductNoDate, Products } from '../models/product';
import { MarketTitleService } from 'src/app/core/services/market-title.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { MarketProduct } from '../models/market-product';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent implements OnInit {

  listedProducts!: MarketProductNoDate[];
  purchasedProducts!: MarketProductNoDate[];
  listName!: string;

  constructor(
    private productSvc: ProductService,
    private marketTitleSvc: MarketTitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap((params) => this.marketTitleSvc.getMarketTitle(Number.parseInt(params['id'])))
    ).subscribe((title: string) => {
      this.listName = title
    })

    this.route.params.pipe(
      mergeMap((params) => this.productSvc.getProductsByMarket(Number.parseInt(params['id'])))
    ).subscribe((products: Products) => {
      this.listedProducts = products.listedProducts
      this.purchasedProducts = products.purchasedProducts
    })
  }

  moveProductToPurchased(product: MarketProductNoDate) {
    const marketProductToUpdate = this.initMarketProductToUpdate(product)
    this.productSvc.changeProductState(marketProductToUpdate).subscribe((resp) => {
      if (resp) {
        const index = this.listedProducts.findIndex((val) => val.id == product.id)
        this.listedProducts[index].state = "purchased"
        this.purchasedProducts.push(this.listedProducts[index])
        this.listedProducts.splice(index, 1)
      }
    })
  }

  moveProductToListed(product: MarketProductNoDate) {
    const marketProductToUpdate = this.initMarketProductToUpdate(product)
    this.productSvc.changeProductState(marketProductToUpdate).subscribe((resp) => {
      if (resp) {
        const index = this.purchasedProducts.findIndex((val) => val.id == product.id)
        this.purchasedProducts[index].state = "listed"
        this.listedProducts.push(this.purchasedProducts[index])
        this.purchasedProducts.splice(index, 1)
      }
    })
  }

  private initMarketProductToUpdate(product: MarketProductNoDate): MarketProduct {
    const marketId = Number.parseInt(this.route.snapshot.params['id'])
    return {
      id: product.marketProductId,
      marketId,
      productId: product.id,
      state: product.state
    }
  }
}
