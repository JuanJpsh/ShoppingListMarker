import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/core/services/auth.service';
import { MarketClick, MarketNoUserId } from 'src/app/pages/home/models/MarketsResponse';
import { map } from 'rxjs';
import { MarketsService } from 'src/app/core/services/markets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  markets!: MarketClick[];

  constructor(
    media: MediaMatcher,
    private authSvc: AuthService,
    private marketSvc: MarketsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.marketSvc.getMarkets().pipe(
      map<MarketNoUserId[], MarketClick[]>((resp: MarketNoUserId[]) => resp.map((val) => ({
        id: val.id,
        name: val.name
      })))
    ).subscribe(markets => {
      this.markets = markets;
    })
  }

  onLogout() {
    this.authSvc.logout();
  }
}
