import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { ProductNoDate, ProductResponse } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient) { }

  addProducto(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/products', data);
  }

  updateProducto(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/products/${id}`, data);
  }

  getProductoList(): Observable<ProductNoDate[]> {
    return this._http.get<ProductResponse[]>('http://localhost:3000/products').pipe(
      take(1),
      map<ProductResponse[], ProductNoDate[]>(resp => resp.map(val => ({
        id: val.id,
        name: val.name,
        price: val.price,
        providerId: val.providerId
      })))
    );
  }

  deleteProducto(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/products/${id}`);
  }
}
