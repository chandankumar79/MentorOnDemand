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
    this.userService.getLoggedInStatus.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; this.setDashboardLink(); });
   }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.setDashboardLink();
  }
    
  setDashboardLink() {
    try {
      this.dashboardLink = this.userService.getRole();
    }
    catch {
      this.dashboardLink = 'login';       
    }
  }

  onLogout() {
    this.userService.logout();
  }

}
