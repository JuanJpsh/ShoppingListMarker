import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient) { }

  addProducto(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/productos', data);
  }

  getProductoList(): Observable<any> {
    return this._http.get('http://localhost:3000/productos');
  }
}
