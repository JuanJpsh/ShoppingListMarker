import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from 'src/environments/environment';
import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private url = environmet.providersURL;

  constructor(private http: HttpClient) { }

  getProviders(){
    return this.http.get<Provider[]>(this.url)
  }
}
