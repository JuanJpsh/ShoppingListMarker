import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataStoreService } from '../services/data-store.service';

export const noSessionGuard: CanActivateFn = (route, state) => {
  const dataStorageSvc = inject(DataStoreService)
  const router = inject(Router)
  if (dataStorageSvc.getData('userId') && dataStorageSvc.getData('fullname'))
    return router.navigate(['home']);
  return true
};
