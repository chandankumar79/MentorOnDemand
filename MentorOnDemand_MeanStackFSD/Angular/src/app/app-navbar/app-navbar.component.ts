import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  userType: string;
  isLoggedIn: boolean;
  dashboardLink: string;

  constructor(private userService: UserService, private router: Router) {
    this.userService.getLoggedInStatus.subscribe(isLoggedIn => {this.isLoggedIn = isLoggedIn; this.setDashboardLink(); });
    // this.userService.getUserTypeValue.subscribe(userType => this.setDashboardLink());
   }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.setDashboardLink();
  }

  setDashboardLink() {
    if (this.isLoggedIn) {
      switch (this.userService.getUserType()) {
        case 'student': this.dashboardLink = 'student'; break;
        case 'mentor': this.dashboardLink = 'mentor'; break;
        case 'admin': this.dashboardLink = 'admin'; break;
        default: this.dashboardLink = 'login';
      }
    }
  }

  onLogout() {
    this.userService.logout();
  }

}
