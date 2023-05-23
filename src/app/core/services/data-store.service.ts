import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  saveData(key: string, value: string){
    sessionStorage.setItem(key, value);
  }

  getData(key: string){
    return sessionStorage.getItem(key);
  }

  deleteData(key: string){
    sessionStorage.removeItem(key)
  }
}
