import { CanActivateFn, Router } from '@angular/router';
import { MarketTitleService } from '../services/market-title.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const validMarketGuard: CanActivateFn = (route, state) => {
  const marketTitleSvc = inject(MarketTitleService);
  const router = inject(Router);
  let id = Number.parseInt(route.params['id'])
  if (!id)
    return router.createUrlTree(['dashboard', 'home']);
  return marketTitleSvc.getMarketTitle(id).pipe(
    map((title: string) => {
      if (!title)
        return router.createUrlTree(['dashboard', 'home']);
      return true;
    })
  )
};
