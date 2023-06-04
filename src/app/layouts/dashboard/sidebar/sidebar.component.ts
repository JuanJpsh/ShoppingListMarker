import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { MarketTitleService } from 'src/app/core/services/market-title.service';
import { MarketClick } from 'src/app/pages/home/models/MarketsResponse';
import { environmet } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() markets!: MarketClick[];
  @Output() onOptionSelected = new EventEmitter<void>()

  currentUrl!: string;

  constructor(private router: Router, private dataStorageSvc: DataStoreService, private marketTitleSvc: MarketTitleService) {}

  ngOnInit() {
    this.currentUrl = this.router.url.replace('/dashboard/', '');
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.replace('/dashboard/', '');
    });
  }

  onOptionClick(marketName: string){
    this.marketTitleSvc.setMarketTitle(marketName)
    this.onOptionSelected.emit();
  }
}
