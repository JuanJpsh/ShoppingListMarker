import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketClick, MarketNoUserId } from '../../models/MarketsResponse';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html'
})
export class MarketCardComponent {
  @Input() market!: MarketNoUserId
  @Output() clickWatch = new EventEmitter<MarketClick>();
  @Output() clickUpdate = new EventEmitter<MarketNoUserId>();

  onClickWatch() {
    const { id, name } = this.market
    this.clickWatch.emit({
      id,
      name
    })
  }

  onClickUpdate(){
    this.clickUpdate.emit(this.market)
  }
}
