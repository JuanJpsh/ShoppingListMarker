import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MarketClick, MarketNoUserId } from 'src/app/pages/home/models/MarketsResponse';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  markets!: MarketClick[];

  constructor(media: MediaMatcher, private authSvc: AuthService, private route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data["markets"] as MarketNoUserId[]),
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
