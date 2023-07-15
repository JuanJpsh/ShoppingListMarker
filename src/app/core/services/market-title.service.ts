import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, of } from 'rxjs';
import { MarketsService } from 'src/app/core/services/markets.service';
import { MarketNoUserId } from 'src/app/pages/home/models/MarketsResponse';

@Injectable({
  providedIn: 'root'
})
export class MarketTitleService {

  private marketTitle$ = new BehaviorSubject<string>('')

  constructor(private marketsSvc: MarketsService) { }

  setMarketTitle(marketTitle: string) {
    this.marketTitle$.next(marketTitle);
  }

  getMarketTitle(id: number) {
    return this.marketTitle$.asObservable().pipe(
      mergeMap((resp: string) => {
        if (resp == '')
          return this.marketsSvc.getMarkets()
        return of(resp)
      }),
      map(response => this.getMarketName(id, response))
    )
  }

  private getMarketName(id: number, $event: string | MarketNoUserId[]) {
    if (typeof $event == "string")
      return $event
    let currentMarket = $event.find((val) => val.id == id)
    return currentMarket ? currentMarket.name : ''
  }
}
