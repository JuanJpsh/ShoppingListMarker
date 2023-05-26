import { Component, OnInit } from '@angular/core';
import { EmpAddEditComponent } from '../../shopping-list/components/emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { environmet } from 'src/environments/environment';
import { MarketsService } from '../service/markets.service';
import { Observable } from 'rxjs';
import { MarketClick, MarketNoUserId } from '../models/MarketsResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userFullname!: string;
  markets!: Observable<MarketNoUserId[]>

  constructor(
    private _dialog: MatDialog,
    private dataStorageSvc: DataStoreService,
    private router: Router,
    private marketsSvc: MarketsService
  ) { }

  ngOnInit(): void {
    this.userFullname = this.dataStorageSvc.getData(environmet.userFullnameKey) as string
    this.markets = this.marketsSvc.getMarkets()
  }

  navigateToList(clickedMarket: MarketClick){
    this.dataStorageSvc.saveData(environmet.listNameKey, clickedMarket.name)
    this.router.navigate(['dashboard', 'market', clickedMarket.id.toString()])
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }
}
