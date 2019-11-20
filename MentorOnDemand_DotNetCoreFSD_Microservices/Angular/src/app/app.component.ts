import { Component, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project2';

  // @Output() eventUserDashboard = new EventEmitter();
  // callUserDashboard() {
  //   this.eventUserDashboard.emit(null);
  // }

  constructor(private userService: UserService) {
    this.userService.isLoggedIn();
  }
}
