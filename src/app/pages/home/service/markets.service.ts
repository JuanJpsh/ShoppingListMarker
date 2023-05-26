import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { environmet } from 'src/environments/environment';
import { map, take } from 'rxjs';
import { MarketNoUserId, MarketResponse } from '../models/MarketsResponse';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  private url = environmet.shoppingListsURL;

  constructor(private http: HttpClient, private dataStorageSvc: DataStoreService) { }

  getMarkets() {
    const userId = this.dataStorageSvc.getData(environmet.userIdKey) as string
    return this.http.get<MarketResponse[]>(`${this.url}?userId=${userId}`).pipe(
      take(1),
      map<MarketResponse[], MarketNoUserId[]>((resp: MarketResponse[]) => resp.map((val) => ({
        id: val.id,
        name: val.name,
        date: val.date
      }))
      )
    )
  }
}
