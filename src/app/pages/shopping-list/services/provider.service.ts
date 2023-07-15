import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from 'src/environments/environment';
import { Provider, ProviderNoDate } from '../models/provider';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private url = environmet.providersURL;

  constructor(private http: HttpClient) { }

  getProviders() {
    return this.http.get<Provider[]>(this.url)
  }

  getProvidersNoDate() {
    return this.getProviders().pipe(
      map<Provider[], ProviderNoDate[]>(providers => providers.map(prov => ({
        id: prov.id,
        name: prov.name
      })))
    )
  }

  createProvider(name: string){
    const creationDate = new Date();
    return this.http.post<Provider>(this.url, {name, creationDate})
  }
}
