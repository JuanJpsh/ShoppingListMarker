import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { environmet } from 'src/environments/environment';
import { MarketsService } from '../../../core/services/markets.service';
import { MarketClick, MarketNoUserId } from '../models/MarketsResponse';
import { Router } from '@angular/router';
import { AddUpdateMarketDialogComponent } from '../components/add-update-market-dialog/add-update-market-dialog.component';
import { MarketTitleService } from 'src/app/core/services/market-title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userFullname!: string;
  markets!: MarketNoUserId[]

  constructor(
    private _dialog: MatDialog,
    private dataStorageSvc: DataStoreService,
    private router: Router,
    private marketsSvc: MarketsService,
    private marketTitleSvc: MarketTitleService
  ) { }

  ngOnInit(): void {
    this.userFullname = this.dataStorageSvc.getData(environmet.userFullnameKey) as string
    this.marketsSvc.getMarkets().subscribe((resp: MarketNoUserId[]) => {
      this.markets = resp
    })
  }

  navigateToList(clickedMarket: MarketClick) {
    this.marketTitleSvc.setMarketTitle(clickedMarket.name);
    this.router.navigate(['dashboard', 'market', clickedMarket.id.toString()]);
  }

  openAddMarketDialog() {
    this._dialog.open(AddUpdateMarketDialogComponent).afterClosed().subscribe(
      (resp: string | undefined) => {
        if (resp && resp != '') {
          this.marketsSvc.saveMarket(resp).subscribe()
        }
      }
    )
  }

  openUpdateMarketDialog(marketToUpdate: MarketNoUserId) {
    this._dialog.open(AddUpdateMarketDialogComponent, {
      data: marketToUpdate.name
    }).afterClosed().subscribe(
      (resp: string | undefined) => {
        if (resp && resp != '' && resp != marketToUpdate.name) {
          marketToUpdate.name = resp
          this.updateMarketList(marketToUpdate)
        }
      }
    )
  }

  private updateMarketList(clickedMarket: MarketNoUserId) {
    this.marketsSvc.updateMarket(clickedMarket).subscribe()
  }
}
