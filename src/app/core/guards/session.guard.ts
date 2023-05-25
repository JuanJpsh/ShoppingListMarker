import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataStoreService } from '../services/data-store.service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const dataStorageSvc = inject(DataStoreService)
  const router = inject(Router)
  if (dataStorageSvc.getData('userId') && dataStorageSvc.getData('userName'))
    return true;
  return router.navigate([''])
};
