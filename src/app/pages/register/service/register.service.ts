import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { UserDataRegister, UserDataRegisterResponse } from '../models/userDataRegister';
import { UserResponse } from '../../../core/models/userResponse';
import { map, mergeMap, of, take } from 'rxjs';
import { environmet } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = environmet.userURL;

  constructor(
    private http: HttpClient,
    private dataStorageSvc: DataStoreService,
  ) { }

  register(userDataRegister: UserDataRegister) {
    return this.http.get<UserResponse[]>(
      `${this.url}?username=${userDataRegister.username}`
    ).pipe(
      take(1),
      mergeMap((resp: UserResponse[]) => {
        if (resp.length != 0)
          return of(null)
        return this.http.post<UserDataRegisterResponse>(this.url, userDataRegister)
      }),
      map((resp) => {
        if (resp == null)
          return false;
        this.dataStorageSvc.saveData("userId", resp.id.toString());
        this.dataStorageSvc.saveData("fullname", resp.fullname)
        return true;
      })
    )
  }
}
