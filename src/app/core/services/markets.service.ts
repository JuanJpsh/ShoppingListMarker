import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { environmet } from 'src/environments/environment';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { MarketClick, MarketNoUserId, MarketResponse, MarketToSave } from '../../pages/home/models/MarketsResponse';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  private markets = new BehaviorSubject<MarketNoUserId[] | null>(null)

  private url = environmet.shoppingListsURL;

  constructor(private http: HttpClient, private dataStorageSvc: DataStoreService) { }

  getMarkets() {
    if (this.markets.getValue())
      return this.markets as BehaviorSubject<MarketNoUserId[]>
    const userId = this.dataStorageSvc.getData(environmet.userIdKey) as string
    return this.http.get<MarketResponse[]>(`${this.url}?userId=${userId}`).pipe(
      take(1),
      map<MarketResponse[], MarketNoUserId[]>((resp: MarketResponse[]) => resp.map((val) => ({
        id: val.id,
        name: val.name,
        date: val.date
      }))
      ),
      map((resp: MarketNoUserId[]) => resp.sort((a, b) =>new Date(b.date).getTime() - new Date(a.date).getTime())),
      tap((resp: MarketNoUserId[]) => this.markets.next(resp))
    )
  }

  saveMarket(marketName: string) {
    const userId = Number.parseInt(this.dataStorageSvc.getData(environmet.userIdKey) as string);
    const market: MarketToSave = {
      name: marketName,
      date: new Date(),
      userId
    }
    return this.http.post<MarketResponse>(this.url, market).pipe(
      take(1),
      map<MarketResponse, MarketNoUserId>((resp: MarketResponse) => ({
        id: resp.id,
        name: resp.name,
        date: resp.date
      }))
    )
  }

  updateMarket(market: MarketNoUserId) {
    const userId = Number.parseInt(this.dataStorageSvc.getData(environmet.userIdKey) as string)
    const marketToUpdate: MarketToSave = { ...market, userId }
    return this.http.put<any>(`${this.url}/${market.id}`, marketToUpdate).pipe(
      take(1)
    )
  }

  cleanMarkets(){
    this.markets.next(null);
  }
}
