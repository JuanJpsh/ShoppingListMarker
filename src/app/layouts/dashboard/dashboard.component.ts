import { Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher, private authSvc: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  onLogout(){
    this.authSvc.logout();
  }
}
