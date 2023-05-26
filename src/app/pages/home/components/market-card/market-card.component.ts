import { Component, Input } from '@angular/core';
import { MarketNoUserId } from '../../models/MarketsResponse';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.scss']
})
export class MarketCardComponent {
  @Input() market!: MarketNoUserId
}
