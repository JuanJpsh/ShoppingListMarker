import { Component, OnInit } from '@angular/core';
import { EmpAddEditComponent } from '../components/emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { environmet } from 'src/environments/environment';
import { MarketsService } from '../service/markets.service';
import { Observable } from 'rxjs';
import { MarketNoUserId } from '../models/MarketsResponse';

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
    private marketsSvc: MarketsService
  ) { }

  ngOnInit(): void {
    this.userFullname = this.dataStorageSvc.getData(environmet.userFullnameKey) as string
    this.markets = this.marketsSvc.getMarkets()
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }
}
