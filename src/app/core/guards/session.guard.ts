import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataStoreService } from '../services/data-store.service';
import { environmet } from 'src/environments/environment';

export const sessionGuard: CanActivateFn = (route, state) => {
  const dataStorageSvc = inject(DataStoreService)
  const router = inject(Router)
  if (dataStorageSvc.getData(environmet.userIdKey) && dataStorageSvc.getData(environmet.userFullnameKey))
    return true;
  return router.navigate([''])
};
