import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../../pages/auth/models/credentials';
import { map, tap } from 'rxjs';
import { UserResponse } from '../../pages/auth/models/userResponse';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000/users"

  constructor(
    private http: HttpClient,
    private dataStorageSvc: DataStoreService,
    private router: Router
  ) { }

  login(credentials: Credentials) {
    return this.http.get<UserResponse[]>(
      `${this.url}?email=${credentials.email}&password=${credentials.password}`
    ).pipe(
      map((resp: UserResponse[]) => {
        if (resp.length == 0)
          return false
        this.dataStorageSvc.saveData("userId", resp[0].id.toString());
        this.dataStorageSvc.saveData("userName", resp[0].name)
        return true
      })
    )
  }

  logout() {
    this.dataStorageSvc.deleteData("userId")
    this.dataStorageSvc.deleteData("userName")
    this.router.navigate([''])
  }
}
