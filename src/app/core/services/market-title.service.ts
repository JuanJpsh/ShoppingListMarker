import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, mergeMap, of } from 'rxjs';
import { MarketNoUserId } from 'src/app/pages/home/models/MarketsResponse';
import { MarketsService } from 'src/app/core/services/markets.service';

@Injectable({
  providedIn: 'root'
})
export class MarketTitleService {

  private marketTitle$ = new BehaviorSubject<string>('')

  constructor(private marketsSvc: MarketsService) {}

  setMarketTitle(marketTitle: string) {
    this.marketTitle$.next(marketTitle);
  }

  getMarketTitle(id: number){
    return this.marketTitle$.asObservable().pipe(
      mergeMap((resp: string) => {
        if (resp == '')
          return this.marketsSvc.getMarkets()
        return of(resp)
      }),
      map((resp) => {
        if (typeof resp == "string")
          return resp
        let currentMarket = resp.find((val) => val.id == id)
        return currentMarket ? currentMarket.name : ''
      })
    )
  }
}
