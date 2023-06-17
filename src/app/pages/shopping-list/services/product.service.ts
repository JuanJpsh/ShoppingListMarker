import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, take, tap } from 'rxjs';
import { MarketProductNoDate, ProductNoDate, ProductJoinResponse, Products } from '../models/product';
import { environmet } from 'src/environments/environment';
import { MarketProductJoin, MarketProduct, MarketProductToSave } from '../models/market-product';
import { ProviderService } from './provider.service';
import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private listedProductsIds: number[] = []

  private productsURL = environmet.productsURL;
  private marketsProductsURL = environmet.marketsProductsURL;

  constructor(private http: HttpClient, private providerSvc: ProviderService) { }

  getNotListedProducts(): Observable<ProductNoDate[]> {
    const excludedIds = this.listedProductsIds.reduce((excluded, id) => {
      if (excluded == '')
        return `?id_ne=${id}`
      return `${excluded}&id_ne=${id}`
    }, '')
    return this.http.get<ProductJoinResponse[]>(`${this.productsURL}${excludedIds}&_expand=provider`).pipe(
      take(1),
      map<ProductJoinResponse[], ProductNoDate[]>(
        (products: ProductJoinResponse[]) => products.map((val) => ({
          id: val.id,
          name: val.name,
          price: val.price,
          providerName: val.provider.name
        }))
      )
    )
  }

  getProductsByMarket(marketId: number): Observable<Products> {
    const products = this.http.get<MarketProductJoin[]>(`${this.marketsProductsURL}?marketId=${marketId}&_expand=product`)
    const providers = this.providerSvc.getProviders()
    return forkJoin([products, providers]).pipe(
      take(1),
      map<[MarketProductJoin[], Provider[]], MarketProductNoDate[]>(([prods, provs]) => prods.map(val => ({
        id: val.productId,
        name: val.product.name,
        price: val.product.price,
        providerName: (provs.find(prov => prov.id == val.product.providerId) as Provider).name,
        marketProductId: val.id,
        state: val.state
      }))),
      tap((marketProducts) => this.listedProductsIds = marketProducts.map((val) => val.id)),
      map<MarketProductNoDate[], Products>(
        (marketProducts: MarketProductNoDate[]) => {
          const listedProducts = marketProducts.filter((val) => val.state == "listed")
          const purchasedProducts = marketProducts.filter((val) => val.state == "purchased")
          return {
            listedProducts,
            purchasedProducts
          }
        }
      )
    )
  }

  addProductToList(marketId: number, product: ProductNoDate): Observable<MarketProductNoDate> {
    const productToSave: MarketProductToSave = {
      marketId,
      productId: product.id,
      state: 'listed'
    }
    return this.http.post<MarketProduct>(this.marketsProductsURL, productToSave)
      .pipe(
        take(1),
        map<MarketProduct, MarketProductNoDate>(marketProduct => ({
          id: product.id,
          marketProductId: marketProduct.id,
          name: product.name,
          price: product.price,
          providerName: product.providerName,
          state: productToSave.state
        })),
        tap((prod) => this.listedProductsIds.push(prod.id)),
      );
  }

  changeProductState(marketProductId: number, state: "listed" | "purchased") {
    if (state == "listed")
      state = "purchased"
    else
      state = "listed"

    return this.http.patch<MarketProduct>(
      `${this.marketsProductsURL}/${marketProductId}`, { state }
    ).pipe(
      take(1),
      map((resp) => {
        return resp ? true : false
      })
    )
  }

  changeMarketProduct(marketProductId: number, productId: number, lastProductId: number) {
    return this.http.patch<MarketProduct>(
      `${this.marketsProductsURL}/${marketProductId}`, { productId }
    ).pipe(
      take(1),
      tap(() => {
        this.listedProductsIds = this.listedProductsIds.filter((ids) => ids != lastProductId)
        this.listedProductsIds.push(productId)
      }),
      map((resp) => {
        return resp ? true : false
      })
    )
  }

  deleteProduct(marketProductId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.marketsProductsURL}/${marketProductId}`).pipe(
      tap(() => this.listedProductsIds = this.listedProductsIds.filter((idprod) => idprod != productId))
    );
  }
}
