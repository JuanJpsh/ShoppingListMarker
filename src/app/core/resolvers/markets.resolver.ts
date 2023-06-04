import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MarketNoUserId } from 'src/app/pages/home/models/MarketsResponse';
import { MarketsService } from 'src/app/core/services/markets.service';

export const marketsResolver: ResolveFn<MarketNoUserId[]> = (route, state) => {
  const marketsSvc = inject(MarketsService);
  return marketsSvc.getMarkets();
};
