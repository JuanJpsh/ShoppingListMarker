import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { MarketProductNoDate, ProductNoDate, ProductResponse, Products } from '../models/product';
import { environmet } from 'src/environments/environment';
import { MarketProductJoin, MarketProduct, MarketProductToSave } from '../models/market-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private listedProductsIds: number[] = []

  private productsURL = environmet.productsURL;
  private marketsProductsURL = environmet.marketsProductsURL;

  constructor(private http: HttpClient) { }

  addProducto(data: any): Observable<any> {
    return this.http.post(this.productsURL, data);
  }

  updateProducto(id: number, data: any): Observable<any> {
    return this.http.put(`${this.productsURL}/${id}`, data);
  }

  getNotListedProducts(): Observable<ProductNoDate[]> {
    return this.http.get<ProductResponse[]>(this.productsURL).pipe(
      take(1),
      map((prods) => prods.filter((prod) => !this.listedProductsIds.includes(prod.id))),
      map<ProductResponse[], ProductNoDate[]>(
        (products: ProductResponse[]) => products.map((val) => ({
          id: val.id,
          name: val.name,
          price: val.price,
          providerId: val.providerId
        }))
      )
    )
  }

  getProductsByMarket(marketId: number): Observable<Products> {
    return this.http.get<MarketProductJoin[]>(
      `${this.marketsProductsURL}?marketId=${marketId}&_expand=product`)
      .pipe(
        take(1),
        map<MarketProductJoin[], MarketProductNoDate[]>(
          (marketProducts: MarketProductJoin[]) => marketProducts.map((val) => ({
            id: val.productId,
            name: val.product.name,
            price: val.product.price,
            providerId: val.product.providerId,
            marketProductId: val.id,
            state: val.state
          }))
        ),
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
          providerId: product.providerId,
          state: productToSave.state
        })),
        tap((prod) => this.listedProductsIds.push(prod.id)),
      );
  }

  changeProductState(marketProduct: MarketProduct) {
    if (marketProduct.state == "listed")
      marketProduct.state = "purchased"
    else
      marketProduct.state = "listed"

    return this.updateProduct(marketProduct)
  }

  updateProduct(marketProduct: MarketProduct) {
    return this.http.put<MarketProduct>(
      `${this.marketsProductsURL}/${marketProduct.id}`, marketProduct
    ).pipe(
      take(1),
      map((resp) => {
        return resp ? true : false
      })
    )
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.productsURL}/${id}`);
  }
}
