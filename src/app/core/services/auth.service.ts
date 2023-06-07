import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { map, take } from 'rxjs';
import { UserResponse } from '../models/userResponse';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { Router } from '@angular/router';
import { environmet } from 'src/environments/environment';
import { MarketsService } from './markets.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environmet.userURL

  constructor(
    private http: HttpClient,
    private dataStorageSvc: DataStoreService,
    private marketsSvc: MarketsService,
    private router: Router
  ) { }

  login(credentials: Credentials) {
    return this.http.get<UserResponse[]>(
      `${this.url}?username=${credentials.username}&password=${credentials.password}`
    ).pipe(
      take(1),
      map((resp: UserResponse[]) => {
        if (resp.length == 0)
          return false
        this.dataStorageSvc.saveData(environmet.userIdKey, resp[0].id.toString());
        this.dataStorageSvc.saveData(environmet.userFullnameKey, resp[0].fullname)
        return true
      })
    )
  }

  logout() {
    this.dataStorageSvc.deleteData(environmet.userIdKey)
    this.dataStorageSvc.deleteData(environmet.userFullnameKey)
    this.marketsSvc.cleanMarkets()
    this.router.navigate([''])
  }
}
